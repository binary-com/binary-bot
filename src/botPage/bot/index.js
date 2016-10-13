import { observer } from 'binary-common-utils/lib/observer';
import CustomApi from 'binary-common-utils/lib/customApi';
import { getToken } from 'binary-common-utils/lib/storageManager';
import _ from 'underscore';
import config from '../../common/const';
import PurchaseCtrl from './purchaseCtrl';
import _Symbol from './symbol';
import { number as expectNumber, barrierOffset as expectBarrierOffset } from '../../common/expect';
import { RuntimeError } from '../../common/error';

const decorateTradeOptions = (tradeOption, otherOptions = {}) => {
  const option = {
    duration_unit: tradeOption.duration_unit,
    basis: tradeOption.basis,
    currency: tradeOption.currency,
    symbol: tradeOption.symbol,
    ...otherOptions,
  };
  option.duration = expectNumber('duration', tradeOption.duration, RuntimeError);
  option.amount = expectNumber('amount', tradeOption.amount, RuntimeError).toFixed(2);
  if ('prediction' in tradeOption) {
    option.barrier = expectNumber('prediction', tradeOption.prediction, RuntimeError);
  }
  if ('barrierOffset' in tradeOption) {
    option.barrier = expectBarrierOffset(tradeOption.barrierOffset, RuntimeError);
  }
  if ('secondBarrierOffset' in tradeOption) {
    option.barrier2 = expectBarrierOffset(tradeOption.secondBarrierOffset, RuntimeError);
  }
  return option;
};

