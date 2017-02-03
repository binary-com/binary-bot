import { observer } from 'binary-common-utils/lib/observer'
import {
  number as expectNumber,
  barrierOffset as expectBarrierOffset,
} from '../../common/expect'

const isRegistered = name => observer.isRegistered(name)

export const subscribeToStream =
  (name, respHandler, request, registerOnce, type, unregister) =>
    new Promise((resolve) => {
      observer.register(
        name, (...args) => {
          respHandler(...args)
          resolve()
        }, registerOnce, type && { type, unregister }, true)
      request()
    })


export const registerStream = (name, cb) => {
  if (isRegistered(name)) {
    return
  }
  observer.register(name, cb)
}

export const noop = e => e

export const tradeOptionToProposal = (tradeOption, otherOptions) =>
  Object.assign({
      duration_unit: tradeOption.duration_unit,
      basis: tradeOption.basis,
      currency: tradeOption.currency,
      symbol: tradeOption.symbol,
      duration: expectNumber('duration', tradeOption.duration),
      amount: expectNumber('amount', tradeOption.amount).toFixed(2),
    },
    'prediction' in tradeOption && {
      barrier: expectNumber('prediction', tradeOption.prediction),
    },
    'barrierOffset' in tradeOption && {
      barrier: expectBarrierOffset(tradeOption.barrierOffset),
    },
    'secondBarrierOffset' in tradeOption && {
      barrier2: expectBarrierOffset(tradeOption.secondBarrierOffset),
    }, otherOptions,
  )

export const getDirection = ticks => {
  const length = ticks.length
  const [tick1, tick2] = ticks.slice(-2)

  let direction = ''
  if (length >= 2) {
    direction = tick1.quote > tick2.quote ? 'rise' : direction
    direction = tick1.quote < tick2.quote ? 'fall' : direction
  }

  return direction
}

