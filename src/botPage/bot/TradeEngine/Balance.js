let balance = 0
let balanceStr = ''


export default Engine => class Balance extends Engine {
  subscribeToBalance() {
    return this.api.subscribeToBalance()
  }
  observeBalance() {
    this.listen('balance', r => {
      const { balance: { balance: b, currency } } = r

      balance = +b
      balanceStr = `${balance.toFixed(2)} ${currency}`

      this.broadcastInfo({ balance: balanceStr })
    })
  }
  getBalance(type) {
    return (type === 'STR' ? balanceStr : balance)
  }
}
