require('app-module-path').addPath(__dirname + '/../../../');
require('common/browser');
window.WebSocket = require('ws');


var Ctrl = require('../index');
var expect = require('chai').expect;
var observer = require('common/observer');

describe('CustomApi', function() {
	var ctrl;
	before(function(done){
		var token = process.env.BOT_TOKEN;
		ctrl = new Ctrl(
			token,
			{

			},
			function strategy(){

			},
			function finish(){

			}
			);
		ctrl.login();
	});
	it('ctrl is initialized', function(){
		ctrl.login();
	});
});