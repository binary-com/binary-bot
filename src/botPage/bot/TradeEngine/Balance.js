import { error as broadcastError, info } from '../broadcast';
import { doUntilDone } from '../tools';

let balance = 0;
let balanceStr = '';

export default Engine =>
    class Balance extends Engine {
        subscribeToBalance() {
            doUntilDone(() => this.api.subscribeToBalance()).catch(broadcastError);

            return new Promise(r => {
                this.balancePromise = r;
            });
        }
        observeBalance() {
            this.listen('balance', r => {
                const { balance: { balance: b, currency } } = r;

                balance = +b;
                balanceStr = `${balance.toFixed(2)} ${currency}`;

                this.balancePromise();
                info({ balance: balanceStr });
            });
        }
        // eslint-disable-next-line class-methods-use-this
        getBalance(type) {
            return type === 'STR' ? balanceStr : balance;
        }
    };
