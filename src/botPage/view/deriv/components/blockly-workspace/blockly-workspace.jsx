import PropTypes from "prop-types";
import React from "react";
import { TrackJS } from "trackjs";
import loginCheck from "../../login-check";
import initialize from '../../blockly-worksace';

const BlockLyWorkspace = ({ blockly }) => {

  React.useEffect(() => {
    loginCheck()
      .then(() => {
        initialize(blockly)
          .then(() => {
            $(".show-on-load").show();
            $(".barspinner").hide();
            window.dispatchEvent(new Event("resize"));
            TrackJS.configure({
              userId: document.getElementById("active-account-name")?.value,
            });
          })
      });
  }, []);

  /* TODO: [Implement should_reload_workspace for account switching]
  React.useEffect(() => {

  }, []);
  */

  return null;
};

BlockLyWorkspace.propTypes = {
  blockly: PropTypes.object.isRequired,
};

export default BlockLyWorkspace;
