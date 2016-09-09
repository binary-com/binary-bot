import CustomApi from 'binary-common-utils/lib/customApi';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { observer } from 'binary-common-utils/lib/observer';
import ws from '../../../common/mock/websocket';
import StrategyCtrl from '../strategyCtrl';

describe('StrategyCtrl', () => {
  let api;
  let proposals = [];
  let firstAttempt = true;
  let strategyCtrl;
  before(() => {
    observer.eventActionMap = {};
    api = new CustomApi(ws);
    let strategy = (ticks, receivedProposals, _strategyCtrl) => {
      if (receivedProposals) {
        if (firstAttempt) {
          firstAttempt = false;
          observer.emit('test.strategy', {
            ticks,
            proposals: receivedProposals,
          });
        } else {
          observer.emit('test.purchase');
          _strategyCtrl.purchase('DIGITEVEN');
        }
      } else {
        observer.emit('test.strategy', {
          ticks,
          proposals: receivedProposals,
        });
      }
    };
    strategyCtrl = new StrategyCtrl(api, strategy);
  });
  describe('Make the strategy ready...', () => {
    before(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('strategy.ready', () => {
        done();
      }, true);
      observer.register('api.proposal', (_proposal) => {
        proposals.push(_proposal);
        strategyCtrl.updateProposal(_proposal);
      });
      observer.register('api.authorize', () => {
        observer.register('api.proposal', () => {
          observer.register('api.proposal', () => {
          }, true);
          api.proposal({
            amount: '1.00',
            basis: 'stake',
            contract_type: 'DIGITEVEN',
            currency: 'USD',
            duration: 5,
            duration_unit: 't',
            symbol: 'R_100',
          });
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
      }, true);
      api.authorize('nmjKBPWxM00E8Fh');
    });
    it('Strategy gets ready when two proposals are available', () => {
    });
  });
  describe('Adding the ticks to the strategy...', () => {
    let strategyArgs;
    before(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('test.strategy', (_strategyArgs) => {
        strategyArgs = _strategyArgs;
        done();
      }, true);
      strategyCtrl.updateTicks({
        ticks: [{
          epoch: 'some time',
          quote: 1,
        }, {
          epoch: 'some time',
          quote: 2,
        }],
      });
    });
    it('strategyCtrl passes ticks and send the proposals if ready', () => {
      expect(strategyArgs.ticks.ticks.slice(-1)[0]).to.have.property('epoch');
      expect(strategyArgs).to.have.deep.property('.proposals.DIGITODD.longcode')
        .that.is.equal('Win payout if the last digit of Volatility 100 Index is odd after 5 ticks.');
    });
  });
  describe('Waiting for strategy to purchase the contract', () => {
    before(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('test.purchase', () => {
        done();
      }, true);
      strategyCtrl.updateProposal(proposals[1]);
      strategyCtrl.updateTicks({
        ticks: [{
          epoch: 'some time',
          quote: 1,
        }, {
          epoch: 'some time',
          quote: 2,
        }],
      });
    });
    it('strategy will buy the proposal whenever decided', () => {
    });
  });
  describe('Waiting for purchase to be finished', () => {
    let finishedContract;
    before(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('strategy.finish', (_finishedContract) => {
        finishedContract = _finishedContract;
        done();
      }, true);
      strategyCtrl.updateTicks({
        ticks: [{
          epoch: 'some time',
          quote: 1,
        }, {
          epoch: 'some time',
          quote: 2,
        }],
      });
    });
    it('finish is called whenever the purchase is finished', () => {
      expect(finishedContract).to.have.property('sell_price')
        .that.satisfy((price) => !isNaN(price));
    });
  });
});
