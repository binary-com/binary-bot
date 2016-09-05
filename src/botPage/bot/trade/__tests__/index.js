/* eslint-disable import/no-extraneous-dependencies */
import { asyncChain } from 'binary-common-utils/lib/tools';
import CustomApi from 'binary-common-utils/lib/customApi';
import { expect } from 'chai';
import Observer from 'binary-common-utils/lib/observer';
import ws from '../../../../common/mock/websocket';
import Ticktrade from '../';

describe('Trade', () => {
  let observer;
  let api;
  let ticktrade;
  let proposal;
  let finishedContract;
  before(() => {
    observer = new Observer();
    api = new CustomApi(ws);
    ticktrade = new Ticktrade(api);
  });
  describe('Purchasing...', () => {
    let purchasedContract;
    before(function (done) {
      asyncChain()
        .pipe((chainDone) => {
          api.authorize('c9A3gPFcqQtAQDW');
          observer.register('api.authorize', () => {
            chainDone();
          }, true);
        })
        .pipe((chainDone) => {
          observer.register('api.proposal', (_proposal) => {
            proposal = _proposal;
            chainDone();
          }, true);
          api.proposal({
            amount: '1.00',
            basis: 'stake',
            contract_type: 'DIGITODD',
            currency: 'USD',
            duration: 5,
            duration_unit: 't',
            symbol: 'R_100',
          });
        })
        .pipe(() => {
          observer.register('api.buy', (_purchasedContract) => {
            purchasedContract = _purchasedContract;
            done();
          }, true);
          ticktrade.purchase(proposal);
        })
        .exec();
    });
    it('Purchased the proposal successfuly', () => {
      expect(purchasedContract).to.have.property('longcode')
        .that.is.equal('Win payout if the last digit of Volatility 100 Index is odd after 5 ticks.');
    });
  });
  describe('Getting updates', () => {
    let contractUpdates = [];
    before(function (done) {
      observer.register('trade.finish', (_contract) => {
        finishedContract = _contract;
      }, true);
      observer.register('trade.update', (contractUpdate) => {
        contractUpdates.push(contractUpdate);
        if (contractUpdates.slice(-1)[0].is_sold) {
          done();
        }
      });
    });
    it('Emits the update signal', () => {
      observer.unregisterAll('trade.update');
    });
  });
  describe('Calling finish', () => {
    it('Emits the finish signal', () => {
      expect(finishedContract).to.have.property('sell_price')
        .that.satisfy((el) => !isNaN(el));
    });
  });
  after(() => {
    observer._destroy();
  });
});
