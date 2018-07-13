import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translate } from '../../../common/i18n';
import * as style from '../style';
import Dialog from './Dialog';

class SaveContent extends PureComponent {
    constructor() {
        super();
        this.state = {
            error: null,
        };
    }
    submit() {
        const filename = $(this.filename).val();
        const collection = $(this.isCollection).prop('checked');

        this.props.onSave({
            filename,
            collection,
        });
    }
    render() {
        return (
            <form
                action="javascript:;" // eslint-disable-line no-script-url
                onSubmit={() => this.submit()}
                className="dialog-content"
                style={style.content}
            >
                <div>
                    <div style={style.inputRow}>
                        <label title={'Choose a filename to save'} htmlFor="save-filename">
                            {translate('Filename')}:
                            <input
                                style={style.filename}
                                name="save-filename"
                                title="Choose filename for your blocks"
                                type="text"
                                ref={el => {
                                    this.filename = el;
                                }}
                                defaultValue="binary-bot"
                            />
                        </label>
                    </div>
                    <div style={style.inputRow}>
                        <input
                            title={translate(
                                'Save your blocks individually in a collection. They will be added to your existing workspace (main blocks will be replaced) when loaded.'
                            )}
                            name="save-is-collection"
                            id="save-is-collection"
                            type="checkbox"
                            ref={el => {
                                this.isCollection = el;
                            }}
                            style={style.checkbox}
                        />
                        <label
                            title={
                                'Save your blocks individually in a collection. They will be added to your existing workspace (main blocks will be replaced) when loaded.'
                            }
                            htmlFor="save-is-collection"
                        >
                            {translate('Save As Collection')}
                        </label>
                    </div>
                </div>
                <div style={style.submitButton}>
                    <button type="submit">{translate('Save')}</button>
                </div>
            </form>
        );
    }
    static props: {
        onSave: PropTypes.func,
    };
}

export default class Save extends Dialog {
    constructor() {
        const onSave = arg => {
            this.limitsPromise(arg);
            this.close();
        };
        super('save-dialog', translate('Save blocks as'), <SaveContent onSave={onSave} />, style.dialogLayout);
    }
    save() {
        this.open();
        return new Promise(resolve => {
            this.limitsPromise = resolve;
        });
    }
}
