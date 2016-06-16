var translator = require('../translator');
var xml = require('../xml');
var DOMParser = require('xmldom').DOMParser;
var expect = require('chai').expect;
require('./browser');

describe('Translation', function(){
	describe('Translate Functions', function(){
		var xml;
		before(function(){
			window = {
				location: {
					search: '',
					hash: '',
					pathname: '/',
					port: '',
					hostname: 'localhost.localdomain'
				}
			};
			localStorage = {};
			xml = new DOMParser().parseFromString('\
				<category name="fake1" colour="15" i18n-text="Conditions">\
					<category name="fake2" colour="15" i18n-text="Up/Down">\
						<block type="risefall"></block>\
					</category>\
				</category>\
					', 'text/xml');
			translator.init();
		});
		it('translateText', function(){
			expect(translator.translateText('Logic')).to.be.a('string')
				.and.to.be.equal('Logic');
		});
		it('translateXml', function(){
			expect(translator.translateXml(xml)).to.have.property('firstChild')
				.that.satisfy(function(dom){ return dom.getAttribute('name') === 'Conditions'; })
				.and.to.have.property('childNodes')
				.that.has.property('1')
				.that.satisfy(function(dom){ return dom.getAttribute('name') === 'Up/Down'; });
		});
	});
});