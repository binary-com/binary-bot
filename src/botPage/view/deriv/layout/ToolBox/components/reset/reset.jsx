import PropTypes from "prop-types";
import React from "react";
import { translate } from "../../../../../../../common/i18n";

const Reset = ({ blockly, onCloseModal }) => {

  const onSubmit = () => {
    blockly.stop();
    blockly.resetWorkspace();
    setTimeout(() => blockly.cleanUp(), 0);
    onCloseModal();
  };

  return (
    <div className="reset_component">
      {blockly.hasStarted() ? (
        <>
          <p>
            {translate(
              "Binary Bot will not place any new trades. Any trades already placed (but not expired) will be completed by our system. Any unsaved changes will be lost."
            )}
          </p>
          <p>
            {translate(
              "Note: Please see the Binary.com statement page for details of all confirmed transactions."
            )}
          </p>
        </>
      ) : (
        <p>{translate("Any unsaved changes will be lost.")}</p>
      )}
      <span className="separator" />
      <div className="reset__footer">
        <button className="button-secondary" onClick={onCloseModal}>
          {translate("No")}
        </button>
        <button className="button-primary" onClick={onSubmit}>
          {translate("Yes")}
        </button>
      </div>
    </div>
  );
};

Reset.propTypes = {
  blockly: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Reset;
