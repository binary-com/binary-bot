import { get as getStorage, set as setStorage } from 'binary-common-utils/lib/storageManager';

export default function endpoint() {
    if (!document.location.href.match(/endpoint\.html/)) return false;
    $(document).ready(() => {
        $('#new_endpoint').click(() => {
            const serverUrl = $('#server_url').val();
            const appId = $('#app_id').val();
            setStorage('config.server_url', serverUrl);
            setStorage('config.app_id', appId);
        });

        const resetEndpoint = () => {
            setStorage('config.app_id', '');
            setStorage('config.server_url', '');
        };

        $('#reset').click(() => {
            resetEndpoint();
        });

        const init = () => {
            const serverUrl = getStorage('config.server_url');
            $('#server_url').val(serverUrl || 'frontend.binaryws.com');
            $('#app_id').val(getStorage('config.app_id') || '1');
        };
        init();
    });
    return true;
}
