import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../view/deriv/store";
import Routes from "./deriv/routes/";

export default function renderComponents() {
  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById("main")
  );
}
