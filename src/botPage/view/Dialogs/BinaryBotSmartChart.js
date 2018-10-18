import {
    SmartChart,
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
import { ticksService } from '../shared';
import { observer as globalObserver } from '../../../common/utils/observer';

const chartWidth = 500;
const chartHeight = 500;

class SmartChartContent extends PureComponent {
    constructor() {
        super();
        this.listeners = [];
        this.chartId = 'binary-bot-chart';
        this.state = { symbol: 'R_100' };

        globalObserver.register('bot.init', s => {
            if (this.symbol !== s) {
                this.setState({ symbol: s });
            }
        });
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
