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
    ChartSize,
} from '@binary-com/smartcharts';
import React, { PureComponent } from 'react';
import { translate } from '../../../common/i18n';
import Dialog from './Dialog';
import { generateLiveApiInstance } from '../../../common/appId';
import SmartChartTicksService from '../../common/SmartChartTicksService';
import { observer as globalObserver } from '../../../common/utils/observer';

setSmartChartsPublicPath('./js/');

const api = generateLiveApiInstance();
const ticksService = new SmartChartTicksService(api);

const chartWidth = 500;
const chartHeight = 500;

class SmartChartContent extends PureComponent {
    constructor() {
        super();
        this.listeners = [];
        this.chartId = 'binary-bot-chart';
        this.state = { symbol: 'R_100', barrierType: null, high: 0, low: 0 };

        globalObserver.register('bot.init', s => {
            if (this.symbol !== s) {
                this.setState({ symbol: s });
            }
        });

        globalObserver.register('bot.contract', c => {
            if (c) {
                if (c.is_sold) {
                    this.setState({ barrierType: null });
                } else {
                    this.setState({ barrierType: this.getBarrierType(c.contract_type) });
                    this.setState({ high: c.barrier });
                    this.setState({ low: c.barrier });
                }
            }
        });
    }

    getBarrierType(contractType) {
        switch (contractType) {
            case 'CALL':
                return 'ABOVE';
            default:
                return '';
        }
    }

    getKey({ ticks_history: symbol, granularity }) {
        return `${symbol}-${granularity}`;
    }

    requestAPI(data) {
        return ticksService.api.send(data);
    }

    requestSubscribe(request, callback) {
        const symbol = request.ticks_history;
        const dataType = request.style;
        const granularity = request.granularity;

        if (dataType === 'candles') {
            this.listeners[this.getKey(request)] = ticksService.monitor({
                symbol,
                granularity,
                callback,
            });
        } else {
            this.listeners[this.getKey(request)] = ticksService.monitor({
                symbol,
                callback,
            });
        }
    }

    requestForget(request, callback) {
        const symbol = request.ticks_history;
        const dataType = request.style;
        const granularity = request.granularity;
        const requsestKey = this.getKey(request);

        if (dataType === 'candles') {
            ticksService.stopMonitor({
                symbol,
                granularity,
                key: this.listeners[requsestKey],
            });
        } else {
            ticksService.stopMonitor({
                symbol,
                key: this.listeners[requsestKey],
            });
        }
        delete this.listeners[requsestKey];
    }

    renderTopWidgets = () => <ComparisonList />;

    renderControls = () => (
        <React.Fragment>
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
        const barriers = this.state.barrierType
            ? [
                {
                    shade         : this.state.barrierType,
                    shadeColor    : '#0000ff',
                    color         : '#ff0027',
                    // onChange: this.handleBarrierChange,
                    relative      : false,
                    draggable     : false,
                    lineStyle     : 'dotted',
                    hidePriceLines: false,
                    high          : parseFloat(this.state.high),
                    loaw          : parseFloat(this.state.low),
                },
            ]
            : [];

        return (
            <SmartChart
                id={this.chartId}
                symbol={this.state.symbol}
                // onMessage={this.onMessage}
                isMobile={true}
                // enableRouting
                topWidgets={this.renderTopWidgets}
                chartControlsWidgets={this.renderControls}
                requestAPI={this.requestAPI.bind(this)}
                requestSubscribe={this.requestSubscribe.bind(this)}
                requestForget={this.requestForget.bind(this)}
                // settings={settings}
                // onSettingsChange={this.saveSettings}
                // isConnectionOpened={isConnectionOpened}
                barriers={barriers}
            />
        );
    }
}

export default class BinaryBotSmartChart extends Dialog {
    constructor() {
        super('smartchart-dialog', translate('Smartchart Chart'), <SmartChartContent />, {
            width : chartWidth,
            height: chartHeight,
        });
    }
}
