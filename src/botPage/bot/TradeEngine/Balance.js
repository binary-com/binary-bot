import { roundBalance } from '../../common/tools';
import { info } from '../broadcast';
import { observer as globalObserver } from '../../../common/utils/observer';

export default Engine =>
    class Balance extends Engine {
        observeBalance() {
            this.api.onMessage().subscribe(({ data }) => {
                if (data?.msg_type === 'balance') {
                    const { currency } = data.balance;
                    const balance = roundBalance({ currency, balance: data.balance.balance });
                    const balance_str = `${balance} ${currency}`;

                    globalObserver.setState({ balance, currency });
                    info({ accountID: this.accountInfo.loginid, balance: balance_str });
                }
            });
        }
        // eslint-disable-next-line class-methods-use-this
        getBalance(type) {
            const balance = globalObserver.getState('balance');
            const balance_str = `${balance}`;
            return type === 'STR' ? balance_str : Number(balance);
        }
    };
