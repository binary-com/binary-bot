var observer = require('common/observer');
var Symbol = require('./symbol');
var StrategyCtrl = require('./strategyCtrl');
var asyncChain = require('common/tools').asyncChain;

var Bot = function Bot(api, token, tradeOptions, strategy, finish) {
	this.token = token;
	this.strategy = strategy;
	this.finish = finish;
	this.tradeOptions = tradeOptions;
	this.api = api;
	this.symbol = new Symbol();
	this.initPromise = new Promise(function(resolve){
		asyncChain()
			.pipe(function(done){
				this.api.history(this.tradeOptions[0].symbol, {
					end: 'latest',
					count: 600,
					subscribe: 1
				});
				observer.register('api.history', function(history){

					done();
				})
			})
			.exec();
	});
}

Bot.prototype = Object.create(null, {
	login: {
		value: function login(){
			this.api.authorize(this.token);
			var that = this;
			observer.register('api.authorize', function(authorize){
				that.startTrading();
			});
		}
	},
	startTrading: {
		value: function startTrading() {
			this.strategyCtrl = new StrategyCtrl(this.api, this.strategy);
			this.subscribeProposals();
		}
	},
	subscribeProposals: {
		value: function subscribeProposals() {
			for (var option in this.tradeOptions) {
				this.api.proposal(option);
			}
			observer.register('api.proposal', function(proposal){
				this.strategyCtrl.updateProposal(proposal);
			})
		}
	}
});

module.exports = Bot;