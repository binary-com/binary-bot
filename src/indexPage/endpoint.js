import { get as getStorage, set as setStorage } from 'binary-common-utils/lib/storageManager';
import { LiveApi } from 'binary-live-api';
import { getWebSocketURL, getDefaultEndpoint } from '../common/appId';

export default function endpoint() {
    if (!document.location.href.match(/endpoint\.html/)) return false;
    $(document).ready(() => {
        $('#error').hide();
        let api;
        const initConnection = () => {
            if (api && api.disconnect) {
                api.disconnect();
            }
            api = new LiveApi({
                apiUrl  : getWebSocketURL(),
                language: 'en',
                appId   : getStorage('config.app_id'),
            });
            api.socket.onerror = () => {
                $('#error').show();
                resetEndpoint();
                init();
                initConnection();
            };
        };
        $('#new_endpoint').click(e => {
            $('#error').hide();
            e.preventDefault();
            const serverUrl = $('#server_url').val();
            const appId = $('#app_id').val();
            setStorage('config.server_url', serverUrl);
            setStorage('config.app_id', appId);

            initConnection();
        });

        const resetEndpoint = () => {
            setStorage('config.app_id', getDefaultEndpoint().appId);
            setStorage('config.server_url', getDefaultEndpoint().url);
        };

        $('#reset').click(() => {
            resetEndpoint();
        });

        const init = () => {
            const serverUrl = getStorage('config.server_url');
            $('#server_url').val(serverUrl || getDefaultEndpoint().url);
            $('#app_id').val(getStorage('config.app_id') || getDefaultEndpoint().appId);
        };
        init();
    });
    return true;
}
