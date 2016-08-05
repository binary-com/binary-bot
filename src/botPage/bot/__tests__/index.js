'use strict';
import Bot from '../index';
import CustomApi from 'binary-common-utils/customApi';
import {expect} from 'chai';
import Observer from 'binary-common-utils/observer';
import {asyncChain} from 'binary-common-utils/tools';
import mockWebsocket from 'mock/websocket';

describe('Bot', function() {
	var observer;
	var option = {"amount":"1.00","basis":"stake","condition":"EVENODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"};

	var api;
	var bot;
	var token = 'c9A3gPFcqQtAQDW';
	before(function(done){
		
		observer = new Observer();
		api = new CustomApi(mockWebsocket);
		bot = new Bot(api);
		bot.initPromise.then(function(){
			done();
		});
	});
	it('initialize bot with the symbols', function(){
		var markets = bot.symbol.activeSymbols.getMarkets();
		expect(markets).to.be.an('Object')
			.and.to.have.property('forex');
	});
	describe('Bot cannot initialize with a fake token', function(){
		var error;
		before(function(done){
			
			observer.register('api.error', function(_error){
				error = _error;
				done();
			}, true);
			bot.start('FakeToken', null, null, null);
		});
		it('fake token should cause an error', function(){
			expect(error).to.have.deep.property('.code')
				.that.is.equal('InvalidToken');
		});
	});
	describe('Start trading', function(){
		before(function(done){
			
			observer.register('bot.waiting_for_purchase', function(){
				done();
			}, true);
			observer.register('bot.stop', function(){
				bot.start(token, option, null, null);
			}, true);
			bot.stop();
		});
		it('start bot with the token, option', function(){
		});
	});
	describe('Start the trade without real finish and strategy functions', function(){
		before(function(done){
			
			asyncChain()
			.pipe(function(chainDone){
				observer.register('bot.stop', function(){
					chainDone();
				}, true);
				bot.stop();
			})
			.pipe(function(chainDone){
				api.destroy();
				api = new CustomApi(mockWebsocket);
				bot = new Bot(api);
				bot.initPromise.then(function(){
					done();
				});
			})
			.pipe(function(chainDone){
				observer.register('bot.waiting_for_purchase', function(){
					chainDone();
				}, true);
				bot.start(token, option, null, null);
			})
			.pipe(function(chainDone){
				done();
			})
			.exec();			
		});
		it('It is possible to restart the trade', function(){
		});
	});
	describe('Start the trade with real finish and strategy functions', function(){
		var finishedContractFromFinishFunction;
		var finishedContractFromFinishSignal;
		var numOfTicks = 0;
		before(function(done){
			
			asyncChain()
			.pipe(function(chainDone){
				observer.register('bot.stop', function(){
					chainDone();
				}, true);
				bot.stop();
			})
			.pipe(function(chainDone){
				api.destroy();
				api = new CustomApi(mockWebsocket);
				bot = new Bot(api);
				bot.initPromise.then(function(){
					done();
				});
			})
			.pipe(function(chainDone){
				observer.register('bot.finish', function(_finishedContractFromFinishSignal){
					finishedContractFromFinishSignal = _finishedContractFromFinishSignal;
					chainDone();
				}, true);
				bot.start(token, option, function strategy(tick, proposals, _strategyCtrl){
					if ( ++numOfTicks === 3 ) {
						_strategyCtrl.purchase('DIGITEVEN');
					}
				}, function finish(_finishedContract){
					finishedContractFromFinishFunction = _finishedContract;
				});
			})
			.pipe(function(chainDone){
				done();
			})
			.exec();			
		});
		it('Strategy decides to purchase the trade', function(){
		});
		it('Calls the finish function when trade is finished', function(){
			expect(finishedContractFromFinishSignal).to.be.equal(finishedContractFromFinishFunction);
		});
	});
	describe('Trade again', function(){
		var finishedContractFromFinishFunction;
		var finishedContractFromFinishSignal;
		var numOfTicks = 0;
		before(function(done){
			
			bot.start(token, option, function strategy(tick, proposals, _strategyCtrl){
				if ( ++numOfTicks === 3 ) {
					_strategyCtrl.purchase('DIGITEVEN');
				}
			}, function finish(_finishedContract){
				finishedContractFromFinishFunction = _finishedContract;
			});
			asyncChain()
			.pipe(function(chainDone){
				observer.register('bot.stop', function(_finishedContractFromFinishSignal){
					finishedContractFromFinishSignal = _finishedContractFromFinishSignal;
					chainDone();
				}, true);
				bot.stop();
			})
			.pipe(function(chainDone){
				done();
			})
			.exec();			
		});
		it('Strategy decides to purchase the trade', function(){
		});
		it('Calls the finish function when trade is finished', function(){
			expect(finishedContractFromFinishSignal).to.be.equal(finishedContractFromFinishFunction);
		});
	});
	after(function(){
		observer._destroy();
		api.destroy();
	});
});
