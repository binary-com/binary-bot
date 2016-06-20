require('app-module-path').addPath(__dirname + '/../../../');
require('common/browser');

var CustomApi = require('../customApi');
var expect = require('chai').expect;
var observer = require('common/observer');

describe('CustomApi', function() {
	var api;
	before(function(){
		api = new CustomApi({ websocket: require('ws') });
	});
	describe('authorize', function(){
		var message;
		before(function(done){
			this.timeout('5000');
			observer.register('ui.error', function(error) {
				message = error;
				done();
			});
			api.authorize('FakeToken');
		});
		it('authorize return invalid token', function() {
			expect(message).to.have.property('code')
				.that.be.equal('InvalidToken');
		});
	});
	describe('history', function(){
		var message1;
		var message2;
		before(function(done){
			this.timeout('5000');
			observer.register('bot.history', function(data) {
				message1 = data;
			});
			observer.register('bot.tick', function(data) {
				message2 = data;
				done();
			});
			api.history('R_100', {
				"end": "latest",
				"count": 600,
				"subscribe": 1
			});
		});
		it('history return history data', function() {
			expect(message1).to.be.an('Array')
				.that.has.deep.property('.length')
				.that.be.equal(600);
			expect(message2).to.have.all.keys(['epoch', 'quote']);
		});
	});
	var authorizationRequiredFor = [
		'transaction',
		'proposal_open_contract',
		'proposal',
		'buy',
		'balance',
	];
	for ( var i in authorizationRequiredFor ) {
		var request = authorizationRequiredFor[i];
		describe(request, function(){
			var message;
			before(function(done){
				this.timeout('5000');
				observer.register('ui.error', function(error) {
					message = error;
					done();
				});
				api[request]();
			});
			it(request + ' return AuthorizationRequired', function() {
				expect(message).to.have.property('code')
					.that.be.equal('AuthorizationRequired');
			});
		});
	}
	
});