var storageManager = require('binary-common-utils/storageManager');
var Symbol = require('./bot/symbol');
var observer = require('binary-common-utils/observer');
var bot = require('./bot');
var ws = require('common/mock/websocket');
var CustomApi = require('binary-common-utils/customApi');

var BotPage = function BotPage() {
	if (BotPage.instance) {
		return BotPage.instance;
	}
	BotPage.instance = this;
	this.api = new CustomApi(ws);
	this.symbol = new Symbol(this.api._originalApi);
	this.initPromise = this.symbol.initPromise;
};

BotPage.prototype = Object.create(null, {
	createBot: {
		value: function createBot(token, tradeOptions, strategy, finish){
			this.bot = new Bot(this.api, token, tradeOptions, strategy, finish);
			this.bot.initPromise.then(function(resolve){
				this.bot.login();
			});
		}
	},
});

module.exports = BotPage;
