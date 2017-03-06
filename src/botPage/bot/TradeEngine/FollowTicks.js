export default Engine => class OpenContract extends Engine {
  constructor() {
    super()
    this.tickListener = {}
  }
  followTicks(symbol) {
    if (this.tickListener.symbol !== symbol) {
      const { ticksService } = this.$scope

      ticksService.stopMonitor(this.tickListener.symbol, this.tickListener.key)

      const key = ticksService.monitor(symbol, () => {
        if (!this.isPurchaseStarted && this.checkReady()) {
          this.execContext('before')
        }
      })

      this.tickListener = { key, symbol }
    }
  }
}
