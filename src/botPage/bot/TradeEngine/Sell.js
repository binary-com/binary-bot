import { doUntilDone } from '../tools'

export default Engine => class Sell extends Engine {
  isSellAtMarketAvailable() {
    return !this.isSold && this.isSellAvailable && !this.isExpired &&
      !this.isSellRequested
  }
  sellAtMarket() {
    if (this.isSellAtMarketAvailable()) {
      this.isSellRequested = true
      doUntilDone(() => this.api.sellContract(this.contractId, 0), [
        'NoOpenPosition',
        'InvalidSellContractProposal',
        'UnrecognisedRequest',
      ]).catch(e => this.broadcastError(e))
    }
  }
  sellExpired() {
    if (this.isSellAvailable && this.isExpired) {
      doUntilDone(() => this.api.sellExpiredContracts())
    }
  }
}
