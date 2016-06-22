require('app-module-path').addPath(__dirname + '/../../');
require('common/browser');
window.WebSocket = require('ws');


var BotPage = require('../index');
var expect = require('chai').expect;
var observer = require('common/observer');

describe('BotPage', function() {
	var botPage;
	before(function(done){
		this.timeout('10000');
		var token = process.env.BOT_TOKEN;
		botPage = new BotPage();
		botPage.initPromise.then(function(resolve){
			done();
		});
	});
	it('BotPage is initialized', function(){
		expect(botPage).to.be.ok;
	});
});
