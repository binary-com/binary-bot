export default Engine => class OpenContract extends Engine {
  waitBeforePurchase(symbol) {
    if (this.symbol !== symbol) {
      return new Promise(resolve => {
        const callback = () => {
          if (!this.isPurchaseStarted && this.checkProposalReady()) {
            this.requestPipSizes().then(resolve)
          }
        }

        const { ticksService } = this.$scope

        ticksService.stopMonitor(
          { symbol: this.symbol, key: this.tickListenerKey })

        const key = ticksService.monitor({ symbol, callback })

        this.symbol = symbol

        this.tickListenerKey = key
      })
    }
    return Promise.resolve()
  }
  requestPipSizes() {
    const pipSizePromise = this.api.getActiveSymbolsBrief()

    pipSizePromise.then(r => {
      this.activeSymbols = r.active_symbols
    })

    return pipSizePromise
  }
  getSymbol() {
    return this.symbol
  }
  getPipSize() {
    const activeSymbol = this.activeSymbols.find(a => a.symbol === this.symbol)

    return +(+activeSymbol.pip).toExponential().substring(3)
  }
}
