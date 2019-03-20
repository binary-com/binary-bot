import React, { PureComponent } from 'react';
import Dialog from './Dialog';
import GoogleDriveIntegration from '../react-components/Integrations/GoogleDriveIntegration';
import * as style from '../style';
import { translate } from '../../../common/i18n';
import { observer as globalObserver } from '../../../common/utils/observer';

class IntegrationsContent extends PureComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="integrations-dialog" className="dialog-content" style={style.content}>
                <GoogleDriveIntegration />
            </div>
        );
    }
}

export default class IntegrationsDialog extends Dialog {
    constructor() {
        const closeDialog = () => {
            this.close();
        };
        super('integrations-dialog', translate('Integrations'), <IntegrationsContent closeDialog={closeDialog} />, {
            width : 500,
            height: 'auto',
        });
        this.registerCloseOnOtherDialog();
    }
}
