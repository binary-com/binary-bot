import React from "react";
import PropTypes from "prop-types";

const ToolBox = ({ blockly }) => {
  return (
    <div id="toolbox">
      <button id="resetButton" className="toolbox-button icon-reset"></button>
      <button id="load-xml" className="toolbox-button icon-browse"></button>
      <button id="save-xml" className="toolbox-button icon-save"></button>
      <button
        id="integrations"
        className="toolbox-button icon-integrations invisible"
      ></button>

      <span className="toolbox-separator"></span>
      <button
        id="undo"
        className="toolbox-button icon-undo"
        onClick={()=>blockly.undo()}
      ></button>
      <button
        id="redo"
        className="toolbox-button icon-redo"
        onClick={()=>blockly.redo()}
      ></button>

      <span className="toolbox-separator"></span>
      <button
        id="zoomIn"
        className="toolbox-button icon-zoom-in"
        onClick={()=>blockly.zoomOnPlusMinus(true)}
      ></button>
      <button
        id="zoomOut"
        className="toolbox-button icon-zoom-out"
        onClick={()=>blockly.zoomOnPlusMinus(false)}
      ></button>
      <button
        id="rearrange"
        className="toolbox-button icon-sort"
        onClick={()=>blockly.cleanUp()}
      ></button>

      <span className="toolbox-separator"></span>
      <button id="showSummary" className="toolbox-button icon-summary"></button>
      <button id="runButton" className="toolbox-button icon-run"></button>
      <button id="stopButton" className="toolbox-button icon-stop"></button>
      <button id="logButton" className="toolbox-button icon-info"></button>

      <span className="toolbox-separator"></span>
      <button
        id="chartButton"
        className="toolbox-button icon-chart-line"
      ></button>
      <button
        id="tradingViewButton"
        className="toolbox-button icon-trading-view"
      ></button>
    </div>
  );
};

ToolBox.propTypes = {
  blockly: PropTypes.object.isRequired,
};

export default ToolBox;
