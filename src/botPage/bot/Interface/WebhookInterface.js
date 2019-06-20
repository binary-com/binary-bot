import { notify } from '../broadcast';
import { translate } from '../../../common/i18n';

export default Interface =>
    class extends Interface {
        // eslint-disable-next-line class-methods-use-this
        sendWebhook(url, payload) {
            const onError = () => notify('warn', translate('The webhook could not be sent'));

            fetch(`${url}`, {
                method : 'POST',
                mode   : 'cors',
                headers: { 'Content-Type': 'application/json' },
                body   : JSON.stringify(payload),
            })
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
