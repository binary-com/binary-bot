import { translate } from '../../../common/i18n';
import { recoverFromError } from '../tools';
import { info, notify } from '../broadcast';

let delayIndex = 0;

export default Engine => class Purchase extends Engine {
  purchase(contractType) {
    const { id, askPrice } = this.selectProposal(contractType);

    this.ongoingPurchase = true;

    return recoverFromError(
      () => this.api.buyContract(id, askPrice),
      (errorCode, makeDelay) => {
        // if disconnected no need to resubscription (handled by live-api)
        if (errorCode !== 'DisconnectError') {
          this.renewProposalsOnPurchase();
        }

        this.waitForProposals().then(() =>
          makeDelay().then(() => this.observer.emit('REVERT', 'before')),
        );
      },
      ['PriceMoved'],
      delayIndex++,
    ).then(r => {
      const { buy } = r;

      this.subscribeToOpenContract(buy.contract_id);
      this.signal('purchase');
      this.renewProposalsOnPurchase(id);
      delayIndex = 0;
      notify('info', `${translate('Bought')}: ${buy.longcode}`);
      info({
        totalRuns: this.updateAndReturnTotalRuns(),
        transaction_ids: { buy: buy.transaction_id },
        contract_type: contractType,
        buy_price: buy.buy_price,
      });
    });
  }
};
