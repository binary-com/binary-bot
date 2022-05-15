import PropTypes from 'prop-types';
import React from 'react';
import LoadingButton from '../loading_button';
import SAVE_LOAD_TYPE from '../../common';
import useIsMounted from '../../../../../../../common/hooks/isMounted';
import { cleanBeforeExport } from '../../../../../blockly/utils';
import * as style from '../../../../../style';
import google_drive_util from '../../../../../../../common/integrations/GoogleDrive';
import { observer as globalObserver } from '../../../../../../../common/utils/observer';
import { translate } from '../../../../../../../common/i18n';

const Save = ({ blockly, closeDialog, is_gd_logged_in }) => {
    const [is_loading, setLoading] = React.useState(false);
    const [file_name, setFileName] = React.useState('binary-bot');
    const [save_type, setSaveType] = React.useState(SAVE_LOAD_TYPE.local);
    const [save_as_collection, setSaveAsCollection] = React.useState(false);
    const isMounted = useIsMounted();

    const onChange = e => e.target.type === 'radio' ? setSaveType(e.target.value) : setSaveAsCollection(e.target.checked);

    const onSubmit = e => {
        e.preventDefault();

        if (save_type === SAVE_LOAD_TYPE.local) {
            blockly.save({ file_name, save_as_collection });
            closeDialog();
            return;
        }

        setLoading(true);
        const xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        cleanBeforeExport(xml);
        xml.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
        xml.setAttribute('collection', save_as_collection);

        closeDialog();
        google_drive_util
            .saveFile({
                name: file_name,
                content: Blockly.Xml.domToPrettyText(xml),
                mimeType: 'application/xml',
            })
            .then(() => globalObserver.emit('ui.log.success', translate('Successfully uploaded to Google Drive')))
            .finally(() => isMounted() && setLoading(false));
    };

    return (
        <form
            id="save-dialog"
            onSubmit={onSubmit}
            className="dialog-content"
            style={style.content}
        >
            <div className="input-row">
                <input
                    id="save-filename"
                    name="save-filename"
                    title="Choose filename for your blocks"
                    type="text"
                    onChange={e => setFileName(e.target.value)}
                    data-lpignore="true"
                    autoComplete="false"
                    value={file_name}
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
                {is_gd_logged_in && (
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
                <button
                    type="submit"
                    disabled={is_loading}
                >
                    {is_loading ? <LoadingButton /> : translate('Save')}
                </button>
            </div>
        </form>
    );
};

Save.propTypes = {
    blockly: PropTypes.object.isRequired,
    closeDialog: PropTypes.func.isRequired,
    is_gd_logged_in: PropTypes.bool.isRequired,
};

export default React.memo(Save);
