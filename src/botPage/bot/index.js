'use strict';
import Observer from 'binary-common-utils/observer';
import _ from 'underscore';
import _Symbol from './symbol';
import StrategyCtrl from './strategyCtrl';
import {getUTCTime, asyncChain} from 'binary-common-utils/tools';
import CustomApi from 'binary-common-utils/customApi';
import config from 'const';

var observer = new Observer();
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
				observer.registerOnce('api.authorize', function(){	
					that.authorizedToken = that.token;
					chainDone();
				});
				that.api.authorize(that.token);
			})
			.pipe(function(chainDone){
				if ( that.firstCall ) {
					that._observeOnceAndForever();
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
					observer.registerOnce('api.history', function(history){
						that.symbolStr = tradeOption.symbol;
						that.ticks = history;
						chainDone();
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
			observer.register('api.balance', function(balance){
				that.balance = balance.balance;
				that.balanceStr = Number(balance.balance).toFixed(2) + ' ' + balance.currency;
				observer.emit('bot.tradeInfo', {
					balance: that.balanceStr
				});
			});
			this.api.balance();
		}
	},
	_observeStreams: {
		value: function _observeStreams(){
			var that = this;
			observer.register('api.tick', function(tick){
				that.ticks = that.ticks.concat(tick);
				that.strategyCtrl.updateTicks(that.ticks);
				observer.emit('bot.tickUpdate', {
					ticks: that.ticks,
					pip: that.pip
				});
			});
		}
	},
	_subscribeProposals: {
		value: function _subscribeProposals() {
			var that = this;
			observer.register('api.proposal', function(proposal){
				that.strategyCtrl.updateProposal(proposal);
			});
			observer.register('strategy.ready', function(){
				observer.emit('bot.waiting_for_purchase');
			});
			for (var i in this.tradeOptions) {
				this.api.proposal(this.tradeOptions[i]);
			}
		}
	},
	_startTrading: {
		value: function _startTrading() {
			var that = this;
			observer.registerOnce('strategy.finish', function(contract){
				that._finish(contract);
			});
			observer.registerOnce('trade.purchase', function(){
				that.totalRuns += 1;
				observer.emit('bot.tradeInfo', {
					totalRuns: that.totalRuns
				});
			});
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
			observer.emit('bot.tradeInfo', {
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
				observer.emit('bot.finish', contract);
			})
			.exec();
		}
	},
	stop: {
		value: function stop(contract){
			if ( !this.running ) {
				observer.emit('bot.stop', contract);
				return;
			}
			if ( this.strategyCtrl ) {
				this.strategyCtrl.destroy();
			}
			observer.unregisterAll('api.proposal');
			observer.unregisterAll('api.balance');
			observer.unregisterAll('api.tick');
			observer.unregisterAll('strategy.ready');
			var that = this;
			asyncChain()
			.pipe(function(done){
				that.api._originalApi.unsubscribeFromAllProposals().then(function(response){
					done();
				});
			})
			.pipe(function(done){
				that.running = false;
				observer.emit('bot.stop', contract);
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
