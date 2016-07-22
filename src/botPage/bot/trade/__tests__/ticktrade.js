'use strict';
import {asyncChain} from 'binary-common-utils/tools';
import Ticktrade from '../ticktrade';
import ws from 'mock/websocket';
import CustomApi from 'binary-common-utils/customApi';
import {expect} from 'chai';
import Observer from 'binary-common-utils/observer';

var observer = new Observer();
describe('TickTrade', function() {
	var api = new CustomApi(ws);
	var ticktrade = new Ticktrade(api);
	var proposal;
	var finishedContract;
	describe('Purchasing...', function(){
		var purchasedContract;
		before(function(done){
			this.timeout('15000');
			asyncChain()
				.pipe(function(chainDone){
					api.authorize('c9A3gPFcqQtAQDW');
					observer.registerOnce('api.authorize', function(){
						chainDone();
					});
				})
				.pipe(function(chainDone){
					observer.registerOnce('api.proposal', function(_proposal){
						proposal = _proposal;
						chainDone();
					});
					api.proposal({"amount":"1.00","basis":"stake","contract_type":"DIGITODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
				})
				.pipe(function(chainDone){
					observer.registerOnce('api.buy', function(_purchasedContract){
						purchasedContract = _purchasedContract;
						done();
					});
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
			this.timeout('25000');
			observer.registerOnce('trade.finish', function(_contract){
				finishedContract = _contract;
			});
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
		observer.destroy();
	});
});
