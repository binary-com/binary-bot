export default Engine => class OpenContract extends Engine {
  waitBeforePurchase(symbol) {
    this.keepTicksAlive(symbol)

    return new Promise(resolve => {
      this.beforePromise = resolve
    })
  }
  requestPipSizes() {
    if (this.activeSymbols) {
      return Promise.resolve(this.activeSymbols)
    }

    const pipSizePromise = this.api.getActiveSymbolsBrief()

    pipSizePromise.then(r => {
      this.activeSymbols = r.active_symbols
    })

    return pipSizePromise
  }
  keepTicksAlive(symbol) {
    if (symbol && this.symbol !== symbol) {
      const { ticksService } = this.$scope

      ticksService.stopMonitor(
        { symbol: this.symbol, key: this.tickListenerKey })

      const callback = () => {
        if (!this.isPurchaseRequested && this.checkProposalReady()) {
          this.requestPipSizes().then(this.beforePromise)
        }
      }

      const key = ticksService.monitor({ symbol, callback })

      this.symbol = symbol

      this.tickListenerKey = key
    }
  }
  getSymbol() {
    return this.symbol
  }
  getPipSize() {
    const activeSymbol = this.activeSymbols.find(a => a.symbol === this.symbol)

    return +(+activeSymbol.pip).toExponential().substring(3)
  }
}
