require('app-module-path').addPath(__dirname + '/../../');
require('common/browser');
window.WebSocket = require('ws');


var Bot = require('../index');
var expect = require('chai').expect;
var observer = require('common/observer');

describe('Bot', function() {
	var bot;
	before(function(done){
		this.timeout('10000');
		var token = process.env.BOT_TOKEN;
		bot = new Bot(api, token, tradeOptions, strategy, finish);
		bot.initPromise.then(function(){
			done();
		});
	});
	it('Initialized bot have history of ticks', function(){
		expect(bot).to.be.ok;
	});
	it('Start trading with the users strategy', function(){
		expect(bot).to.be.ok;
	});
	it('Strategy decides to purchase the trade', function(){
		expect(bot).to.be.ok;
	});
	it('Calls the finish function when trade is finished', function(){
		expect(bot).to.be.ok;
	});
	it('Is able to make an identical trade with previous argument', function(){
		expect(bot).to.be.ok;
	});
});
