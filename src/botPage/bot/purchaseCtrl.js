import { observer } from 'binary-common-utils/lib/observer'
import { getUTCTime } from 'binary-common-utils/lib/tools'
import Trade from './trade'

const createDetails = (contract) => {
  const profit = +(Number(contract.sell_price) - Number(contract.buy_price)).toFixed(2)
  const result = (profit < 0) ? 'loss' : 'win'
  observer.emit(`log.beforePurchase.${result}`, {
    profit,
    transactionId: contract.transaction_ids.buy,
  })
  return [
    contract.transaction_ids.buy, +contract.buy_price, +contract.sell_price,
    profit, contract.contract_type,
    getUTCTime(new Date(parseInt(`${contract.entry_tick_time}000`, 10))), +contract.entry_tick,
    getUTCTime(new Date(parseInt(`${contract.exit_tick_time}000`, 10))), +contract.exit_tick,
    +((contract.barrier) ? contract.barrier : 0), result,
  ]
}

export default class PurchaseCtrl {
  constructor(api, beforePurchase, duringPurchase, afterPurchase) {
    this.tickObj = {
      ticks: [],
      candles: [],
    }
    this.expectedNumOfProposals = 2
    this.api = api
    this.beforePurchase = beforePurchase
    this.duringPurchase = duringPurchase
    this.afterPurchase = afterPurchase
    this.ready = false
    this.purchased = false
    this.runningObservations = []
    this.proposals = {}
  }
  setNumOfProposals(num) {
    this.expectedNumOfProposals = num
  }
  updateProposal(proposal) {
    if (!this.purchased) {
      this.proposals[proposal.contract_type] = proposal
      if (!this.ready && Object.keys(this.proposals).length === this.expectedNumOfProposals) {
        this.ready = true
        observer.emit('beforePurchase.ready')
      }
    }
  }
  updateTicks(data) {
    const ticks = data.ticks
    const ohlc = data.candles
    let direction = ''
    const length = ticks.length
    if (length >= 2) {
      if (ticks[length - 1].quote > ticks[length - 2].quote) {
        direction = 'rise'
      }
      if (ticks[length - 1].quote < ticks[length - 2].quote) {
        direction = 'fall'
      }
    }
    if (ohlc) {
      const repr = function repr() {
        return JSON.stringify(this)
      }
      for (const o of ohlc) {
        o.toString = repr
      }
    }
    this.tickObj = {
      direction,
      ohlc,
      ticks,
    }
    if (!this.purchased) {
      if (this.ready) {
        observer.emit('log.beforePurchase.start', {
          proposals: this.proposals,
        })
        this.beforePurchase(this.tickObj, this.proposals, this)
      } else {
        this.beforePurchase(this.tickObj, null, null)
      }
    }
  }
  purchase(option) {
    observer.emit('log.beforePurchase.purchase', {
      proposals: this.proposals,
      purchasing: option,
    })
    if (!this.purchased) {
      this.purchased = true
      const contract = this.getContract(option)
      this.trade = new Trade(this.api)
      const tradeUpdate = (openContract) => {
        this.duringPurchase(this.tickObj, openContract, this)
        observer.emit('beforePurchase.tradeUpdate', openContract)
      }
      const tradeFinish = (finishedContract) => {
        // order matters, needs fix
        observer.emit('beforePurchase.finish', finishedContract)
        this.afterPurchase(finishedContract, createDetails(finishedContract))
      }
      observer.register('trade.update', tradeUpdate)
      observer.register('trade.finish', tradeFinish, true)
      this.runningObservations.push(['trade.update', tradeUpdate])
      this.runningObservations.push(['trade.finish', tradeFinish])
      this.trade.purchase(contract, tradeFinish)
    }
  }
  isSellAvailable() {
    return this.trade && this.trade.isSellAvailable
  }
  sellAtMarket() {
    if (this.trade && this.trade.isSellAvailable) {
      this.trade.sellAtMarket()
    }
  }
  getContract(option) {
    return this.proposals[option]
  }
  destroy() {
    for (const obs of this.runningObservations) {
      observer.unregisterAll(...obs)
    }
    this.runningObservations = []
    this.proposals = {}
    this.ready = false
    this.beforePurchase = null
    if (this.trade) {
      this.trade.destroy()
    }
  }
}
