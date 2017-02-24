import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import { getUTCTime } from 'binary-common-utils/lib/tools'
import Bot from './'
import { translate } from '../../common/i18n'
import Indicators from './Indicators'
import { noop } from './tools'
import { sanitizeStart, expectPositiveInteger } from './sanitize'

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

export default class BotApi {
  constructor($scope) {
    this.bot = new Bot($scope)
    this.indicators = new Indicators($scope)
    this.CM = $scope.CM
    this.observer = $scope.observer
  }
  getInterface(name = 'Global') {
    return name === 'Bot' ? {
      ...this.getBotInterface(),
      ...this.getTicksInterface(),
      ...this.getToolsInterface(),
    } : {
      watch: (...args) => this.CM.watch(...args),
      isInside: (...args) => this.CM.isInside(...args),
      sleep: (...args) => this.sleep(...args),
      alert: (...args) => alert(...args), // eslint-disable-line no-alert
    }
  }
  sleep(arg = 1) {
    return new Promise(r => setTimeout(() => {
      r()
      setTimeout(() => this.observer.emit('CONTINUE'), 0)
    }, arg * 1000), noop)
  }
  getBotInterface() {
    const getDetail = i => createDetails(this.CM.getContext().data.contract)[i]

    return {
      start: (...args) => this.bot.start(...sanitizeStart(args)),
      stop: (...args) => this.bot.stop(...args),
      shouldRestartOnError: (...args) => this.bot.shouldRestartOnError(...args),
      purchase: option => this.bot.purchase.startPurchase(option),
      getContract: (...args) => this.bot.purchase.getContract(...args),
      getAskPrice: name => +(this.bot.purchase.getContract(name).ask_price),
      getPayout: name => +(this.bot.purchase.getContract(name).payout),
      isSellAvailable: () => this.bot.purchase.postPurchase.checkSellAvailable(),
      sellAtMarket: (...args) => this.bot.purchase.postPurchase.sellAtMarket(...args),
      getSellPrice: () =>
        +(((+this.CM.getContext().data.contract.bid_price) -
          (+this.CM.getContext().data.contract.buy_price)).toFixed(2)),
      isResult: result => (getDetail(10) === result),
      readDetails: i => getDetail(i - 1),
    }
  }
  getTicksInterface() {
    const getLastTick = () => this.getTicks().slice(-1)[0]

    return {
      getLastTick,
      getLastDigit: () => +(getLastTick().toFixed(this.getPipSize()).slice(-1)[0]),
      getOhlcFromEnd: (field, index = 1) => {
        const sanitizedIndex =
          expectPositiveInteger(index,
            translate('OHLC index must be a positive integer'))

        const lastOhlc = this.getOhlc().slice(-sanitizedIndex)[0]

        return field ? lastOhlc[field] : lastOhlc
      },
      getOhlc: (field) => this.getOhlc(field),
      getTicks: () => this.getTicks(),
      checkDirection: w => this.CM.getContext().data.ticksObj.direction === w,
    }
  }
  getToolsInterface() {
    return {
      ...this.getTimeInterface(),
      ...this.getCandleInterface(),
      ...this.getMiscInterface(),
      ...this.getIndicatorsInterface(),
    }
  }
  getTimeInterface() {
    return {
      getTime: () => parseInt((new Date().getTime()) / 1000, 10),
    }
  }
  getCandleInterface() {
    return {
      isCandleBlack: candle => candle && Object.keys(candle).length &&
        candle.close < candle.open,
      candleValues: (ohlc, field) => ohlc.map(o => o[field]),
      candleField: (candle, field) => candle[field],
    }
  }
  getMiscInterface() {
    return {
      notify: (...args) => globalObserver.emit('Notify', args),
      getTotalRuns: () => this.bot.getTotalRuns(),
      getBalance: type => this.bot.getBalance(type),
      getTotalProfit: () => this.bot.getTotalProfit(),
    }
  }
  getIndicatorsInterface() {
    return this.indicators.getInterface()
  }
  getOhlc(field) {
    const ohlc = this.CM.getContext().data.ticksObj.ohlc

    return field ? ohlc.map(o => o[field]) : ohlc
  }
  getTicks() {
    return this.CM.getContext().data.ticksObj.ticks.map(o => o.quote)
  }
  getPipSize() {
    return this.CM.getContext().data.ticksObj.pipSize
  }
}
