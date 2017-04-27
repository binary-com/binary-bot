import React from 'react';
import ReactDOM from 'react-dom';
import TradeTable from './TradeTable';

const tradeInfoSkel = {
    totalRuns  : 0,
    totalWins  : 0,
    totalLosses: 0,
    totalProfit: '',
    totalPayout: '',
    totalStake : '',
    balance    : '',
    tradeCount : 0,
};

export default class TradeInfo {
    constructor() {
        this.tradeInfo = { ...tradeInfoSkel };
        this.tradeCount = 0;
    }
    reset() {
        this.tradeInfo = { ...tradeInfoSkel };
        this.update();
    }
    update() {
        Object.keys(this.tradeInfo).forEach(key => {
            $(`.${key}`).text(this.tradeInfo[key]);
            if (key === 'totalProfit') {
                if (+this.tradeInfo[key] > 0) {
                    $(`.${key}`).css('color', 'green');
                } else if (+this.tradeInfo[key] < 0) {
                    $(`.${key}`).css('color', 'red');
                } else {
                    $(`.${key}`).css('color', 'black');
                }
            }
        });
    }
    addInfo(info) {
        this.tradeInfo = { ...this.tradeInfo, ...info };
        this.update();
    }
    // eslint-disable-next-line class-methods-use-this
    addContract(trade) {
        ReactDOM.render(<TradeTable trade={{ reference: trade.transaction_ids.buy, ...trade }} />, $('#tradeInfo')[0]);
    }
}
