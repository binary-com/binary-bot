var token = 'Replace with your own token';

console.log('Starting bot...');

Bot.init(token, {
  symbol: 'R_100',
  candleInterval: 60,
  contractTypes: ['CALL', 'PUT'],
});

while (true) {
  Bot.start({
    amount: 1,
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
