const maxTradeCount = 50;

const tradeInfoSkel = {
  totalRuns: 0,
  totalWins: 0,
  totalLosses: 0,
  totalProfit: '',
  totalPayout: '',
  totalStake: '',
  balance: '',
  tradeCount: 0,
};

export default class TradeInfo {
  constructor() {
    this.tradeInfo = { ...tradeInfoSkel };
    this.tradeCount = 0;
  }
  reset() {
    this.tradeInfo = { ...tradeInfoSkel };
    this.update();
  }
  update() {
    Object.keys(this.tradeInfo).forEach(key => {
      $(`.${key}`).text(this.tradeInfo[key]);
      if (key === 'totalProfit') {
        if (+this.tradeInfo[key] > 0) {
          $(`.${key}`).css('color', 'green');
        } else if (+this.tradeInfo[key] < 0) {
          $(`.${key}`).css('color', 'red');
        } else {
          $(`.${key}`).css('color', 'black');
        }
      }
    });
  }
  addInfo(info) {
    this.tradeInfo = { ...this.tradeInfo, ...info };
    this.update();
  }
  addContract(contract) {
    const number = this.tradeInfo.totalRuns;
    if (
      String(contract.transaction_ids.buy) !==
      $('#tradesDisplay tbody tr:last td:nth-child(2)').text()
    ) {
      if (this.tradeCount === maxTradeCount) {
        $('#tradesDisplay tbody tr:first').insertAfter(
          $('#tradesDisplay tbody tr:last'),
        );
      } else {
        this.tradeCount += 1;
        $('#tradesDisplay tbody').append(
          '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>',
        );
        $('.table-scroll').scrollTop($('.table-scroll')[0].scrollHeight);
      }
    }

    const profit = 'sell_price' in contract
      ? +(Number(contract.sell_price) - Number(contract.buy_price)).toFixed(2)
      : '';
    const profitColor = profit < 0 ? 'red' : 'green';

    $('#tradesDisplay tbody tr:last td:nth-child(1)').text(number);
    $('#tradesDisplay tbody tr:last td:nth-child(2)').text(
      contract.transaction_ids.buy,
    );
    $('#tradesDisplay tbody tr:last td:nth-child(3)').text(
      contract.contract_type,
    );
    $('#tradesDisplay tbody tr:last td:nth-child(4)').text(contract.entry_tick);
    $('#tradesDisplay tbody tr:last td:nth-child(5)').text(contract.exit_tick);
    $('#tradesDisplay tbody tr:last td:nth-child(6)').text(contract.buy_price);
    $('#tradesDisplay tbody tr:last td:nth-child(7)').text(contract.sell_price);
    $('#tradesDisplay tbody tr:last td:nth-child(8)').text(profit);
    $('#tradesDisplay tbody tr:last td:nth-child(8)').css('color', profitColor);
  }
}
