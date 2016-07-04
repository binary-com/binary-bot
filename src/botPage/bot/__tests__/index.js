require('app-module-path').addPath(__dirname + '/../../../');
require('common/browser');


var Bot = require('../index');
var expect = require('chai').expect;
var observer = require('common/observer');
var asyncChain = require('common/tools').asyncChain;

describe('Bot', function() {
	var bot;
	var token = 'c9A3gPFcqQtAQDW';
	observer.register('ui.error', function(error){
		console.log('error', error);
	});
	before(function(done){
		this.timeout('10000');
		bot = new Bot();
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
			this.timeout('5000');
			observer.registerOnce('ui.error', function(_error){
				error = _error;
				done();
			});
			bot.start('faketoken', null, null, null);
		});
		it('fake token should cause an error', function(){
			expect(error).to.have.property('code')
				.that.is.equal('InvalidToken');
		});
	});
	describe('Start trading', function(){
		before(function(done){
			this.timeout('5000');
			var options = [
				{"amount":"20.00","basis":"stake","contract_type":"DIGITODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"},
				{"amount":"20.00","basis":"stake","contract_type":"DIGITEVEN","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"}
			];
			observer.registerOnce('bot.waiting_for_purchase', function(){
				done();
			});
			observer.registerOnce('bot.stop', function(){
				bot.start(token, options, null, null);
			});
			bot.stop();
		});
		it('start bot with the token, options', function(){
		});
	});
	describe('Start the trade without real finish and strategy functions', function(){
		var finishedContract;
		before(function(done){
			this.timeout('10000');
			var options = [
				{"amount":"20.00","basis":"stake","contract_type":"DIGITODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"},
				{"amount":"20.00","basis":"stake","contract_type":"DIGITEVEN","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"}
			];
			asyncChain()
			.pipe(function(chainDone){
				observer.registerOnce('bot.stop', function(_finishedContract){
					finishedContract = _finishedContract;
					chainDone();
				});
				bot.stop();
			})
			.pipe(function(chainDone){
				observer.registerOnce('bot.waiting_for_purchase', function(){
					chainDone();
				});
				bot.start(token, options, null, null);
			})
			.pipe(function(chainDone){
				done();
			})
			.exec();			
		});
		it('It is possible to restart the trade', function(){
			expect(finishedContract).not.to.be.ok;
		});
	});
	describe('Start the trade with real finish and strategy functions', function(){
		var finishedContractFromFinishFunction;
		var finishedContractFromFinishSignal;
		var numOfTicks = 0;
		var options = [
			{"amount":"20.00","basis":"stake","contract_type":"DIGITODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"},
			{"amount":"20.00","basis":"stake","contract_type":"DIGITEVEN","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"}
		];
		before(function(done){
			this.timeout('10000');
			bot.start(token, options, function strategy(tick, proposals, _strategyCtrl){
				if ( ++numOfTicks === 3 ) {
					_strategyCtrl.purchase('DIGITEVEN');
				}
			}, function finish(_finishedContract){
				finishedContractFromFinishFunction = _finishedContract;
			});
			asyncChain()
			.pipe(function(chainDone){
				observer.registerOnce('bot.stop', function(_finishedContractFromFinishSignal){
					finishedContractFromFinishSignal = _finishedContractFromFinishSignal;
					chainDone();
				});
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
	describe('Trade again', function(){
		var finishedContractFromFinishFunction;
		var finishedContractFromFinishSignal;
		var numOfTicks = 0;
		var options = [
			{"amount":"20.00","basis":"stake","contract_type":"DIGITODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"},
			{"amount":"20.00","basis":"stake","contract_type":"DIGITEVEN","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"}
		];
		before(function(done){
			this.timeout('10000');
			bot.start(token, options, function strategy(tick, proposals, _strategyCtrl){
				if ( ++numOfTicks === 3 ) {
					_strategyCtrl.purchase('DIGITEVEN');
				}
			}, function finish(_finishedContract){
				finishedContractFromFinishFunction = _finishedContract;
			});
			asyncChain()
			.pipe(function(chainDone){
				observer.registerOnce('bot.stop', function(_finishedContractFromFinishSignal){
					finishedContractFromFinishSignal = _finishedContractFromFinishSignal;
					chainDone();
				});
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
});
