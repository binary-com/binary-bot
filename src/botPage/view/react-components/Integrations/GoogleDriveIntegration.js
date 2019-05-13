import React, { PureComponent } from 'react';
import { translate } from '../../../../common/i18n';
import googleDrive from '../../../../common/integrations/GoogleDrive';
import { observer as globalObserver } from '../../../../common/utils/observer';

export default class GoogleDriveIntegration extends PureComponent {
    constructor() {
        super();
        this.state = { isAuthorised: false };
    }

    componentDidMount() {
        globalObserver.register('googledrive.authorise', data => this.setState(data));
    }

    // eslint-disable-next-line class-methods-use-this
    render() {
        return (
            <div className="integration input-row last">
                <div className="left">
                    <h2>Google Drive</h2>
                    <div className="description">{translate('Save your blocks and strategies to Google Drive')}</div>
                    {googleDrive.isAuthorised && (
                        <div className="integration-user">
                            {`${translate('You are logged in as')} ${googleDrive.profile.getEmail()}`}
                        </div>
                    )}
                </div>
                <div className="right">
                    <a
                        onClick={() => googleDrive.authorise()}
                        className={!googleDrive.isAuthorised ? 'button' : 'button-disabled'}
                    >
                        <span id="connect-google-drive">{translate('Connect')}</span>
                    </a>
                    <a
                        onClick={() => googleDrive.signOut()}
                        className={googleDrive.isAuthorised ? 'button' : 'button-disabled'}
                    >
                        <span id="disconnect-google-drive">{translate('Disconnect')}</span>
                    </a>
                </div>
            </div>
        );
    }
}
