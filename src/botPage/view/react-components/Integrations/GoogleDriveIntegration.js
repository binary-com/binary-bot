import React from 'react';
import { translate } from '../../../../common/i18n';
import googleDriveUtil from '../../../../common/integrations/GoogleDrive';
import { observer as globalObserver } from '../../../../common/utils/observer';

const GoogleDriveIntegration = () => {
    const [isGdLoggedIn, setGdLoggedIn] = React.useState(false);

    React.useEffect(() => {
        globalObserver.register('googledrive.authorised', data => setGdLoggedIn(data));
    }, []);

    return (
        <div className="integration input-row last">
            <div className="left">
                <h2>Google Drive</h2>
                <div className="description">{translate('Save your blocks and strategies to Google Drive')}</div>
                {isGdLoggedIn && (
                    <div className="integration-user">
                        {`${translate('You are logged in as')} ${googleDriveUtil.profile?.getEmail()}`}
                    </div>
                )}
            </div>
            <div className="right">
                <a onClick={() => googleDriveUtil.authorise()} className={!isGdLoggedIn ? 'button' : 'button-disabled'}>
                    <span id="connect-google-drive">{translate('Connect')}</span>
                </a>
                <a onClick={() => googleDriveUtil.logout()} className={isGdLoggedIn ? 'button' : 'button-disabled'}>
                    <span id="disconnect-google-drive">{translate('Disconnect')}</span>
                </a>
            </div>
        </div>
    );
};

export default React.memo(GoogleDriveIntegration);
