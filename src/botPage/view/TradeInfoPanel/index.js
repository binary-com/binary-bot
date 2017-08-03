import React, { Component } from 'react';
import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import Summary from './Summary';
import TradeTable from './TradeTable';

export default class TradeInfoPanel extends Component {
    constructor() {
        super();
        this.state = { accountID: 'initial', accountIDList: ['initial'], currentAccountID: '' };
    }
    componentWillMount() {
        globalObserver.register('bot.info', ({ accountID }) => {
            const { accountIDList } = this.state;
            if (!accountIDList.includes(accountID)) {
                this.setState({ accountIDList: [...accountIDList, accountID] });
            }
            this.setState({ accountID, currentAccountID: accountID });
        });
    }
    render() {
        const { accountID, currentAccountID } = this.state;

        return (
            <div>
                <select
                    value={accountID}
                    rel={el => (this.accountIDDropdown = el)}
                    onChange={e => this.setState({ accountID: e.target.value })}
                >
                    {this.state.accountIDList.map(account =>
                        <option value={account}>
                            {`${account}${account === currentAccountID ? '*' : ''}`}
                        </option>
                    )}
                </select>

                <div className="content">
                    <Summary accountID={accountID} />
                    <TradeTable accountID={accountID} />
                </div>
            </div>
        );
    }
}
