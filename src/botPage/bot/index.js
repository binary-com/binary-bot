'use strict';
import Observer from 'binary-common-utils/observer';
import _ from 'underscore';
import _Symbol from './symbol';
import StrategyCtrl from './strategyCtrl';
import {getUTCTime, asyncChain} from 'binary-common-utils/tools';
import CustomApi from 'binary-common-utils/customApi';
import config from 'const';
import Translator from 'translator';

var Bot = function Bot(api) {
	if (Bot.instance) {
		return Bot.instance;
	}
	Bot.instance = this;
	this.ticks = [];
	this.candles = [];
	if ( typeof api === 'undefined' ) {
		this.api = new CustomApi(null, this.recoverFromDisconnect.bind(this));
	} else {
		this.api = api;
	}

	var that = this;
	this.strategyFinish = function strategyFinish(contract){
		that.strategyCtrl.destroy();
		that._finish(contract);
	};

	this.tradePurchase = function tradePurchase(){
		that.totalRuns += 1;
		that.observer.emit('bot.tradeInfo', {
			totalRuns: that.totalRuns
		});
	};

	this.strategyReady = function strategyReady(){
		that.observer.emit('bot.waiting_for_purchase');
	};

	this.apiProposal = function apiProposal(proposal){
		that.strategyCtrl.updateProposal(proposal);
	};

	this.observer = new Observer();
	this.translator = new Translator();
	this.symbol = new _Symbol(this.api);
	this.initPromise = this.symbol.initPromise;
	this.running = false;
	this.authorizedToken = '';
	this.balanceStr = '';
	this.symbolStr = '';
	this.unregisterOnStop = [];
	this.unregisterOnFinish = [];
	this.totalProfit = 0;
	this.totalRuns = 0;
	this.totalStake = 0;
	this.totalPayout = 0;
	this.balance = 0;
};

