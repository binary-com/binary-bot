import PropTypes from "prop-types";
import React from "react";
import LoadingButton from "../loading_button";
import SAVE_LOAD_TYPE from "../../common/";
import * as style from "../../../../../style";
import { translate } from "../../../../../../../common/i18n";
import google_drive_util from "../../../../../../../common/integrations/GoogleDrive";
import useIsMounted from "../../../../../../../common/hooks/isMounted";

const Load = ({ closeDialog, is_gd_logged_in }) => {
  const [load_type, setLoadType] = React.useState(SAVE_LOAD_TYPE.local);
  const [is_loading, setLoading] = React.useState(false);
  const isMounted = useIsMounted();

  const onChange = e => setLoadType(e.target.value);

  const onSubmit = e => {
    e.preventDefault();

    if (load_type === SAVE_LOAD_TYPE.google_drive) {
      setLoading(true);

      google_drive_util
        .createFilePicker()
        .then(() => closeDialog())
        .finally(() => isMounted() && setLoading(false));
    } else {
      // [TODO]: Refactor to use react
      document.getElementById('files').click();
      closeDialog();
    }
  };

  return (
    <form
      id="load-dialog"
      className="dialog-content"
      style={style.content}
      onSubmit={onSubmit}
    >
      <div className="center-text input-row">
        <span className="integration-option">
          <input
            type="radio"
            id="load-local"
            name="load-option"
            value={SAVE_LOAD_TYPE.local}
            defaultChecked
            onChange={onChange}
          />
          <label htmlFor="load-local">{translate("My computer")}</label>
        </span>
        {is_gd_logged_in && (
          <span className="integration-option">
            <input
              type="radio"
              id="load-google-drive"
              name="load-option"
              value={SAVE_LOAD_TYPE.google_drive}
              onChange={onChange}
            />
            <label htmlFor="load-google-drive">Google Drive</label>
          </span>
        )}
      </div>
      <div className="center-text input-row last">
        <button
          id="load-strategy"
          type="submit"
          disabled={is_loading}
        >
          {is_loading ? <LoadingButton /> : translate('Load')}
        </button>
      </div>
    </form>
  );
};

Load.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  is_gd_logged_in: PropTypes.bool.isRequired,
};

export default React.memo(Load);
