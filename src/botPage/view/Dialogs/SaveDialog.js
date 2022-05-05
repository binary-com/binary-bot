import PropTypes from 'prop-types';
import React from 'react';
import Dialog from './Dialog';
import { SAVE_LOAD_TYPE, useIsMounted } from './utils';
import LoadingButton from './LoadingButton';
import { cleanBeforeExport } from '../blockly/utils';
import * as style from '../style';
import { translate } from '../../../common/i18n';
import googleDriveUtil from '../../../common/integrations/GoogleDrive';
import { observer as globalObserver } from '../../../common/utils/observer';

const Save = React.memo(({ closeDialog, onSave }) => {
    const [isLoading, setLoading] = React.useState(false);
    const [fileName, setFileName] = React.useState('binary-bot');
    const [saveType, setSaveType] = React.useState(SAVE_LOAD_TYPE.local);
    const [saveAsCollection, setSaveAsCollection] = React.useState(false);
    const [isGdLoggedIn, setGdLoggedIn] = React.useState(false);

    const isMounted = useIsMounted();

    React.useEffect(() => {
        globalObserver.register('googledrive.authorised', data => setGdLoggedIn(data));
    }, []);

    const onChange = e =>
        e.target.type === 'radio' ? setSaveType(e.target.value) : setSaveAsCollection(e.target.checked);

    const onSubmit = e => {
        e.preventDefault();

        if (saveType === SAVE_LOAD_TYPE.local) {
            onSave({ fileName, saveAsCollection });
            closeDialog();
            return;
        }

        setLoading(true);
        const xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        cleanBeforeExport(xml);
        xml.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
        xml.setAttribute('collection', saveAsCollection);

        closeDialog();
        googleDriveUtil
            .saveFile({
                name    : fileName,
                content : Blockly.Xml.domToPrettyText(xml),
                mimeType: 'application/xml',
            })
            .then(() => globalObserver.emit('ui.log.success', translate('Successfully uploaded to Google Drive')))
            .finally(() => isMounted() && setLoading(false));
    };

    return (
        <form id="save-dialog" onSubmit={onSubmit} className="dialog-content" style={style.content}>
            <div className="input-row">
                <input
                    id="save-filename"
                    name="save-filename"
                    title="Choose filename for your blocks"
                    type="text"
                    onChange={e => setFileName(e.target.value)}
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
                        value={SAVE_LOAD_TYPE.local}
                        defaultChecked
                        onChange={onChange}
                    />
                    <label htmlFor="save-local">{translate('My computer')}</label>
                </span>
                {isGdLoggedIn && (
                    <span className="integration-option">
                        <input
                            type="radio"
                            id="save-google-drive"
                            name="save-option"
                            value={SAVE_LOAD_TYPE.google_drive}
                            onChange={onChange}
                        />
                        <label htmlFor="save-google-drive">Google Drive</label>
                    </span>
                )}
            </div>
            <div id="collection" className="input-row">
                <input
                    title={translate(
                        'Save your blocks individually in a collection. They will be added to your existing workspace (main blocks will be replaced) when loaded.'
                    )}
                    name="save-is-collection"
                    id="save-is-collection"
                    type="checkbox"
                    onChange={onChange}
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
            <div className="center-text input-row last">
                <button type="submit" disabled={isLoading}>
                    {isLoading ? <LoadingButton /> : translate('Save')}
                </button>
            </div>
        </form>
    );
});

Save.propTypes = {
    closeDialog: PropTypes.func.isRequired,
    onSave     : PropTypes.func.isRequired,
};

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
            <Save onSave={onSave} closeDialog={closeDialog} />,
            style.dialogLayout
        );
        this.registerCloseOnOtherDialog();
    }

    save() {
        this.open();
        return new Promise(resolve => {
            this.limitsPromise = resolve;
        });
    }
}
