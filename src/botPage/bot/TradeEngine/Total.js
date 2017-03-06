let totalProfit = 0
let totalWins = 0
let totalLosses = 0
let totalStake = 0
let totalPayout = 0
let totalRuns = 0

const toFixedTwo = num => +(num).toFixed(2)

const addFixed = (a, b) => toFixedTwo(+a + (+b))

const subtractFixed = (a, b) => toFixedTwo(+a - (+b))

export default Engine => class Total extends Engine {
  constructor() {
    super()
    this.sessionRuns = 0
    this.sessionProfit = 0
  }
  updateTotals(contract) {
    const { sell_price: sellPrice, buy_price: buyPrice } = contract

    const profit = subtractFixed(sellPrice, buyPrice)

    totalWins += profit > 0 ? 1 : 0

    totalLosses += profit < 0 ? 1 : 0

    this.sessionProfit = addFixed(this.sessionProfit, profit)

    totalProfit = addFixed(totalProfit, profit)
    totalStake = addFixed(totalStake, buyPrice)
    totalPayout = addFixed(totalPayout, sellPrice)

    this.broadcastInfo({
      profit,
      contract,
      totalProfit,
      totalWins,
      totalLosses,
      totalStake,
      totalPayout,
    })
  }
  updateAndReturnTotalRuns() {
    return ++totalRuns
  }
}
