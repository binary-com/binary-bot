require('app-module-path').addPath(__dirname + '/../../../../');
require('common/browser');
window.WebSocket = require('ws');


var TickTrade = require('../ticktrade');
var expect = require('chai').expect;
var observer = require('common/observer');

describe('TickTrade', function() {
	var tickTrade;
	before(function(done){
		this.timeout('10000');
		var token = process.env.BOT_TOKEN;
		tickTrade = new TickTrade();
		tickTrade.initPromise.then(function(resolve){
			done();
		});
	});
	it('Purchases the proposal', function(){
	});
	it('Emits the finish signal', function(){
	});
	it('Emits the update signal', function(){
	});
	it('In case of error emits the error', function(){
	});
});
