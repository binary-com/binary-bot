import Observer from 'binary-common-utils/lib/observer';
import _ from 'underscore';
import { getUTCTime, asyncChain } from 'binary-common-utils/lib/tools';
import CustomApi from 'binary-common-utils/lib/customApi';
import { translator } from '../../common/translator';
import config from '../../common/const';
import StrategyCtrl from './strategyCtrl';
import _Symbol from './symbol';

export default class Bot {
  constructor(api = null) {
    this.ticks = [];
    this.candles = [];
    if (api === null) {
      this.api = new CustomApi(null, this.recoverFromDisconnect.bind(this));
    } else {
      this.api = api;
    }

    this.strategyFinish = (contract) => {
      this.strategyCtrl.destroy();
      this.botFinish(contract);
    };

    this.tradePurchase = () => {
      this.totalRuns += 1;
      this.observer.emit('bot.tradeInfo', {
        totalRuns: this.totalRuns,
      });
    };

    this.strategyReady = () => {
      this.observer.emit('bot.waiting_for_purchase');
    };

    this.apiProposal = (proposal) => {
      this.strategyCtrl.updateProposal(proposal);
    };

    this.observer = new Observer();
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
    this.api._originalApi.send({
      forget_all: 'balance',
    }).then(() => {
      this.api.balance();
      this.setTheInitialConditions().then(() => {
        if (_startTrading) {
          this.startTrading();
        }
      });
    }, (error) => this.observer.emit('api.error', error));
  }
  recoverFromDisconnect() {
    this.observer.emit('ui.log.warn', translator.translateText('Connection lost, recovering...'));
    this.api._originalApi.connect();
    for (let obs of this.unregisterOnFinish) {
      this.observer.unregisterAll(obs);
    }
    this.unregisterOnFinish = [];
    this.authorizedToken = '';
    if (this.running) {
      if (this.strategyCtrl) {
        this.login().then(() => {
          let strategyRecovered = (result) => {
            if (!result.tradeWasRunning) {
              this.startOver(true);
            } else {
              this.strategyCtrl.destroy();
              this.observer.unregister('strategy.finish', strategyRecovered);
              this.startOver(false);
              this.botFinish(result.finishedContract);
            }
          };
          this.observer.register('strategy.recovered', strategyRecovered, true, null, true);
          this.unregisterOnFinish.push(['strategy.recovered', strategyRecovered]);
          this.strategyCtrl.recoverFromDisconnect();
        });
      } else {
        this.login().then(() => {
          this.startOver(true);
        });
      }
    }
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
      this.observer.register('api.authorize', apiAuthorize, true, {
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
        this.subscribeToCandles();
        done();
      };
      this.observer.register('api.history', apiHistory, true, {
        type: 'history',
        unregister: [['api.history', apiHistory], 'api.tick', 'bot.tickUpdate', 'api.ohlc', 'api.candles'],
      }, true);
      if (this.tradeOption.symbol !== this.symbolStr) {
        this.api._originalApi.unsubscribeFromAllTicks().then(() => {
          this.api.history(this.tradeOption.symbol, {
            end: 'latest',
            count: 600,
            subscribe: 1,
          });
        }, (error) => this.observer.emit('api.error', error));
      } else {
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
    this.strategy = strategy;
    this.finish = finish;
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
        this.api._originalApi.send({
          forget_all: 'balance',
        }).then(() => {
          this.api.balance();
          this.setTheInitialConditions().then(() => {
            this.startTrading();
          });
        }, (error) => this.observer.emit('api.error', error));
      });
    }
  }
  observeTicks() {
    if (!this.observer.isRegistered('api.tick')) {
      let apiTick = (tick) => {
        this.ticks = this.ticks.concat(tick);
        this.ticks.splice(0, 1);
        if (this.running) {
          this.strategyCtrl.updateTicks({
            ticks: this.ticks,
            candles: this.candles,
          });
        }
        this.observer.emit('bot.tickUpdate', {
          ticks: this.ticks,
          candles: this.candles,
          pip: this.pip,
        });
      };
      this.observer.register('api.tick', apiTick);
    }
  }
  observeBalance() {
    if (!this.observer.isRegistered('api.balance')) {
      let apiBalance = (balance) => {
        this.balance = balance.balance;
        this.balanceStr = Number(balance.balance).toFixed(2) + ' ' + balance.currency;
        this.observer.emit('bot.tradeInfo', {
          balance: this.balanceStr,
        });
      };
      this.observer.register('api.balance', apiBalance, false, {
        type: 'balance',
        unregister: [['api.balance', apiBalance]],
      });
    }
  }
  observeCandles() {
    if (!this.observer.isRegistered('api.candles')) {
      let apiCandles = (candles) => this.candles = candles;
      this.observer.register('api.candles', apiCandles, false, {
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
      this.observer.register('api.ohlc', apiOHLC);
    }
  }
  observeStrategy() {
    this.observer.register('strategy.ready', this.strategyReady, false, null, true);
    this.unregisterOnFinish.push(['strategy.ready', this.strategyReady]);
  }
  observeTradeUpdate() {
    if (!this.observer.isRegistered('strategy.tradeUpdate')) {
      let strategyTradeUpdate = (contract) => {
        this.observer.emit('bot.tradeUpdate', contract);
      };
      this.observer.register('strategy.tradeUpdate', strategyTradeUpdate);
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
    this.observer.register('api.proposal', this.apiProposal, false, {
      type: 'proposal',
      unregister: [
        ['api.proposal', this.apiProposal],
        'strategy.ready',
        'bot.waiting_for_purchase',
      ],
    });
    this.unregisterOnFinish.push(['api.proposal', this.apiProposal]);
    this.api.proposal(tradeOption);
  }
  subscribeProposals() {
    this.setTradeOptions();
    this.observer.unregisterAll('api.proposal');
    this.api._originalApi.unsubscribeFromAllProposals().then(() => {
      for (let to of this.tradeOptions) {
        this.subscribeProposal(to);
      }
    }, (error) => this.observer.emit('api.error', error));
  }
  startTrading() {
    this.observer.register('strategy.finish', this.strategyFinish, true, null, true);
    this.unregisterOnFinish.push(['strategy.finish', this.strategyFinish]);
    this.observer.register('trade.purchase', this.tradePurchase, true, null, true);
    this.unregisterOnFinish.push(['trade.purchase', this.tradePurchase]);
    this.observeStreams();
    this.strategyCtrl = new StrategyCtrl(this.api, this.strategy);
    this.subscribeProposals();
  }
  updateTotals(contract) {
    let profit = +(Number(contract.sell_price) - Number(contract.buy_price)).toFixed(2);
    this.totalProfit = +(this.totalProfit + profit).toFixed(2);
    this.totalStake = +(this.totalStake + Number(contract.buy_price)).toFixed(2);
    this.totalPayout = +(this.totalPayout + Number(contract.sell_price)).toFixed(2);
    this.observer.emit('bot.tradeInfo', {
      totalProfit: this.totalProfit,
      totalStake: this.totalStake,
      totalPayout: this.totalPayout,
    });
  }
  createDetails(contract) {
    let result = (+contract.sell_price === 0) ? 'loss' : 'win';
    let profit = +(Number(contract.sell_price) - Number(contract.buy_price)).toFixed(2);
    return [
      contract.transaction_ids.buy, +contract.buy_price, +contract.sell_price,
      profit, contract.contract_type,
      getUTCTime(new Date(parseInt(contract.entry_tick_time + '000', 10))), +contract.entry_tick,
      getUTCTime(new Date(parseInt(contract.exit_tick_time + '000', 10))), +contract.exit_tick,
      +((contract.barrier) ? contract.barrier : 0), result,
    ];
  }
  botFinish(contract) {
    for (let obs of this.unregisterOnFinish) {
      this.observer.unregisterAll(...obs);
    }
    this.unregisterOnFinish = [];
    this.updateTotals(contract);
    this.observer.emit('bot.finish', contract);
    this.running = false;
    this.finish(contract, this.createDetails(contract));
  }
  stop(contract) {
    if (!this.running) {
      this.observer.emit('bot.stop', contract);
      return;
    }
    for (let obs of this.unregisterOnFinish) {
      this.observer.unregisterAll(...obs);
    }
    this.unregisterOnFinish = [];
    asyncChain()
      .pipe((done) => {
        if (this.strategyCtrl) {
          let promise = this.strategyCtrl.destroy();
          if (promise) {
            promise.then(() => {
              done();
            });
          } else {
            done();
          }
        } else {
          done();
        }
      })
      .pipe((done) => {
        this.api._originalApi.unsubscribeFromAllProposals().then(() => done(),
          (error) => this.observer.emit('api.error', error));
      })
      .pipe(() => {
        this.running = false;
        this.observer.emit('bot.stop', contract);
      })
      .exec();
  }
}

export const bot = process.browser ? new Bot() : null;
