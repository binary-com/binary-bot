'use strict';
import Observer from 'binary-common-utils/observer';
import _ from 'underscore';
import _Symbol from './symbol';
import StrategyCtrl from './strategyCtrl';
import {getUTCTime, asyncChain} from 'binary-common-utils/tools';
import CustomApi from 'binary-common-utils/customApi';
import config from 'const';

var Bot = function Bot(api) {
	if (Bot.instance) {
		return Bot.instance;
	}
	Bot.instance = this;
	this.ticks = [];
	if ( typeof api === 'undefined' ) {
		this.api = new CustomApi();
	} else {
		this.api = api;
	}
	this.observer = new Observer();
	this.firstCall = true;
	this.authorizedToken = '';
	this.symbol = new _Symbol(this.api);
	this.initPromise = this.symbol.initPromise;
	this.running = false;
	this.totalProfit = 0;
	this.totalRuns = 0;
	this.totalStake = 0;
	this.totalPayout = 0;
	this.balance = 0;
	this.balanceStr = '';
	this.symbolStr = '';
	this.runningObservations = [];
};

Bot.prototype = Object.create(null, {
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
			if (!_.isEmpty(tradeOption)) {
				this.pip = this.symbol.activeSymbols.getSymbols()[tradeOption.symbol].pip;
				var opposites = config.opposites[tradeOption.condition];
				this.tradeOptions = [];
				for (var key in opposites) {
					this.tradeOptions.push( _.extend(_.clone(tradeOption), {
							contract_type: Object.keys(opposites[key])[0]
						}));
					this.tradeOptions.slice(-1)[0].duration_unit = 't';
					delete this.tradeOptions.slice(-1)[0].condition;
				}
			} else {
				this.tradeOptions = [];
			}
			if ( this.authorizedToken === this.token ) {
				this._startTrading();
				return;
			}
			var that = this;
			asyncChain()
			.pipe(function(chainDone){
				var apiAuthorize = function(){	
					that.authorizedToken = that.token;
					chainDone();
				};
				that.observer.register('api.authorize', apiAuthorize, true, {
					type: 'authorize',
					unregister: [['api.authorize', apiAuthorize]]
				});
				that.api.authorize(that.token);
			})
			.pipe(function(chainDone){
				if ( that.firstCall ) {
					that.firstCall = false;
				}
				chainDone();
			})
			.exec();
			asyncChain()
			.pipe(function(chainDone){
				if ( _.isEmpty(tradeOption) || tradeOption.symbol === that.symbolStr ) {
					chainDone();
				} else {
					var apiHistory = function(history){
						that.symbolStr = tradeOption.symbol;
						that.ticks = history;
						chainDone();
					};
					that.observer.register('api.history', apiHistory, true, {
						type: 'history',
						unregister: [['api.history', apiHistory], 'api.tick', 'bot.tickUpdate']
					});
					that.api.history(tradeOption.symbol, {
						end: 'latest',
						count: 600,
						subscribe: 1
					});
				}
			})
			.pipe(function(chainDone){
				that._startTrading();
			})
			.exec();
		}
	},
	_observeOnceAndForever: {
		value: function _observeOnceAndForever(){
			var that = this;
			var apiBalance = function(balance){
				that.runningObservations.push(['api.balance', apiBalance]);
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
				that.runningObservations.push(['api.tick', apiTick]);
				that.ticks = that.ticks.concat(tick);
				that.strategyCtrl.updateTicks(that.ticks);
				that.observer.emit('bot.tickUpdate', {
					ticks: that.ticks,
					pip: that.pip
				});
			};
			this.observer.register('api.tick', apiTick);
		}
	},
	_subscribeProposals: {
		value: function _subscribeProposals() {
			var that = this;
			var apiProposal = function(proposal){
				that.runningObservations.push(['api.proposal', apiProposal]);
				that.strategyCtrl.updateProposal(proposal);
			};
			var strategyReady = function(){
				that.runningObservations.push(['strategy.ready', strategyReady]);
				that.observer.emit('bot.waiting_for_purchase');
			};
			this.observer.register('api.proposal', apiProposal, false, {
				type: 'proposal',
				unregister: [
					['api.proposal', apiProposal], 
					'strategy.ready', 
					'bot.waiting_for_purchase'
				]
			});
			this.observer.register('strategy.ready', strategyReady);
			for (var i in this.tradeOptions) {
				this.api.proposal(this.tradeOptions[i]);
			}
		}
	},
	_startTrading: {
		value: function _startTrading() {
			var that = this;
			var strategyFinish = function(contract){
				that._finish(contract);
			};
			var tradePurchase = function(){
				that.totalRuns += 1;
				that.observer.emit('bot.tradeInfo', {
					totalRuns: that.totalRuns
				});
			};
			this.observer.register('strategy.finish', strategyFinish, true);
			this.observer.register('trade.purchase', tradePurchase, true);
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
			var that = this;
			asyncChain()
			.pipe(function(done){
				that.api._originalApi.unsubscribeFromAllProposals().then(function(response){
					done();
				});
			})
			.pipe(function(done){
				that.running = false;
				that._updateTotals(contract);
				that.finish(contract, that._createDetails(contract));
				that.observer.emit('bot.finish', contract);
			})
			.exec();
		}
	},
	stop: {
		value: function stop(contract){
			if ( !this.running ) {
				this.observer.emit('bot.stop', contract);
				return;
			}
			if ( this.strategyCtrl ) {
				this.strategyCtrl.destroy();
			}
			for ( var i in this.runningObservations ) {
				this.observer.unregisterAll.apply(this.observer, this.runningObservations[i]);
			}
			var that = this;
			asyncChain()
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
	},
	getBalance: {
		value: function getBalance(balanceType){
			return (balanceType === 'STR') ? this.balanceStr : this.balance ;
		}
	},
});

module.exports = Bot;
