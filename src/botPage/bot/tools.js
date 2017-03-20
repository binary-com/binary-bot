import { Map } from 'immutable'
import { getUTCTime } from 'binary-common-utils/lib/tools'

export const noop = () => {}

export const tradeOptionToProposal = tradeOption =>
  tradeOption.contractTypes.map(type =>
    Object.assign({
      duration_unit: tradeOption.duration_unit,
      basis: tradeOption.basis,
      currency: tradeOption.currency,
      symbol: tradeOption.symbol,
      duration: tradeOption.duration,
      amount: tradeOption.amount.toFixed(2),
      contract_type: type,
    },
    'prediction' in tradeOption && {
      barrier: tradeOption.prediction,
    },
    'barrierOffset' in tradeOption && {
      barrier: tradeOption.barrierOffset,
    },
    'secondBarrierOffset' in tradeOption && {
      barrier2: tradeOption.secondBarrierOffset,
    }))

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

export const subscribeToStream = (observer, name, respHandler, request,
  registerOnce, type, unregister) =>
  new Promise((resolve) => {
    observer.register(
      name, (...args) => {
        respHandler(...args)
        resolve()
      }, registerOnce, type && { type, unregister }, true)
    request()
  })

export const registerStream = (observer, name, cb) => {
  if (observer.isRegistered(name)) {
    return
  }
  observer.register(name, cb)
}

export const doUntilDone =
  (f, types = [], maxTries = 3) => new Promise(resolve => {
    let count = 0
    const repeat = e => {
      if ((e && !types.concat('CallError').includes(e.name)) ||
        count++ === maxTries) {
        throw e
      }

      const promise = f()

      if (promise) {
        promise.then(resolve).catch(repeat)
      } else {
        resolve()
      }
    }
    repeat()
  })

const toFixedTwo = num => +(num).toFixed(2)

export const addFixed = (a, b) => toFixedTwo(+a + (+b))

export const subtractFixed = (a, b) => toFixedTwo(+a - (+b))

export const createDetails = (contract) => {
  const profit = subtractFixed(contract.sell_price, contract.buy_price)
  const result = (profit < 0) ? 'loss' : 'win'

  return [
    contract.transaction_ids.buy, (+contract.buy_price),
    (+contract.sell_price), profit, contract.contract_type,
    getUTCTime(new Date(parseInt(`${contract.entry_tick_time}000`, 10))),
    (+contract.entry_tick),
    getUTCTime(new Date(parseInt(`${contract.exit_tick_time}000`, 10))),
    (+contract.exit_tick),
    (+((contract.barrier) ? contract.barrier : 0)),
    result,
  ]
}
