import React from "react";

const ToolBox = () => {
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
      <button id="undo" className="toolbox-button icon-undo"></button>
      <button id="redo" className="toolbox-button icon-redo"></button>

      <span className="toolbox-separator"></span>
      <button id="zoomIn" className="toolbox-button icon-zoom-in"></button>
      <button id="zoomOut" className="toolbox-button icon-zoom-out"></button>
      <button id="rearrange" className="toolbox-button icon-sort"></button>

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

export default ToolBox;
