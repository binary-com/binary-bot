/* global google,gapi */
import { getLanguage } from '../lang';
import { observer as globalObserver } from '../utils/observer';
import { translate, errLogger, loadExternalScript } from '../utils/tools';
import GD_CONFIG from '../../botPage/common/google_drive_config';
import { load } from '../../botPage/view/blockly';
import { TrackJSError } from '../../botPage/view/logger';
import store from '../../botPage/view/deriv/store';
import { setGdReady } from '../../botPage/view/deriv/store/ui-slice';
import { setGdLoggedIn } from '../../botPage/view/deriv/store/client-slice';

const getPickerLanguage = () => {
    const language = getLanguage();

    if (language === 'zhTw') return 'zh-TW';
    if (language === 'zhCn') return 'zh-CN';

    return language;
};
// [TODO]: Refactor to a function or improve it by TS
class GoogleDriveUtil {
    constructor(
        client_id = GD_CONFIG.CLIENT_ID,
        api_key = GD_CONFIG.API_KEY,
        app_id = GD_CONFIG.APP_ID,
        api_url = GD_CONFIG.API_URL,
        auth_scope = GD_CONFIG.AUTH_SCOPE,
        scope = GD_CONFIG.SCOPE,
        discovery_docs = GD_CONFIG.DISCOVERY_DOCS,
        bot_folder = `Binary Bot - ${translate('Strategies')}`
    ) {
        this.client_id = client_id;
        this.api_key = api_key;
        this.app_id = app_id;
        this.api_url = api_url;
        this.auth_scope = auth_scope;
        this.scope = scope;
        this.discovery_docs = discovery_docs;
        this.bot_folder = bot_folder;
        this.auth = null;
        this.is_authorized = false;
        this.profile = null;
        // Fetch Google API script and initialize class fields
        loadExternalScript(this.api_url)
            .then(this.init)
            .catch(err => errLogger(err, translate('There was an error loading Google API script.')));
    }

    init = () => {
        gapi.load(this.auth_scope, {
            callback: () => {
                gapi.client
                    .init({
                        apiKey: this.api_key,
                        clientId: this.client_id,
                        scope: this.scope,
                        discoveryDocs: this.discovery_docs,
                    })
                    .then(
                        () => {
                            this.auth = gapi.auth2.getAuthInstance();
                            if(this.auth) {
                                this.auth.isSignedIn.listen(is_logged_in => this.updateLoginStatus(is_logged_in));
                                this.updateLoginStatus(this.auth.isSignedIn.get());
                                store.dispatch(setGdReady(true));
                            }
                        },
                        error => errLogger(error, translate('There was an error initialising Google Drive.'))
                    );
            },
            onerror: error => errLogger(error, translate('There was an error loading Google Drive libraries')),
        });
    };

    updateLoginStatus(is_logged_in) {
        if (is_logged_in) this.profile = this.auth.currentUser.get().getBasicProfile();
        else this.profile = null;

        store.dispatch(setGdLoggedIn(is_logged_in));
        this.is_authorized = is_logged_in;
    }

    authorise() {
        return new Promise((resolve, reject) => {
            if (this.is_authorized) {
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
        if (this.is_authorized) this.auth.signOut();
    }

    createFilePickerView({
        title,
        afterAuthCallback,
        mime_type,
        pickerCallback,
        generalCallback,
        rejectCallback,
        generalRejectCallback,
    }) {
        this.authorise()
            .then(() => {
                afterAuthCallback()
                    .then(() => {
                        const view = new google.picker.DocsView();
                        view.setIncludeFolders(true)
                            .setSelectFolderEnabled(true)
                            .setMimeTypes(mime_type);

                        const picker = new google.picker.PickerBuilder();
                        picker
                            .setOrigin(`${window.location.protocol}//${window.location.host}`)
                            .setTitle(translate(title))
                            .addView(view)
                            .setLocale(getPickerLanguage())
                            .setAppId(this.app_id)
                            .setOAuthToken(gapi.auth.getToken().access_token)
                            .setDeveloperKey(this.api_key)
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
                    const file_id = data.docs[0].id;

                    gapi.client.drive.files
                        .get({
                            alt: 'media',
                            fileId: file_id,
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
                title: translate('Select a Binary Bot strategy'),
                afterAuthCallback: gapi.client.drive.files.list,
                mime_type: ['text/xml', 'application/xml'],
                pickerCallback: userPickedFile,
                generalCallback: resolve,
                rejectCallback: err => {
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
            });
        });
    }

    getDefaultFolderId() {
        return new Promise((resolve, reject) => {
            // Avoid duplicate auth flow by checking if user is already authed
            Promise.all(!this.is_authorized ? this.authorise : [])
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
                                    name: this.bot_folder,
                                    mimeType: 'application/vnd.google-apps.folder',
                                    fields: 'id',
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
                    const folder_id = data.docs[0].id;
                    const strategy_file = new Blob([options.content], { type: options.mimeType });
                    const strategy_file_metadata = JSON.stringify({
                        name: options.name,
                        mimeType: options.mimeType,
                        parents: [folder_id],
                    });

                    const form_data = new FormData();
                    form_data.append('metadata', new Blob([strategy_file_metadata], { type: 'application/json' }));
                    form_data.append('file', strategy_file);

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
                    xhr.send(form_data);
                    return;
                }
                if (data.action === google.picker.Action.CANCEL) reject();
            };

            this.createFilePickerView({
                title: translate('Select a folder'),
                afterAuthCallback: this.getDefaultFolderId.bind(this),
                mime_type: 'application/vnd.google-apps.folder',
                pickerCallback: savePickerCallback,
                rejectCallback: reject,
                generalRejectCallback: reject,
            });
        });
    }
}

const google_drive_util = new GoogleDriveUtil();

export default google_drive_util;
