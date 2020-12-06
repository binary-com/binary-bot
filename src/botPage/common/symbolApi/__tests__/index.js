/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import _Symbol from '../index';
import { generateLiveApiInstance } from '../../../../common/appId';

describe('symbol', () => {
    const api = generateLiveApiInstance();
    describe('Checking functions', () => {
        let symbol;
        // eslint-disable-next-line prefer-arrow-callback
        beforeAll(function beforeAll(done) {
            symbol = new _Symbol(api);
            symbol.initPromise.then(() => {
                done();
            });
        });
        it('getAllowedCategoryNames returns allowed category names', () => {
            expect(symbol.getAllowedCategoryNames('r_100')).to.be.ok.and.to.have.all.members([
                'Up/Down',
                'Up/Down Equals',
                'Digits',
                'Asians',
                'Touch/No Touch',
                'Ends In/Out',
                'Stays In/Goes Out',
                'High/Low Ticks',
                'Reset Call/Reset Put',
                'Only Ups/Only Downs',
            ]);
            expect(symbol.getAllowedCategoryNames('FAKE')).to.be.empty;
        });
        it('getCategoryNameForCondition returns category name of a condition', () => {
            expect(symbol.getCategoryNameForCondition('risefall')).to.be.equal('Up/Down');
        });
        it('getConditionName returns name of a condition', () => {
            expect(symbol.getConditionName('risefall')).to.be.equal('Rise/Fall');
        });
        it('isConditionAllowedInSymbol returns true if a condition is allowed in a symbol', () => {
            expect(symbol.isConditionAllowedInSymbol('r_100', 'risefall')).to.be.ok;
            expect(symbol.isConditionAllowedInSymbol('frxeurusd', 'asians')).not.to.be.ok;
            expect(symbol.isConditionAllowedInSymbol('fake', 'asians')).not.to.be.ok;
            expect(symbol.isConditionAllowedInSymbol('frxeurusd', 'fake')).not.to.be.ok;
        });
    });
});
