import React, { Component } from 'react';
import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { translate } from '../../../common/i18n';
import { warningText, tradePanelAccount } from '../style';
import Summary from './Summary';
import TradeTable from './TradeTable';

class AnimateTrade extends Component {
    render() {
        return (
            <div>
                <div id="current-trade-status">
                    <span className="circle-wrapper">
                        <span className="static-circle" />
                        <span className="dynamic-circle" />
                    </span>
                    <span className="line">
                        <span className="progress-bar" />
                    </span>
                    <span className="circle-wrapper">
                        <span className="static-circle" />
                        <span className="dynamic-circle" />
                    </span>
                    <span className="line">
                        <span className="progress-bar" />
                    </span>
                    <span className="circle-wrapper">
                        <span className="static-circle" />
                        <span className="dynamic-circle" />
                    </span>
                </div>
            </div>
        );
    }
}

const activateStage = status => {
    if (status === 'contract.purchase_sent') {
        $('.circle-wrapper')
            .removeClass('active')
            .removeClass('complete');
        $('.line').removeClass('active');
        $('.circle-wrapper:eq(0)').addClass('active');
    } else if (status === 'contract.purchase_recieved') {
        $('.circle-wrapper:eq(0)').removeClass('active');
        $('.circle-wrapper:eq(0)').addClass('complete');
        $('.line:eq(0)').addClass('active');
        $('.circle-wrapper:eq(1)').addClass('active');
    } else if (status === 'contract.sold') {
        $('.circle-wrapper:eq(1)').removeClass('active');
        $('.circle-wrapper:eq(1)').addClass('complete');
        $('.line:eq(1)').addClass('active');
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
        globalObserver.register('contract.status', contractStatus => {
            this.setState({ contractStatus });
            activateStage(contractStatus);
        });
    }
    render() {
        const { accountID, currentAccountID } = this.state;

        return (
            <div>
                <div className="content">
                    <div>
                        <label style={tradePanelAccount}>
                            {`${translate('Account')}: `}
                            <select
                                value={accountID}
                                rel={el => (this.accountIDDropdown = el)}
                                onChange={e => this.setState({ accountID: e.target.value })}
                            >
                                {this.state.accountIDList.map(account => (
                                    <option value={account}>
                                        {`${account}${
                                            account !== currentAccountID ? ` - ${translate('Stopped')}` : ''
                                        }`}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <h3>
                            <span>{translate('Summary')}</span>
                        </h3>

                        <Summary accountID={accountID} />
                    </div>
                    <h3>
                        <span>{translate('Current trade status')}</span>
                    </h3>

                    <AnimateTrade />
                    <div>
                        <h3>
                            <span>{translate('Trades')}</span>
                        </h3>

                        <TradeTable accountID={accountID} />
                        <p style={warningText}>
                            {translate(
                                'Stopping the bot will prevent further trades. Any ongoing trades will be completed by our system. You may refer to the Binary.com statement page for details of all completed transactions.'
                            )}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
