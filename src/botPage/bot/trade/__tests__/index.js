import CustomApi from 'binary-common-utils/lib/customApi'
import { expect } from 'chai'
import { observer } from 'binary-common-utils/lib/observer'
import ws from '../../../../common/mock/websocket'
import Trade from '../'

describe('Trade', () => {
  let api
  let trade
  let proposal
  let finishedContract
  before(() => {
    observer.eventActionMap = {}
    api = new CustomApi(ws)
    trade = new Trade(api)
  })
  describe('Purchasing...', () => {
    let purchasedContract
    before(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('api.authorize', () => {
        observer.register('api.proposal', (_proposal) => {
          proposal = _proposal
          observer.register('api.buy', (_purchasedContract) => {
            purchasedContract = _purchasedContract
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
      api.authorize('nmjKBPWxM00E8Fh')
    })
    it('Purchased the proposal successfuly', () => {
      expect(purchasedContract).to.have.property('longcode')
        .that.is.equal('Win payout if the last digit'
        + ' of Volatility 100 Index is odd after 5 ticks.')
    })
  })
  describe('Getting updates', () => {
    const contractUpdates = []
    before(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('trade.finish', (_contract) => {
        finishedContract = _contract
      }, true)
      observer.register('trade.update', (contractUpdate) => {
        contractUpdates.push(contractUpdate)
        if (contractUpdates.slice(-1)[0].is_sold) {
          done()
        }
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
  after(() => {
    trade.destroy()
    observer.destroy()
    api.destroy()
  })
})
