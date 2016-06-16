var utils = require('../utils');
var expect = require('chai').expect;
require('./browser');

describe('Utils', function(){
	describe('asyncChain function', function(){
		var zeroToHundred = [];
		for (var i=0; i<100; i++) {
			zeroToHundred.push(i);
		}
		var asyncResult = [];
		before(function(finish){
			this.timeout('1000');
			var chain = utils.asyncChain();
			var iife = function(i){
				chain.pipe(function(done){
					setTimeout(function(){
						asyncResult.push(i);
						done();
					}, Math.random()*10);
				});
			};
			for (var i=0; i<100; i++) {
				iife(i);
			}
			chain.pipe(function(){
				finish();
			});
			chain.exec();
		});
		it('asyncChain functions are called subsequently', function(){
			expect(asyncResult).to.be.deep.equal(zeroToHundred);
		});
	});
	describe('parseQueryString function', function(){
		var queryString;
		before(function(){
			window.location.search = '?';
			queryString = utils.parseQueryString();
		});
		it('parseQueryString functions detects queryString existance correctly', function(){
			expect(queryString).to.be.empty;
		});
	});
});