/* global google,gapi */
import { getLanguage } from '../lang';
import { observer as globalObserver } from '../utils/observer';
import { translate , errLogger, loadExternalScript } from '../utils/tools';
import google_deriv_config from '../../botPage/common/google_drive_config';
import { load } from '../../botPage/view/blockly';
import { TrackJSError } from '../../botPage/view/logger';
import store from '../../botPage/view/deriv/store';
import { setGdReady } from '../../botPage/view/deriv/store/client-slice';

const getPickerLanguage = () => {
    const language = getLanguage();

    if (language === 'zhTw') return 'zh-TW';
    if (language === 'zhCn') return 'zh-CN';

    return language;
};

class GoogleDriveUtil {
    constructor(
        client_id = google_deriv_config.client_id,
        api_key = google_deriv_config.api_key,
        app_id = google_deriv_config.app_id,
        bot_folder = `Binary Bot - ${translate('Strategies')}`
    ) {
        this.client_id = client_id;
        this.api_key = api_key;
        this.app_id = app_id;
        this.bot_folder = bot_folder;
        this.auth = null;
        this.is_authorized = false;
        this.profile = null;
        // Fetch Google API script and initialize class fields
        loadExternalScript(google_deriv_config.gapi_source)
            .then(this.init)
            .catch(err => errLogger(err, 'There was an error loading Google API script.'));
    }

    init = () => {
        gapi.load(google_deriv_config.auth_scope, {
            callback: () => {
                gapi.client
                    .init({
                        apiKey: this.api_key,
                        clientId: this.client_id,
                        scope: google_deriv_config.scope,
                        discoveryDocs: google_deriv_config.discovery_docs,
                    })
                    .then(
                        () => {
                            this.auth = gapi.auth2.getAuthInstance();
                            this.auth.isSignedIn.listen(is_logged_in => this.updateLoginStatus(is_logged_in));
                            this.updateLoginStatus(this.auth.isSignedIn.get());
                        },
                        error => errLogger(error, 'There was an error initialising Google Drive.')
                    );
            },
            onerror: error => errLogger(error, 'There was an error loading Google Drive libraries'),
        });
    };

    updateLoginStatus(is_logged_in) {
        if (is_logged_in) this.profile = this.auth.currentUser.get().getBasicProfile();
        else this.profile = null;

        store.dispatch(setGdReady(is_logged_in));
        this.is_authorized = is_logged_in;
    }

    authorise() {
        return new Promise((resolve, reject) => {
            if (this.is_authorized) resolve();
            else {
                this.auth
                    .signIn({ prompt: 'select_account' })
                    .then(resolve)
                    .catch(response => {
                        if (response.error === 'access_denied') {
                            globalObserver.emit(
                                'ui.log.warn',
                                translate('Please grant permission to view and manage your Google Drive files')
                            );
                        }
                        if (response.error !== 'popup_closed_by_user') reject(response);
                    });
            }
        });
    }

    logout() {
        this.is_authorized && this.auth.signOut();
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

            this.authorise()
                .then(() => {
                    /*
                     * FilePicker open doesn't give an unauthorised error, so check if we can list files
                     * first before attempting to open it (user revoked permissions through accounts.google.com)
                     */
                    gapi.client.drive.files
                        .list()
                        .then(() => {
                            const docs_view = new google.picker.DocsView();
                            docs_view.setIncludeFolders(true);
                            docs_view.setMimeTypes(['text/xml', 'application/xml']);

                            const picker = new google.picker.PickerBuilder();
                            picker
                                .setOrigin(`${window.location.protocol}//${window.location.host}`)
                                .setTitle(translate('Select a Binary Bot strategy'))
                                .setLocale(getPickerLanguage())
                                .setAppId(this.app_id)
                                .setOAuthToken(gapi.auth.getToken().access_token)
                                .addView(docs_view)
                                .setDeveloperKey(this.api_key)
                                .setCallback(userPickedFile)
                                .build()
                                .setVisible(true);
                            resolve();
                        })
                        .catch(err => {
                            if (err.status && err.status === 401) this.logout();

                            const error = new TrackJSError(
                                'GoogleDrive',
                                translate('There was an error listing files from Google Drive'),
                                err
                            );
                            globalObserver.emit('Error', error);
                            reject(error);
                        });
                })
                .catch(err => reject(err));
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
                                if (err.status && err.status === 401) this.logout();

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
                        if (xhr.status === 200) resolve();
                        else {
                            if (xhr.status === 401) this.logout();
                            const error = new TrackJSError(
                                'GoogleDrive',
                                translate('There was an error processing your request'),
                                xhr
                            );
                            globalObserver.emit('Error', error);
                            reject(error);
                        }
                    };
                    xhr.send(form_data);
                } else if (data.action === google.picker.Action.CANCEL) reject();
            };

            this.authorise()
                .then(() => {
                    /*
                     * Calling getDefaultFolderId() ensures there's at least one folder available to save to.
                     * FilePicker doesn't allow for folder creation, so a user without any folder in
                     * their drive couldn't select anything.
                     */
                    this.getDefaultFolderId()
                        .then(() => {
                            const view = new google.picker.DocsView();
                            view.setIncludeFolders(true)
                                .setSelectFolderEnabled(true)
                                .setMimeTypes('application/vnd.google-apps.folder');

                            const picker = new google.picker.PickerBuilder();
                            picker
                                .setOrigin(`${window.location.protocol}//${window.location.host}`)
                                .setTitle(translate('Select a folder'))
                                .addView(view)
                                .setLocale(getPickerLanguage())
                                .setAppId(this.app_id)
                                .setOAuthToken(gapi.auth.getToken().access_token)
                                .setDeveloperKey(this.api_key)
                                .setCallback(savePickerCallback)
                                .build()
                                .setVisible(true);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }
}

const google_drive_util = new GoogleDriveUtil();

export default google_drive_util;
