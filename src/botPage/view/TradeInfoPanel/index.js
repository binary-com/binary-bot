import React, { Component } from 'react';
import { observer as globalObserver } from '../../../common/utils/observer';
import { translate } from '../../../common/i18n';
import Summary from './Summary';
import TradeTable from './TradeTable';
import RunButton from './RunButton';
import ClearButton from './ClearButton';

const resetAnimation = () => {
    $('.circle-wrapper')
        .removeClass('active')
        .removeClass('complete');
    $('.line')
        .removeClass('active')
        .removeClass('complete');
    $('.stage-tooltip:not(.top)').removeClass('active');
};

const activateStage = index => {
    if (index > 0) {
        $(`.circle-wrapper:eq(${index - 1})`).removeClass('active');
        $(`.circle-wrapper:eq(${index - 1})`).addClass('complete');
    }
    $(`.circle-wrapper:eq(${index})`).addClass('active');
    $(`.stage-tooltip.bottom:eq(${index})`).addClass('active');
};

class AnimateTrade extends Component {
    constructor() {
        super();
        this.indicatorMessages = {
            notRunning: translate('Bot is not running.'),
            running   : translate('Bot is running...'),
            stopping  : translate('Bot is stopping...'),
            stopped   : translate('Bot has stopped.'),
        };
        this.state = {
            indicatorMessage: this.indicatorMessages.notRunning,
            stopMessage     : this.indicatorMessages.stopped,
        };
    }
    componentWillMount() {
        globalObserver.register('bot.stop', () => {
            $('.stage-tooltip.top:eq(0)').removeClass('running');
            this.setState({ indicatorMessage: this.indicatorMessages.stopped });
        });
        $('#stopButton').click(() => {
            $('.stage-tooltip.top:eq(0)').removeClass('running');
            this.setState({ indicatorMessage: this.state.stopMessage });
        });
        $('#runButton').click(() => {
            resetAnimation();
            $('.stage-tooltip.top:eq(0)').addClass('running');
            this.setState({ indicatorMessage: this.indicatorMessages.running });
            globalObserver.register('contract.status', contractStatus => {
                this.animateStage(contractStatus);
            });
        });
    }
    animateStage(contractStatus) {
        if (contractStatus.id === 'contract.purchase_sent') {
            resetAnimation();
            activateStage(0);
            this.setState({ buy_price: contractStatus.data, stopMessage: this.indicatorMessages.stopping });
        } else if (contractStatus.id === 'contract.purchase_recieved') {
            $('.line').addClass('active');
            activateStage(1);
            this.setState({ buy_id: contractStatus.data });
        } else if (contractStatus.id === 'contract.sold') {
            $('.line').addClass('complete');
            activateStage(2);
            this.setState({ sell_id: contractStatus.data, stopMessage: this.indicatorMessages.stopped });
        }
        activateStage(contractStatus.id);
    }
    render() {
        return (
            <div>
                <div id="current-trade-status">
                    <span className="stage">
                        <div className="stage-label">{translate('Attempting to Buy')}</div>
                        <span className="circle-wrapper">
                            <span className="static-circle" />
                            <span className="dynamic-circle" />
                            <div className="line">
                                <div className="progress-bar" />
                            </div>
                        </span>
                        <div className="stage-tooltip bottom">
                            <div className="triangle" />
                            <p>
                                {translate('Buy amount')}: {this.state.buy_price || 0}
                            </p>
                        </div>
                    </span>
                    <span className="stage">
                        <div className="stage-tooltip top active">
                            <p>{this.state.indicatorMessage}</p>
                        </div>
                        <div className="stage-label">{translate('Buy succeeded')}</div>
                        <span className="circle-wrapper">
                            <span className="static-circle" />
                            <span className="dynamic-circle" />
                        </span>
                        <div className="stage-tooltip bottom">
                            <div className="triangle" />
                            <p>
                                {translate('ID')}: {this.state.buy_id || ''}
                            </p>
                        </div>
                    </span>
                    <span className="stage">
                        <div className="stage-label">{translate('Contract closed')}</div>
                        <span className="circle-wrapper">
                            <span className="static-circle" />
                            <span className="dynamic-circle" />
                        </span>
                        <div className="stage-tooltip bottom">
                            <div className="triangle" />
                            <p>
                                {translate('ID')}: {this.state.sell_id || ''}
                            </p>
                        </div>
                    </span>
                </div>
            </div>
        );
    }
}

export default class TradeInfoPanel extends Component {
    constructor() {
        super();
        this.state = { accountID: '', accountIDList: [], currentAccountID: '' };
    }
    componentWillMount() {
        globalObserver.register('bot.info', ({ accountID }) => {
            const { accountIDList } = this.state;
            if (!accountIDList.includes(accountID)) {
                this.setState({ accountIDList: [...accountIDList, accountID] });
            }
            if (!this.state.accountID) {
                this.setState({ accountID });
            }
            this.setState({ currentAccountID: accountID });
        });
    }
    render() {
        const { accountID } = this.state;

        return (
            <div>
                <div className="content">
                    <div className="content-row">
                        <div className="summary-toolbox">
                            <RunButton />
                            <ClearButton />
                        </div>
                    </div>
                    <div className="content-row">
                        <AnimateTrade />
                    </div>
                    <div className="content-row">
                        <TradeTable accountID={accountID} />
                    </div>
                    <div className="content-row">
                        <Summary accountID={accountID} />
                    </div>
                    <div>
                        <p id="sync-warning">
                            {translate(
                                'Stopping the bot will prevent further trades. Any ongoing trades will be completed by our system. Please be aware that some completed transactions may not be displayed in the table if the bot is stopped while placing trades. You may refer to the Binary.com statement page for details of all completed transactions.'
                            )}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
