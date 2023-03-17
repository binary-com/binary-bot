/* global google,gapi */
import { getLanguage } from '../lang';
import { observer as globalObserver } from '../utils/observer';
import { errLogger, loadExternalScript } from '../utils/tools';
import GD_CONFIG from '../../botPage/common/google_drive_config';
import { load } from '../../botPage/view/blockly';
import { TrackJSError } from '../../botPage/view/logger';
import { translate } from '../i18n';

const getPickerLanguage = () => {
    const language = getLanguage();

    if (language === 'zhTw') return 'zh-TW';
    if (language === 'zhCn') return 'zh-CN';

    return language;
};

// [TODO]: Refactor to a function or improve it by TS
class GoogleDriveUtil {
    constructor(
        clientId = GD_CONFIG.CLIENT_ID,
        apiKey = GD_CONFIG.API_KEY,
        appId = GD_CONFIG.APP_ID,
        apiUrlIdentity = GD_CONFIG.API_URL_IDENTITY,
        apiUrlGdrive = GD_CONFIG.API_URL_GDRIVE,
        authScope = GD_CONFIG.AUTH_SCOPE,
        scope = GD_CONFIG.SCOPE,
        discoveryDocs = GD_CONFIG.DISCOVERY_DOCS,
        botFolder = `Binary Bot - ${translate('Strategies')}`
    ) {
        this.clientId = clientId;
        this.apiKey = apiKey;
        this.appId = appId;
        this.apiUrlIdentity = apiUrlIdentity;
        this.apiUrlGdrive = apiUrlGdrive;
        this.authScope = authScope;
        this.scope = scope;
        this.discoveryDocs = discoveryDocs;
        this.botFolder = botFolder;
        this.auth = null;
        this.isAuthorized = false;
        this.client = '';
        this.accessToken = '';
        // Fetch Google API script and initialize class fields
        loadExternalScript(this.apiUrlIdentity)
            .then(() => this.initUrlIdentity())
            .catch(err => errLogger(err, translate('There was an error loading Google Identity API script.')));
        loadExternalScript(this.apiUrlGdrive)
            .then(() =>
                gapi.load(this.authScope, async () => {
                    await gapi.client.load(...this.discoveryDocs);
                })
            )
            .then(() => {
                globalObserver.emit('googledrive.initialized', true);

                $('#integrations').removeClass('invisible');
                $('#save-google-drive')
                    .parent()
                    .removeClass('invisible');
                $('#load-google-drive')
                    .parent()
                    .removeClass('invisible');
            })
            .catch(err => {
                errLogger(err, translate('There was an error loading Google Drive API script.'));
            });
    }

    initUrlIdentity = () => {
        this.accessToken = localStorage.getItem('accessToken') || null;
        if (localStorage.getItem('accessToken')) {
            this.updateLoginStatus(true);
        }
        this.client = google.accounts.oauth2.initTokenClient({
            client_id: GD_CONFIG.CLIENT_ID,
            scope    : GD_CONFIG.SCOPE,
            callback : response => {
                this.accessToken = response.access_token;
                localStorage.setItem('accessToken', this.accessToken);
                this.updateLoginStatus(true);
            },
        });
    };

    login = () => {
        if (!this.accessToken) {
            gapi.client.setToken('');
            this.client.callback = response => {
                this.accessToken = response.access_token;
                localStorage.setItem('accessToken', this.accessToken);
                this.updateLoginStatus(true);
            };
            this.client.requestAccessToken({ prompt: '' });
        }
    };

    updateLoginStatus(isLoggedIn) {
        globalObserver.emit('googledrive.authorised', isLoggedIn);
        this.isAuthorized = isLoggedIn;
    }

    logout = () => {
        if (this.accessToken) {
            this.updateLoginStatus(false);
            if (localStorage.getItem('accessToken')) localStorage.removeItem('accessToken');
            if (this.accessToken) {
                gapi.client.setToken('');
                google.accounts.oauth2.revoke(this.accessToken);
            }
            this.accessToken = '';
        }
    };

    listFiles = async () => {
        try {
            await gapi.client.drive.files.list({
                pageSize: 10,
                fields  : 'files(id, name)',
            });
        } catch (err) {
            if (err?.status === 401) {
                setTimeout(() => {
                    const picker = document.getElementsByClassName('picker-dialog-content')[0];
                    picker.parentNode.removeChild(picker);
                }, 500);
                this.client.requestAccessToken({ prompt: '' });
            }

            const error = new TrackJSError(
                'GoogleDrive',
                translate('There was an error listing files from Google Drive'),
                err
            );
            globalObserver.emit('Error', error);
        }
    };

