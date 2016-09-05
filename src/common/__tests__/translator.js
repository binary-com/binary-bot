/* eslint-disable import/no-extraneous-dependencies */
import { strToXml } from 'binary-common-utils/lib/tools';
import { expect } from 'chai';
import { translator } from '../translator';

describe('Translation', () => {
  describe('Translate Functions', () => {
    let toolbox;
    before(() => {
      toolbox = strToXml(`
				<category name="fake1" colour="15" i18n-text="Conditions">
					<category name="fake2" colour="15" i18n-text="Up/Down">
						<block type="risefall"></block>
					</category>
				</category>
					`, 'text/xml');
    });
    it('translateText', () => {
      expect(translator.translateText('Logic')).to.be.a('string')
        .and.to.be.equal('Logic');
    });
    it('translateXml', () => {
      expect(translator.translateXml(toolbox)).to.have.property('firstChild')
        .that.satisfy((dom) => dom.getAttribute('name') === 'Conditions'
      )
        .and.to.have.property('childNodes')
        .that.has.property('1')
        .that.satisfy((dom) => dom.getAttribute('name') === 'Up/Down'
      );
    });
  });
});
