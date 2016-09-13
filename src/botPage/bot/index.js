import { observer } from 'binary-common-utils/lib/observer';
import _ from 'underscore';
import CustomApi from 'binary-common-utils/lib/customApi';
import config from '../../common/const';
import StrategyCtrl from './strategyCtrl';
import _Symbol from './symbol';

export default class Bot {
  constructor(api = null) {
    this.ticks = [];
    this.candles = [];
    if (api === null) {
      this.api = new CustomApi();
    } else {
      this.api = api;
    }
    this.symbol = new _Symbol(this.api);
    this.initPromise = this.symbol.initPromise;
    this.running = false;
    this.authorizedToken = '';
    this.balanceStr = '';
    this.symbolStr = '';
    this.unregisterOnFinish = [];
    this.totalProfit = 0;
    this.totalRuns = 0;
    this.totalStake = 0;
    this.totalPayout = 0;
    this.balance = 0;
  }
  startOver(_startTrading) {
    this.symbolStr = '';
    this.balanceStr = '';
    this.api.originalApi.send({
      forget_all: 'balance',
    }).then(() => {
      this.api.balance();
      this.setTheInitialConditions().then(() => {
        if (_startTrading) {
          this.startTrading();
        }
      });
    }, (error) => observer.emit('api.error', error));
  }
  setTradeOptions() {
    let tradeOptionToClone;
    if (!_.isEmpty(this.tradeOption)) {
      this.pip = this.symbol.activeSymbols.getSymbols()[this.tradeOption.symbol].pip;
      let opposites = config.opposites[this.tradeOption.condition];
      this.tradeOptions = [];
      for (let key of Object.keys(opposites)) {
        tradeOptionToClone = {};
        for (let optKey of Object.keys(this.tradeOption)) {
          tradeOptionToClone[optKey] = this.tradeOption[optKey];
        }
        tradeOptionToClone.contract_type = Object.keys(opposites[key])[0];
        delete tradeOptionToClone.condition;
        this.tradeOptions.push(tradeOptionToClone);
      }
    } else {
      this.tradeOptions = [];
    }
  }
  login() {
    return new Promise((resolve) => {
      let apiAuthorize = () => {
        this.authorizedToken = this.token;
        resolve();
      };
      observer.register('api.authorize', apiAuthorize, true, {
        type: 'authorize',
        unregister: [['api.authorize', apiAuthorize]],
      }, true);
      this.api.authorize(this.token);
    });
  }
  subscribeToCandles() {
    this.api.history(this.tradeOption.symbol, {
      end: 'latest',
      count: 600,
      granularity: 60,
      style: 'candles',
      subscribe: 1,
    });
  }
  subscribeToTicks(done) {
    if (_.isEmpty(this.tradeOption) || this.tradeOption.symbol === this.symbolStr) {
      done();
    } else {
      let apiHistory = (history) => {
        this.symbolStr = this.tradeOption.symbol;
        this.ticks = history;
        done();
      };
      observer.register('api.history', apiHistory, true, {
        type: 'history',
        unregister: [['api.history', apiHistory], 'api.tick', 'bot.tickUpdate', 'api.ohlc', 'api.candles'],
      }, true);
      if (this.tradeOption.symbol !== this.symbolStr) {
        this.api.originalApi.send({
          forget_all: 'candles',
        }).then(() => this.subscribeToCandles());
        this.api.originalApi.unsubscribeFromAllTicks().then(() => {
          this.api.history(this.tradeOption.symbol, {
            end: 'latest',
            count: 600,
            subscribe: 1,
          });
        }, (error) => observer.emit('api.error', error));
      } else {
        this.subscribeToCandles();
        this.api.history(this.tradeOption.symbol, {
          end: 'latest',
          count: 600,
          subscribe: 1,
        });
      }
    }
  }
  setTheInitialConditions() {
    return new Promise((resolve) => {
      this.subscribeToTicks(resolve);
    });
  }
  start(token, tradeOption, strategy, finish, again) {
    if (!this.running || again) {
      this.running = true;
    } else {
      return;
    }
    this.strategyCtrl = new StrategyCtrl(this.api, strategy, finish);
    this.tradeOption = tradeOption;
    if (again) {
      this.startTrading();
      return;
    }
    this.token = token;
    if (this.authorizedToken === this.token) {
      this.setTheInitialConditions().then(() => {
        this.startTrading();
      });
    } else {
      this.login().then(() => {
        this.api.originalApi.send({
          forget_all: 'balance',
        }).then(() => {
          this.api.balance();
          this.setTheInitialConditions().then(() => {
            this.startTrading();
          });
        }, (error) => observer.emit('api.error', error));
      });
    }
  }
  observeTicks() {
    if (!observer.isRegistered('api.tick')) {
      let apiTick = (tick) => {
        this.ticks = this.ticks.concat(tick);
        this.ticks.splice(0, 1);
        if (this.running) {
          this.strategyCtrl.updateTicks({
            ticks: this.ticks,
            candles: this.candles,
          });
        }
        observer.emit('bot.tickUpdate', {
          ticks: this.ticks,
          candles: this.candles,
          pip: this.pip,
        });
      };
      observer.register('api.tick', apiTick);
    }
  }
  observeBalance() {
    if (!observer.isRegistered('api.balance')) {
      let apiBalance = (balance) => {
        this.balance = balance.balance;
        this.balanceStr = Number(balance.balance).toFixed(2) + ' ' + balance.currency;
        observer.emit('bot.tradeInfo', {
          balance: this.balanceStr,
        });
      };
      observer.register('api.balance', apiBalance, false, {
        type: 'balance',
        unregister: [['api.balance', apiBalance]],
      });
    }
  }
  observeCandles() {
    if (!observer.isRegistered('api.candles')) {
      let apiCandles = (candles) => {
        this.candles = candles;
        return candles;
      };
      observer.register('api.candles', apiCandles, false, {
        type: 'candles',
        unregister: ['api.ohlc', 'api.candles', 'api.tick', 'bot.tickUpdate'],
      });
      let apiOHLC = (candle) => {
        if (this.candles.slice(-1)[0].epoch === candle.epoch) {
          this.candles = [...this.candles.slice(0, -1), candle];
        } else {
          this.candles = [...this.candles, candle];
          this.candles.splice(0, 1);
        }
      };
      observer.register('api.ohlc', apiOHLC);
    }
  }
  observeStrategy() {
    const strategyReady = () => {
      observer.emit('bot.waiting_for_purchase');
    };
    observer.register('strategy.ready', strategyReady, false, null, true);
    this.unregisterOnFinish.push(['strategy.ready', strategyReady]);
  }
  observeTradeUpdate() {
    if (!observer.isRegistered('strategy.tradeUpdate')) {
      let strategyTradeUpdate = (contract) => {
        observer.emit('bot.tradeUpdate', contract);
      };
      observer.register('strategy.tradeUpdate', strategyTradeUpdate);
    }
  }
  observeStreams() {
    this.observeTradeUpdate();
    this.observeStrategy();
    this.observeTicks();
    this.observeCandles();
    this.observeBalance();
  }
  subscribeProposal(tradeOption) {
    const apiProposal = (proposal) => {
      this.strategyCtrl.updateProposal(proposal);
    };
    observer.register('api.proposal', apiProposal, false, {
      type: 'proposal',
      unregister: [
        ['api.proposal', apiProposal],
        'strategy.ready',
        'bot.waiting_for_purchase',
      ],
    });
    this.unregisterOnFinish.push(['api.proposal', apiProposal]);
    this.api.proposal(tradeOption);
  }
  subscribeProposals() {
    this.setTradeOptions();
    observer.unregisterAll('api.proposal');
    this.api.originalApi.unsubscribeFromAllProposals().then(() => {
      for (let to of this.tradeOptions) {
        this.subscribeProposal(to);
      }
    }, (error) => observer.emit('api.error', error));
  }
  startTrading() {
    const strategyFinish = (contract) => {
      this.strategyCtrl.destroy();
      this.strategyCtrl = null;
      this.botFinish(contract);
    };
    observer.register('strategy.finish', strategyFinish, true, null, true);
    this.unregisterOnFinish.push(['strategy.finish', strategyFinish]);
    const tradePurchase = () => {
      this.totalRuns += 1;
      observer.emit('bot.tradeInfo', {
        totalRuns: this.totalRuns,
      });
    };
    observer.register('trade.purchase', tradePurchase, true, null, true);
    this.unregisterOnFinish.push(['trade.purchase', tradePurchase]);
    this.observeStreams();
    this.subscribeProposals();
  }
  updateTotals(contract) {
    let profit = +(Number(contract.sell_price) - Number(contract.buy_price)).toFixed(2);
    this.totalProfit = +(this.totalProfit + profit).toFixed(2);
    this.totalStake = +(this.totalStake + Number(contract.buy_price)).toFixed(2);
    this.totalPayout = +(this.totalPayout + Number(contract.sell_price)).toFixed(2);
    observer.emit('bot.tradeInfo', {
      totalProfit: this.totalProfit,
      totalStake: this.totalStake,
      totalPayout: this.totalPayout,
    });
  }
  botFinish(contract) {
    for (let obs of this.unregisterOnFinish) {
      observer.unregisterAll(...obs);
    }
    this.unregisterOnFinish = [];
    this.updateTotals(contract);
    observer.emit('bot.finish', contract);
    this.running = false;
  }
  stop(contract) {
    if (!this.running) {
      observer.emit('bot.stop', contract);
      return;
    }
    for (let obs of this.unregisterOnFinish) {
      observer.unregisterAll(...obs);
    }
    this.unregisterOnFinish = [];
    this.running = false;
    if (this.strategyCtrl) {
      this.strategyCtrl.destroy();
      this.strategyCtrl = null;
    }
    this.api.originalApi.unsubscribeFromAllProposals();
    observer.emit('bot.stop', contract);
  }
}

export const bot = process.browser ? new Bot() : null;
