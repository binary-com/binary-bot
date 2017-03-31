export default Engine => class OpenContract extends Engine {
  prepareBeforePurchase(symbol) {
    if (symbol && this.symbol !== symbol) {
      const { ticksService } = this.$scope

      ticksService.stopMonitor(
        { symbol: this.symbol, key: this.tickListenerKey })

      const callback = () => {
        if (!this.isPurchaseRequested && this.checkProposalReady()) {
          Promise.all([
            this.startPromise,
            this.requestPipSizes(),
          ]).then(() => this.signal('before'))
        }
      }

      const key = ticksService.monitor({ symbol, callback })

      this.symbol = symbol

      this.tickListenerKey = key
    }
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
  getSymbol() {
    return this.symbol
  }
  getPipSize() {
    const activeSymbol = this.activeSymbols.find(a => a.symbol === this.symbol)

    return +(+activeSymbol.pip).toExponential().substring(3)
  }
}
