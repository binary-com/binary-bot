import React from "react";
import PropTypes from "prop-types";
import Modal from "../../components/modal";
import { translate } from "../../../../../common/i18n";
import Load from "./components/load";
import Save from "./components/save";
import Reset from "./components/reset";

const ShowModal = ({ modal, onClose, class_name }) => {
  if (!modal) return;
  const { component: Component, props, title } = modal;
  return (
    <Modal onClose={onClose} title={title} class_name={class_name}>
      <Component {...props}/>
    </Modal>
  );
};

const ToolBox = ({ blockly }) => {
  const [should_show_modal, setShowModal] = React.useState(false);
  const [selected_modal, updateSelectedModal] = React.useState("");

  React.useEffect(() => {
    const Keys = Object.freeze({"zoomIn": 187,"zoomOut": 189})
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
    updateSelectedModal("");
    setShowModal(false);
  };
  const onShowModal = (modal) => {
    updateSelectedModal(modal);
    setShowModal(true);
  };
  const MODALS = {
    load: {
      component: Load,
      title: translate("Load Blocks"),
      props: {
        closeDialog: () => {
          onCloseModal;
        },
      },
    },
    save: {
      component: Save,
      title: translate("Save Blocks"),
      props: {
        closeDialog: () => {
          onCloseModal;
        },
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
      <button
        id="resetButton"
        className="toolbox-button icon-reset"
        onClick={() => {
          onShowModal("reset");
        }}
      />
      <button
        id="load-xml"
        className="toolbox-button icon-browse"
        onClick={() => {
          onShowModal("load");
        }}
      />
      <button
        id="save-xml"
        className="toolbox-button icon-save"
        onClick={() => {
          onShowModal("save");
        }}
      />
      <button
        id="integrations"
        className="toolbox-button icon-integrations invisible"
      />

      <span className="toolbox-separator"/>
      <button
        id="undo"
        className="toolbox-button icon-undo"
        onClick={() => blockly.undo()}
      />
      <button
        id="redo"
        className="toolbox-button icon-redo"
        onClick={() => blockly.redo()}
      />

      <span className="toolbox-separator"/>
      <button
        id="zoomIn"
        className="toolbox-button icon-zoom-in"
        onClick={() => blockly.zoomOnPlusMinus(true)}
      />
      <button
        id="zoomOut"
        className="toolbox-button icon-zoom-out"
        onClick={() => blockly.zoomOnPlusMinus(false)}
      />
      <button
        id="rearrange"
        className="toolbox-button icon-sort"
        onClick={() => blockly.cleanUp()}
      />
      {/* Needs Refactor ClientInfo Structure */}
      <span className="toolbox-separator"/>
      <button id="showSummary" className="toolbox-button icon-summary"/>
      <button id="runButton" className="toolbox-button icon-run"/>
      <button id="stopButton" className="toolbox-button icon-stop"/>
      <button id="logButton" className="toolbox-button icon-info"/>

      <span className="toolbox-separator"/>
      {/* Needs resizeable modal */}
      <button
        id="chartButton"
        className="toolbox-button icon-chart-line"
      />
      <button
        id="tradingViewButton"
        className="toolbox-button icon-trading-view"
      />
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
