'use strict';
import {asyncChain} from 'binary-common-utils/tools';
import Ticktrade from '../';
import ws from 'mock/websocket';
import CustomApi from 'binary-common-utils/customApi';
import {expect} from 'chai';
import Observer from 'binary-common-utils/observer';

describe('TickTrade', function() {
	var observer;
	var api;
	var ticktrade;
	var proposal;
	var finishedContract;
	before(function(){
		observer = new Observer();
		api = new CustomApi(ws);
		ticktrade = new Ticktrade(api);
	});
	describe('Purchasing...', function(){
		var purchasedContract;
		before(function(done){
			
			asyncChain()
				.pipe(function(chainDone){
					api.authorize('c9A3gPFcqQtAQDW');
					observer.register('api.authorize', function(){
						chainDone();
					}, true);
				})
				.pipe(function(chainDone){
					observer.register('api.proposal', function(_proposal){
						proposal = _proposal;
						chainDone();
					}, true);
					api.proposal({"amount":"1.00","basis":"stake","contract_type":"DIGITODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
				})
				.pipe(function(chainDone){
					observer.register('api.buy', function(_purchasedContract){
						purchasedContract = _purchasedContract;
						done();
					}, true);
					ticktrade.purchase(proposal);
				})
				.exec();
		});
		it('Purchased the proposal successfuly', function(){
			expect(purchasedContract).to.have.property('longcode')
				.that.is.equal('Win payout if the last digit of Volatility 100 Index is odd after 5 ticks.');
		});
	});
	describe('Getting updates', function(){
		var contractUpdates = [];
		before(function(done){
			
			observer.register('trade.finish', function(_contract){
				finishedContract = _contract;
			}, true);
			observer.register('trade.update', function(contractUpdate){
				contractUpdates.push(contractUpdate);
				if (contractUpdates.slice(-1)[0].is_sold) {
					done();
				}
			});
		});
		it('Emits the update signal', function(){
			observer.unregisterAll('trade.update');
		});
	});
	describe('Calling finish', function(){
		it('Emits the finish signal', function(){
			expect(finishedContract).to.have.property('sell_price')
				.that.satisfy(function(el){return !isNaN(el);});
		});
	});
	after(function(){
		observer._destroy();
	});
});
