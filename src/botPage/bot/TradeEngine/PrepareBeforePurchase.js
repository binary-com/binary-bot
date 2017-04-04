export default Engine => class OpenContract extends Engine {
  prepareBeforePurchase(symbol) {
    if (symbol && this.symbol !== symbol) {
      const { ticksService } = this.$scope

      ticksService.stopMonitor(
        { symbol: this.symbol, key: this.tickListenerKey })

      const callback = () => {
        if (!this.isPurchaseRequested && this.checkProposalReady()) {
          this.startPromise.then(() => this.signal('before'))
        }
      }

      const key = ticksService.monitor({ symbol, callback })

      this.symbol = symbol

      this.tickListenerKey = key
    }
  }
}
