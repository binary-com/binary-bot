import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Dialog from './Dialog';
import * as style from '../style';
import { translate } from '../../../common/i18n';
import googleDrive from '../../../common/integrations/GoogleDrive';
import { showSpinnerInButton, removeSpinnerInButton } from '../../../common/utils/tools';

class LoadContent extends PureComponent {
    constructor() {
        super();
        this.state = { loadType: 'local' };
    }

    onChange(event) {
        this.setState({ loadType: event.target.value });
    }

    submit() {
        if (this.state.loadType === 'google-drive') {
            const initialButtonText = $(this.submitButton).text();
            showSpinnerInButton($(this.submitButton));
            googleDrive
                .createFilePicker()
                .then(() => {
                    this.props.closeDialog();
                    removeSpinnerInButton($(this.submitButton), initialButtonText);
                })
                .catch(() => {
                    removeSpinnerInButton($(this.submitButton), initialButtonText);
                });
        } else {
            $('#files').click();
            this.props.closeDialog();
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
                        <label htmlFor="load-local">{translate('My computer')}</label>
                    </span>
                    <span className="integration-option invisible">
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

    static props = { closeDialog: PropTypes.func };
}

export default class LoadDialog extends Dialog {
    constructor() {
        const closeDialog = () => {
            this.close();
        };
        super('load-dialog', translate('Load blocks'), <LoadContent closeDialog={closeDialog} />, style.dialogLayout);
        this.registerCloseOnOtherDialog();
    }
}
