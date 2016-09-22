import { observer } from 'binary-common-utils/lib/observer';
import { getUTCTime } from 'binary-common-utils/lib/tools';
import Trade from './trade';

export default class PurchaseCtrl {
  constructor(api, strategy, duringPurchase, finish) {
    this.api = api;
    this.strategy = strategy;
    this.duringPurchase = duringPurchase;
    this.finish = finish;
    this.ready = false;
    this.purchased = false;
    this.runningObservations = [];
    this.proposals = {};
  }
  updateProposal(proposal) {
    if (!this.purchased) {
      this.proposals[proposal.contract_type] = proposal;
      if (!this.ready && Object.keys(this.proposals).length === 2) {
        this.ready = true;
        observer.emit('strategy.ready');
      }
    }
  }
  updateTicks(data) {
    const ticks = data.ticks;
    const ohlc = data.candles;
    if (!this.purchased) {
      let direction = '';
      const length = ticks.length;
      if (length >= 2) {
        if (ticks[length - 1].quote > ticks[length - 2].quote) {
          direction = 'rise';
        }
        if (ticks[length - 1].quote < ticks[length - 2].quote) {
          direction = 'fall';
        }
      }
      if (ohlc) {
        const repr = function repr() {
          return JSON.stringify(this);
        };
        for (const o of ohlc) {
          o.toString = repr;
        }
      }
			const tickObj = {
				direction,
				ohlc,
				ticks,
			};
      if (this.ready) {
        observer.emit('log.strategy.start', {
          proposals: this.proposals,
        });
        this.strategy(tickObj, this.proposals, this);
      } else {
        this.strategy(tickObj, null, null);
      }
    }
  }
  purchase(option) {
    observer.emit('log.strategy.purchase', {
      proposals: this.proposals,
      purchasing: option,
    });
    if (!this.purchased) {
      this.purchased = true;
      const contract = this.proposals[option];
      this.trade = new Trade(this.api);
      const tradeUpdate = (openContract) => {
        this.duringPurchase(openContract, this);
        observer.emit('strategy.tradeUpdate', openContract);
      };
      const tradeFinish = (finishedContract) => {
        // order matters, needs fix
        observer.emit('strategy.finish', finishedContract);
        this.finish(finishedContract, this.createDetails(finishedContract));
      };
      observer.register('trade.update', tradeUpdate);
      observer.register('trade.finish', tradeFinish, true);
      this.runningObservations.push(['trade.update', tradeUpdate]);
      this.runningObservations.push(['trade.finish', tradeFinish]);
      this.trade.purchase(contract, tradeFinish);
    }
  }
  isSellAvailable() {
    return this.trade && this.trade.isSellAvailable;
  }
  sellAtMarket() {
    if (this.trade && this.trade.isSellAvailable) {
      this.trade.sellAtMarket();
    }
  }
  getContract(option) {
    if (!this.purchased) {
      return this.proposals[option];
    }
		return null;
  }
  createDetails(contract) {
    const result = (+contract.sell_price === 0) ? 'loss' : 'win';
    const profit = +(Number(contract.sell_price) - Number(contract.buy_price)).toFixed(2);
    observer.emit('log.strategy.' + result, {
      profit,
      transactionId: contract.transaction_ids.buy,
    });
    return [
      contract.transaction_ids.buy, +contract.buy_price, +contract.sell_price,
      profit, contract.contract_type,
      getUTCTime(new Date(parseInt(contract.entry_tick_time + '000', 10))), +contract.entry_tick,
      getUTCTime(new Date(parseInt(contract.exit_tick_time + '000', 10))), +contract.exit_tick,
      +((contract.barrier) ? contract.barrier : 0), result,
    ];
  }
  destroy() {
    for (const obs of this.runningObservations) {
      observer.unregisterAll(...obs);
    }
    this.runningObservations = [];
    this.proposals = {};
    this.ready = false;
    this.strategy = null;
    if (this.trade) {
      this.trade.destroy();
    }
  }
}
