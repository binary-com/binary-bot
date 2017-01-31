import { Map } from 'immutable'
import {
  number as expectNumber,
  barrierOffset as expectBarrierOffset,
} from '../../common/expect'

export const noop = () => {}

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

export const getPipSizes = symbols =>
  symbols.reduce((s, i) =>
    s.set(i.symbol, +(+i.pip).toExponential().substring(3)), new Map()).toObject()

