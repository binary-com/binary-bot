import { translate } from "../../../common/i18n";
import { tradeOptionToProposal, doUntilDone } from "../tools";
import { proposalsReady, clearProposals } from "./state/actions";
import { TrackJSError } from "../../view/logger";

export default Engine =>
  class Proposal extends Engine {
    makeProposals(trade_option) {
      if (!this.isNewTradeOption(trade_option)) {
        return;
      }

      // Generate a purchase reference when trade options are different from previous trade options.
      // This will ensure the bot doesn't mistakenly purchase the wrong proposal.
      this.regeneratePurchaseReference();
      this.trade_option = trade_option;
      this.proposalTemplates = tradeOptionToProposal(trade_option, this.getPurchaseReference());
      this.renewProposalsOnPurchase();
    }

    selectProposal(contract_type) {
      const { proposals } = this.data;

      if (proposals.length === 0) {
        throw Error(translate("Proposals are not ready"));
      }

      const to_buy = proposals.find(proposal => {
        if (proposal.contract_type === contract_type && proposal.purchase_reference === this.getPurchaseReference()) {
          // Below happens when a user has had one of the proposals return
          // with a ContractBuyValidationError. We allow the logic to continue
          // to here cause the opposite proposal may still be valid. Only once
          // they attempt to purchase the errored proposal we will intervene.
          if (proposal.error) {
            const { error } = proposal.error;
            const { code, message } = error;
            throw new TrackJSError(code, message, error);
          }

          return proposal;
        }

        return false;
      });

      if (!to_buy) {
        throw new TrackJSError(
          "CustomInvalidProposal",
          translate("Selected proposal does not exist"),
          this.data.proposals
        );
      }

      return {
        proposal: to_buy,
        currency: this.trade_option.currency,
      };
    }

    renewProposalsOnPurchase() {
      this.unsubscribeProposals().then(() => this.requestProposals());
    }

    clearProposals() {
      this.data.proposals = [];
      this.store.dispatch(clearProposals());
    }

    requestProposals() {
      Promise.all(
        this.proposalTemplates.map(proposal =>
          doUntilDone(() => this.api.send(proposal)).catch(error => {
            // We intercept ContractBuyValidationError as user may have specified
            // e.g. a DIGITUNDER 0 or DIGITOVER 9, while one proposal may be invalid
            // the other is valid. We will error on Purchase rather than here.
            if (error && error.error.code === "ContractBuyValidationError") {
              this.data.proposals.push({
                ...error.echo_req,
                ...error.echo_req.passthrough,
                error,
              });
              return null;
            }

            throw error;
          })
        )
      ).catch(e => this.$scope.observer.emit("Error", e));
    }

    observeProposals() {
      this.api.onMessage().subscribe(({ data }) => {
        if (data?.error?.code) {
          return;
        }
        if (data?.msg_type === "proposal") {
          const { passthrough, proposal } = data;
          if (
            this.data.proposals.findIndex(p => p.id === proposal.id) === -1 &&
            !this.data.forgetProposalIds.includes(proposal.id)
          ) {
            // Add proposals based on the ID returned by the API.
            this.data.proposals.push({ ...proposal, ...passthrough });
            this.checkProposalReady();
          }
        }
      });
    }

    unsubscribeProposals() {
      const { proposals } = this.data;
      const removeForgetProposalById = forgetProposalId => {
        this.data.forgetProposalIds = this.data.forgetProposalIds.filter(id => id !== forgetProposalId);
      };

      this.clearProposals();

      return Promise.all(
        proposals.map(proposal => {
          if (!this.data.forgetProposalIds.includes(proposal.id)) {
            this.data.forgetProposalIds.push(proposal.id);
          }

          if (proposal.error) {
            removeForgetProposalById(proposal.id);
            return Promise.resolve();
          }

          return doUntilDone(() => this.api.forget(proposal.id)).then(() => removeForgetProposalById(proposal.id));
        })
      );
    }

    checkProposalReady() {
      // Proposals are considered ready when the proposals in our memory match the ones
      // we've requested from the API, we determine this by checking the passthrough of the response.
      const { proposals } = this.data;

      if (proposals.length > 0) {
        const hasEqualProposals = this.proposalTemplates.every(
          template =>
            proposals.findIndex(
              proposal =>
                proposal.purchase_reference === template.passthrough.purchase_reference &&
                proposal.contract_type === template.contract_type
            ) !== -1
        );

        if (hasEqualProposals) {
          this.startPromise.then(() => {
            this.store.dispatch(proposalsReady());
          });
        }
      }
    }

    isNewTradeOption(trade_option) {
      if (!this.trade_option) {
        this.trade_option = trade_option;
        return true;
      }

      // Compare incoming "trade_option" argument with "this.trade_option", if any
      // of the values is different, this is a new trade_option and new proposals
      // should be generated.
      return [
        "amount",
        "barrierOffset",
        "basis",
        "duration",
        "duration_unit",
        "prediction",
        "secondBarrierOffset",
        "symbol",
      ].some(value => this.trade_option[value] !== trade_option[value]);
    }
  };