Bot.prototype = Object.create(null, {
	startOver: {
		value: function startOver(__startTrading){
			var that = this;
			this.symbolStr = '';
			this.balanceStr = '';
			this.setTheInitialConditions().then(function(){
				if ( __startTrading ) {
					that._startTrading();
				}
			});
		}
	},
	recoverFromDisconnect: {
		value: function recoverFromDisconnect(){
			this.observer.emit('ui.log.warn', this.translator.translateText('Connection lost, recovering...'));
			this.api._originalApi.connect();
			for ( var i in this.unregisterOnStop ) {
				this.observer.unregisterAll.apply(this.observer, this.unregisterOnStop[i]);
			}
			this.unregisterOnStop = [];
			for ( i in this.unregisterOnFinish ) {
				this.observer.unregisterAll.apply(this.observer, this.unregisterOnFinish[i]);
			}
			this.unregisterOnFinish = [];
			var that = this;
			this.authorizedToken = '';
			if ( this.running ) {
				if ( this.strategyCtrl ) {
					this.login().then(function(){
						var strategyRecovered = function strategyRecovered(result){
							if ( !result.tradeWasRunning ){
								that.startOver(true);
							} else {
								that.strategyCtrl.destroy();
								that.observer.unregister('strategy.finish', strategyRecovered);
								that.startOver(false);
								that._finish(result.finishedContract);
							}
						};
						that.observer.register('strategy.recovered', strategyRecovered, true, null, true);
						that.unregisterOnStop.push(['strategy.recovered', strategyRecovered]);
						that.strategyCtrl.recoverFromDisconnect();
					});
				} else {
					this.login().then(function(){
						that.startOver(true);
					});
				}
			}
		}
	},
	setTradeOptions: {
		value: function setTradeOptions() {
			var tradeOptionToClone;
			if (!_.isEmpty(this.tradeOption)) {
				this.pip = this.symbol.activeSymbols.getSymbols()[this.tradeOption.symbol].pip;
				var opposites = config.opposites[this.tradeOption.condition];
				this.tradeOptions = [];
				for (var key in opposites) {
					tradeOptionToClone = {};
					for ( var optKey in this.tradeOption ) {
						tradeOptionToClone[optKey] = this.tradeOption[optKey];
					}
					tradeOptionToClone.contract_type = Object.keys(opposites[key])[0];
					tradeOptionToClone.duration_unit = 't';
					delete tradeOptionToClone.condition;
					this.tradeOptions.push(tradeOptionToClone);
				}
			} else {
				this.tradeOptions = [];
			}
		}
	},
	login: {
		value: function login(){
			var that = this;
			return new Promise(function(resolve, reject){
				var apiAuthorize = function apiAuthorize(){	
					that.authorizedToken = that.token;
					resolve();
				};
				that.observer.register('api.authorize', apiAuthorize, true, {
					type: 'authorize',
					unregister: [['api.authorize', apiAuthorize]]
				}, true);
				that.api.authorize(that.token);
			});
		}
	},
	subscribeToCandles: {
		value: function subscribeToCandles(){
			this.api.history(this.tradeOption.symbol, {
				end: 'latest',
				count: 600,
				granularity: 60,
				style: "candles",
				subscribe: 1
			});
		}
	},
	subscribeToTicks: {
		value: function subscribeToTicks(done){
			var that = this;
			if ( _.isEmpty(that.tradeOption) || that.tradeOption.symbol === that.symbolStr ) {
				done();
			} else {
				var apiHistory = function apiHistory(history){
					that.symbolStr = that.tradeOption.symbol;
					that.ticks = history;
					that.subscribeToCandles();
					done();
				};
				that.observer.register('api.history', apiHistory, true, {
					type: 'history',
					unregister: [['api.history', apiHistory], 'api.tick', 'bot.tickUpdate']
				}, true);
				if ( that.tradeOption.symbol !== that.symbolStr ) {
					that.api._originalApi.unsubscribeFromAllTicks().then(function(){
						that.api.history(that.tradeOption.symbol, {
							end: 'latest',
							count: 600,
							subscribe: 1
						});
					}, function reject(error){
						that.observer.emit('api.error', error);
					});
				} else {
					that.api.history(that.tradeOption.symbol, {
						end: 'latest',
						count: 600,
						subscribe: 1
					});
				}
			}
		}
	},
	setTheInitialConditions: {
		value: function setTheInitialConditions(){
			var that = this;
			return new Promise(function(resolve, reject){
				that.subscribeToTicks(resolve);
			});
		}
	},
	start: {
		value: function start(token, tradeOption, strategy, finish, again){
			if ( !this.running || again ) {
				this.running = true;
			} else {
				return;
			}
			this.strategy = strategy;
			this.finish = finish;
			this.tradeOption = tradeOption;
			if ( again ) {
				this._startTrading();
				return;
			}
			this.token = token;
			var that = this;
			if ( this.authorizedToken === this.token ) {
				this.setTheInitialConditions().then(function(){
					that._startTrading();
				});
				return;
			}
			this.login().then(function(){
				that.setTheInitialConditions().then(function(){
					that._startTrading();
				});
			});
		}
	},
	_observeTicks: {
		value: function _observeTicks(){
			var that = this;
			if ( !this.observer.isRegistered('api.tick') ) {
				var apiTick = function apiTick(tick){
					that.ticks = that.ticks.concat(tick);
					that.ticks.splice(0,1);
					that.strategyCtrl.updateTicks({
						ticks: that.ticks,
						candles: that.candles,
					});
					that.observer.emit('bot.tickUpdate', {
						ticks: that.ticks,
						candles: that.candles,
						pip: that.pip
					});
				};
				this.observer.register('api.tick', apiTick);
				this.unregisterOnStop.push(['api.tick', apiTick]);
			}
		}
	},
	_observeBalance: {
		value: function _observeBalance(){
			var that = this;
			if ( !this.observer.isRegistered('api.balance') ) {
				var apiBalance = function apiBalance(balance){
					that.balance = balance.balance;
					that.balanceStr = Number(balance.balance).toFixed(2) + ' ' + balance.currency;
					that.observer.emit('bot.tradeInfo', {
						balance: that.balanceStr
					});
				};
				this.observer.register('api.balance', apiBalance, false, {
					type: 'balance',
					unregister: [['api.balance', apiBalance]]
				});
				this.api._originalApi.send({
					forget_all: 'balance'
				}).then(function(){
					that.api.balance();
				}, function reject(error){
					that.observer.emit('api.error', error);
				});
			}
		}
	},
	_observeCandles: {
		value: function _observeCandles(){
			var that = this;
			if ( !this.observer.isRegistered('api.candles') ) {
				var apiCandles = function apiCandles(candles){
					that.candles = candles;
				};
				that.observer.register('api.candles', apiCandles, false, {
					type: 'candles',
					unregister: ['api.ohlc', 'api.candles', 'api.tick', 'bot.tickUpdate']
				});
				var apiOHLC = function apiOHLC(candle){
					that.candles = that.candles.concat(candle);
					that.candles.splice(0,1);
				};
				this.observer.register('api.ohlc', apiOHLC);
				this.unregisterOnStop.push(['api.ohlc', apiOHLC]);
			}
		}
	},
	_observeStrategy: {
		value: function _observeStrategy(){
			this.observer.register('strategy.ready', this.strategyReady, false, null, true);
			this.unregisterOnFinish.push(['strategy.ready', this.strategyReady]);
		}
	},
	_observeStreams: {
		value: function _observeStreams(){
			this._observeStrategy();
			this._observeTicks();
			this._observeCandles();
			this._observeBalance();
		}
	},
	_subscribeProposal: {
		value: function _subscribeProposal(tradeOption) {
			this.observer.register('api.proposal', this.apiProposal, false, {
				type: 'proposal',
				unregister: [
					['api.proposal', this.apiProposal], 
					'strategy.ready', 
					'bot.waiting_for_purchase'
				]
			});
			this.unregisterOnFinish.push(['api.proposal', this.apiProposal]);
			this.api.proposal(tradeOption);
		}
	},
	_subscribeProposals: {
		value: function _subscribeProposals() {
			var that = this;
			this.setTradeOptions();
			this.observer.unregisterAll('api.proposal');
			this.api._originalApi.unsubscribeFromAllProposals().then(function(response){
				for ( var i in that.tradeOptions ) {
					that._subscribeProposal(that.tradeOptions[i]);
				}
			}, function reject(error){
				that.observer.emit('api.error', error);
			});
		}
	},
	_startTrading: {
		value: function _startTrading() {
			var that = this;
			if ( !this.observer.isRegistered('strategy.tradeUpdate') ) {
				var strategyTradeUpdate = function strategyTradeUpdate(contract){
					that.observer.emit('bot.tradeUpdate', contract);
				};
				this.observer.register('strategy.tradeUpdate', strategyTradeUpdate);
				this.unregisterOnStop.push(['strategy.tradeUpdate', strategyTradeUpdate]);
			}
			this.observer.register('strategy.finish', this.strategyFinish, true, null, true);
			this.unregisterOnFinish.push(['strategy.finish', this.strategyFinish]);
			this.observer.register('trade.purchase', this.tradePurchase, true, null, true);
			this.unregisterOnFinish.push(['trade.purchase', this.tradePurchase]);
			this._observeStreams();
			this.strategyCtrl = new StrategyCtrl(this.api, this.strategy);
			this._subscribeProposals();
		}
	},
	_updateTotals: {
		value: function _updateTotals(contract){
			var profit = +(Number(contract.sell_price) - Number(contract.buy_price)).toFixed(2);
			this.totalProfit = +(this.totalProfit + profit).toFixed(2);
			this.totalStake = +(this.totalStake + Number(contract.buy_price)).toFixed(2);
			this.totalPayout = +(this.totalPayout + Number(contract.sell_price)).toFixed(2);
			var that = this;
			this.observer.emit('bot.tradeInfo', {
				totalProfit: that.totalProfit,
				totalStake: that.totalStake,
				totalPayout: that.totalPayout
			});
		}
	},
	_createDetails: {
		value: function _createDetails(contract) {
			var result = (+contract.sell_price === 0) ? 'loss' : 'win';
			var profit = +(Number(contract.sell_price) - Number(contract.buy_price)).toFixed(2);
			return [ 
				contract.transaction_ids.buy, +contract.buy_price, +contract.sell_price,
				profit, contract.contract_type, 
				getUTCTime(new Date(parseInt(contract.entry_tick_time + '000'))), +contract.entry_tick,
				getUTCTime(new Date(parseInt(contract.exit_tick_time + '000'))), +contract.exit_tick,
				+((contract.barrier) ? contract.barrier : 0), result
			];  
		}
	},
	_finish: {
		value: function _finish(contract){
			for ( var i in this.unregisterOnFinish ) {
				this.observer.unregisterAll.apply(this.observer, this.unregisterOnFinish[i]);
			}
			this.unregisterOnFinish = [];
			this._updateTotals(contract);
			this.observer.emit('bot.finish', contract);
			this.running = false;
			this.finish(contract, this._createDetails(contract));
		}
	},
	stop: {
		value: function stop(contract){
			if ( !this.running ) {
				this.observer.emit('bot.stop', contract);
				return;
			}
			for ( var i in this.unregisterOnStop ) {
				this.observer.unregisterAll.apply(this.observer, this.unregisterOnStop[i]);
			}
			this.unregisterOnStop = [];
			var that = this;
			asyncChain()
			.pipe(function(done){
				if ( that.strategyCtrl ) {
					var promise = that.strategyCtrl.destroy();
					if ( promise ) {
						promise.then(function(){
							done();
						});
					} else {
						done();
					}
				} else {
					done();
				}
			})
			.pipe(function(done){
				that.api._originalApi.unsubscribeFromAllProposals().then(function(response){
					done();
				}, function reject(error){
					that.observer.emit('api.error', error);
				});
			})
			.pipe(function(done){
				that.running = false;
				that.observer.emit('bot.stop', contract);
			})
			.exec();
		}
	}
});

module.exports = Bot;
