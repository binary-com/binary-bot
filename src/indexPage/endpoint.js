import { get as getStorage, set as setStorage } from 'binary-common-utils/lib/storageManager';
import { getDefaultEndpoint, generateLiveApiInstance } from '../common/appId';

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

async function initConnection() {
    let api;
    if (api && api.disconnect) {
        api.disconnect();
    }
    api = generateLiveApiInstance();
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
        initConnection();
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

    initConnection();
}

function resetEndpoint() {
    setStorage('config.app_id', getDefaultEndpoint().appId);
    setStorage('config.server_url', getDefaultEndpoint().url);
}
