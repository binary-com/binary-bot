require('app-module-path').addPath(__dirname + '/../../../');
require('binary-common-utils/compatibility');


var asyncChain = require('binary-common-utils/tools').asyncChain;
var StrategyCtrl = require('../strategyCtrl');
var ws = require('common/mock/websocket');
var CustomApi = require('binary-common-utils/customApi');
var expect = require('chai').expect;
var observer = require('binary-common-utils/observer');
var api;
var proposals = [];
var firstAttemptDetected = true;
describe('TickTrade', function() {
	api = new CustomApi(ws);
	var strategy = function strategy(ticks, proposals, _strategyCtrl) {
		if ( proposals ) {
			if ( firstAttemptDetected ){
				firstAttemptDetected = false;
				observer.emit('test.strategy', {ticks: ticks, proposals: proposals});
			} else {
				observer.emit('test.purchase');
				_strategyCtrl.purchase('DIGITEVEN');
			}
		} else {
			observer.emit('test.strategy', {ticks: ticks, proposals: proposals});
		}
	};
	var strategyCtrl = new StrategyCtrl(api, strategy);
	describe('Make the strategy ready...', function(){
		before(function(done){
			this.timeout('10000');
			observer.registerOnce('strategy.ready', function() {
				done();
			});
			observer.register('api.proposal', function(_proposal){
				proposals.push(_proposal);
				strategyCtrl.updateProposal(_proposal);
			});
			asyncChain()
			.pipe(function(chainDone){
				api.authorize('c9A3gPFcqQtAQDW');
				observer.registerOnce('api.authorize', function(){
					chainDone();
				});
			})
			.pipe(function(chainDone){
				api.proposal({"amount":"1.00","basis":"stake","contract_type":"DIGITODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
				observer.registerOnce('api.proposal', function (_proposal){
					chainDone();
				});
			})
			.pipe(function(chainDone){
				api.proposal({"amount":"1.00","basis":"stake","contract_type":"DIGITEVEN","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
				observer.registerOnce('api.proposal', function (_proposal){
					chainDone();
				});
			})
			.exec();
		});
		it('Strategy gets ready when two proposals are available', function(){
		});
	});
	describe('Adding the ticks to the strategy...', function(){
		var strategyArgs;
		before(function(done){
			observer.registerOnce('test.strategy', function (_strategyArgs) {
				strategyArgs = _strategyArgs;
				done();
			});
			strategyCtrl.updateTicks({epoch: 'some time'});
		});
		it('strategyCtrl passes ticks and send the proposals if ready', function(){
			expect(strategyArgs).to.have.deep.property('.ticks.epoch');
			expect(strategyArgs).to.have.deep.property('.proposals[0].longcode')
				.that.is.equal('Win payout if the last digit of Volatility 100 Index is odd after 5 ticks.');
		});
	});
	describe('Giving a new proposal', function(){
		var strategyArgs;
		before(function(done){
			observer.registerOnce('test.strategy', function (_strategyArgs) {
				strategyArgs = _strategyArgs;
				done();
			});
			strategyCtrl.updateProposal(proposals[0]);
			strategyCtrl.updateTicks({epoch: 'some time'});
		});
		it('strategy can check if the proposals are ready', function(){
			expect(strategyArgs).to.have.deep.property('.ticks.epoch');
			expect(strategyArgs).to.have.deep.property('.proposals').not.to.be.ok;
		});
	});
	describe('Waiting for strategy to purchase the contract', function(){
		before(function(done){
			observer.registerOnce('test.purchase', function(){
				done();
			});
			strategyCtrl.updateProposal(proposals[1]);
			strategyCtrl.updateTicks({epoch: 'some time'});
		});
		it('strategy will buy the proposal whenever decided', function(){
		});
	});
	describe('Waiting for purchase to be finished', function(){
		var finishedContract;
		before(function(done){
			this.timeout('20000');
			observer.registerOnce('strategy.finish', function(_finishedContract){
				finishedContract = _finishedContract;
				done();
			});
			strategyCtrl.updateTicks({epoch: 'some time'});
		});
		it('finish is called whenever the purchase is finished', function(){
			expect(finishedContract).to.have.property('sell_price')
				.that.satisfy(function(price){return !isNaN(price);});
		});
	});
	after(function(){
		observer.unregisterAll('api.proposal');
	});
});
