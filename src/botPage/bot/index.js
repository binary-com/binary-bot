'use strict';
var observer = require('binary-common-utils/observer');
var _ = require('underscore');
var _Symbol = require('./symbol');
var StrategyCtrl = require('./strategyCtrl');
var asyncChain = require('binary-common-utils/tools').asyncChain;
var CustomApi = require('binary-common-utils/customApi');
var config = require('const');

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
	this.symbol = new _Symbol(this.api);
	this.initPromise = this.symbol.initPromise;
	this.running = false;
};

Bot.prototype = Object.create(null, {
	start: {
		value: function start(token, tradeOption, strategy, finish){
			if ( !this.running ) {
				this.running = true;
			} else {
				return;
			}
			this.strategy = strategy;
			this.finish = finish;
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
			var that = this;
			asyncChain()
			.pipe(function(chainDone){
				observer.registerOnce('api.authorize', function(){	
					chainDone();
				});
				that.api.authorize(that.token);
			})
			.pipe(function(chainDone){
				if ( _.isEmpty(tradeOption) || ( that.symbolStr && that.symbolStr === tradeOption.symbol ) ) {
					chainDone();
				} else {
					that.symbolStr = tradeOption.symbol;
					asyncChain()
						.pipe(function(chainDone2){
							if ( _.isEmpty(that.ticks) ) {
								chainDone2();
							} else {
								that.api._originalApi.unsubscribeFromAllTicks().then(function(response){
									chainDone2();
								});
							}
						})
						.pipe(function(chainDone2){
							observer.registerOnce('api.history', function(history){
								that.ticks = history;
								chainDone2();
							});
							that.api.history(tradeOption.symbol, {
								end: 'latest',
								count: 600,
								subscribe: 1
							});
						})
						.pipe(function(chainDone2){
							chainDone();
						})
						.exec();
				}
			})
			.pipe(function(chainDone){
				that._startTrading();
			})
			.exec();
		}
	},
	_startTrading: {
		value: function _startTrading() {
			var that = this;
			this.strategyCtrl = new StrategyCtrl(this.api, this.strategy);
			observer.registerOnce('strategy.finish', function(contract){
				that.finish(contract);
				that.stop(contract);
			});
			this._subscribeProposals();
			this._observeTicks();
		}
	},
	_subscribeProposals: {
		value: function _subscribeProposals() {
			var that = this;
			for (var i in this.tradeOptions) {
				this.api.proposal(this.tradeOptions[i]);
			}
			observer.register('api.proposal', function(proposal){
				that.strategyCtrl.updateProposal(proposal);
			});
			observer.register('strategy.ready', function(){
				observer.emit('bot.waiting_for_purchase');
			});
		}
	},
	_observeTicks: {
		value: function _observeTicks() {
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
	stop: {
		value: function stop(contract){
			if ( !this.running ) {
				observer.emit('bot.stop', contract);
				return;
			}
			if ( this.strategyCtrl ) {
				this.strategyCtrl.destroy();
			}
			this.ticks = [];
			observer.unregisterAll('api.authorize');
			observer.unregisterAll('api.history');
			observer.unregisterAll('api.proposal');
			observer.unregisterAll('api.tick');
			observer.unregisterAll('strategy.ready');
			observer.unregisterAll('strategy.finish');
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
	}
});

module.exports = Bot;
