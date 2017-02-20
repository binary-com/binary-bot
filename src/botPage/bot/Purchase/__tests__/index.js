import CustomApi from 'binary-common-utils/lib/customApi'
import { expect } from 'chai'
import Observer from 'binary-common-utils/lib/observer'
import ws from 'ws'
import Purchase from '../'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 12000 * 2

const ticksObj = {
  ticks: [{
    epoch: 'some time',
    quote: 1,
  }, {
    epoch: 'some time',
    quote: 2,
  }],
}

const observer = new Observer()

class CM {
  setContext(scope, v) {
    this.data = { ticksObj: v }
  }
  execContext(scope, v) {
    this.data.proposals = v
    this.p({ scope, data: this.data })
  }
  watch() {
    return new Promise(r => {
      this.p = r
    })
  }
}

describe('Purchase', () => {
  const api = new CustomApi(observer, ws)
  const $scope = { observer, api, CM: new CM() }
  const proposals = []
  let firstAttempt = true
  let purchase
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
  beforeAll(() => {
    purchase = new Purchase($scope)
    $scope.CM.watch('before')
      .then(c => c.scope === 'before' && beforePurchase(c.data))
    $scope.CM.setContext('shared', ticksObj)
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
      api.authorize('Xkq6oGFEHh6hJH8')
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
      $scope.CM.watch('before').then(c => c.scope === 'before' && beforePurchase(c.data))
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
      observer.register('trade.finish', (_finishedContract) => {
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
