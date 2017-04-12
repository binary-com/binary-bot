import { translate } from '../../../common/i18n'
import { recoverFromError, doUntilDone } from '../tools'

let delayIndex = 0

export default Engine => class Sell extends Engine {
  isSellAtMarketAvailable() {
    return this.contractId && !this.isSold && this.isSellAvailable && !this.isExpired
  }
  sellAtMarket() {
    if (!this.isSellAtMarketAvailable()) {
      throw translate('Sell is not available')
    }

    return recoverFromError(() => Promise.all([
      this.api.sellContract(this.contractId, 0),
      this.waitForAfter(),
    ]), (errorCode, makeDelay) => makeDelay().then(
      () => this.observer.emit('REVERT', 'during')), [
        'NoOpenPosition',
        'InvalidSellContractProposal',
        'UnrecognisedRequest',
      ], delayIndex++).then(() => {
        delayIndex = 0
      })
  }
  sellExpired() {
    if (this.isSellAvailable && this.isExpired) {
      doUntilDone(() => this.api.sellExpiredContracts())
    }
  }
}
