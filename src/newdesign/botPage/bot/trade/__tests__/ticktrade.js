require('app-module-path').addPath(__dirname + '/../../');
require('common/browser');
window.WebSocket = require('ws');


var TickTrade = require('../index');
var expect = require('chai').expect;
var observer = require('common/observer');

describe('TickTrade', function() {
	var botPage;
	before(function(done){
		this.timeout('10000');
		var token = process.env.BOT_TOKEN;
		botPage = new BotPage();
		botPage.initPromise.then(function(resolve){
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
