import CustomApi from 'binary-common-utils/lib/customApi'
import { expect } from 'chai'
import { observer } from 'binary-common-utils/lib/observer'
import ws from 'ws'
import ContextManager from '../../ContextManager'
import Purchase from '../'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000

const ticksObj = {
  ticks: [{
    epoch: 'some time',
    quote: 1,
  }, {
    epoch: 'some time',
    quote: 2,
  }],
}

describe('Purchase', () => {
  let api
  const proposals = []
  let firstAttempt = true
  let purchase
  beforeAll(() => {
    api = new CustomApi(ws)
    const beforePurchase = context => {
      if (purchase.proposals) {
        if (firstAttempt) {
          firstAttempt = false
          observer.emit('test.beforePurchase', {
            ticksObj: context.ticksObj,
            proposals: purchase.proposals,
          })
        } else {
          observer.emit('test.purchase')
          purchase.purchase('DIGITEVEN')
        }
      } else {
        observer.emit('test.beforePurchase', {
          ticksObj: context.ticksObj,
          proposals: purchase.proposals,
        })
      }
    }
    observer.register('CONTEXT', context => context.scope === 'before' && beforePurchase(context.data))
    const CM = new ContextManager()
    purchase = new Purchase(api, CM)
    CM.setContext('shared', ticksObj)
  })
  describe('Make the beforePurchase ready...', () => {
    beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('api.proposal', (_proposal) => {
        proposals.push(_proposal)
        purchase.updateProposal(_proposal)
      })
      observer.register('api.authorize', () => {
        observer.register('api.proposal', () => {
          observer.register('api.proposal', () => {
            if (purchase.ready) {
              done()
            }
          }, true)
          api.proposal({
            amount: '1.00',
            basis: 'stake',
            contract_type: 'DIGITEVEN',
            currency: 'USD',
            duration: 5,
            duration_unit: 't',
            symbol: 'R_100',
          })
        }, true)
        api.proposal({
          amount: '1.00',
          basis: 'stake',
          contract_type: 'DIGITODD',
          currency: 'USD',
          duration: 5,
          duration_unit: 't',
          symbol: 'R_100',
        })
      }, true)
      api.authorize('nmjKBPWxM00E8Fh')
    })
    it('Strategy gets ready when two proposals are available', () => {
    })
  })
  describe('Adding the ticks to the purchase...', () => {
    let beforePurchaseArgs
    beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('test.beforePurchase', (_beforePurchaseArgs) => {
        beforePurchaseArgs = _beforePurchaseArgs
        done()
      }, true)
      purchase.updateTicks(ticksObj)
    })
    it('purchase passes ticks and send the proposals if ready', () => {
      expect(beforePurchaseArgs.ticksObj.ticks.slice(-1)[0]).to.have.property('epoch')
      expect(beforePurchaseArgs).to.have.deep.property('.proposals.DIGITODD.longcode')
        .that.is.equal('Win payout if the last digit of Volatility 100 Index is'
        + ' odd after 5 ticks.')
    })
  })
  describe('Waiting for beforePurchase to purchase the contract', () => {
    beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('test.purchase', () => {
        done()
      }, true)
      purchase.updateProposal(proposals[1])
      purchase.updateTicks()
    })
    it('beforePurchase will buy the proposal whenever decided', () => {
    })
  })
  describe('Waiting for purchase to be finished', () => {
    let finishedContract
    beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('purchase.finish', (_finishedContract) => {
        finishedContract = _finishedContract
        done()
      }, true)
      purchase.updateTicks()
    })
    it('afterPurchase is called whenever the purchase is finished', () => {
      expect(finishedContract).to.have.property('sell_price')
        .that.satisfy((price) => !isNaN(price))
    })
  })
})
