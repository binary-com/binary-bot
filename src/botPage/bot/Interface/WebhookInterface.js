import { notify } from '../broadcast';
import { translate } from '../../../common/i18n';

export default Interface =>
    class extends Interface {
        // eslint-disable-next-line class-methods-use-this
        sendWebhook(url, payload) {
            const onError = () => notify('warn', translate('Unable to send webhook'));
            const fetchOption = {
                method : 'POST',
                mode   : 'cors',
                headers: { 'Content-Type': 'application/json' },
            };

            if (payload) {
                fetchOption.body = JSON.stringify(payload);
            }

            fetch(url, fetchOption)
                .then(response => {
                    if (!response.ok) {
                        onError();
                    }
                })
                .catch(onError);
        }

        getWebhookInterface() {
            return {
                sendWebhook: this.sendWebhook,
            };
        }
    };
