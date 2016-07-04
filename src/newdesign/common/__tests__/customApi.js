require('app-module-path').addPath(__dirname + '/../../../');
require('../browser');

var CustomApi = require('../customApi');
var expect = require('chai').expect;
var observer = require('../observer');

describe('CustomApi', function() {
	var api;
	before(function(){
		api = new CustomApi();
	});
	describe('authorize', function(){
		var message;
		before(function(done){
			this.timeout('5000');
			observer.registerOnce('ui.error', function(error) {
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
			observer.registerOnce('api.history', function(data) {
				message1 = data;
			});
			observer.registerOnce('api.tick', function(data) {
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
	describe('buy', function(){
		var message;
		before(function(done){
			this.timeout('5000');
			observer.registerOnce('ui.error', function(error) {
				message = error;
				done();
			});
			api.buy('uw2mk7no3oktoRVVsB4Dz7TQnFfABuFDgO95dlxfMxRuPUsz', 100);
		});
		it('buy return AuthorizationRequired', function() {
			expect(message).to.have.property('code')
				.that.be.equal('AuthorizationRequired');
		});
	});
});