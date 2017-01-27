import CustomApi from 'binary-common-utils/lib/customApi'
import { expect } from 'chai'
import { observer } from 'binary-common-utils/lib/observer'
import ws from 'ws'
import Trade from '../Trade'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000

describe('Trade', () => {
  let api
  let trade
  let proposal
  let finishedContract
  beforeAll(() => {
    observer.eventActionMap = {}
    api = new CustomApi(ws)
    trade = new Trade(api)
  })
  describe('Purchasing...', () => {
    let purchasedContract
    beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('api.authorize', () => {
        observer.register('api.proposal', (_proposal) => {
          proposal = _proposal
          observer.register('trade.purchase', r => {
            purchasedContract = r.purchasedContract
            done()
          }, true)
          trade.purchase(proposal)
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
      api.authorize(process.env.TESTINGTOKEN)
    })
    it('Purchased the proposal successfuly', () => {
      expect(purchasedContract).to.have.property('longcode')
        .that.is.equal('Win payout if the last digit'
        + ' of Volatility 100 Index is odd after 5 ticks.')
    })
  })
  describe('Getting updates', () => {
    const contractUpdates = []
    beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('trade.finish', (_contract) => {
        finishedContract = _contract
        done()
      }, true)
      observer.register('trade.update', (contractUpdate) => {
        contractUpdates.push(contractUpdate)
      })
    })
    it('Emits the update signal', () => {
      observer.unregisterAll('trade.update')
    })
  })
  describe('Calling finish', () => {
    it('Emits the finish signal', () => {
      expect(finishedContract).to.have.property('sell_price')
        .that.satisfy((el) => !isNaN(el))
    })
  })
})
