import { expect } from 'chai';
import Interface from '../Interface';
import { createScope } from '../cli';

const $scope = createScope();

const botInterface = new Interface($scope);

const Bot = botInterface.getInterface('Bot');

const { watch, alert } = botInterface.getInterface();

describe('Interface', () => {
  it('alert should not be native', () => {
    expect(alert.toString().includes('native')).equal(false);
  });
  it('isInside should check if the api is inside the context', () => {
    expect(botInterface.tradeEngine.scope).not.equal('before');
  });
  describe('Bot can be started correctly', () => {
    let stay;

    beforeAll(done => {
      Bot.init('Xkq6oGFEHh6hJH8', {
        candleInterval: 60,
        contractTypes: ['DIGITEVEN', 'DIGITODD'],
        symbol: 'R_100',
      });

      Bot.start({
        amount: 1,
        currency: 'USD',
        duration: 5,
        duration_unit: 't',
      });

      watch('before').then(c => {
        stay = c;
        done();
      });
    });

    it('context is inside before', () => {
      expect(botInterface.tradeEngine.scope).equal('before');
    });

    it('Loop stayed on correctly', () => {
      expect(stay).equal(true);
    });
  });
});