export default class Bot {
  constructor(api = null) {
    this.ticks = [];
    this.candles = [];
    this.candleInterval = 60;
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
  start(token, tradeOption, beforePurchase, duringPurchase, afterPurchase, sameTrade) {
    if (!this.running || sameTrade) {
      this.running = true;
      if (this.purchaseCtrl) {
        this.purchaseCtrl.destroy();
      }
      this.purchaseCtrl = new PurchaseCtrl(this.api, beforePurchase, duringPurchase, afterPurchase);
      this.tradeOption = tradeOption;
      observer.emit('log.bot.start', {
        again: !!sameTrade,
      });
      const accountName = getToken(token).account_name;
      if (typeof amplitude !== 'undefined') {
        amplitude.getInstance().setUserId(accountName);
      }
      if (typeof trackJs !== 'undefined') {
        trackJs.configure({
          userId: accountName,
        });
      }
      if (sameTrade) {
        this.startTrading();
      } else {
        const promises = [];
        if (this.currentToken !== token) {
          promises.push(this.login(token));
        }
        if (!_.isEmpty(this.tradeOption)) {
          if (this.tradeOption.symbol !== this.currentSymbol) {
            observer.unregisterAll('api.ohlc');
            observer.unregisterAll('api.tick');
            promises.push(this.subscribeToTickHistory());
            promises.push(this.subscribeToCandles());
          } else if (this.tradeOption.candleInterval !== this.candleInterval) {
            observer.unregisterAll('api.ohlc');
            this.candleInterval = this.tradeOption.candleInterval;
            promises.push(this.subscribeToCandles());
          }
        }
        Promise.all(promises).then(() => {
          this.startTrading();
        }).catch((error) => {
          if (error.name === 'RuntimeError') {
            // pass
          } else {
            throw error;
          }
        });
      }
    }
  }
  login(token) {
    return new Promise((resolve) => {
      const apiAuthorize = () => {
        observer.emit('log.bot.login', {
          lastToken: this.currentToken,
          token,
        });
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
      this.candleInterval = this.tradeOption.candleInterval;
      this.tradeOptions = [];
      for (const key of Object.keys(opposites)) {
        this.tradeOptions.push(decorateTradeOptions(this.tradeOption, {
          contract_type: Object.keys(opposites[key])[0],
        }));
      }
    } else {
      this.tradeOptions = [];
    }
  }
  subscribeToBalance() {
    const apiBalance = (balance) => {
      this.balance = balance.balance;
      this.balanceStr = `${Number(balance.balance).toFixed(2)} ${balance.currency}`;
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
        this.observeOhlc();
        this.candles = candles;
        resolve();
      };
      observer.register('api.candles', apiCandles, true, {
        type: 'candles',
        unregister: ['api.ohlc', 'api.candles', 'api.tick', 'bot.tickUpdate'],
      });
      this.api.originalApi.unsubscribeFromAllCandles().then(() => 0, () => 0);
      this.api.history(this.tradeOption.symbol, {
        end: 'latest',
        count: 600,
        granularity: this.candleInterval,
        style: 'candles',
        subscribe: 1,
      });
    });
  }
  subscribeToTickHistory() {
    return new Promise((resolve) => {
      const apiHistory = (history) => {
        this.observeTicks();
        this.currentSymbol = this.tradeOption.symbol;
        this.ticks = history;
        resolve();
      };
      observer.register('api.history', apiHistory, true, {
        type: 'history',
        unregister: [['api.history', apiHistory], 'api.tick',
          'bot.tickUpdate', 'api.ohlc', 'api.candles'],
      }, true);
      this.api.originalApi.unsubscribeFromAllTicks().then(() => 0, () => 0);
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
  observeBeforePurchase() {
    if (!observer.isRegistered('beforePurchase.ready')) {
      const beforePurchaseReady = () => {
        if (this.running) {
          observer.emit('bot.waiting_for_purchase');
        }
      };
      observer.register('beforePurchase.ready', beforePurchaseReady);
    }
  }
  observeTradeUpdate() {
    if (!observer.isRegistered('beforePurchase.tradeUpdate')) {
      const beforePurchaseTradeUpdate = (contract) => {
        if (this.running) {
          observer.emit('bot.tradeUpdate', contract);
        }
      };
      observer.register('beforePurchase.tradeUpdate', beforePurchaseTradeUpdate);
    }
  }
  observeStreams() {
    this.observeTradeUpdate();
    this.observeBeforePurchase();
    this.observeTicks();
    this.observeOhlc();
  }
  subscribeProposal(tradeOption) {
    const apiProposal = (proposal) => {
      if (this.running) {
        observer.emit('log.bot.proposal', proposal);
        this.purchaseCtrl.updateProposal(proposal);
      }
    };
    observer.register('api.proposal', apiProposal, false, {
      type: 'proposal',
      unregister: [
        ['api.proposal', apiProposal],
        'beforePurchase.ready',
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
    }, () => 0);
  }
  waitForBeforePurchaseFinish() {
    const beforePurchaseFinish = (contract) => {
      this.botFinish(contract);
    };
    observer.register('beforePurchase.finish', beforePurchaseFinish, true, null, true);
    this.unregisterOnFinish.push(['beforePurchase.finish', beforePurchaseFinish]);
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
    this.waitForBeforePurchaseFinish();
    this.waitForTradePurchase();
    this.subscribeProposals();
  }
  updateTotals(contract) {
    const profit = +(Number(contract.sell_price) - Number(contract.buy_price)).toFixed(2);
    const user = getToken(this.currentToken);
    observer.emit('log.revenue', {
      user,
      profit,
      contract,
    });

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
    // order matters
    this.running = false;
    this.purchaseCtrl.destroy();
    this.purchaseCtrl = null;
  //
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
    // order matters
    this.running = false;
    if (this.purchaseCtrl) {
      this.purchaseCtrl.destroy();
      this.purchaseCtrl = null;
    }
    //
    this.api.originalApi.unsubscribeFromAllProposals().then(() => 0, () => 0);
    if (contract) {
      observer.emit('log.bot.stop', contract);
    }
    observer.emit('bot.stop', contract);
  }
}

export const bot = process.browser ? new Bot() : null;
