'use strict';
import {asyncChain} from 'binary-common-utils/tools';
import StrategyCtrl from '../strategyCtrl';
import ws from 'mock/websocket';
import CustomApi from 'binary-common-utils/customApi';
import {expect} from 'chai';
import Observer from 'binary-common-utils/observer';
describe('StrategyCtrl', function() {
	var observer;
	var api;
	var proposals = [];
	var firstAttemptDetected = true;
	var strategyCtrl;
	before(function(){
		observer = new Observer();
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
		strategyCtrl = new StrategyCtrl(api, strategy);
	});
	describe('Make the strategy ready...', function(){
		before(function(done){
			
			observer.register('strategy.ready', function() {
				done();
			}, true);
			observer.register('api.proposal', function(_proposal){
				proposals.push(_proposal);
				strategyCtrl.updateProposal(_proposal);
			});
			asyncChain()
			.pipe(function(chainDone){
				observer.register('api.authorize', function(){
					chainDone();
				}, true);
				api.authorize('c9A3gPFcqQtAQDW');
			})
			.pipe(function(chainDone){
				observer.register('api.proposal', function (_proposal){
					chainDone();
				}, true);
				api.proposal({"amount":"1.00","basis":"stake","contract_type":"DIGITODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
			})
			.pipe(function(chainDone){
				observer.register('api.proposal', function (_proposal){
					chainDone();
				}, true);
				api.proposal({"amount":"1.00","basis":"stake","contract_type":"DIGITEVEN","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
			})
			.exec();
		});
		it('Strategy gets ready when two proposals are available', function(){
		});
	});
	describe('Adding the ticks to the strategy...', function(){
		var strategyArgs;
		before(function(done){
			observer.register('test.strategy', function (_strategyArgs) {
				strategyArgs = _strategyArgs;
				done();
			}, true);
			strategyCtrl.updateTicks([{epoch: 'some time', quote: 1}, {epoch: 'some time', quote: 2}]);
		});
		it('strategyCtrl passes ticks and send the proposals if ready', function(){
			expect(strategyArgs.ticks.ticks.slice(-1)[0]).to.have.property('epoch');
			expect(strategyArgs).to.have.deep.property('.proposals[0].longcode')
				.that.is.equal('Win payout if the last digit of Volatility 100 Index is odd after 5 ticks.');
		});
	});
	describe('Giving a new proposal', function(){
		var strategyArgs;
		before(function(done){
			observer.register('test.strategy', function (_strategyArgs) {
				strategyArgs = _strategyArgs;
				done();
			}, true);
			strategyCtrl.updateProposal(proposals[0]);
			strategyCtrl.updateTicks([{epoch: 'some time', quote: 1}, {epoch: 'some time', quote: 2}]);
		});
		it('strategy can check if the proposals are ready', function(){
			expect(strategyArgs.ticks.ticks.slice(-1)[0]).to.have.property('epoch');
			expect(strategyArgs).to.have.deep.property('.proposals').not.to.be.ok;
		});
	});
	describe('Waiting for strategy to purchase the contract', function(){
		before(function(done){
			observer.register('test.purchase', function(){
				done();
			}, true);
			strategyCtrl.updateProposal(proposals[1]);
			strategyCtrl.updateTicks([{epoch: 'some time', quote: 1}, {epoch: 'some time', quote: 2}]);
		});
		it('strategy will buy the proposal whenever decided', function(){
		});
	});
	describe('Waiting for purchase to be finished', function(){
		var finishedContract;
		before(function(done){
			
			observer.register('strategy.finish', function(_finishedContract){
				finishedContract = _finishedContract;
				done();
			}, true);
			strategyCtrl.updateTicks([{epoch: 'some time', quote: 1}, {epoch: 'some time', quote: 2}]);
		});
		it('finish is called whenever the purchase is finished', function(){
			expect(finishedContract).to.have.property('sell_price')
				.that.satisfy(function(price){return !isNaN(price);});
		});
	});
	after(function(){
		strategyCtrl.destroy();
		observer._destroy();
	});
});
