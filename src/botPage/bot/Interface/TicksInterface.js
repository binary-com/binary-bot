import { translate } from '../../../common/i18n'
import { expectPositiveInteger } from '../sanitize'
import { getDirection } from '../tools'

export default Interface => class extends Interface {
  getTicksInterface() {
    return {
      getLastTick: symbol => this.getLastTick(symbol),
      getLastDigit: symbol => this.getLastDigit(symbol),
      getTicks: symbol => this.getTicks(symbol),
      checkDirection: ({ symbol, dir }) => new Promise(resolve =>
        this.getDirection(symbol).then(d => resolve((d === dir)))),
      getOhlcFromEnd: args => {
        const { index: i = 1 } = args || {}

        const index =
          expectPositiveInteger(i, translate('Index must be a positive integer'))

        return new Promise(resolve => this.getOhlc(args)
          .then(ohlc => resolve(ohlc.slice(-index)[0])))
      },
      getOhlc: args => this.getOhlc(args),
    }
  }
  getTicks(symbol) {
    return this.getHistory({ symbol })
      .then(ticks => ticks.map(o => o.quote))
  }
  getLastDigit(symbol) {
    return new Promise(resolve =>
      this.getLastTick(symbol).then(tick =>
        this.getPipSize(symbol).then(pipSize =>
          resolve(+(tick.toFixed(pipSize).slice(-1)[0])))))
  }
  getDirection(symbol) {
    return new Promise(resolve => {
      this.getHistory({ symbol })
        .then(ticks => resolve(getDirection(ticks)))
    })
  }
  getOhlc(args) {
    const { symbol, granularity = 60, field } = args || {}

    return new Promise(resolve =>
      this.getHistory({ symbol, granularity })
        .then(ohlc => resolve(field ? ohlc.map(o => o[field]) : ohlc)))
  }
  getLastTick(symbol) {
    if (!symbol && !this.getSymbol()) {
      throw translate('An underlying symbol has to be set in getHistory')
    }
    return new Promise(resolve => this.$scope.ticksService
      .getLast({ symbol: symbol || this.getSymbol() })
      .then(tick => resolve(tick.quote)))
  }
  getHistory({ symbol, granularity }) {
    if (!symbol && !this.getSymbol()) {
      throw translate('An underlying symbol has to be set in getHistory')
    }
    return this.$scope.ticksService
      .getHistory({ symbol: symbol || this.getSymbol(), granularity })
  }
  getPipSize(symbol = this.getSymbol()) {
    if (symbol === this.getSymbol()) {
      return Promise.resolve(this.tradeEngine.getPipSize())
    }

    return new Promise(resolve =>
      this.api.getActiveSymbolsBrief().then(r => {
        const activeSymbol = r.active_symbols.find(a => a.symbol === symbol)

        resolve(+(+activeSymbol.pip).toExponential().substring(3))
      }))
  }
  getSymbol() {
    return this.tradeEngine.getSymbol()
  }
}
