import { roundBalance } from '../../common/tools';
import { info } from '../broadcast';
import { observer as globalObserver } from '../../../common/utils/observer';

export default Engine =>
    class Balance extends Engine {
        observeBalance() {
            this.listen('balance', data => {
                const { balance: b, currency } = data.balance;
                const balance = roundBalance({ currency, balance: b });
                const balanceStr = `${balance} ${currency}`;

                globalObserver.setState({ balance, currency });

                info({ accountID: this.accountInfo.loginid, balance: balanceStr });
            });
        }
        // eslint-disable-next-line class-methods-use-this
        getBalance(type) {
            const balance = globalObserver.getState('balance');
            const balanceStr = `${balance}`;
            return type === 'STR' ? balanceStr : Number(balance);
        }
    };
