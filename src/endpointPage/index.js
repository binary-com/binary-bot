import { get as getStorage, set as setStorage } from 'binary-common-utils/lib/storageManager';

console.log('Clicked');
$('#new_endpoint').click(e => {
    const appIdMap = JSON.parse(getStorage('appIdMap') || '{}');
    const serverUrl = $('#server_url').val(),
        appId = $('#app_id').val();
    appIdMap[serverUrl] = appId;
    setStorage('appIdMap', JSON.stringify(appIdMap));
});

const resetEndpoint = () => {
    setStorage('appIdMap', '{}');
};

$('#reset').click(e => {
    resetEndpoint();
});
