import { notify } from '../broadcast';
import { translate } from '../../../common/i18n';
import { observer as globalObserver } from '../../../common/utils/observer';

export default Interface =>
    class extends Interface {
        notifyTelegram(accessToken, chatId, message) {
            const url = encodeURI(
                `https://api.telegram.org/bot${accessToken}/sendMessage?chat_id=${chatId}&text=${message}`
            );
            const onError = () => notify('warn', translate('The Telegram notification could not be sent'));

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        onError();
                    }
                })
                .catch(onError);
        }

        getMiscInterface() {
            return {
                notify        : args => globalObserver.emit('Notify', args),
                notifyTelegram: this.notifyTelegram,
                getTotalRuns  : () => this.tradeEngine.getTotalRuns(),
                getBalance    : type => this.tradeEngine.getBalance(type),
                getTotalProfit: () => this.tradeEngine.getTotalProfit(),
            };
        }
    };
