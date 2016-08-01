'use strict';
import Observer from 'binary-common-utils/observer';
import _ from 'underscore';
import _Symbol from './symbol';
import StrategyCtrl from './strategyCtrl';
import {getUTCTime, asyncChain} from 'binary-common-utils/tools';
import tools from 'binary-common-utils/tools';
import CustomApi from 'binary-common-utils/customApi';
import config from 'const';
import Translator from 'translator';

var Bot = function Bot(api) {
	if (Bot.instance) {
		return Bot.instance;
	}
	Bot.instance = this;
	this.ticks = [];
	if ( typeof api === 'undefined' ) {
		this.api = new CustomApi(null, this.recoverFromDisconnect.bind(this));
	} else {
		this.api = api;
	}
	this.observer = new Observer();
	this.translator = new Translator();
	this.symbol = new _Symbol(this.api);
	this.initPromise = this.symbol.initPromise;
	this.running = false;
	this.firstCall = true;
	this.authorizedToken = '';
	this.balanceStr = '';
	this.symbolStr = '';
	this.runningObservations = [];
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
			this.firstCall = true;
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
			for ( var i in this.runningObservations ) {
				this.observer.unregisterAll.apply(this.observer, this.runningObservations[i]);
			}
			this.runningObservations = [];
			var that = this;
			this.authorizedToken = '';
			if ( this.running ) {
				if ( this.strategyCtrl ) {
					this.login().then(function(){
						var strategyRecovered = function(result){
							if ( !result.tradeWasRunning ){
								that.startOver(true);
							} else {
								that.strategyCtrl.destroy();
								that.observer.unregister('strategy.finish', strategyRecovered);
								that.startOver(false);
								that._finish(result.finishedContract);
							}
						};
						that.observer.register('strategy.recovered', strategyRecovered, true);
						that.runningObservations.push(['strategy.recovered', strategyRecovered]);
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
			if (!_.isEmpty(this.tradeOption)) {
				this.pip = this.symbol.activeSymbols.getSymbols()[this.tradeOption.symbol].pip;
				var opposites = config.opposites[this.tradeOption.condition];
				this.tradeOptions = [];
				for (var key in opposites) {
					this.tradeOptions.push( _.extend(_.clone(this.tradeOption), {
							contract_type: Object.keys(opposites[key])[0]
						}));
					this.tradeOptions.slice(-1)[0].duration_unit = 't';
					delete this.tradeOptions.slice(-1)[0].condition;
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
				var apiAuthorize = function(){	
					that.authorizedToken = that.token;
					resolve();
				};
				that.observer.register('api.authorize', apiAuthorize, true, {
					type: 'authorize',
					unregister: [['api.authorize', apiAuthorize]]
				});
				that.api.authorize(that.token);
			});
		}
	},
	setTheInitialConditions: {
		value: function setTheInitialConditions(){
			var that = this;
			return new Promise(function(resolve, reject){
				asyncChain()
				.pipe(function(chainDone){
					if ( that.firstCall ) {
						that.firstCall = false;
						that._observeOnceAndForever();
					}
					chainDone();
				})
				.pipe(function(chainDone){
					if ( _.isEmpty(that.tradeOption) || that.tradeOption.symbol === that.symbolStr ) {
						chainDone();
					} else {
						var apiHistory = function(history){
							that.symbolStr = that.tradeOption.symbol;
							that.ticks = history;
							chainDone();
						};
						that.observer.register('api.history', apiHistory, true, {
							type: 'history',
							unregister: [['api.history', apiHistory], 'api.tick', 'bot.tickUpdate']
						});
						that.api.history(that.tradeOption.symbol, {
							end: 'latest',
							count: 600,
							subscribe: 1
						});
					}
				})
				.pipe(function(chainDone){
					resolve();
				})
				.exec();
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
			if ( again ) {
				this._startTrading();
				return;
			}
			this.token = token;
			this.tradeOption = tradeOption;
			if ( this.authorizedToken === this.token ) {
				this._startTrading();
				return;
			}
			var that = this;
			this.login().then(function(){
				that.setTheInitialConditions().then(function(){
					that._startTrading();
				});
			});
		}
	},
	_observeOnceAndForever: {
		value: function _observeOnceAndForever(){
			var that = this;
			var apiBalance = function(balance){
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
			this.api.balance();
		}
	},
	_observeStreams: {
		value: function _observeStreams(){
			var that = this;
			var apiTick = function(tick){
				that.ticks = that.ticks.concat(tick);
				that.strategyCtrl.updateTicks(that.ticks);
				that.observer.emit('bot.tickUpdate', {
					ticks: that.ticks,
					pip: that.pip
				});
			};
			this.observer.register('api.tick', apiTick);
			this.runningObservations.push(['api.tick', apiTick]);
		}
	},
	_subscribeProposal: {
		value: function _subscribeProposal(tradeOption, callback) {
			var that = this;
			var apiProposal = function(proposal){
				that.strategyCtrl.updateProposal(_.extend(proposal, {
					contract_type: tradeOption.contract_type
				}));
				if ( callback ) {
					callback();
				}
			};
			this.observer.register('api.proposal', apiProposal, true, {
				type: 'proposal',
				unregister: [
					['api.proposal', apiProposal], 
					'strategy.ready', 
					'bot.waiting_for_purchase'
				]
			});
			this.runningObservations.push(['api.proposal', apiProposal]);
			this.api.proposal(tradeOption);
		}
	},
	_subscribeProposals: {
		value: function _subscribeProposals() {
			var that = this;
			var strategyReady = function(){
				that.observer.emit('bot.waiting_for_purchase');
			};
			this.observer.register('strategy.ready', strategyReady);
			this.runningObservations.push(['strategy.ready', strategyReady]);
			this.setTradeOptions();
			tools.asyncForEach(this.tradeOptions, function(tradeOption, i, next){
				that._subscribeProposal(tradeOption, next);
			}, function finish(){});
		}
	},
	_startTrading: {
		value: function _startTrading() {
			var that = this;
			var strategyTradeUpdate = function(contract){
				that.observer.emit('bot.tradeUpdate', contract);
			};
			var strategyFinish = function(contract){
				that.strategyCtrl.destroy();
				that._finish(contract);
			};
			var tradePurchase = function(){
				that.totalRuns += 1;
				that.observer.emit('bot.tradeInfo', {
					totalRuns: that.totalRuns
				});
			};
			this.observer.register('strategy.tradeUpdate', strategyTradeUpdate);
			this.observer.register('strategy.finish', strategyFinish, true);
			this.observer.register('trade.purchase', tradePurchase, true);
			this.runningObservations.push(['strategy.tradeUpdate', strategyTradeUpdate]);
			this.runningObservations.push(['strategy.finish', strategyFinish]);
			this.runningObservations.push(['trade.purchase', tradePurchase]);
			this._observeStreams();
			this.strategyCtrl = new StrategyCtrl(this.api, this.strategy);
			this._subscribeProposals();
		}
	},
	_updateTotals: {
		value: function _updateTotals(contract){
			var profit = Number(contract.sell_price) - Number(contract.buy_price);
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
			var profit = Number(contract.sell_price) - Number(contract.buy_price);
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
			for ( var i in this.runningObservations ) {
				this.observer.unregisterAll.apply(this.observer, this.runningObservations[i]);
			}
			this.runningObservations = [];
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
			for ( var i in this.runningObservations ) {
				this.observer.unregisterAll.apply(this.observer, this.runningObservations[i]);
			}
			this.runningObservations = [];
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
