var xml = require('../xml');
var expect = require('chai').expect;
require('../browser');

describe('Xml', function(){
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
		marketsXmlStr = xml.createXmlFromMarket(markets);
		expect(marketsXmlStr).to.be.a('string');
	});
	it('strToXml should convert market to xml', function(){
		marketsXml = xml.strToXml(marketsXmlStr);
		expect(marketsXml).to.have.property('childNodes')
		.that.has.property('0')
		.that.satisfy(function(dom){return dom.getAttribute('name') === 'Markets';});
	});
	it('xmlToStr should convert market xml back to string', function(){
		var newMarketStr = xml.xmlToStr(marketsXml);
		expect(newMarketStr).to.be.equal(marketsXmlStr);
	});
});
