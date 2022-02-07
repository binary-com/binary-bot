/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
/* eslint-disable quotes */
/* eslint-disable indent */
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Load from "./components/load";
import Save from "./components/save";
import Reset from "./components/reset";
import Modal from "../../components/modal";
import { translate } from "../../../../../common/i18n";
import Tooltip from "../../../deriv/components/tooltip/tooltip";
import { isMobile } from "../../../../../common/utils/tools";

const ShowModal = ({ modal, onClose, class_name }) => {
  if (!modal) return;
  const { component: Component, props, title } = modal;
  return (
    <Modal onClose={onClose} title={title} class_name={class_name}>
      <Component {...props} />
    </Modal>
  );
};

const ToolBox = ({ blockly }) => {
  const [should_show_modal, setShowModal] = React.useState(false);
  const [selected_modal, updateSelectedModal] = React.useState("");

  const { is_gd_ready } = useSelector(state => state.ui);
  const { is_gd_logged_in } = useSelector(state => state.client);

  React.useEffect(() => {
    const Keys = Object.freeze({ "zoomIn": 187, "zoomOut": 189 })
    document.body.addEventListener("keydown", (e) => {
      if (e.which === Keys.zoomOut && e.ctrlKey) {
        // Ctrl + -
        e.preventDefault();
        blockly.zoomOnPlusMinus(false);
        return;
      }
      if (e.which === Keys.zoomIn && e.ctrlKey) {
        // Ctrl + +
        e.preventDefault();
        blockly.zoomOnPlusMinus(true);
        return;
      }
    });
  }, []);

  const onCloseModal = () => {
    setShowModal(false);
    updateSelectedModal("");
  };
  const onShowModal = (modal) => {
    setShowModal(true);
    updateSelectedModal(modal);
  };
  const MODALS = {
    load: {
      component: Load,
      title: translate("Load Blocks"),
      props: {
        closeDialog: onCloseModal,
        is_gd_logged_in,
      },
    },
    save: {
      component: Save,
      title: translate("Save Blocks"),
      props: {
        closeDialog: onCloseModal,
        is_gd_logged_in,
        blockly,
      },
    },
    reset: {
      component: Reset,
      title: translate("Are you sure?"),
      props: {
        onCloseModal,
        blockly,
      },
    },
  };
  return (
    <div id="toolbox">
      <Tooltip content={translate("Reset the blocks to their initial state")} direction="right">
        <button
          id="resetButton"
          className="toolbox-button icon-reset"
          onClick={() => {
            onShowModal("reset");
          }}
        />
      </Tooltip>
      <Tooltip content={translate("Load new blocks (xml file)")} direction="right">
        <button
          id="load-xml"
          className="toolbox-button icon-browse"
          onClick={() => {
            onShowModal("load");
          }}
        />
      </Tooltip>
      <Tooltip content={translate("Save the existing blocks (xml file)")} direction="right">
        <button
          id="save-xml"
          className="toolbox-button icon-save"
          onClick={() => {
            onShowModal("save");
          }}
        />
      </Tooltip>
      {is_gd_ready && (
        <Tooltip content={translate("Connect Binary Bot to your Google Drive to easily save and re-use your blocks")} direction="right">
          <button
            id="integrations"
            className="toolbox-button icon-integrations"
          />
        </Tooltip>
      )}

      <span className="toolbox-separator" />
      <Tooltip content={translate("Undo the changes (Ctrl+Z)")} direction="right">
        <button
          id="undo"
          className="toolbox-button icon-undo"
          onClick={() => blockly.undo()}
        />
      </Tooltip>
      <Tooltip content={translate("Redo the changes (Ctrl+Shift+Z)")} direction="right">
        <button
          id="redo"
          className="toolbox-button icon-redo"
          onClick={() => blockly.redo()}
        />
      </Tooltip>
      <span className="toolbox-separator" />
      <Tooltip content={translate("Zoom In (Ctrl + +)")} direction={isMobile() ? "left" : "right"}>
        <button
          id="zoomIn"
          className="toolbox-button icon-zoom-in"
          onClick={() => blockly.zoomOnPlusMinus(true)}
        />
      </Tooltip>
      <Tooltip content={translate("Zoom Out (Ctrl + -)")} direction={isMobile() ? "left" : "right"}>
        <button
          id="zoomOut"
          className="toolbox-button icon-zoom-out"
          onClick={() => blockly.zoomOnPlusMinus(false)}
        />
      </Tooltip>
      <Tooltip content={translate("Rearrange Vertically")} direction={isMobile() ? "left" : "right"}>
        <button
          id="rearrange"
          className="toolbox-button icon-sort"
          onClick={() => blockly.cleanUp()}
        />
      </Tooltip>
      {/* Needs Refactor ClientInfo Structure */}
      <span className="toolbox-separator" />
      <Tooltip content={translate("Show/hide the summary pop-up")} direction="right">
        <button id="showSummary" className="toolbox-button icon-summary" />
      </Tooltip>
      <Tooltip content={translate("Run the bot")} direction="right">
        <button id="runButton" className="toolbox-button icon-run" />
      </Tooltip>
      <Tooltip content={translate("Stop the bot")} direction="right">
        <button id="stopButton" className="toolbox-button icon-stop" />
      </Tooltip>
      <Tooltip content={translate("Show log")} direction="right">
        <button id="logButton" className="toolbox-button icon-info" />
      </Tooltip>
      <span className="toolbox-separator" />
      {/* Needs resizeable modal */}
      <Tooltip content={translate("Show chart")} direction="right">
        <button
          id="chartButton"
          className="toolbox-button icon-chart-line"
        />
      </Tooltip>
      <Tooltip content={translate("Show Trading View")} direction="right">
        <button
          id="tradingViewButton"
          className="toolbox-button icon-trading-view"
        />
      </Tooltip>
      {should_show_modal && (
        <ShowModal
          modal={MODALS[selected_modal]}
          onClose={onCloseModal}
          class_name={selected_modal}
        />
      )}

    </div>
  );
};

ToolBox.propTypes = {
  blockly: PropTypes.object.isRequired,
};

export default ToolBox;
