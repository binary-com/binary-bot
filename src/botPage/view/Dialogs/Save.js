import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translate } from '../../../common/i18n';
import { contentStyle, checkboxStyle, saveButtonStyle, limitsStyle, fieldStyle } from './Style';
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
                style={contentStyle}
            >
                <div style={limitsStyle}>
                    <label style={fieldStyle} title={'Choose a filename to save'} htmlFor="save-filename">
                        {translate('Filename')}:
                        <input
                            name="save-filename"
                            title="Choose filename for your blocks"
                            type="text"
                            ref={el => {
                                this.filename = el;
                            }}
                            defaultValue="binary-bot"
                        />
                    </label>
                    <label
                        style={fieldStyle}
                        title={
                            'Save your blocks individually in a collection. They will be added to your existing workspace (main blocks will be replaced) when loaded.'
                        }
                        htmlFor="save-is-collection"
                    >
                        {translate('Save As Collection')}
                        <input
                            title={translate(
                                'Save your blocks individually in a collection. They will be added to your existing workspace (main blocks will be replaced) when loaded.'
                            )}
                            name="save-is-collection"
                            type="checkbox"
                            ref={el => {
                                this.isCollection = el;
                            }}
                            style={checkboxStyle}
                        />
                    </label>
                </div>
                <div style={saveButtonStyle}>
                    <button type="submit">
                        {translate('Save')}
                    </button>
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
        super('save-dialog', translate('Save blocks as'), <SaveContent onSave={onSave} />);
    }
    save() {
        this.open();
        return new Promise(resolve => {
            this.limitsPromise = resolve;
        });
    }
}
