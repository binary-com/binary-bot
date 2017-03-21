import { observer as globalObserver } from 'binary-common-utils/lib/observer'

export default Engine => class Broadcast extends Engine {
  broadcastPurchase(buy, contractType) {
    globalObserver.emit('bot.info', {
      totalRuns: this.updateAndReturnTotalRuns(),
      transaction_ids: { buy: buy.transaction_id },
      contract_type: contractType,
      buy_price: buy.buy_price,
    })
  }
  broadcastContract(contract) {
    globalObserver.emit('bot.contract', contract)
  }
  broadcastInfo(info) {
    globalObserver.emit('bot.info', info)
  }
  broadcastError(e) {
    globalObserver.emit('Error', e)
  }
}
