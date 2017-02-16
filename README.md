[![Build Status](https://travis-ci.org/binary-com/binary-bot.svg?branch=master)](https://travis-ci.org/binary-com/binary-bot)		
[![Coverage Status](https://coveralls.io/repos/github/binary-com/binary-bot/badge.svg?branch=master)](https://coveralls.io/github/binary-com/binary-bot?branch=master)

# Binary Bot

Visual automation for binary.com [bot.binary.com](https://bot.binary.com)

Visit [wiki](https://github.com/binary-com/binary-bot/wiki) for more info.

## Development

```
npm install
npm start
```

## Deployment 

```
gulp test-deploy
npm run deploy
```

## To update to latest version

```
git pull
npm install
```

## Running the cli command

```
npm i -g binary-bot
bot bot.js
# specify endpoint:
ENDPOINT='wss://ws.binaryws.com/websockets/v3?l=en&app_id=0' bot bot.js
```

### bot .js content
```
var token = 'REPLACE_YOUR_TOKEN_HERE';

(function (){
  while (true) {
    console.log('Starting bot...')
    Bot.start(token, { amount: 1,
      basis: 'stake', candleInterval: 60,
      contractTypes: ['CALL', 'PUT'],
      currency: 'USD', duration: 5,
      duration_unit: 't', symbol: 'R_100',
    });
    var context = watch('before');
    var option = Object.keys(context.data.proposals)[Math.round(Math.random())]
    Bot.purchase(option);
    console.log('Purchased:', option);
    while(testScope(context = watch('during'), 'during')) {
      console.log('Purchase Update:', context.data.openContract.transaction_ids)
    }
    console.log('Purchase finished:', Bot.readDetails(1));
  }
})();
```

## Sample Blocks

[Misc. Examples](https://gist.github.com/aminmarashi/dfabc8eadfaf77bf270b0318f03ea8bb)

[Price Actions](https://gist.github.com/aminmarashi/094961982556d36639b9055a1d40ec06)

[Risk Management](https://gist.github.com/aminmarashi/0feb52b5802519cd4157b612d9bd3471)

[Money Management](https://gist.github.com/aminmarashi/8cfc8554f894311e9a80480d28882bf2)

[Tools](https://gist.github.com/aminmarashi/7cd7be9f3ce9004de767f4d4f6a6c5a0)

### Binary Bot Gist
Find all above sample blocks and more in [here](https://gist.github.com/aminmarashi)

**Disclaimer**: _All the files and codes in the above links are intended for educational and informational purposes only. They should not be construed as giving investment advice, and you should not rely on them as your singular factor in making or refraining from making any investment decisions. Binary.com accepts no liability whatsoever for any losses incurred by users in their trading. Binary options trading may incur losses as well as gains._


