import React from 'react';
import { useSelector } from 'react-redux';
import { translate } from '../../../../common/i18n';
import google_drive_util from '../../../../common/integrations/GoogleDrive';

const GoogleDriveIntegration = () => {
    const { is_gd_logged_in } = useSelector(state => state.client);

    return (
        <div className="integration input-row last">
            <div className="left">
                <h2>Google Drive</h2>
                <div className="description">{translate('Save your blocks and strategies to Google Drive')}</div>
                {is_gd_logged_in && (
                    <div className="integration-user">
                        {`${translate('You are logged in as')} ${google_drive_util.profile?.getEmail()}`}
                    </div>
                )}
            </div>
            <div className="right">
                <a
                    onClick={() => google_drive_util.authorise()}
                    className={!is_gd_logged_in ? 'button' : 'button-disabled'}
                >
                    <span id="connect-google-drive">{translate('Connect')}</span>
                </a>
                <a
                    onClick={() => google_drive_util.logout()}
                    className={is_gd_logged_in ? 'button' : 'button-disabled'}
                >
                    <span id="disconnect-google-drive">{translate('Disconnect')}</span>
                </a>
            </div>
        </div>
    );
};

export default React.memo(GoogleDriveIntegration);
