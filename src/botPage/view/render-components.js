import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../view/deriv/store";
import Main from "../../botPage/view/deriv/layout/Main";

export default function renderComponents() {
  ReactDOM.render(
    <Provider store={store}>
      <Main />
    </Provider>,
    document.getElementById("main")
  );
}
