import React, { Component } from 'react';
import Summary from './Summary';
import TradeTable from './TradeTable';

export default class TradeInfoPanel extends Component {
    constructor() {
        super();
        this.state = { accountID: 'initial' };
    }
    render() {
        const { accountID } = this.state;
        return (
            <div>
                <div className="content">
                    <Summary accountID={accountID} />
                    <TradeTable accountID={accountID} />
                </div>
            </div>
        );
    }
}
