import { observer } from 'binary-common-utils/lib/observer'
import { bot } from './'
import { noop } from './tools'

let context

export default {
  start: (...args) => bot.start(...args),
  purchase: i => bot.purchase.purchase(Object.keys(context.data.proposals)[i]),
  getContract: (...args) => bot.purchase.getContract(...args),
  isSellAvailable: (...args) => bot.purchase.isSellAvailable(...args),
  sellAtMarket: (...args) => bot.purchase.sellAtMarket(...args),
}

export const initPromise = bot.initPromise

export const wait = arg => (
  typeof arg === 'string' ?
    new Promise(r => observer.register(arg, c => r(context = c), true),
      observer.unregisterAll(arg)) :
    new Promise(r => setTimeout(() => r(), arg), noop)
)

export const waitUntil = arg => new Promise(r => {
  const waitFor = c => {
    if (c.scope !== arg) {
      observer.unregister('CONTEXT', waitFor)
      r(context = c)
    }
  }

  observer.register('CONTEXT', waitFor)
})

export const isInside = scope => context.scope === scope
