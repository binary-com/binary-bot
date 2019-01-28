[![Build Status](https://travis-ci.org/binary-com/binary-bot.svg?branch=master)](https://travis-ci.org/binary-com/binary-bot)
[![Coverage Status](https://coveralls.io/repos/github/binary-com/binary-bot/badge.svg?branch=master)](https://coveralls.io/github/binary-com/binary-bot?branch=master)

# Binary Bot

Visual automation for binary.com [bot.binary.com](https://bot.binary.com)

Visit [wiki](https://github.com/binary-com/binary-bot/wiki) for more info.

## Development

```
git clone https://github.com/binary-com/binary-bot.git
cd binary-bot
git checkout dev
npm install
npm start
```

**Note:** Please branch your work from dev, and make sure your local dev is up-to-date with upstream

### Deploying to local gh-pages

```
npm run release --branch [branchname] # can contain /
```

## Deployment/Release

```
gulp test-deploy # for local test deploy
npm run release --branch <branch-name> # to deploy a branch (eg., beta)
npm run release-production # to release it to production
```

## To update to latest version

```
git pull --rebase upstream dev
npm install
```

## Running the CLI command

```
npm i -g binary-bot
bot -h // For a quick help
bot bot-example.js
```

### Running with a specific endpoint
**Use only if you know what you're doing**

```
ENDPOINT='wss://ws.binaryws.com/websockets/v3?l=en&app_id=1169' bot bot-example.js
```

### CLI examples:
[`speed-test.js`](https://github.com/binary-com/binary-bot/blob/master/cli-examples/speed-test.js)

## Think you found a bug?

There's a chance that we already know about it and doing our best to fix it. To find out you can search our [GitHub issues](https://github.com/binary-com/binary-bot/issues)

Not satisfied yet? Please create a new issue, and explain to us what is the nature of the problem and how to reproduce [here](https://github.com/binary-com/binary-bot/issues/new)

## We'd love to hear from you

Please send us your inquiries through marketing@binary.com

## Sample Blocks

You can find some example blocks in the [`Examples`](/examples) folder.

**Disclaimer**: _All the files and codes in the above links are intended for educational and informational purposes only. They should not be construed as giving investment advice, and you should not rely on them as your singular factor in making or refraining from making any investment decisions. Binary.com accepts no liability whatsoever for any losses incurred by users in their trading. Binary options trading may incur losses as well as gains._


