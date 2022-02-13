import PropTypes from "prop-types";
import React from "react";
import { TrackJS } from "trackjs";
import { trackjs_config } from "../../../trackJs_config";
import loginCheck from "../../../login-check";
import initialize from '../../../../common/blockly-worksace';
import GTM from '../../../../../common/gtm';

const BlockLyWorkspace = ({ blockly }) => {

  React.useEffect(() => {
    TrackJS.install(trackjs_config);

    loginCheck()
      .then(() => {
        initialize(blockly)
          .then(() => {
            $(".show-on-load").show();
            $(".barspinner").hide();

            window.dispatchEvent(new Event("resize"));
            GTM.init();
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
