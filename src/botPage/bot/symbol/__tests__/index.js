/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import CustomApi from 'binary-common-utils/lib/customApi'
import ws from '../../../../common/mock/websocket'
import _Symbol from '../index'

describe('symbol', () => {
  const api = new CustomApi(ws)
  describe('Error Handling', () => {
    it('initializing is needed for symbol functions', () => {
      expect(() => {
        _Symbol.getAllowedConditions()
      }).to.throw(Error)
      expect(() => {
        _Symbol.isConditionAllowedInSymbol()
      }).to.throw(Error)
      expect(() => {
        _Symbol.getConditionName()
      }).to.throw(Error)
      expect(() => {
        _Symbol.getCategoryNameForCondition()
      }).to.throw(Error)
      expect(() => {
        _Symbol.getAllowedCategoryNames()
      }).to.throw(Error)
    })
  })
  describe('Checking functions', () => {
    let symbol
    before(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      symbol = new _Symbol(api)
      symbol.initPromise.then(() => {
        done()
      })
    })
    it('getAllowedCategoryNames returns allowed category names', () => {
      expect(symbol.getAllowedCategoryNames('r_100')).to.be.ok
        .and.to.have.all.members(['Up/Down', 'Digits', 'Asians',
        'Touch/No Touch', 'Ends In/Out', 'Stays In/Goes Out'])
      expect(symbol.getAllowedCategoryNames('FAKE')).to.be.empty
    })
    it('getCategoryNameForCondition returns category name of a condition', () => {
      expect(symbol.getCategoryNameForCondition('risefall'))
        .to.be.equal('Up/Down')
    })
    it('getConditionName returns name of a condition', () => {
      expect(symbol.getConditionName('risefall'))
        .to.be.equal('Rise/Fall')
    })
    it('isConditionAllowedInSymbol returns true if a condition is allowed in a symbol', () => {
      expect(symbol.isConditionAllowedInSymbol('r_100', 'risefall'))
        .to.be.ok
      expect(symbol.isConditionAllowedInSymbol('frxeurusd', 'asians'))
        .not.to.be.ok
      expect(symbol.isConditionAllowedInSymbol('fake', 'asians'))
        .not.to.be.ok
      expect(symbol.isConditionAllowedInSymbol('frxeurusd', 'fake'))
        .not.to.be.ok
    })
  })
  after(() => {
    api.destroy()
  })
})
