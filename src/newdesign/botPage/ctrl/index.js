var storageManager = require('common/storageManager');
var observer = require('common/observer');
var ApiEvents = require('./apiEvents');
var LiveApi = require('binary-live-api').LiveApi;

var Bot = function Bot(token, tradeOptions, strategy, finish) {
	this.token = token;
	this.strategy = strategy;
	this.finish = finish;
	this.tradeOptions = tradeOptions;
	this.api = new LiveApi({ appId: storageManager.get('appId'), language: storageManager.get('lang') });
	this.apiEvents = new ApiEvents(this.api);
}

Bot.prototype = Object.create(null, {
	login: {
		value: function login(){
			this.api.authorize(this.token);
			observer.register('bot.authorize', function(authorize){
				console.log(authorize);
			});
		}
	}
});