import { observer } from 'binary-common-utils/lib/observer';
import _ from 'underscore';
import CustomApi from 'binary-common-utils/lib/customApi';
import config from '../../common/const';
import PurchaseCtrl from './purchaseCtrl';
import _Symbol from './symbol';

export default class Bot {
  constructor(api = null) {
    this.ticks = [];
    this.candles = [];
    this.running = false;
    this.currentToken = '';
    this.balanceStr = '';
    this.currentSymbol = '';
    this.unregisterOnFinish = [];
    this.totalProfit = 0;
    this.totalRuns = 0;
    this.totalStake = 0;
    this.totalPayout = 0;
    this.balance = 0;
    this.api = (api === null) ? new CustomApi() : api;
    this.symbol = new _Symbol(this.api);
    this.initPromise = this.symbol.initPromise;
  }
  start(token, tradeOption, strategy, duringPurchase, finish, sameTrade) {
    if (!this.running || sameTrade) {
      this.running = true;
      if (this.purchaseCtrl) {
        this.purchaseCtrl.destroy();
      }
      this.purchaseCtrl = new PurchaseCtrl(this.api, strategy, duringPurchase, finish);
      this.tradeOption = tradeOption;
      if (sameTrade) {
        this.startTrading();
      } else {
        const promises = [];
        if (this.currentToken !== token) {
          promises.push(this.login(token));
        }
        if (!_.isEmpty(this.tradeOption) && this.tradeOption.symbol !== this.currentSymbol) {
          promises.push(this.subscribeToTickHistory());
          promises.push(this.subscribeToCandles());
        }
        Promise.all(promises).then(() => {
          this.startTrading();
        });
      }
    }
  }
  login(token) {
    return new Promise((resolve) => {
      const apiAuthorize = () => {
        this.currentToken = token;
        this.subscribeToBalance();
        this.observeStreams();
        resolve();
      };
      observer.register('api.authorize', apiAuthorize, true, {
        type: 'authorize',
        unregister: [['api.authorize', apiAuthorize]],
      }, true);
      this.api.authorize(token);
    });
  }
  setTradeOptions() {
    if (!_.isEmpty(this.tradeOption)) {
      this.pip = this.symbol.activeSymbols.getSymbols()[this.tradeOption.symbol].pip;
      const opposites = config.opposites[this.tradeOption.condition];
      this.tradeOptions = [];
      for (const key of Object.keys(opposites)) {
        const newTradeOption = {
          ...this.tradeOption,
          contract_type: Object.keys(opposites[key])[0],
        };
        delete newTradeOption.condition;
        this.tradeOptions.push(newTradeOption);
      }
    } else {
      this.tradeOptions = [];
    }
  }
  subscribeToBalance() {
    const apiBalance = (balance) => {
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
    this.api.balance();
  }
  subscribeToCandles() {
    return new Promise((resolve) => {
      const apiCandles = (candles) => {
        this.candles = candles;
        resolve();
      };
      observer.register('api.candles', apiCandles, true, {
        type: 'candles',
        unregister: ['api.ohlc', 'api.candles', 'api.tick', 'bot.tickUpdate'],
      });
      this.api.originalApi.unsubscribeFromAllCandles();
      this.api.history(this.tradeOption.symbol, {
        end: 'latest',
        count: 600,
        granularity: 60,
        style: 'candles',
        subscribe: 1,
      });
    });
  }
  subscribeToTickHistory() {
    return new Promise((resolve) => {
      const apiHistory = (history) => {
        this.currentSymbol = this.tradeOption.symbol;
        this.ticks = history;
        resolve();
      };
      observer.register('api.history', apiHistory, true, {
        type: 'history',
        unregister: [['api.history', apiHistory], 'api.tick', 'bot.tickUpdate', 'api.ohlc', 'api.candles'],
      }, true);
      this.api.originalApi.unsubscribeFromAllTicks();
      this.api.history(this.tradeOption.symbol, {
        end: 'latest',
        count: 600,
        subscribe: 1,
      });
    });
  }
  observeTicks() {
    if (!observer.isRegistered('api.tick')) {
      const apiTick = (tick) => {
        this.ticks = [...this.ticks, tick];
        this.ticks.splice(0, 1);
        if (this.running) {
          this.purchaseCtrl.updateTicks({
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
  observeOhlc() {
    if (!observer.isRegistered('api.ohlc')) {
      const apiOHLC = (candle) => {
        if (this.candles.length && this.candles.slice(-1)[0].epoch === candle.epoch) {
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
    if (!observer.isRegistered('strategy.ready')) {
      const strategyReady = () => {
        if (this.running) {
          observer.emit('bot.waiting_for_purchase');
        }
      };
      observer.register('strategy.ready', strategyReady);
    }
  }
  observeTradeUpdate() {
    if (!observer.isRegistered('strategy.tradeUpdate')) {
      const strategyTradeUpdate = (contract) => {
        if (this.running) {
          observer.emit('bot.tradeUpdate', contract);
        }
      };
      observer.register('strategy.tradeUpdate', strategyTradeUpdate);
    }
  }
  observeStreams() {
    this.observeTradeUpdate();
    this.observeStrategy();
    this.observeTicks();
    this.observeOhlc();
  }
  subscribeProposal(tradeOption) {
    const apiProposal = (proposal) => {
      this.purchaseCtrl.updateProposal(proposal);
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
      for (const to of this.tradeOptions) {
        this.subscribeProposal(to);
      }
    }, (error) => observer.emit('api.error', error));
  }
  waitForStrategyFinish() {
    const strategyFinish = (contract) => {
      this.purchaseCtrl.destroy();
      this.purchaseCtrl = null;
      this.botFinish(contract);
    };
    observer.register('strategy.finish', strategyFinish, true, null, true);
    this.unregisterOnFinish.push(['strategy.finish', strategyFinish]);
  }
  waitForTradePurchase() {
    const tradePurchase = () => {
      this.totalRuns += 1;
      observer.emit('bot.tradeInfo', {
        totalRuns: this.totalRuns,
      });
    };
    observer.register('trade.purchase', tradePurchase, true, null, true);
    this.unregisterOnFinish.push(['trade.purchase', tradePurchase]);
  }
  startTrading() {
    this.waitForStrategyFinish();
    this.waitForTradePurchase();
    this.subscribeProposals();
  }
  updateTotals(contract) {
    const profit = +(Number(contract.sell_price) - Number(contract.buy_price)).toFixed(2);
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
    for (const obs of this.unregisterOnFinish) {
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
    for (const obs of this.unregisterOnFinish) {
      observer.unregisterAll(...obs);
    }
    this.unregisterOnFinish = [];
    this.running = false;
    if (this.purchaseCtrl) {
      this.purchaseCtrl.destroy();
      this.purchaseCtrl = null;
    }
    this.api.originalApi.unsubscribeFromAllProposals();
    observer.emit('bot.stop', contract);
  }
}

export const bot = process.browser ? new Bot() : null;
