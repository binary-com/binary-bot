import React, { Component } from 'react';
import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { translate } from '../../../common/i18n';
import { warningText, tradePanelAccount } from '../style';
import Summary from './Summary';
import TradeTable from './TradeTable';

class AnimateTrade extends Component {
    componentWillMount() {
        globalObserver.register('bot.stop', () => {
            resetAnimation();
        });
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
                    </span>
                    <span className="stage">
                        <div className="stage-label">{translate('Buy succeeded')}</div>
                        <span className="circle-wrapper">
                            <span className="static-circle" />
                            <span className="dynamic-circle" />
                        </span>
                    </span>
                    <span className="stage">
                        <div className="stage-label">{translate('Contract Sold')}</div>
                        <span className="circle-wrapper">
                            <span className="static-circle" />
                            <span className="dynamic-circle" />
                        </span>
                    </span>
                </div>
            </div>
        );
    }
}

const resetAnimation = () => {
    $('.circle-wrapper')
        .removeClass('active')
        .removeClass('complete');
    $('.line')
        .removeClass('active')
        .removeClass('complete');
};

const activateStage = status => {
    if (status === 'contract.purchase_sent') {
        resetAnimation();
        $('.circle-wrapper:eq(0)').addClass('active');
    } else if (status === 'contract.purchase_recieved') {
        $('.circle-wrapper:eq(0)').removeClass('active');
        $('.circle-wrapper:eq(0)').addClass('complete');
        $('.line').addClass('active');
        $('.circle-wrapper:eq(1)').addClass('active');
    } else if (status === 'contract.sold') {
        $('.circle-wrapper:eq(1)').removeClass('active');
        $('.circle-wrapper:eq(1)').addClass('complete');
        $('.line').addClass('complete');
        $('.circle-wrapper:eq(2)').addClass('active');
    }
};

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
        $('#runButton').click(() => {
            globalObserver.register('contract.status', contractStatus => {
                this.setState({ contractStatus });
                activateStage(contractStatus);
            });
        });
    }
    render() {
        const { accountID, currentAccountID } = this.state;

        return (
            <div>
                <div className="content">
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
