export default Engine => class OpenContract extends Engine {
  constructor() {
    super()
    this.tickListener = {}
  }
  followTicks(symbol) {
    const callback = () => {
      if (!this.isPurchaseStarted && this.checkReady()) {
        this.execContext('before')
      }
    }

    if (this.tickListener.symbol !== symbol) {
      const { ticksService } = this.$scope

      ticksService.stopMonitor(this.tickListener)

      const key = ticksService.monitor({ symbol, callback })

      this.tickListener = { key, symbol }
    }
  }
}
