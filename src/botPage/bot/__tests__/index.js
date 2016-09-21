import CustomApi from 'binary-common-utils/lib/customApi';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { observer } from 'binary-common-utils/lib/observer';
import Bot from '../';
import mockWebsocket from '../../../common/mock/websocket';

describe('Bot', () => {
  const option = {
    amount: '1.00',
    basis: 'stake',
    candleInterval: 60,
    condition: 'EVENODD',
    currency: 'USD',
    duration: 5,
    duration_unit: 't',
    symbol: 'R_100',
  };

  let api;
  let bot;
  const token = 'nmjKBPWxM00E8Fh';
  before(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
    observer.eventActionMap = {};
    api = new CustomApi(mockWebsocket);
    bot = new Bot(api);
    bot.initPromise.then(() => {
      done();
    });
  });
  it('initialize bot with the symbols', () => {
    const markets = bot.symbol.activeSymbols.getMarkets();
    expect(markets).to.be.an('Object')
      .and.to.have.property('forex');
  });
  describe('Bot cannot start with a fake token', () => {
    let error;
    before(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('api.error', (_error) => {
        error = _error;
        done();
      }, true);
      bot.start('FakeToken', null, null, null, null);
    });
    it('fake token should cause an error', () => {
      expect(error).to.have.deep.property('.code')
        .that.is.equal('InvalidToken');
    });
  });
  describe('Start trading', () => {
    before(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('bot.waiting_for_purchase', () => {
        done();
      }, true);
      observer.register('bot.stop', () => {
        bot.start(token, option, () => {}, () => {}, () => {});
      }, true);
      bot.stop();
    });
    it('start bot with the token, option', () => {});
  });
  describe('Start the trade without real finish and strategy functions', () => {
    before(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('bot.stop', () => {
        bot.initPromise.then(() => {
          observer.register('bot.waiting_for_purchase', () => {
            done();
          }, true);
          bot.start(token, option, () => {}, () => {}, () => {});
        });
      }, true);
      bot.stop();
    });
    it('It is possible to restart the trade', () => {});
  });
  describe('Start the trade with real finish and strategy functions', () => {
    let finishedContractFromFinishFunction;
    let finishedContractFromFinishSignal;
    let numOfTicks = 0;
    before(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      this.timeout('20000');
      observer.register('bot.stop', () => {
        bot.initPromise.then(() => {
          observer.register('bot.finish', (_finishedContractFromFinishSignal) => {
            finishedContractFromFinishSignal = _finishedContractFromFinishSignal;
            done();
          }, true);
          bot.start(token, option, (tick, proposals, _purchaseCtrl) => {
            if (!_purchaseCtrl) return;
            if (++numOfTicks === 3) {
              _purchaseCtrl.purchase('DIGITEVEN');
            }
          }, () => {}, (_finishedContract) => {
            finishedContractFromFinishFunction = _finishedContract;
          });
        });
      }, true);
      bot.stop();
    });
    it('Strategy decides to purchase the trade', () => {});
    it('Calls the finish function when trade is finished', () => {
      expect(finishedContractFromFinishSignal).to.be.equal(finishedContractFromFinishFunction);
    });
  });
  describe('Trade again', () => {
    let finishedContractFromFinishFunction;
    let finishedContractFromFinishSignal;
    let numOfTicks = 0;
    before(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      bot.start(token, option, (tick, proposals, _purchaseCtrl) => {
        if (++numOfTicks === 3) {
          _purchaseCtrl.purchase('DIGITEVEN');
        }
      }, () => {}, (_finishedContract) => {
        finishedContractFromFinishFunction = _finishedContract;
      });
      observer.register('bot.stop', (_finishedContractFromFinishSignal) => {
        finishedContractFromFinishSignal = _finishedContractFromFinishSignal;
        done();
      }, true);
      bot.stop();
    });
    it('Strategy decides to purchase the trade', () => {});
    it('Calls the finish function when trade is finished', () => {
      expect(finishedContractFromFinishSignal).to.be.equal(finishedContractFromFinishFunction);
    });
  });
  after(function afterAll(done) { // eslint-disable-line prefer-arrow-callback
    observer.register('bot.stop', () => {
      observer.destroy();
      api.destroy();
      done();
    });
    bot.stop();
  });
});
