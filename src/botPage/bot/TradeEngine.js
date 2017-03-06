import { Map } from 'immutable'
import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import { tradeOptionToProposal } from './tools'

const scopeToWatchResolve = {
  before: ['before', true],
  purchase: ['before', false],
  during: ['during', true],
  after: ['during', false],
}


let totalRuns = 0
let totalProfit = 0
let totalWins = 0
let totalLosses = 0
let totalStake = 0
let totalPayout = 0
let balance = 0
let balanceStr = ''

export default class TradeEngine {
  constructor($scope) {
    ({
      ticksService: this.ticksService,
      api: this.api,
      observer: this.observer,
    } = $scope)
    this.tickListener = {}
    this.observe()
    this.isPurchaseStarted = false
    this.isSellAvailable = false
    this.forSellContractId = 0
    this.token = ''
    this.data = new Map({
      proposals: new Map(),
    })
    this.promises = new Map()
    this.sessionRuns = 0
    this.sessionProfit = 0
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
      this.api.subscribeToBalance()
    })
  }
  monitorTickEvent(symbol) {
    if (this.tickListener.symbol !== symbol) {
      this.ticksService.stopMonitor(this.tickListener.symbol, this.tickListener.key)

      const key = this.ticksService.monitor(symbol, () => {
        if (!this.isPurchaseStarted && this.checkReady()) {
          this.execContext('before')
        }
      })

      this.tickListener = { key, symbol }
    }
  }
  requestPurchase(contractType) {
    let toBuy
    let toForget

    this.data.get('proposals').forEach(proposal => {
      if (proposal.contractType === contractType) {
        toBuy = proposal
      } else {
        toForget = proposal
      }
    })

    this.isPurchaseStarted = true

    this.api.buyContract(toBuy.id, toBuy.ask_price).then(r => {
      globalObserver.emit('bot.info', {
        totalRuns: ++totalRuns,
        transaction_ids: { buy: r.buy.transaction_id },
        contract_type: contractType,
        buy_price: r.buy.buy_price,
      })
      this.api.subscribeToOpenContract(r.buy.contract_id)
      this.api.unsubscribeByID(toForget.id).then(() => this.requestProposals())
      this.execContext('purchase')
    })
  }
  sellAtMarket() {
    if (!this.isSold && this.isSellAvailable) {
      this.api.sellContract(this.forSellContractId, 0).then(() => {
        this.isSellAvailable = false
      }).catch(() => this.sellAtMarket())
    }
  }
  setReady() {
    this.expectedProposalCount = (this.expectedProposalCount + 1) % 2
  }
  checkReady() {
    return this.data.get('proposals').size && !this.expectedProposalCount
  }
  requestProposals() {
    this.data = this.data.set('proposals', new Map())

    this.proposalTemplates.forEach(proposal => {
      this.api.subscribeToPriceForContractProposal(proposal).then(r => {
        this.data = this.data.setIn(['proposals', r.proposal.id],
          Object.assign({ contractType: proposal.contract_type }, r.proposal))
        this.setReady()
      })
    })
  }
  observe() {
    this.listen('proposal_open_contract', r => {
      const contract = r.proposal_open_contract
      const { is_expired: isExpired, is_valid_to_sell: isValidToSell } = contract

      if (!this.isSold && isExpired && isValidToSell) {
        this.api.sellExpiredContracts()
      }

      this.isSold = !!contract.is_sold

      if (this.isSold) {
        this.isPurchaseStarted = false
        this.updateTotals(contract)
      } else {
        this.forSellContractId = contract.contract_id
      }

      this.isSellAvailable =
        !this.isSold && !contract.is_expired && !!contract.is_valid_to_sell

      globalObserver.emit('bot.contract', contract)

      this.execContext(this.isSold ? 'after' : 'during')
    })

    this.listen('balance', r => {
      const { balance: { balance: b, currency } } = r

      balance = +b
      balanceStr = `${balance.toFixed(2)} ${currency}`

      globalObserver.emit('bot.info', { balance: balanceStr })
    })

    this.listen('proposal', r => {
      const proposal = r.proposal
      const id = proposal.id

      if (this.data.hasIn(['proposals', id])) {
        this.data.setIn(['proposals', id], proposal)
        this.setReady()
      }
    })
  }
  execContext(scope) {
    const [watchName, arg] = scopeToWatchResolve[scope]

    this.promises.get(watchName)(arg)

    this.scope = scope
    this.observer.emit('CONTINUE')
  }
  isInside(scope) {
    return this.scope === scope
  }
  watch(scope) {
    return new Promise(resolve => {
      this.promises = this.promises.set(scope, resolve)
    })
  }
  listen(n, f) {
    this.api.events.on(n, f)
  }
  updateTotals(contract) {
    const profit = +((+contract.sell_price) - (+contract.buy_price)).toFixed(2)

    if (+profit > 0) {
      totalWins += 1
    } else if (+profit < 0) {
      totalLosses += 1
    }
    this.sessionProfit = +(this.sessionProfit + profit).toFixed(2)
    totalProfit = +(totalProfit + profit).toFixed(2)
    totalStake = +(totalStake + (+contract.buy_price)).toFixed(2)
    totalPayout = +(totalPayout + (+contract.sell_price)).toFixed(2)

    globalObserver.emit('bot.info', {
      profit,
      contract,
      totalProfit,
      totalWins,
      totalLosses,
      totalStake,
      totalPayout,
    })
  }
  getData() {
    return this.data
  }
}
