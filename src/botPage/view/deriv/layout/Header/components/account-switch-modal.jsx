import React from 'react'
import { translate } from '../../../../../../common/i18n';

const AccountSwitchModal = ({is_bot_running,onClose, onAccept}) => (
    <div className="logout-dialog">
        {is_bot_running ?(
            <div>
                    <p>
                    {translate('Binary Bot will not place any new trades. Any trades already placed (but not expired) will be completed by our system. Any unsaved changes will be lost.')}''
                </p>
                <p>
                    {translate('Note: Please see the Binary.com statement page for details of all confirmed transactions.')}
                </p>
            </div>
        ):(
            <div>
                <p>
                    {translate('Any unsaved changes will be lost.')}
                </p>
            </div>
        )}
        <div className="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
            <div className="ui-dialog-buttonset">
                <button className="button-secondary" onClick={onClose}>{translate('No')}</button>
                <button className="button-primary" onClick={onAccept}>{translate('Yes')}</button>
            </div>
        </div>
    </div>
);

export default AccountSwitchModal