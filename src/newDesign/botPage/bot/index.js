var observer = require('binary-common-utils/observer');
var Symbol = require('./symbol');
var ws = require('common/mock/websocket');
var StrategyCtrl = require('./strategyCtrl');
var asyncChain = require('binary-common-utils/tools').asyncChain;
var storageManager = require('binary-common-utils/storageManager');
var CustomApi = require('binary-common-utils/customApi');

var Bot = function Bot() {
	this.ticks = [];
	this.api = new CustomApi(ws);
	this.symbol = new Symbol(this.api);
	this.initPromise = this.symbol.initPromise;
	this.running = false;
};

Bot.prototype = Object.create(null, {
	start: {
		value: function start(token, tradeOptions, strategy, finish){
			if ( !this.running ) {
				this.running = true;
			} else {
				return;
			}
			this.strategy = strategy;
			this.finish = finish;
			this.tradeOptions = tradeOptions;
			this.token = token;
			var that = this;
			asyncChain()
			.pipe(function(chainDone){
				observer.registerOnce('api.authorize', function(){	
					chainDone();
				});
				that.api.authorize(that.token);
			})
			.pipe(function(chainDone){
				observer.registerOnce('api.history', function(history){
					that.ticks.concat(history);					
					chainDone();
				});
				that.api.history(that.tradeOptions[0].symbol, {
					end: 'latest',
					count: 600,
					subscribe: 1
				});
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
				observer.emit('ui.log', i18n._('tick received at:') + ' ' + tick.epoch);
				that.ticks.concat(tick);
				that.strategyCtrl.updateTicks(that.ticks);
			});
		}
	},
	stop: {
		value: function stop(contract){
			if ( this.running ) {
				this.running = false;
			} else {
				observer.emit('bot.stop', contract);
				return;
			}
			if ( this.strategyCtrl ) {
				this.strategyCtrl.destroy();
			}
			observer.unregisterAll('api.authorize');
			observer.unregisterAll('api.history');
			observer.unregisterAll('api.proposal');
			observer.unregisterAll('api.tick');
			observer.unregisterAll('strategy.ready');
			observer.unregisterAll('strategy.finish');
			var that = this;
			asyncChain()
			.pipe(function(done){
				that.api._originalApi.unsubscribeFromAllTicks().then(function(response){
					done();
				});
			})
			.pipe(function(done){
				that.api._originalApi.unsubscribeFromAllProposals().then(function(response){
					done();
				});
			})
			.pipe(function(done){
				that.api._originalApi.unsubscribeFromAlProposals().then(function(response){
					done();
				});
			})
			.pipe(function(done){
				observer.emit('bot.stop', contract);
			})
			.exec();
		}
	}
});

module.exports = Bot;
