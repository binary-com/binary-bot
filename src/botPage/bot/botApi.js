import { observer } from 'binary-common-utils/lib/observer'
import { bot } from './'
import { noop } from './tools'

export default {
  start: (...args) => bot.start(...args),
  purchase: (...args) => bot.purchase.purchase(...args),
  getContract: (...args) => bot.purchase.getContract(...args),
  isSellAvailable: (...args) => bot.purchase.isSellAvailable(...args),
  sellAtMarket: (...args) => bot.purchase.sellAtMarket(...args),
}

export const initPromise = bot.initPromise

export const wait = arg => (
  typeof arg === 'string' ?
    new Promise(r => observer.register(arg, (...args) => r(...args), true),
      observer.unregisterAll(arg)) :
    new Promise(r => setTimeout(() => r(), arg), noop)
)
