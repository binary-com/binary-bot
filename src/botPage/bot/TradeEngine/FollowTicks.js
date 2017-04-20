export default Engine => class OpenContract extends Engine {
  constructor() {
    super()
    this.tickListener = {}
  }
  followTicks(symbol) {
    const pipSizePromise = this.api.getActiveSymbolsBrief()

    pipSizePromise.then(r => {
      const activeSymbol = r.active_symbols.find(a => a.symbol === symbol)

      this.pipSize = +(+activeSymbol.pip).toExponential().substring(3)
    })

    const callback = () => {
      if (!this.isPurchaseStarted && this.checkReady()) {
        pipSizePromise.then(() => this.signal('before'))
      }
    }

    if (this.tickListener.symbol !== symbol) {
      const { ticksService } = this.$scope

      ticksService.stopMonitor(this.tickListener)

      const key = ticksService.monitor({ symbol, callback })

      this.tickListener = { key, symbol }
    }
  }
  getSymbol() {
    return this.tickListener.symbol
  }
  getPipSize() {
    return this.pipSize
  }
}
