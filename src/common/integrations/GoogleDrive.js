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
        apiUrl = GD_CONFIG.API_URL,
        authScope = GD_CONFIG.AUTH_SCOPE,
        scope = GD_CONFIG.SCOPE,
        discoveryDocs = GD_CONFIG.DISCOVERY_DOCS,
        botFolder = `Binary Bot - ${translate('Strategies')}`
    ) {
        this.clientId = clientId;
        this.apiKey = apiKey;
        this.appId = appId;
        this.apiUrl = apiUrl;
        this.authScope = authScope;
        this.scope = scope;
        this.discoveryDocs = discoveryDocs;
        this.botFolder = botFolder;
        this.auth = null;
        this.isAuthorized = false;
        this.profile = null;
        // Fetch Google API script and initialize class fields
        loadExternalScript(this.apiUrl)
            .then(this.init)
            .catch(err => errLogger(err, translate('There was an error loading Google API script.')));
    }

    init = () => {
        gapi.load(this.authScope, {
            callback: () => {
                gapi.client
                    .init({
                        apiKey       : this.apiKey,
                        clientId     : this.clientId,
                        scope        : this.scope,
                        discoveryDocs: this.discoveryDocs,
                    })
                    .then(
                        () => {
                            this.auth = gapi?.auth2?.getAuthInstance?.();
                            if (this.auth) {
                                this.auth.isSignedIn.listen(isLoggedIn => this.updateLoginStatus(isLoggedIn));
                                this.updateLoginStatus(this.auth.isSignedIn.get());
                                globalObserver.emit('googledrive.initialized', true);

                                $('#integrations').removeClass('invisible');
                                $('#save-google-drive')
                                    .parent()
                                    .removeClass('invisible');
                                $('#load-google-drive')
                                    .parent()
                                    .removeClass('invisible');
                            }
                        },
                        error => errLogger(error, translate('There was an error initialising Google Drive.'))
                    );
            },
            onerror: error => errLogger(error, translate('There was an error loading Google Drive libraries')),
        });
    };

    updateLoginStatus(isLoggedIn) {
        if (isLoggedIn) this.profile = this.auth.currentUser.get().getBasicProfile();
        else this.profile = null;

        globalObserver.emit('googledrive.authorised', isLoggedIn);
        this.isAuthorized = isLoggedIn;
    }

    authorise() {
        return new Promise((resolve, reject) => {
            if (this.isAuthorized) {
                resolve();
                return;
            }
            this.auth
                .signIn({ prompt: 'select_account' })
                .then(resolve)
                .catch(response => {
                    if (response.error === 'access_denied') {
                        globalObserver.emit(
                            'ui.log.warn',
                            translate('Please grant permission to view and manage your Google Drive files')
                        );
                        return;
                    }
                    if (response.error !== 'popup_closed_by_user') reject(response);
                });
        });
    }

    logout() {
        if (this.isAuthorized) this.auth.signOut();
    }

    createFilePickerView({
        title,
        afterAuthCallback,
        mimeType,
        pickerCallback,
        generalCallback,
        rejectCallback,
        generalRejectCallback,
        selectFolderEnabled = true,
    }) {
        this.authorise()
            .then(() => {
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
                            .setOAuthToken(gapi.auth.getToken().access_token)
                            .setDeveloperKey(this.apiKey)
                            .setCallback(pickerCallback)
                            .build()
                            .setVisible(true);
                        if (typeof generalCallback === 'function') generalCallback();
                    })
                    .catch(rejectCallback);
            })
            .catch(generalRejectCallback);
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
                            if (err.status && err.status === 401) this.logout();

                            const error = new TrackJSError(
                                'GoogleDrive',
                                translate('There was an error retrieving data from Google Drive'),
                                err
                            );

                            globalObserver.emit('Error', error);
                            reject(error);
                        });
                } else if (data.action === google.picker.Action.CANCEL) reject();
            };

            this.createFilePickerView({
                title            : translate('Select a Binary Bot strategy'),
                afterAuthCallback: gapi.client.drive.files.list,
                mimeType         : ['text/xml', 'application/xml'],
                pickerCallback   : userPickedFile,
                generalCallback  : resolve,
                rejectCallback   : err => {
                    if (err.status && err.status === 401) this.logout();

                    const error = new TrackJSError(
                        'GoogleDrive',
                        translate('There was an error listing files from Google Drive'),
                        err
                    );
                    globalObserver.emit('Error', error);
                    reject(error);
                },
                generalRejectCallback: reject,
                selectFolderEnabled  : false,
            });
        });
    }

    getDefaultFolderId() {
        return new Promise((resolve, reject) => {
            // Avoid duplicate auth flow by checking if user is already authed
            Promise.all(!this.isAuthorized ? this.authorise : [])
                .then(() => {
                    // eslint-disable-next-line
                    gapi.client.drive.files.list({ q: 'trashed=false' }).then(response => {
                        const folder = response.result.files.find(
                            file => file.mimeType === 'application/vnd.google-apps.folder'
                        );

                        if (folder) return resolve();

                        gapi.client.drive.files
                            .create({
                                resource: {
                                    name    : this.botFolder,
                                    mimeType: 'application/vnd.google-apps.folder',
                                    fields  : 'id',
                                },
                            })
                            .then(resolve)
                            .catch(err => {
                                if (err?.status === 401) this.logout();

                                const error = new TrackJSError(
                                    'GoogleDrive',
                                    translate('There was an error retrieving files from Google Drive'),
                                    err
                                );
                                globalObserver.emit('Error', error);
                                reject(error);
                            });
                    });
                })
                .catch(() => {
                    /* Auth error, already handled in authorise()-promise */
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
                    xhr.setRequestHeader('Authorization', `Bearer ${gapi.auth.getToken().access_token}`);
                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            resolve();
                            return;
                        }
                        if (xhr.status === 401) this.logout();
                        const error = new TrackJSError(
                            'GoogleDrive',
                            translate('There was an error processing your request'),
                            xhr
                        );
                        globalObserver.emit('Error', error);
                        reject(error);
                    };
                    xhr.send(formData);
                    return;
                }
                if (data.action === google.picker.Action.CANCEL) reject();
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
