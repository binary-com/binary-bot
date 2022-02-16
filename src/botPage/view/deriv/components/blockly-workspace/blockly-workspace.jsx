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

  return (
    <div id="bot-blockly" style={{ height: 'calc(100vh - 90px)'}}>
      {/* Blockly workspace will be injected here */}
      <div id="blocklyArea"></div>
      <div id="blocklyDiv" style={{ position: 'absolute' }}></div>
    </div>
  );
};

BlockLyWorkspace.propTypes = {
  blockly: PropTypes.object.isRequired,
};

export default BlockLyWorkspace;
