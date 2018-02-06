import { get as getStorage, set as setStorage } from 'binary-common-utils/lib/storageManager';
import { getDefaultEndpoint, generateLiveApiInstance } from '../common/appId';

let api;
const initConnection = () => {
    if (api && api.disconnect) {
        api.disconnect();
    }
    api = generateLiveApiInstance();
    api.socket.onopen = () => {
        $('#connected')
            .html(MessageProperties.connected())
            .show();
    };
    api.socket.onerror = () => {
        $('#error')
            .html(MessageProperties.error())
            .show();
        EventHandlers.resetEndpoint();
        init();
        initConnection();
    };
};

const init = () => {
    const serverUrl = getStorage('config.server_url');
    $('#server_url').val(serverUrl || getDefaultEndpoint().url);
    $('#app_id').val(getStorage('config.app_id') || getDefaultEndpoint().appId);
};

let MessageProperties = {
    connected: () => `<b>Connected to the Endpoint ${getStorage('config.server_url')}!</b>`,
    error    : () => `Unable to connect to ${getStorage('config.server_url')}. Switching connection to default endpoint.`,
};

const EventHandlers = {};

EventHandlers.newEndpoint = e => {
    $('#error').hide();
    $('#connected').hide();
    e.preventDefault();
    const serverUrl = $('#server_url').val();
    const appId = $('#app_id').val();
    setStorage('config.server_url', serverUrl);
    setStorage('config.app_id', appId);

    initConnection();
};

EventHandlers.resetEndpoint = () => {
    setStorage('config.app_id', getDefaultEndpoint().appId);
    setStorage('config.server_url', getDefaultEndpoint().url);
};

export default function endpoint() {
    if (!document.location.href.match(/endpoint\.html/)) return false;
    $(document).ready(() => {
        $('#error').hide();
        $('#connected').hide();

        $('#new_endpoint').click(EventHandlers.newEndpoint);
        $('#reset').click(EventHandlers.resetEndpoint);

        init();
    });
    return true;
}
