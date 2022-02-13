import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import _Blockly from "./blockly";
import store from "../view/deriv/store";
import api from "../../common/appId";
import Main from "../../botPage/view/deriv/layout/Main";
import TradeInfoPanel from "../../botPage/view/TradeInfoPanel";
import LogTable from "../../botPage/view/LogTable";

export default function renderComponents() {
  const blockly = new _Blockly();

  blockly.initPromise.then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <Main api={api} blockly={blockly} />
      </Provider>,
      document.getElementById("main")
    );
    ReactDOM.render(
      <Provider store={store}>
        <TradeInfoPanel />
      </Provider>,
      document.getElementById("summaryPanel")
    );
    ReactDOM.render(
      <Provider store={store}>
        <LogTable />
      </Provider>,
      document.getElementById("logTable")
    );
  });
}
