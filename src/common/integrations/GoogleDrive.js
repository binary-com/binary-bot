/* global google,gapi */
import { getLanguage } from '../lang';
import { observer as globalObserver } from '../utils/observer';
import { translate, isProduction } from '../utils/tools';
import config from '../../botPage/common/const';
import { load } from '../../botPage/view/blockly';
import { TrackJSError } from '../../botPage/view/logger';

class GoogleDrive {
    constructor() {
        this.botFolderName = `Binary Bot - ${translate('Strategies')}`;
        this.setInfo(config);
        this.googleAuth = null;
        this.isAuthorised = null;
        this.profile = null;

        $.getScript('https://apis.google.com/js/api.js', () => this.init());
    }

    init() {
        gapi.load('client:auth2:picker', {
            callback: () => {
                gapi.client
                    .init({
                        apiKey       : this.apiKey,
                        clientId     : this.clientId,
                        scope        : 'https://www.googleapis.com/auth/drive.file',
                        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                    })
                    .then(
                        () => {
                            this.googleAuth = gapi.auth2.getAuthInstance();
                            this.googleAuth.isSignedIn.listen(isSignedIn => this.updateSigninStatus(isSignedIn));
                            this.updateSigninStatus(this.googleAuth.isSignedIn.get());

                            $('#integrations').removeClass('invisible');
                            $('#save-google-drive')
                                .parent()
                                .removeClass('invisible');
                            $('#load-google-drive')
                                .parent()
                                .removeClass('invisible');
                        },
                        error => {
                            if (window.trackJs && isProduction()) {
                                trackJs.track(
                                    `${translate(
                                        'There was an error initialising Google Drive'
                                    )} - Error: ${JSON.stringify(error)}`
                                );
                            }
                        }
                    );
            },
            onerror: error => {
                if (window.trackJs && isProduction()) {
                    trackJs.track(
                        `${translate('There was an error loading Google Drive libraries')} - Error: ${JSON.stringify(
                            error
                        )}`
                    );
                }
            },
        });
    }

    updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            this.profile = this.googleAuth.currentUser.get().getBasicProfile();
        } else {
            this.profile = null;
        }
        this.isAuthorised = isSignedIn;
        globalObserver.emit('googledrive.authorise', { isAuthorised: isSignedIn });
    }

    authorise() {
        return new Promise((resolve, reject) => {
            if (this.isAuthorised) {
                resolve();
            } else {
                this.googleAuth
                    .signIn({ prompt: 'select_account' })
                    .then(() => resolve())
                    .catch(response => {
                        if (response.error === 'access_denied') {
                            globalObserver.emit(
                                'ui.log.warn',
                                translate('Please grant permission to view and manage your Google Drive files')
                            );
                        }
                        reject(response);
                    });
            }
        });
    }

    signOut() {
        if (this.isAuthorised) {
            return this.googleAuth.signOut();
        }
        return Promise.resolve();
    }

    setInfo(data) {
        this.clientId = data.gd.cid;
        this.appId = data.gd.aid;
        this.apiKey = data.gd.api;
    }

    // eslint-disable-next-line class-methods-use-this
    getPickerLanguage() {
        const language = getLanguage();

        if (language === 'zhTw') {
            return 'zh-TW';
        } else if (language === 'zhCn') {
            return 'zh-CN';
        }
        return language;
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
                                resolve();
                            } catch (e) {
                                const error = new TrackJSError('GoogleDrive', translate('Unrecognized file format'), e);
                                globalObserver.emit('Error', error);
                                reject(e);
                            }
                        })
                        .catch(e => {
                            if (error.status && error.status === 401) {
                                this.signOut();
                            }

                            const error = new TrackJSError(
                                'GoogleDrive',
                                translate('There was an error retrieving data from Google Drive'),
                                e
                            );
                            globalObserver.emit('Error', error);
                            reject(e);
                        });
                } else if (data.action === google.picker.Action.CANCEL) {
                    reject();
                }
            };

            this.authorise()
                .then(() => {
                    // FilePicker open doesn't give an unauthorised error, so check if we can list files
                    // first before attempting to open it (user revoked permissions through accounts.google.com)
                    gapi.client.drive.files
                        .list()
                        .then(() => {
                            const docsView = new google.picker.DocsView();
                            docsView.setIncludeFolders(true);
                            docsView.setMimeTypes(['text/xml', 'application/xml']);

                            const picker = new google.picker.PickerBuilder();
                            picker
                                .setOrigin(`${window.location.protocol}//${window.location.host}`)
                                .setTitle(translate('Select a Binary Bot strategy'))
                                .setLocale(this.getPickerLanguage())
                                .setAppId(this.appId)
                                .setOAuthToken(gapi.auth.getToken().access_token)
                                .addView(docsView)
                                .setDeveloperKey(this.apiKey)
                                .setCallback(userPickedFile)
                                .build()
                                .setVisible(true);
                        })
                        .catch(e => {
                            if (error.status && error.status === 401) {
                                this.signOut();
                            }

                            const error = new TrackJSError(
                                'GoogleDrive',
                                translate('There was an error listing files from Google Drive'),
                                e
                            );
                            globalObserver.emit('Error', error);
                            reject(e);
                        });
                })
                .catch(error => reject(error));
        });
    }

    getDefaultFolderId() {
        return new Promise((resolve, reject) => {
            // Avoid duplicate auth flow by checking if user is already authed
            Promise.all(!this.isAuthorised ? this.authorise : [])
                .then(() => {
                    // eslint-disable-next-line
                    gapi.client.drive.files.list({ q: 'trashed=false' }).then(response => {
                        const folder = response.result.files.find(
                            file => file.mimeType === 'application/vnd.google-apps.folder'
                        );

                        if (folder) {
                            return resolve();
                        }

                        gapi.client.drive.files
                            .create({
                                resource: {
                                    name    : this.botFolderName,
                                    mimeType: 'application/vnd.google-apps.folder',
                                    fields  : 'id',
                                },
                            })
                            .then(() => resolve())
                            .catch(e => {
                                if (error.status && error.status === 401) {
                                    this.signOut();
                                }

                                const error = new TrackJSError(
                                    'GoogleDrive',
                                    translate('There was an error retrieving files from Google Drive'),
                                    e
                                );
                                globalObserver.emit('Error', error);
                                reject(e);
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
                        } else {
                            if (xhr.status === 401) {
                                this.signOut();
                            }

                            const error = new TrackJSError(
                                'GoogleDrive',
                                translate('There was an error processing your request'),
                                xhr
                            );
                            globalObserver.emit('Error', error);
                            reject();
                        }
                    };
                    xhr.send(formData);
                } else if (data.action === google.picker.Action.CANCEL) {
                    reject();
                }
            };

            this.authorise()
                .then(() => {
                    // Calling getDefaultFolderId() ensures there's at least one folder available to save to.
                    // FilePicker doesn't allow for folder creation, so a user without any folder in
                    // their drive couldn't select anything.
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
                                .setLocale(this.getPickerLanguage())
                                .setAppId(this.appId)
                                .setOAuthToken(gapi.auth.getToken().access_token)
                                .setDeveloperKey(this.apiKey)
                                .setCallback(savePickerCallback)
                                .build()
                                .setVisible(true);
                        })
                        .catch(error => reject(error));
                })
                .catch(error => reject(error));
        });
    }
}

const googleDrive = new GoogleDrive();

export default googleDrive;
