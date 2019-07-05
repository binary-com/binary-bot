import { notify } from '../broadcast';
import { translate } from '../../../common/i18n';
import { observer as globalObserver } from '../../../common/utils/observer';

export default Interface =>
    class extends Interface {
        // eslint-disable-next-line class-methods-use-this
        notifyTelegram(accessToken, chatId, text) {
            const url = `https://api.telegram.org/bot${accessToken}/sendMessage`;
            const onError = () => notify('warn', translate('The Telegram notification could not be sent'));

            fetch(url, {
                method : 'POST',
                mode   : 'cors',
                headers: { 'Content-Type': 'application/json' },
                body   : JSON.stringify({ chat_id: chatId, text }),
            })
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
                getTotalProfit: toString =>
                    this.tradeEngine.getTotalProfit(toString, this.tradeEngine.tradeOptions.currency),
            };
        }
    };
