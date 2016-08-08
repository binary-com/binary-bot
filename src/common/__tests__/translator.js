'use strict';
import Translator from '../translator';
import tools from 'binary-common-utils/tools';
import {expect} from 'chai';

describe('Translation', function(){
	describe('Translate Functions', function(){
		var toolbox;
		var translator;
		before(function(){
			toolbox = tools.strToXml(`
				<category name="fake1" colour="15" i18n-text="Conditions">
					<category name="fake2" colour="15" i18n-text="Up/Down">
						<block type="risefall"></block>
					</category>
				</category>
					`, 'text/xml');
			translator = new Translator();
		});
		it('translateText', function(){
			expect(translator.translateText('Logic')).to.be.a('string')
				.and.to.be.equal('Logic');
		});
		it('translateXml', function(){
			expect(translator.translateXml(toolbox)).to.have.property('firstChild')
				.that.satisfy(function(dom){ return dom.getAttribute('name') === 'Conditions'; })
				.and.to.have.property('childNodes')
				.that.has.property('1')
				.that.satisfy(function(dom){ return dom.getAttribute('name') === 'Up/Down'; });
		});
	});
});
