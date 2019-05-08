import { roundBalance } from '../../common/tools';
import { info } from '../broadcast';
import { doUntilDone } from '../tools';

let balanceStr = '';

export default Engine =>
    class Balance extends Engine {
        observeBalance() {
            this.listen('balance', r => {
                const {
                    balance: { balance: b, currency },
                } = r;

                this.balance = roundBalance({ currency, balance: b });
                balanceStr = `${this.balance} ${currency}`;

                info({ accountID: this.accountInfo.loginid, balance: balanceStr });
            });
        }
        // eslint-disable-next-line class-methods-use-this
        getBalance(type) {
            const { scope } = this.store.getState();

            // Deduct trade `amount` in this scope for correct value in `balance`-block
            if (scope === 'BEFORE_PURCHASE') {
                this.balance = roundBalance({
                    currency: this.tradeOptions.currency,
                    balance : Number(this.balance) - this.tradeOptions.amount,
                });
                balanceStr = `${this.balance} ${this.tradeOptions.currency}`;
            }

            return type === 'STR' ? balanceStr : Number(this.balance);
        }
    };
