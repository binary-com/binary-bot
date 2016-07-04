require('app-module-path').addPath(__dirname + '/../../../../');
require('common/browser');


var asyncChain = require('common/tools').asyncChain;
var Ticktrade = require('../ticktrade');
var CustomApi = require('common/customApi');
var expect = require('chai').expect;
var observer = require('common/observer');

describe('TickTrade', function() {
	var api = new CustomApi();
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
				api.proposal({"amount":"20.00","basis":"stake","contract_type":"DIGITODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
				observer.registerOnce('api.proposal', function(_proposal){
					proposal = _proposal;
					chainDone();
				});
			})
			.pipe(function(chainDone){
				ticktrade.purchase(proposal);
				observer.registerOnce('api.buy', function(_purchasedContract){
					purchasedContract = _purchasedContract;
					done();
				});
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
		});
	});
	describe('Calling finish', function(){
		it('Emits the finish signal', function(){
			expect(finishedContract).to.have.property('sell_price')
				.that.satisfy(function(el){return !isNaN(el);});
		});
	});
	describe('Emits error', function(){
		var error;
		before(function(done){
			this.timeout('5000');
			ticktrade.purchase(proposal);
			observer.registerOnce('ui.error', function(_err){
				error = _err;
				done();
			});
		});
		it('trying to buy the proposal again is not allowed', function(){
			expect(error).to.have.property('code')
				.that.is.equal('InvalidContractProposal');
		});
	});
});
