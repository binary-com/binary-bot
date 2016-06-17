var tools = require('../tools');
var expect = require('chai').expect;
require('../browser');

describe('Misc Tools', function(){
	describe('asyncChain function', function(){
		var zeroToHundred = [];
		for (var i=0; i<100; i++) {
			zeroToHundred.push(i);
		}
		var asyncResult = [];
		before(function(finish){
			this.timeout('1000');
			var chain = tools.asyncChain();
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
			queryString = tools.parseQueryString();
		});
		it('parseQueryString functions detects queryString existance correctly', function(){
			expect(queryString).to.be.empty;
		});
	});
	describe('getObjectValue', function(){
		it('getObjectValue gets the value of an object with one attribute', function(){
			var obj = {key: 'value'};
			expect(tools.getObjectValue(obj)).to.be.equal('value');
		});
	});
	describe('getObjectKey', function(){
		it('getObjectKey gets the key of an object with one attribute', function(){
			var obj = {key: 'value'};
			expect(tools.getObjectKey(obj)).to.be.equal('key');
		});
	});
	describe('copyAttributeIfExists', function(){
		it('copyAttributeIfExists copies attribute of one object to another', function(){
			var obj1 = {key: 'value'};
			var obj2 = {key2: 'value2'};
			tools.copyAttributeIfExists(obj1, obj2, 'key2');
			expect(obj1.key2).to.be.ok;
		});
	});
	describe('getUTCTime', function(){
		it('getUTCTime gets the current UTC time with format HH:MM:SS', function(){
			var date = new Date('1990-01-01T01:11:10.000Z');
			expect(tools.getUTCTime(date)).to.be.equal('01:11:10');
		});
	});
});
describe('Xml Tools', function(){
	var marketsObj = {};
	var marketsXml = null;
	var marketsXmlStr = '';
	before(function(){
		markets = {
			random: {
				name: 'Random',
				submarkets: {
					indices: {
						name: 'indices',
						symbols: {
							r_100: {
								display: 'Random 100'
							}
						}
					}
				}
			}
		};
	});
	it('createXmlFromMarket should convert market to xml string', function(){
		marketsXmlStr = tools.createXmlFromMarket(markets);
		expect(marketsXmlStr).to.be.a('string');
	});
	it('strToXml should convert market to xml', function(){
		marketsXml = tools.strToXml(marketsXmlStr);
		expect(marketsXml).to.have.property('childNodes')
		.that.has.property('0')
		.that.satisfy(function(dom){return dom.getAttribute('name') === 'Markets';});
	});
	it('xmlToStr should convert market xml back to string', function(){
		var newMarketStr = tools.xmlToStr(marketsXml);
		expect(newMarketStr).to.be.equal(marketsXmlStr);
	});
});