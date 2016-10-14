const clone = (obj) => ({
  ...obj,
});

const tradeInfoSkel = {
  totalRuns: 0,
  totalWins: 0,
  totalLosses: 0,
  totalProfit: '',
  totalPayout: '',
  totalStake: '',
  balance: '',
  tradeCount: 0,
  maxTradeCount: 50,
};

export default class TradeInfo {
  constructor() {
    this.tradeInfo = clone(tradeInfoSkel);
  }
  reset() {
    this.tradeInfo = clone(tradeInfoSkel);
    this.update();
  }
  update() {
    for (const key of Object.keys(this.tradeInfo)) {
      $(`.${key}`)
        .text(this.tradeInfo[key]);
      if (key === 'totalProfit') {
        if (+this.tradeInfo[key] > 0) {
          $(`.${key}`)
            .css('color', 'green');
        } else if (+this.tradeInfo[key] < 0) {
          $(`.${key}`)
            .css('color', 'red');
        } else {
          $(`.${key}`)
            .css('color', 'black');
        }
      }
    }
  }
  add(_trade) {
    const trade = clone(_trade);
    trade.number = this.tradeInfo.totalRuns;
    if (this.tradeInfo.tradeCount === this.tradeInfo.maxTradeCount) {
      $('#tradesDisplay tbody tr:first').insertAfter($('#tradesDisplay tbody tr:last'));
    } else {
      this.tradeInfo.tradeCount += 1;
      $('#tradesDisplay tbody')
        .append(
          '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
      $('.table-scroll')
        .scrollTop($('.table-scroll')[0].scrollHeight);
    }
    const profit = +(Number(trade.sell_price) - Number(trade.buy_price)).toFixed(2);
    const profitColor = (profit < 0) ? 'red' : 'green';
    $('#tradesDisplay tbody tr:last td:nth-child(1)')
      .text(trade.number);
    $('#tradesDisplay tbody tr:last td:nth-child(2)')
      .text(trade.transaction_ids.buy);
    $('#tradesDisplay tbody tr:last td:nth-child(3)')
      .text(trade.contract_type);
    $('#tradesDisplay tbody tr:last td:nth-child(4)')
      .text(trade.entry_tick);
    $('#tradesDisplay tbody tr:last td:nth-child(5)')
      .text(trade.exit_tick);
    $('#tradesDisplay tbody tr:last td:nth-child(6)')
      .text(trade.buy_price);
    $('#tradesDisplay tbody tr:last td:nth-child(7)')
      .text(trade.sell_price);
    $('#tradesDisplay tbody tr:last td:nth-child(8)')
      .text(profit);
    $('#tradesDisplay tbody tr:last td:nth-child(8)').css('color', profitColor);
  }
}
