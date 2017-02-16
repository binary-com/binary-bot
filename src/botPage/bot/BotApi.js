import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import Bot from './'
import { translate } from '../../common/i18n'
import Indicators from './Indicators'
import { noop } from './tools'
import { sanitizeStart, expectPositiveInteger } from './sanitize'

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
      testScope: (...args) => this.CM.testScope(...args),
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
    return {
      start: (...args) => this.bot.start(...sanitizeStart(args)),
      stop: (...args) => this.bot.stop(...args),
      shouldRestartOnError: (...args) => this.bot.shouldRestartOnError(...args),
      purchase: option => this.bot.purchase.purchase(option),
      getContract: (...args) => this.bot.purchase.getContract(...args),
      getAskPrice: name => +(this.bot.purchase.getContract(name).ask_price),
      getPayout: name => +(this.bot.purchase.getContract(name).payout),
      isSellAvailable: (...args) => this.bot.purchase.isSellAvailable(...args),
      sellAtMarket: (...args) => this.bot.purchase.sellAtMarket(...args),
      getSellPrice: () =>
        +(((+this.CM.getLastContext().data.openContract.bid_price) -
          (+this.CM.getLastContext().data.openContract.buy_price)).toFixed(2)),
      isResult: result => (this.CM.getLastContext().data.contractDetails[10] === result),
      readDetails: i => this.CM.getLastContext().data.contractDetails[+i - 1],
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
      checkDirection: w => this.CM.getLastContext().data.ticksObj.direction === w,
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
    const ohlc = this.CM.getLastContext().data.ticksObj.ohlc

    return field ? ohlc.map(o => o[field]) : ohlc
  }
  getTicks() {
    return this.CM.getLastContext().data.ticksObj.ticks.map(o => o.quote)
  }
  getPipSize() {
    return this.CM.getLastContext().data.ticksObj.pipSize
  }
}
