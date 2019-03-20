import React, { PureComponent } from 'react';
import Dialog from './Dialog';
import * as style from '../style';
import { translate } from '../../../common/i18n';
import googleDrive from '../../../common/integrations/GoogleDrive';
import { observer as globalObserver } from '../../../common/utils/observer';
import { showSpinnerInButton, removeSpinnerInButton } from '../../../common/utils/tools';

class LoadContent extends PureComponent {
    constructor() {
        super();
        this.state = { loadType: 'local' };
    }

    componentDidMount() {
        globalObserver.register('dialog.save.opened', this.props.closeDialog);
        globalObserver.register('dialog.integrations.opened', this.props.closeDialog);
    }

    onChange(event) {
        this.setState({ loadType: event.target.value });
    }

    submit() {
        switch (this.state.loadType) {
            case 'google-drive':
                showSpinnerInButton($(this.submitButton));
                googleDrive
                    .createFilePicker()
                    .then(() => {
                        this.props.closeDialog();
                        removeSpinnerInButton($(this.submitButton), translate('Load'));
                    })
                    .catch(() => {
                        removeSpinnerInButton($(this.submitButton), translate('Load'));
                    });
                break;
            default:
                $('#files').click();
                this.props.closeDialog();
                break;
        }
    }

    render() {
        return (
            <form
                id="load-dialog"
                action="javascript:;" // eslint-disable-line no-script-url
                className="dialog-content"
                style={style.content}
                onSubmit={() => this.submit()}
            >
                <div className="center-text input-row">
                    <span className="integration-option">
                        <input
                            type="radio"
                            id="load-local"
                            name="load-option"
                            value="local"
                            defaultChecked={true}
                            onChange={e => this.onChange(e)}
                        />
                        <label htmlFor="load-local">{translate('Local')}</label>
                    </span>
                    <span className="integration-option">
                        <input
                            type="radio"
                            id="load-google-drive"
                            name="load-option"
                            value="google-drive"
                            onChange={e => this.onChange(e)}
                        />
                        <label htmlFor="load-google-drive">Google Drive</label>
                    </span>
                </div>
                <div className="center-text input-row last">
                    <button
                        id="load-strategy"
                        type="submit"
                        ref={el => {
                            this.submitButton = el;
                        }}
                    >
                        {translate('Load')}
                    </button>
                </div>
            </form>
        );
    }
    static props: { closeDialog: PropTypes.func };
}

export default class LoadDialog extends Dialog {
    constructor() {
        const closeDialog = () => {
            this.close();
        };
        super('load-dialog', translate('Load blocks'), <LoadContent closeDialog={closeDialog} />, style.dialogLayout);
    }

    open() {
        super.open();
        globalObserver.emit('dialog.load.opened');
    }
}
