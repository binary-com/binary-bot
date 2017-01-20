import { getUTCTime } from 'binary-common-utils/lib/tools'

const addToString = ohlc =>
  ohlc.map(o => Object.assign({
    toString: function repr() {
      return JSON.stringify(this)
    },
  }, o))

const createDetails = (contract) => {
  const profit = +(+(contract.sell_price) -
    (+(contract.buy_price))).toFixed(2)
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

const noop = e => e

export default class Context {
  constructor(beforePurchase, duringPurchase, afterPurchase, taList) {
    this.beforePurchaseFunc = beforePurchase || noop
    this.duringPurchaseFunc = duringPurchase || noop
    this.afterPurchaseFunc = afterPurchase || noop
    this.taList = taList || []
    this.contextToPass = { ticksObj: { ohlc: [], ticks: [] } }
  }
  addFunc(funcs) {
    Object.assign(this.contextToPass, funcs)
  }
  createTicks(ticksObj) {
    const { ohlc = [] } = ticksObj

    this.contextToPass.ticksObj =
      Object.assign({ ohlc: addToString(ohlc) }, ticksObj)
  }
  beforePurchase() {
    this.beforePurchaseFunc.call(this.contextToPass)
  }
  duringPurchase(openContract) {
    this.contextToPass.openContract = openContract
    this.duringPurchaseFunc.call(this.contextToPass)
  }
  afterPurchase(finishedContract) {
    this.contextToPass.finishedContract = finishedContract
    this.contextToPass.contractDetails = createDetails(finishedContract)
    this.afterPurchaseFunc.call(this.contextToPass)
  }
  tickAnalysis() {
    this.taList.forEach(ta => ta.call(this.contextToPass))
  }
  wrap(f) {
    return () => f.call(this.contextToPass)
  }
}
