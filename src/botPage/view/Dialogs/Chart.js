import {
    SmartChart,
    setSmartChartsPublicPath,
    ChartTypes,
    StudyLegend,
    Comparison,
    Views,
    Timeperiod,
    DrawTools,
    Share,
    ComparisonList,
    CrosshairToggle,
    ChartSize,
} from '@binary-com/smartcharts';
import React, { PureComponent } from 'react';
import { translate } from '../../../common/i18n';
import Dialog from './Dialog';
import ChartTicksService from '../../common/ChartTicksService';
import { observer as globalObserver } from '../../../common/utils/observer';
import { getLanguage } from '../../../common/lang';

setSmartChartsPublicPath('./js/');

export const BarrierTypes = {
    CALL       : 'ABOVE',
    PUT        : 'BELOW',
    EXPIRYRANGE: 'BETWEEN',
    EXPIRYMISS : 'OUTSIDE',
    RANGE      : 'BETWEEN',
    UPORDOWN   : 'OUTSIDE',
    ONETOUCH   : 'NONE_SINGLE',
    NOTOUCH    : 'NONE_SINGLE',
};

const chartWidth = 600;
const chartHeight = 600;

class ChartContent extends PureComponent {
    constructor(props) {
        super(props);
        const { api } = props;
        this.settings = { language: getLanguage() };
        this.ticksService = new ChartTicksService(api);
        this.listeners = [];
        this.chartId = 'binary-bot-chart';
        this.state = { symbol: 'R_100', barrierType: undefined, high: undefined, low: undefined };
        this.shouldBarrierDisplay = false;
    }

    componentDidMount() {
        globalObserver.register('bot.init', s => {
            if (this.symbol !== s) {
                this.setState({ symbol: s });
            }
        });

        globalObserver.register('bot.contract', c => {
            if (c) {
                if (c.is_sold) {
                    this.shouldBarrierDisplay = false;
                    this.setState({ barrierType: null });
                } else {
                    this.setState({ barrierType: BarrierTypes[c.contract_type] });
                    if (c.barrier) this.setState({ high: c.barrier });
                    if (c.high_barrier) this.setState({ high: c.high_barrier, low: c.low_barrier });
                    this.shouldBarrierDisplay = true;
                }
            }
        });
    }

    getKey = request => {
        const key = `${request.ticks_history}-${request.granularity}`;
        return key;
    };

    requestAPI(data) {
        return this.ticksService.api.send(data);
    }

    requestSubscribe(request, callback) {
        const { ticks_history: symbol, style: dataType, granularity } = request;
        if (dataType === 'candles') {
            this.listeners[this.getKey(request)] = this.ticksService.monitor({
                symbol,
                granularity,
                callback,
            });
        } else {
            this.listeners[this.getKey(request)] = this.ticksService.monitor({
                symbol,
                callback,
            });
        }
    }

    requestForget(request) {
        const { ticks_history: symbol, style: dataType, granularity } = request;
        const requsestKey = this.getKey(request);
        if (dataType === 'candles') {
            this.ticksService.stopMonitor({
                symbol,
                granularity,
                key: this.listeners[requsestKey],
            });
        } else {
            this.ticksService.stopMonitor({
                symbol,
                key: this.listeners[requsestKey],
            });
        }
        delete this.listeners[requsestKey];
    }

    renderTopWidgets = () => <ComparisonList />;

    renderControls = () => (
        <React.Fragment>
            <CrosshairToggle />
            <ChartTypes />
            <Timeperiod />
            <StudyLegend />
            <Comparison />
            <DrawTools />
            <Views />
            <Share />
            <ChartSize />
        </React.Fragment>
    );

    render() {
        const barriers = this.shouldBarrierDisplay
            ? [
                {
                    shade         : this.state.barrierType,
                    shadeColor    : '#0000ff',
                    color         : '#c03',
                    relative      : false,
                    draggable     : false,
                    lineStyle     : 'dotted',
                    hidePriceLines: false,
                    high          : parseFloat(this.state.high),
                    low           : parseFloat(this.state.low),
                },
            ]
            : [];

        return (
            <SmartChart
                id={this.chartId}
                symbol={this.state.symbol}
                isMobile={true}
                topWidgets={this.renderTopWidgets}
                chartControlsWidgets={this.renderControls}
                requestAPI={this.requestAPI.bind(this)}
                requestSubscribe={this.requestSubscribe.bind(this)}
                requestForget={this.requestForget.bind(this)}
                barriers={barriers}
                settings={this.settings}
            />
        );
    }
}

export default class Chart extends Dialog {
    constructor(api) {
        super('chart-dialog', translate('Chart'), <ChartContent api={api} />, {
            width    : chartWidth,
            height   : chartHeight,
            resizable: false,
        });
    }
}
