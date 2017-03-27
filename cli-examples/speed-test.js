var token = 'Replace with your own token';

console.log('Starting bot...');

while (true) {
  Bot.start(token, {
    symbol: 'R_100',
    amount: 1,
    basis: 'stake',
    candleInterval: 60,
    contractTypes: ['CALL', 'PUT'],
    currency: 'USD',
    duration: 2,
    duration_unit: 'h',
  });

  console.log('Preparing Proposals');

  watch('before');

  Bot.purchase('CALL');

  console.log('Purchased:', 'CALL');

  while(watch('during')) {
    if (Bot.isSellAvailable()) {
      Bot.sellAtMarket()
      console.log('Contract Sold')
    }
  }

  console.log('Purchase finished:', Bot.readDetails(1));

  sleep(1) // Prevent max sell alert because of trading too fast
}