    createFilePickerView({
        title,
        afterAuthCallback,
        mimeType,
        pickerCallback,
        generalCallback,
        rejectCallback,
        selectFolderEnabled = true,
    }) {
        afterAuthCallback()
            .then(() => {
                const view = new google.picker.DocsView();
                view.setIncludeFolders(true)
                    .setSelectFolderEnabled(selectFolderEnabled)
                    .setMimeTypes(mimeType);

                const picker = new google.picker.PickerBuilder();
                picker
                    .setOrigin(`${window.location.protocol}//${window.location.host}`)
                    .setTitle(translate(title))
                    .addView(view)
                    .setLocale(getPickerLanguage())
                    .setAppId(this.appId)
                    .setOAuthToken(this.accessToken)
                    .setDeveloperKey(this.apiKey)
                    .setCallback(pickerCallback)
                    .build()
                    .setVisible(true);
                if (typeof generalCallback === 'function') generalCallback();
            })
            .catch(rejectCallback);
    }

    createFilePicker() {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line consistent-return
            const userPickedFile = data => {
                if (data.action === google.picker.Action.PICKED) {
                    const fileId = data.docs[0].id;

                    gapi.client.drive.files
                        .get({
                            alt     : 'media',
                            fileId,
                            mimeType: 'text/plain',
                        })
                        .then(response => {
                            try {
                                load(response.body);
                            } catch (err) {
                                const error = new TrackJSError(
                                    'GoogleDrive',
                                    translate('Unrecognized file format'),
                                    err
                                );
                                globalObserver.emit('Error', error);
                                reject(error);
                            }
                        })
                        .catch(err => {
                            if (err.status && err.status === 401) this.client.requestAccessToken({ prompt: '' });

                            const error = new TrackJSError(
                                'GoogleDrive',
                                translate('There was an error retrieving data from Google Drive'),
                                err
                            );

                            if (err.status && err.status !== 401) {
                                globalObserver.emit('Error', error);
                            }
                            reject(error);
                        });
                }
            };

            this.createFilePickerView({
                title            : translate('Select a Binary Bot strategy'),
                afterAuthCallback: this.listFiles,
                mimeType         : 'text/xml,application/xml',
                pickerCallback   : userPickedFile,
                generalCallback  : resolve,
                rejectCallback   : err => {
                    const error = new TrackJSError('GoogleDrive', translate(err.message), err);
                    globalObserver.emit('Error', error);
                    reject(error);
                },
            });
        });
    }

    removeGdBackground = () => {
        const pickerBackground = document.getElementsByClassName('picker-dialog-bg');
        if (pickerBackground.length) {
            for (let i = 0; i < pickerBackground.length; i++) {
                pickerBackground[i].style.display = 'none';
            }
        }
    };

    getDefaultFolderId() {
        return new Promise((resolve, reject) => {
            // Avoid duplicate auth flow by checking if user is already authed
            // eslint-disable-next-line
            gapi.client.drive.files
                .list({ q: 'trashed=false' })
                .then(response => {
                    const folder = response.result.files.find(
                        file => file.mimeType === 'application/vnd.google-apps.folder'
                    );

                    if (folder) return resolve();

                    return gapi.client.drive.files
                        .create({
                            resource: {
                                name    : this.botFolder,
                                mimeType: 'application/vnd.google-apps.folder',
                                fields  : 'id',
                            },
                        })
                        .then(resolve)
                        .catch(err => {
                            if (err?.status === 401) this.client.requestAccessToken({ prompt: '' });

                            const error = new TrackJSError(
                                'GoogleDrive',
                                translate('There was an error retrieving files from Google Drive'),
                                err
                            );
                            globalObserver.emit('Error', error);
                            reject(error);
                        });
                })
                .catch(error => {
                    if (error?.status === 401) this.client.requestAccessToken({ prompt: '' });
                });
        });
    }

    saveFile(options) {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line consistent-return
            const savePickerCallback = data => {
                if (data.action === google.picker.Action.PICKED) {
                    const folderId = data.docs[0].id;
                    const strategyFile = new Blob([options.content], { type: options.mimeType });
                    const strategyFileMetadata = JSON.stringify({
                        name    : options.name,
                        mimeType: options.mimeType,
                        parents : [folderId],
                    });

                    const formData = new FormData();
                    formData.append('metadata', new Blob([strategyFileMetadata], { type: 'application/json' }));
                    formData.append('file', strategyFile);

                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'json';
                    xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
                    xhr.setRequestHeader('Authorization', `Bearer ${this.accessToken}`);
                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            resolve();
                            return;
                        }
                        if (xhr.status === 401) this.client.requestAccessToken({ prompt: '' });
                        const error = new TrackJSError(
                            'GoogleDrive',
                            translate('There was an error processing your request'),
                            xhr
                        );
                        globalObserver.emit('Error', error);
                        reject(error);
                    };
                    xhr.send(formData);
                }
            };

            this.createFilePickerView({
                title                : translate('Select a folder'),
                afterAuthCallback    : this.getDefaultFolderId.bind(this),
                mimeType             : 'application/vnd.google-apps.folder',
                pickerCallback       : savePickerCallback,
                rejectCallback       : reject,
                generalRejectCallback: reject,
            });
        });
    }
}

const googleDriveUtil = new GoogleDriveUtil();

export default googleDriveUtil;
