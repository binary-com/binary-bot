import { get as getStorage, set as setStorage } from '../common/utils/storageManager';
import { generateWebSocketURL, getDefaultEndpoint, generateTestLiveApiInstance } from '../common/appId';
import { translate } from '../common/utils/tools';

if (document.location.href.endsWith('/endpoint')) {
    window.location.replace(`${document.location.href}.html`);
    throw new Error('Unexpected URL.'); // To prevent URL replace in index and further execution
}

const MessageProperties = {
    connected: () => `<b>Connected to the Endpoint ${getStorage('config.server_url')}!</b>`,
    error    : () => `Unable to connect to ${getStorage('config.server_url')}. Switching connection to default endpoint.`,
};

export default function endpoint() {
    if (!document.location.href.match(/endpoint\.html/)) return false;
    $(document).ready(() => {
        $('#error').hide();
        $('#connected').hide();

        $('#new_endpoint').click(addEndpoint);
        $('#reset').click(resetEndpoint);

        init();
    });
    return true;
}

let api; // to close the error connection
async function checkConnection(appId, apiUrl) {
    if (api && api.disconnect) {
        api.disconnect();
    }
    api = generateTestLiveApiInstance({
        appId,
        apiUrl: generateWebSocketURL(apiUrl),
    });
    try {
        await api.ping();
        $('#connected')
            .html(MessageProperties.connected())
            .show();
    } catch (e) {
        $('#error')
            .html(MessageProperties.error())
            .show();
        resetEndpoint();
        init();
        checkConnection(getDefaultEndpoint().appId, getDefaultEndpoint().url);
    }
}

function init() {
    const serverUrl = getStorage('config.server_url');
    $('#server_url').val(serverUrl || getDefaultEndpoint().url);
    $('#app_id').val(getStorage('config.app_id') || getDefaultEndpoint().appId);
}

function addEndpoint(e) {
    $('#error').hide();
    $('#connected').hide();
    e.preventDefault();
    const serverUrl = $('#server_url').val();
    const appId = $('#app_id').val();
    setStorage('config.server_url', serverUrl);
    setStorage('config.app_id', appId);

    const urlReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w-._~:?#[\]@!$&'()*+,;=.]+$/;

    if (!urlReg.test(serverUrl)) {
        $('#error')
            .html(translate('Please enter a valid server URL'))
            .show();
        return;
    }

    checkConnection(appId, serverUrl);
}

function resetEndpoint() {
    setStorage('config.app_id', getDefaultEndpoint().appId);
    setStorage('config.server_url', getDefaultEndpoint().url);
}
