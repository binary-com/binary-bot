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

    componentDidMount() {
        globalObserver.register('dialog.load.opened', this.props.closeDialog);
        globalObserver.register('dialog.save.opened', this.props.closeDialog);
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
    }

    open() {
        super.open();
        globalObserver.emit('dialog.integrations.opened');
    }
}
