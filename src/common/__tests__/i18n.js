import { expect } from 'chai';
import { translate, init, xml as translateXml } from '../i18n';

class Xml {
    constructor(el, children = {}) {
        this.el = el;
        this.children = children;
    }
    setAttribute(key, value) {
        this.el[key] = value;
    }
    getAttribute(key) {
        return this.el[key];
    }
    getElementsByTagName(key) {
        return this.children[key];
    }
}

const e1 = new Xml({
    name       : 'Some meaningless name',
    'i18n-text': 'Logic',
});

const e2 = new Xml({
    name: 'Static',
});

const dom = new Xml(
    {
        name: 'Main',
    },
    {
        category: {
            0     : e1,
            1     : e2,
            length: 2,
        },
    }
);

describe('i18n is able to', () => {
    describe('find the translation of a text without initializing', () => {
        it('Find translation of "Logic"', () => {
            expect(translate('Logic')).to.be.equal('Logic');
        });
    });

    describe('translate a text (de)', () => {
        beforeAll(() => init('de'));
        it('Find translation of "Logic"', () => {
            expect(translate('Logic')).to.be.equal('Logik');
        });
    });

    describe('translate an xml file (en)', () => {
        const expected = ['Logic', 'Static'];
        const result = [];

        beforeAll(() => {
            init('en');
            const translated = translateXml(dom);
            const elements = Array.from(translated.getElementsByTagName('category'));
            elements.forEach(el => result.push(el.getAttribute('name')));
        });
        it('Find translation of "Logic"', () => {
            expect(result).to.be.deep.equal(expected);
        });
    });

    describe('translate an xml file (id)', () => {
        const expected = ['Logik', 'Static'];
        const result = [];

        beforeAll(() => {
            init('de');
            const translated = translateXml(dom);
            const elements = Array.from(translated.getElementsByTagName('category'));
            elements.forEach(el => result.push(el.getAttribute('name')));
        });
        it('Find translation of "Logic"', () => {
            expect(result).to.be.deep.equal(expected);
        });
    });
});
