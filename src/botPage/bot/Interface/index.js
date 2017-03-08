import { getUTCTime } from 'binary-common-utils/lib/tools'
import TradeEngine from '../TradeEngine'
import { noop } from '../tools'
import { sanitizeStart } from '../sanitize'
import TicksInterface from './TicksInterface'
import ToolsInterface from './ToolsInterface'

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

/**
 * Bot - Bot Module
 * @namespace Bot
 */

export default class Interface extends ToolsInterface(TicksInterface(class {})) {
  constructor($scope) {
    super()
    this.tradeEngine = new TradeEngine($scope)
    this.observer = $scope.observer
  }
  getInterface(name = 'Global') {
    return name === 'Bot' ? {
      ...this.getBotInterface(),
      ...this.getTicksInterface(),
      ...this.getToolsInterface(),
    } : {
      watch: (...args) => this.tradeEngine.watch(...args),
      isInside: (...args) => this.tradeEngine.isInside(...args),
      sleep: (...args) => this.sleep(...args),
      alert: (...args) => alert(...args), // eslint-disable-line no-alert
    }
  }
  getBotInterface() {
    const getDetail = i => createDetails(this.tradeEngine.getData().data.contract)[i]

    return {
      start: (...args) => this.tradeEngine.start(...sanitizeStart(args)),
      stop: (...args) => this.tradeEngine.stop(...args),
      purchase: option => this.tradeEngine.purchase(option),
      getContract: (...args) => this.tradeEngine.purchase.getContract(...args),
      getAskPrice: name => +(this.tradeEngine.purchase.getContract(name).ask_price),
      getPayout: name => +(this.tradeEngine.purchase.getContract(name).payout),
      isSellAvailable: () => this.tradeEngine.isSellAvailable,
      sellAtMarket: () => this.tradeEngine.sellAtMarket(),
      getSellPrice: () =>
        +(((+this.tradeEngine.getData().data.contract.bid_price) -
          (+this.tradeEngine.getData().data.contract.buy_price)).toFixed(2)),
      isResult: result => (getDetail(10) === result),
      readDetails: i => getDetail(i - 1),
    }
  }
  sleep(arg = 1) {
    return new Promise(r => setTimeout(() => {
      r()
      setTimeout(() => this.observer.emit('CONTINUE'), 0)
    }, arg * 1000), noop)
  }
}
