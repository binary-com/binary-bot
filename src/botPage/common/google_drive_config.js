export default {
    CLIENT_ID: process.env.GD_CLIENT_ID,
    API_KEY: process.env.GD_API_KEY,
    APP_ID: process.env.GD_APP_ID,
    API_URL: 'https://apis.google.com/js/api.js',
    AUTH_SCOPE: 'client:auth2:picker',
    SCOPE: 'https://www.googleapis.com/auth/drive.file',
    DISCOVERY_DOCS: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
};
