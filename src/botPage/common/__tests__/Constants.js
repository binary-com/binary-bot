import config, { updateConfigCurrencies } from '../const';

describe('Configured currencies', () => {
    let configuration;

    beforeEach(() => {
        configuration = config;
    });

    it('Retrieves a list of available currencies for payout', () => {
        updateConfigCurrencies().then(() => {
            expect(configuration.lists.CURRENCY).toBeDefined();
        });
    });
});
