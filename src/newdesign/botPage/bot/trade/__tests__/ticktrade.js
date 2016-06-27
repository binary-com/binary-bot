require('app-module-path').addPath(__dirname + '/../../../../');
require('common/browser');
window.WebSocket = require('ws');


var asyncChain = require('common/tools').asyncChain;
var Ticktrade = require('../ticktrade');
var CustomApi = require('../../customApi');
var expect = require('chai').expect;
var observer = require('common/observer');

describe('TickTrade', function() {
	var api = new CustomApi({ websocket: require('ws') });
	var ticktrade = new Ticktrade(api);
	var contractUpdates = [];
	var proposal;
	before(function(done){
		this.timeout('25000');
		observer.register('trade.contractUpdate', function(contract) {
			contractUpdates.push(contract);
		});
		asyncChain()
		.pipe(function(chainDone){
			api.authorize('c9A3gPFcqQtAQDW');
			observer.register('api.authorize', function(){
				chainDone();
			});
		})
		.pipe(function(chainDone){
			api.proposal({"amount":"20.00","basis":"stake","contract_type":"DIGITODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
			observer.register('api.proposal', function(_proposal){
				proposal = _proposal;
				chainDone();
			});
		})
		.pipe(function(chainDone){
			ticktrade.purchase(proposal);
			observer.register('trade.finish', function(contract){
				console.log('trade finish', contract);
				chainDone();
			});
		})
		.pipe(function (chainDone) {
			done();
		})
		.exec();
	})
	it('Purchases the proposal', function(){
	});
	it('Emits the finish signal', function(){
	});
	it('Emits the update signal', function(){
	});
	it('In case of error emits the error', function(){
	});
});
