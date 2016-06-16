var storageManager = require('../storageManager');
var expect = require('chai').expect;
require('./browser');

describe('StorageManager', function(){
	before(function(){
		storageManager.removeAllTokens();
	});
	describe('Error Handling', function(){
		it('addToken must have two arguments', function(){
			expect(function(){
				storageManager.addToken();
			}).to.throw(Error);
			expect(function(){
				storageManager.addToken('a');
			}).to.throw(Error);
			expect(function(){
				storageManager.addToken(null, 'a');
			}).to.throw(Error);
		});
	});
	describe('token retrieve functions when there is no token', function(){
		it('getTokenList', function(){
			expect(storageManager.getTokenList()).to.be.empty;
		});
		it('getToken', function(){
			expect(storageManager.getToken('faketoken')).to.be.empty;
		});
		it('findToken', function(){
			expect(storageManager.findToken('faketoken')).to.be.below(0);
		});
	});
	describe('token save/retrieve mechanism', function(){
		var realToken;
		before(function(){
			localStorage.tokenList = [
				{
					account_name: 'Real Account',
					token: 'RealToken'
				}
			];
		});
		it('getTokenList should not be empty', function(){
			expect(storageManager.getTokenList()).not.to.be.empty;
		});
		it('removeToken fake should not be able to remove real token', function(){
			storageManager.removeToken('FakeToken');
			expect(storageManager.getTokenList()).not.to.be.empty;
		});
		it('getToken should be get the real token', function(){
			expect(storageManager.getToken('RealToken')).to.be.an('Object')
				.that.has.keys(['account_name', 'token']);
			realToken = storageManager.getToken('RealToken');
		});
		it('removeToken real should be able to remove real token', function(){
			storageManager.removeToken('RealToken');
			expect(storageManager.getTokenList()).to.be.empty;
		});
		it('addToken should be able to add real token and findToken should find it', function(){
			storageManager.getTokenList(realToken.token, realToken.account_name);
			expect(storageManager.findToken('RealToken')).not.to.be.empty;
		});
		it('addToken should be able to add real token and findToken should find it', function(){
			storageManager.addToken(realToken.token, realToken.account_name);
			var tokenList = storageManager.getTokenList();
			expect(tokenList[storageManager.findToken('RealToken')])
				.to.be.deep.equal({
					account_name: 'Real Account',
					token: 'RealToken'
				});
		});
		it('removeAllTokens should remove all tokens and getToken should be empty', function(){
			storageManager.removeAllTokens();
			expect(storageManager.getToken('RealToken')).to.be.empty;
		});
	});
	describe('isDone functions', function(){
		it('isDone should be false at the beginning', function(){
			expect(storageManager.isDone('TokenTest')).not.to.be.ok;
		});
		it('setDone should make it true', function(){
			storageManager.setDone('TokenTest');
			expect(storageManager.isDone('TokenTest')).to.be.ok;
		});
		it('setNotDone should make it false again', function(){
			storageManager.setNotDone('TokenTest');
			expect(storageManager.isDone('TokenTest')).not.to.be.ok;
		});
		it('setNotDone should not make it true', function(){
			storageManager.setNotDone('TokenTest');
			expect(storageManager.isDone('TokenTest')).not.to.be.ok;
		});
		it('setDone a should not affect b', function(){
			storageManager.setDone('a');
			expect(storageManager.isDone('TokenTest')).not.to.be.ok;
		});
		it('setNotDone b should not affect a', function(){
			storageManager.setNotDone('TokenTest');
			expect(storageManager.isDone('a')).to.be.ok;
		});
	});
});