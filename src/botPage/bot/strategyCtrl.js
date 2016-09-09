import { observer } from 'binary-common-utils/lib/observer';
import Trade from './trade';

export default class StrategyCtrl {
  constructor(api, strategy) {
    this.api = api;
    this.strategy = strategy;
    this.ready = false;
    this.purchased = false;
    this.runningObservations = [];
    this.proposals = {};
  }
  recoverFromDisconnect() {
    for (let obs of this.runningObservations) {
      observer.unregisterAll(...obs);
    }
    this.runningObservations = [];
    if (!this.trade || !this.trade.recoverFromDisconnect()) {
      observer.emit('strategy.recovered', {
        tradeWasRunning: false,
      });
      return;
    }
    let tradeFinish = function tradeFinish(contract) {
      this.trade.destroy();
      observer.emit('strategy.recovered', {
        tradeWasRunning: true,
        finishedContract: contract,
      });
    };
    observer.register('trade.finish', tradeFinish, true);
    this.runningObservations.push(['trade.finish', tradeFinish]);
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
    let ticks = data.ticks;
    let ohlc = data.candles;
    if (!this.purchased) {
      let direction = '';
      let length = ticks.length;
      if (length >= 2) {
        if (ticks[length - 1].quote > ticks[length - 2].quote) {
          direction = 'rise';
        }
        if (ticks[length - 1].quote < ticks[length - 2].quote) {
          direction = 'fall';
        }
      }
      if (ohlc) {
        let repr = function repr() {
          return JSON.stringify(this);
        };
        for (let o of ohlc) {
          o.toString = repr;
        }
      }
			let tickObj = {
				direction,
				ohlc,
				ticks,
			};
      if (this.ready) {
        this.strategy(tickObj, this.proposals, this);
      } else {
        this.strategy(tickObj, null, null);
      }
    }
  }
  purchase(option) {
    if (!this.purchased) {
      this.purchased = true;
      let contract = this.proposals[option];
      this.trade = new Trade(this.api);
      let tradeUpdate = (updatedContract) => {
        observer.emit('strategy.tradeUpdate', updatedContract);
      };
      let tradeFinish = (finishedContract) => {
        observer.emit('strategy.finish', finishedContract);
      };
      observer.register('trade.update', tradeUpdate);
      observer.register('trade.finish', tradeFinish, true);
      this.runningObservations.push(['trade.update', tradeUpdate]);
      this.runningObservations.push(['trade.finish', tradeFinish]);
      this.trade.purchase(contract, tradeFinish);
    }
  }
  getContract(option) {
    if (!this.purchased) {
      return this.proposals[option];
    }
		return null;
  }
  destroy() {
    for (let obs of this.runningObservations) {
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
