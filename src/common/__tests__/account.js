require('../browser');
var storageManager = require('../storageManager');
var account = require('../account');
var expect = require('chai').expect;

describe('Account', function(){
	var callbackResult;
	before(function(done){
		this.timeout('3000');
		localStorage.tokenList = [
			{
				account_name: 'Real Account',
				token: 'c9A3gPFcqQtAQDW'
			}
		];
		account.addTokenIfValid('FakeToken', function(result){
			callbackResult = result;
			done();
		});
	});
	it('callback result should be error', function(){
		expect(callbackResult).to.be.a('string')
			.and.to.be.equal('Error');
	});
});
