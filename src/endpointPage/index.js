import { get as getStorage, set as setStorage } from 'binary-common-utils/lib/storageManager';

$('#new_endpoint').click(() => {
    const appIdMap = JSON.parse(getStorage('appIdMap') || '{}');
    const serverUrl = $('#server_url').val();
    const appId = $('#app_id').val();
    appIdMap[serverUrl] = appId;
    setStorage('appIdMap', JSON.stringify(appIdMap));
});

const resetEndpoint = () => {
    setStorage('appIdMap', '{}');
};

$('#reset').click(() => {
    resetEndpoint();
});
