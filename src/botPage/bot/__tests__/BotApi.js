import { expect } from 'chai'
import CustomApi from 'binary-common-utils/lib/customApi'
import Observer from 'binary-common-utils/lib/observer'
import WebSocket from 'ws'
import BotApi from '../BotApi'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000

const observer = new Observer()
const api = (new CustomApi(observer, null, null, new WebSocket(
  process.env.ENDPOINT ||
    'wss://ws.binaryws.com/websockets/v3?l=en&app_id=0')))
const $scope = { observer, api }

const botApi = new BotApi($scope)

const Bot = botApi.getInterface()

const { isInside, wait, alert } = Bot

describe('BotApi', () => {
  it('alert should not be native', () => {
    expect(alert.toString().includes('native')).equal(false)
  })
  it('isInside should check if the api is inside the context', () => {
    expect(isInside('before')).equal(false)
  })
  describe('Bot can be started correctly', () => {
    let context

    beforeAll((done) => {
      Bot.start('Xkq6oGFEHh6hJH8', {
        amount: 1,
        basis: 'stake',
        candleInterval: 60,
        contractTypes: '["DIGITEVEN", "DIGITODD"]',
        currency: 'USD',
        duration: 5,
        duration_unit: 't',
        symbol: 'R_100',
      })

      wait('CONTEXT').then(c => (context = c))

      observer.register('CONTINUE', done, true)
    })

    it('context is inside before', () => {
      expect(isInside('before')).equal(true)
    })

    it('context is received correctly', () => {
      expect(context.scope).equal('before')
    })
  })
})
