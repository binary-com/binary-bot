import sma, {
  simpleMovingAverageArray as smaa,
} from 'binary-indicators/lib/simpleMovingAverage'
import ema, {
  exponentialMovingAverageArray as emaa,
} from 'binary-indicators/lib/exponentialMovingAverage'
import bb, {
  bollingerBandsArray as bba,
} from 'binary-indicators/lib/bollingerBands'
import rsi, {
  relativeStrengthIndexArray as rsia,
} from 'binary-indicators/lib/relativeStrengthIndex'
import macda from 'binary-indicators/lib/macd'
import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import { getUTCTime } from 'binary-common-utils/lib/tools'
import TradeEngine from './TradeEngine'
import { translate } from '../../common/i18n'
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

export default class Interface {
  constructor($scope) {
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
  sleep(arg = 1) {
    return new Promise(r => setTimeout(() => {
      r()
      setTimeout(() => this.observer.emit('CONTINUE'), 0)
    }, arg * 1000), noop)
  }
  getBotInterface() {
    const getDetail = i => createDetails(this.tradeEngine.getData().data.contract)[i]

    return {
      start: (...args) => this.tradeEngine.start(...sanitizeStart(args)),
      stop: (...args) => this.tradeEngine.stop(...args),
      purchase: option => this.tradeEngine.requestPurchase(option),
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
      checkDirection: w => this.tradeEngine.getData().data.ticksObj.direction === w,
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
      getTotalRuns: () => this.tradeEngine.getTotalRuns(),
      getBalance: type => this.tradeEngine.getBalance(type),
      getTotalProfit: () => this.tradeEngine.getTotalProfit(),
    }
  }
  getOhlc(field) {
    const ohlc = this.tradeEngine.getData().data.ticksObj.ohlc

    return field ? ohlc.map(o => o[field]) : ohlc
  }
  getTicks() {
    return this.tradeEngine.getData().data.ticksObj.ticks.map(o => o.quote)
  }
  getPipSize() {
    return this.tradeEngine.getData().data.ticksObj.pipSize
  }
  decorate(f, input, config, ...args) {
    const pipSize = this.CM.getData().data.ticksObj.pipSize
    return f(input, Object.assign({ pipSize }, config), ...args)
  }
  getIndicatorsInterface() {
    return {
      sma: (input, periods) => this.decorate(sma, input, { periods }),
      smaa: (input, periods) => this.decorate(smaa, input, { periods }),
      ema: (input, periods) => this.decorate(ema, input, { periods }),
      emaa: (input, periods) => this.decorate(emaa, input, { periods }),
      rsi: (input, periods) => this.decorate(rsi, input, { periods }),
      rsia: (input, periods) => this.decorate(rsia, input, { periods }),
      bb: (input, config, field) => this.decorate(bb, input, config)[field],
      bba: (input, config, field) =>
        this.decorate(bba, input, config).map(r => r[field]),
      macda: (input, config, field) =>
        this.decorate(macda, input, config).map(r => r[field]),
    }
  }
}
