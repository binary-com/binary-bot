// import { CSSTransition }  from 'react-transition-group';
import { SmartChart, ComparisonList } from '@binary-com/smartcharts';
import React, { PureComponent } from 'react';
import { translate } from '../../../common/i18n';
import Dialog from './Dialog';
import { ticksService } from '../shared';

const chartWidth = 500;
const chartHeight = 500;

const requestAPI = ticksService.requestAPI.bind(ticksService);
const requestSubscribe = ticksService.requestSubscribe.bind(ticksService);
const requestForget = ticksService.requestForget.bind(ticksService);

class SmartChartContent extends PureComponent {
    constructor() {
        super();
        this.chartId = 'binary-bot-chart';
        this.symbol = 'R_100';
        this.state = { isShow: false };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isShow: true });
        }, 5000);
    }
    renderTopWidgets = () => <ComparisonList />;

    render() {
        return (
            <div>
                {/* <CSSTransition  in={this.state.isShow}
                    timeout={250} classNames='message'><div>hey</div></CSSTransition> */}

                <SmartChart
                    id={this.chartId}
                    symbol={this.symbol}
                    // onMessage={this.onMessage}
                    isMobile={true}
                    // enableRouting
                    topWidgets={this.renderTopWidgets}
                    // chartControlsWidgets={this.renderControls}
                    requestAPI={requestAPI}
                    requestSubscribe={requestSubscribe}
                    requestForget={requestForget}
                    // settings={settings}
                    // onSettingsChange={this.saveSettings}
                    // isConnectionOpened={isConnectionOpened}
                />
            </div>
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
