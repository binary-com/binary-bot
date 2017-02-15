import CustomApi from 'binary-common-utils/lib/customApi'
import { expect } from 'chai'
import { observer } from 'binary-common-utils/lib/observer'
import Bot from '../'
import mockWebsocket from '../../../common/mock/websocket'

describe('Bot', () => {
  const option = {
    amount: 1,
    basis: 'stake',
    candleInterval: 60,
    contractTypes: '["DIGITEVEN", "DIGITODD"]',
    currency: 'USD',
    duration: 5,
    duration_unit: 't',
    symbol: 'R_100',
  }

  let api
  let bot
  const token = 'nmjKBPWxM00E8Fh'
  beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
    observer.eventActionMap = {}
    api = new CustomApi(observer, mockWebsocket)
    bot = new Bot(api)
    bot.initPromise.then(() => {
      done()
    })
  })
  it('initialize bot with the symbols', () => {
    const markets = bot.symbolApi.activeSymbols.getMarkets()
    expect(markets).to.be.an('Object')
      .and.to.have.property('forex')
  })
  describe('Start trading', () => {
    beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('test.waiting_for_purchase', () => {
        done()
      }, true)
      observer.register('bot.stop', () => {
        bot.start(token, option, () => observer.emit('test.waiting_for_purchase'), () => {
        })
      }, true)
      bot.stop()
    })
    it('start bot with the token, option', () => {
    })
  })
  describe('Start the trade without real after purchase and before purchase functions', () => {
    beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('bot.stop', () => {
        bot.initPromise.then(() => {
          observer.register('test.waiting_for_purchase', () => {
            done()
          }, true)
          bot.start(token, option, () => observer.emit('test.waiting_for_purchase'), () => {
          })
        })
      }, true)
      bot.stop()
    })
    it('It is possible to restart the trade', () => {
    })
  })
  describe('Start the trade with real after purchase and before purchase functions', () => {
    let finishedContractFromFinishFunction
    let finishedContractFromFinishSignal
    let numOfTicks = 0
    beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('bot.stop', () => {
        bot.initPromise.then(() => {
          observer.register('bot.finish', (finishedContract) => {
            finishedContractFromFinishSignal = finishedContract
          }, true)
          bot.start(token, option, function beforePurchase() {
            if (++numOfTicks === 3) {
              this.purchase('DIGITEVEN')
            }
          }, () => {}, function afterPurchase() {
            finishedContractFromFinishFunction = this.finishedContract
            done()
          })
        })
      }, true)
      bot.stop()
    })
    it('Calls the after purchase function when trade is finished', () => {
      expect(finishedContractFromFinishSignal).to.be.equal(finishedContractFromFinishFunction)
    })
  })
  describe('Trade again', () => {
    let finishedContractFromFinishFunction
    let finishedContractFromFinishSignal
    let numOfTicks = 0
    beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      bot.start(token, option, function afterPurchase() {
        if (++numOfTicks === 3) {
          this.purchase('DIGITEVEN')
        }
      }, () => {
      }, (_finishedContract) => {
        finishedContractFromFinishFunction = _finishedContract
      })
      observer.register('bot.stop', (_finishedContractFromFinishSignal) => {
        finishedContractFromFinishSignal = _finishedContractFromFinishSignal
        done()
      }, true)
      bot.stop()
    })
    it('Before Purchase decides to purchase the trade', () => {
    })
    it('Calls the after purchase function when trade is finished', () => {
      expect(finishedContractFromFinishSignal).to.be.equal(finishedContractFromFinishFunction)
    })
  })
})
