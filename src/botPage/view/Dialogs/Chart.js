import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { BinaryChart } from 'binary-charts';
import { ticksService } from '../shared';
import { translate } from '../../../common/i18n';
import Dialog from './Dialog';

let size = {};

class CustomBinaryChart extends BinaryChart {
    constructor(props) {
        super(props);
        console.log(props);
    }
    componentDidMount() {
        let oldSize = size;
        setInterval(() => {
            if (size !== oldSize) {
                this.chart.setSize(size.width - 30, size.height - 100, { duration: 100 });
                oldSize = size;
            }
        }, 500);
    }
}

class ChartContent extends PureComponent {
    constructor() {
        super();
        this.symbol = 'R_100';
        this.chartType = 'line';
        this.pipSize = 2;
        this.dataType = 'ticks';
        this.granularity = 60;
        this.listeners = {};
        this.state = {
            chartData: [],
            contract : null,
        };
        this.getData = this.getData.bind(this);
        this.updateTickListeners();
        this.addEventHandlers();
    }
    addEventHandlers() {
        globalObserver.register('bot.init', s => {
            if (this.symbol !== s) {
                this.stopTickListeners();
                this.symbol = s;
                this.pipSize = ticksService.pipSizes[s];
                this.getData(undefined, undefined, this.dataType, this.granularity);
            }
        });
        globalObserver.register('bot.contract', c => {
            if (c) {
                if (c.is_sold) {
                    this.setState({ contract: null });
                } else {
                    this.setState({ contract: c });
                }
            }
        });
    }
    stopTickListeners() {
        if (this.listeners.ohlc) {
            ticksService.stopMonitor({
                symbol     : this.symbol,
                granularity: this.granularity,
                key        : this.listeners.ohlc,
            });
        }
        if (this.listeners.tick) {
            ticksService.stopMonitor({
                symbol: this.symbol,
                key   : this.listeners.tick,
            });
        }
        this.listeners = {};
    }
    updateTickListeners() {
        return new Promise(resolve => {
            const callback = response => {
                this.setState({ chartData: response });
                resolve();
            };

            if (this.dataType === 'candles') {
                this.listeners.ohlc = ticksService.monitor({
                    symbol     : this.symbol,
                    granularity: this.granularity,
                    callback,
                });
            } else {
                this.listeners.tick = ticksService.monitor({
                    symbol: this.symbol,
                    callback,
                });
            }
        });
    }
    getData(start, end, newDataType, newGranularity) {
        this.stopTickListeners();
        this.dataType = newDataType;
        this.granularity = newGranularity;
        return this.updateTickListeners();
    }
    getSymbol() {
        return this.symbol;
    }
    render() {
        const isMinHeight = $(window).height() <= 360;

        if (this.chartComponent && this.dataType === 'ticks' && this.state.contract) {
            const { chart } = this.state.chartComponent;
            const { dataMax } = chart.xAxis[0].getExtremes();
            const { minRange } = chart.xAxis[0].options;

            chart.xAxis[0].setExtremes(dataMax - minRange, dataMax);
        }
        if (!$('#chart-dialog-component:visible').length) {
            return <div />;
        }
        return (
            <CustomBinaryChart
                className="trade-chart"
                id="trade-chart0"
                ref={component => (this.chartComponent = component)}
                contract={
                    this.state.contract && this.state.contract.underlying === this.symbol && this.dataType === 'ticks'
                        ? this.state.contract
                        : null
                }
                pipSize={this.pipSize}
                shiftMode="dynamic"
                ticks={this.state.chartData}
                getData={this.getData} // eslint-disable-line no-use-before-define
                type={this.chartType}
                hideToolbar={isMinHeight}
                hideTimeFrame={isMinHeight}
                onTypeChange={type => {
                    this.chartType = type;
                }}
            />
        );
    }
}

export default class Chart extends Dialog {
    constructor() {
        super('chart-dialog', translate('Chart'), <ChartContent />, {
            width : 500,
            height: 500,
            resize(_, { size: newSize }) {
                size = newSize;
            },
        });
    }
}
