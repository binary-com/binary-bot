import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Load from "./components/load";
import Save from "./components/save";
import Reset from "./components/reset";
import Modal from "../../components/modal";
import { translate } from "../../../../../common/i18n";
import { setIsBotRunning } from '../../store/ui-slice';
import { observer as globalObserver } from '../../../../../common/utils/observer';
import { isMobile } from "../../../../../common/utils/tools";
import Popover from "../../components/popover/index";

const ShowModal = ({ modal, onClose, class_name }) => {
  if (!modal) return;
  const { component: Component, props, title } = modal;
  return (
    <Modal onClose={onClose} title={title} class_name={class_name}>
      <Component {...props} />
    </Modal>
  );
};

const ToolboxButton = ({ label, tooltip, classes, id, position = 'bottom' }) => {
  return <span id={id}>
    <Popover content={tooltip} position={position}>
      <button className={classes}>{label}</button>
    </Popover>
  </span>
}

const ToolBox = ({ blockly }) => {
  const [should_show_modal, setShowModal] = React.useState(false);
  const [selected_modal, updateSelectedModal] = React.useState("");
  const has_active_token = useSelector(state => !!state.client?.active_token);

  const dispatch = useDispatch();
  const { is_gd_ready } = useSelector(state => state.ui);
  const { is_gd_logged_in } = useSelector(state => state.client);

  React.useEffect(() => {
    globalObserver.register('bot.running', () => dispatch(setIsBotRunning(true)));
    globalObserver.register('bot.stop', () => dispatch(setIsBotRunning(false)));

    const Keys = Object.freeze({ "zoomIn": 187, "zoomOut": 189 })
    document.body.addEventListener("keydown", (e) => {
      if (e.which === Keys.zoomOut && e.ctrlKey) {
        // Ctrl + -
        e.preventDefault();
        blockly?.zoomOnPlusMinus(false);
        return;
      }
      if (e.which === Keys.zoomIn && e.ctrlKey) {
        // Ctrl + +
        e.preventDefault();
        blockly?.zoomOnPlusMinus(true);
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
      <Popover content={translate("Reset the blocks to their initial state")}
        position="bottom"
      >
        <button
          id="resetButton"
          className="toolbox-button icon-reset"
          onClick={() => {
            onShowModal("reset");
          }}
        />

      </Popover>
      <Popover content={translate("Load new blocks (xml file)")} position="bottom">
        <button
          id="load-xml"
          className="toolbox-button icon-browse"
          onClick={() => {
            onShowModal("load");
          }}
        />
      </Popover>
      <Popover content={translate("Save the existing blocks (xml file)")} position="bottom">
        <button
          id="save-xml"
          className="toolbox-button icon-save"
          onClick={() => {
            onShowModal("save");
          }}
        />
      </Popover>
      {is_gd_ready && (
        <Popover content={translate("Connect Binary Bot to your Google Drive to easily save and re-use your blocks")} position="bottom">
          <button
            id="integrations"
            className="toolbox-button icon-integrations"
          />
        </Popover>
      )}

      <span className="toolbox-separator" />
      <Popover content={translate("Undo the changes (Ctrl+Z)")} position="bottom">
        <button
          id="undo"
          className="toolbox-button icon-undo"
          onClick={() => blockly.undo()}
        />
      </Popover>
      <Popover content={translate("Redo the changes (Ctrl+Shift+Z)")} position="bottom">
        <button
          id="redo"
          className="toolbox-button icon-redo"
          onClick={() => blockly.redo()}
        />
      </Popover>
      <span className="toolbox-separator" />
      <Popover content={translate("Zoom In (Ctrl + +)")} position={isMobile() ? "left" : "bottom"}>
        <button
          id="zoomIn"
          className="toolbox-button icon-zoom-in"
          onClick={() => blockly.zoomOnPlusMinus(true)}
        />
      </Popover>
      <Popover content={translate("Zoom Out (Ctrl + -)")} position={isMobile() ? "left" : "bottom"}>
        <button
          id="zoomOut"
          className="toolbox-button icon-zoom-out"
          onClick={() => blockly.zoomOnPlusMinus(false)}
        />
      </Popover>
      <Popover content={translate("Rearrange Vertically")} position={isMobile() ? "left" : "bottom"}>
        <button
          id="rearrange"
          className="toolbox-button icon-sort"
          onClick={() => blockly.cleanUp()}
        />
      </Popover>
      {/* Needs Refactor ClientInfo Structure */}
      <span className="toolbox-separator" />
      <Popover content={translate("Show/hide the summary pop-up")} position="bottom">
        <button id="showSummary" className="toolbox-button icon-summary" />
      </Popover>
      <ToolboxButton
        id="runButton"
        classes="toolbox-button icon-run"
        tooltip={translate("Run the bot")}
      />
      <ToolboxButton
        id="stopButton"
        classes="toolbox-button icon-stop"
        tooltip={translate("Stop the bot")}
      />
      <Popover content={translate("Show log")} position="bottom">
        <button id="logButton" className="toolbox-button icon-info" />
      </Popover>
      {has_active_token && <span className="toolbox-separator" />}
      {/* Needs resizeable modal */}
      <Popover content={translate("Show chart")} position="bottom">
        <button
          id="chartButton"
          className="toolbox-button icon-chart-line"
        />
      </Popover>
      <Popover content={translate("Show Trading View")} position="bottom">
        <button
          id="tradingViewButton"
          className="toolbox-button icon-trading-view"
        />
      </Popover>
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