import { translate } from '../../../common/i18n'
import { doUntilDone, shouldThrowError } from '../tools'

export default Engine => class Sell extends Engine {
  isSellAtMarketAvailable() {
    return !this.isSold && this.isSellAvailable && !this.isExpired
  }
  sellAtMarket() {
    if (!this.isSellAtMarketAvailable()) {
      throw translate('Sell is not available')
    }

    const toIgnore = [
      'NoOpenPosition',
      'InvalidSellContractProposal',
      'UnrecognisedRequest',
    ]

    return new Promise((resolve, reject) => Promise.all([
      this.sellContract(this.contractId),
      this.waitForAfter(),
    ]).then(() => resolve())
    .catch(e => {
      if (shouldThrowError(e, toIgnore)) {
        reject(e)
        return
      }
      this.observer.emit('REVERT', 'during')
    }))
  }
  sellContract(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.api.sellContract(id, 0).then(resolve).catch(reject)
      }, 1000)
    })
  }
  sellExpired() {
    if (this.isSellAvailable && this.isExpired) {
      doUntilDone(() => this.api.sellExpiredContracts())
    }
  }
}
