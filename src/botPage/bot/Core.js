import { tradeOptionToProposal } from './tools'

export default class Core {
  constructor($scope) {
    this.api = $scope.api.originalApi
    this.activeProposals = []
    this.tickListener = {}
    this.observe()
    this.isPurchaseStarted = false
    this.isSellAvailable = false
    this.forSellContractId = 0
    this.token = ''
    this.observer = $scope.observer
    this.context = {}
    this.promises = {
      before() {},
      during() {},
    }
  }
  start(token, tradeOption) {
    if (this.token) {
      return
    }
    this.isSellAvailable = false
    this.api.authorize(token).then(() => {
      this.token = token
      this.proposalTemplates = tradeOptionToProposal(tradeOption)
      this.requestProposals()
      this.monitorTickEvent(tradeOption.symbol)
    })
  }
  monitorTickEvent(symbol) {
    if (this.tickListener.symbol !== symbol) {
      this.ticksService.stopMonitor(this.tickListener.symbol, this.tickListener.key)

      const key = this.ticksService.monitor(symbol, () => {
        if (!this.isPurchaseStarted && this.checkReady()) {
          this.execContext('before', this.activeProposals)
        }
      })

      this.tickListener = { key, symbol }
    }
  }
  requestPurchase(contractType) {
    this.isPurchaseStarted = true
    const requestedProposalIndex =
      this.activeProposals.findIndex(p => p.contract_type === contractType)
    const toBuy = this.activeProposals[requestedProposalIndex]
    const toForget = this.activeProposals[requestedProposalIndex ? 0 : 1]
    this.api.buyContract(toBuy.id, toBuy.ask_price).then(r => {
      this.api.subscribeToOpenContract(r.buy.contract_id)
      this.api.unsubscribeByID(toForget.id).then(() => this.requestProposals())
      this.execContext('between-before-and-during')
    })
  }
  sellAtMarket() {
    if (!this.isSold && this.isSellAvailable) {
      this.api.sellContract(this.forSellContractId, 0).then(() => {
        this.isSellAvailable = false
      })
      .catch(() => this.sellAtMarket())
    }
  }
  setReady() {
    this.expectedProposalCount = (this.expectedProposalCount + 1) % 2
  }
  checkReady() {
    return this.activeProposals.length && !this.expectedProposalCount
  }
  requestProposals() {
    this.activeProposals = []
    this.proposalTemplates.forEach(proposal => {
      this.api.subscribeToPriceForContractProposal(proposal).then(r => {
        this.activeProposals.push(
          Object.assign({ contract_type: proposal.contract_type }, r.proposal))
        this.setReady()
      })
    })
  }
  observe() {
    this.listen('proposal_open_contract', t => {
      const contract = t.proposal_open_contract
      const { is_expired: isExpired, is_valid_to_sell: isValidToSell } = contract

      if (!this.isSold && isExpired && isValidToSell) {
        this.api.sellExpiredContracts()
      }
      this.isSold = !!contract.is_sold
      if (this.isSold) {
        this.isPurchaseStarted = false
      } else {
        this.forSellContractId = contract.contract_id
      }
      this.isSellAvailable =
        !this.isSold && !contract.is_expired && !!contract.is_valid_to_sell
      this.execContext(this.isSold ? 'after' : 'during', contract)
    })

    this.listen('proposal', r => {
      const proposal = r.proposal
      const activeProposalIndex =
        this.activeProposals.findIndex(p => p.id === proposal.id)

      if (activeProposalIndex >= 0) {
        this.activeProposals[activeProposalIndex] = proposal
        this.setReady()
      }
    })
  }
  execContext(scope) {
    switch (scope) {
      case 'before':
        this.promises.before(true)
        break
      case 'between-before-and-during':
        this.promises.before(false)
        break
      case 'during':
        this.promises.during(true)
        break
      case 'after':
        this.promises.during(false)
        break
      default:
        break
    }
    this.scope = scope
    this.observer.emit('CONTINUE')
  }
  isInside(scope) {
    return this.scope === scope
  }
  watch(scope) {
    return new Promise(resolve => {
      this.promises[scope] = resolve
    })
  }
  listen(n, f) {
    this.api.events.on(n, f)
  }
}
