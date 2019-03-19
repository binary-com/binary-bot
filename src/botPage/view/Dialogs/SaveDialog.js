import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translate } from '../../../common/i18n';
import * as style from '../style';
import Dialog from './Dialog';
import googleDrive from '../../../common/integrations/GoogleDrive';
import { cleanBeforeExport } from '../blockly/utils';
import { observer as globalObserver } from '../../../common/utils/observer';

class SaveContent extends PureComponent {
    constructor() {
        super();
        this.state = {
            error   : null,
            saveType: 'local',
        };
    }

    componentDidMount() {
        globalObserver.register('dialog.load.opened', this.props.closeDialog);
        globalObserver.register('dialog.integrations.opened', this.props.closeDialog);
    }

    submit() {
        const filename = $(this.filename).val() || 'binary-bot';
        const collection = $(this.isCollection).prop('checked');

        switch (this.state.saveType) {
            case 'google-drive':
                const xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
                cleanBeforeExport(xml);

                xml.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
                xml.setAttribute('collection', collection);

                googleDrive
                    .saveFile({
                        name    : filename,
                        content : Blockly.Xml.domToPrettyText(xml),
                        mimeType: 'application/xml',
                    })
                    .then(() => {
                        globalObserver.emit('ui.log.success', translate('Successfully uploaded to Google Drive'));
                        this.props.closeDialog();
                    })
                    .catch(e => {
                        globalObserver.emit('ui.log.warn', e.message);
                    });
                break;

            default:
                this.props.onSave({
                    filename,
                    collection,
                });
                break;
        }
    }

    onChange(event) {
        this.setState({ saveType: event.target.value });
    }

    render() {
        return (
            <form
                id="save-dialog"
                action="javascript:;" // eslint-disable-line no-script-url
                onSubmit={() => this.submit()}
                className="dialog-content"
                style={style.content}
            >
                <div className="input-row">
                    <input
                        id="save-filename"
                        name="save-filename"
                        title="Choose filename for your blocks"
                        type="text"
                        ref={el => {
                            this.filename = el;
                        }}
                        defaultValue="binary-bot"
                        data-lpignore="true"
                        autoComplete="false"
                    />
                </div>
                <div className="input-row center-text">
                    <span className="integration-option">
                        <input
                            type="radio"
                            id="save-local"
                            name="save-option"
                            value="local"
                            defaultChecked={true}
                            onChange={e => this.onChange(e)}
                        />
                        <label htmlFor="save-local">{translate('Local')}</label>
                    </span>
                    <span className="integration-option">
                        <input
                            type="radio"
                            id="save-google-drive"
                            name="save-option"
                            value="google-drive"
                            onChange={e => this.onChange(e)}
                        />
                        <label htmlFor="save-google-drive">Google Drive</label>
                    </span>
                </div>
                <div id="collection" className="input-row">
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
                        title={translate(
                            'Save your blocks individually in a collection. They will be added to your existing workspace (main blocks will be replaced) when loaded.'
                        )}
                        htmlFor="save-is-collection"
                    >
                        {translate('Save as collection')}
                    </label>
                    <div className="description">
                        {translate('Save your blocks and settings for re-use in other strategies')}
                    </div>
                </div>
                <div id="save-buttons" className="center-text input-row last">
                    <button type="submit">{translate('Save')}</button>
                </div>
            </form>
        );
    }

    static props: {
        onSave: PropTypes.func,
        closeDialog: PropTypes.func,
    };
}

export default class SaveDialog extends Dialog {
    constructor() {
        const closeDialog = () => {
            this.close();
        };
        const onSave = arg => {
            this.limitsPromise(arg);
            closeDialog();
        };
        super(
            'save-dialog',
            translate('Save blocks'),
            <SaveContent onSave={onSave} closeDialog={closeDialog} />,
            style.dialogLayout
        );
    }

    save() {
        this.open();
        return new Promise(resolve => {
            this.limitsPromise = resolve;
        });
    }

    open() {
        super.open();
        globalObserver.emit('dialog.save.opened');
    }
}
