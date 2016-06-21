var storageManager = require('common/storageManager');
var observer = require('common/observer');
var CustomApi = require('./customApi');

var Ctrl = function Ctrl(token, tradeOptions, strategy, finish) {
	this.token = token;
	this.strategy = strategy;
	this.finish = finish;
	this.tradeOptions = tradeOptions;
	this.api = new CustomApi({ appId: storageManager.get('appId'), language: storageManager.get('lang') });
}

Ctrl.prototype = Object.create(null, {
	login: {
		value: function login(){
			this.api.authorize(this.token);
			observer.register('bot.authorize', function(authorize){
				console.log('auth', authorize);
			});
		}
	}
});

module.exports = Ctrl;