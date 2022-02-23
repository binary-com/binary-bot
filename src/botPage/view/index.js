/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import ReactDOM from 'react-dom';
import "notifyjs-browser";
import "jquery-ui/ui/widgets/dialog";
import store from "./deriv/store";
import { Provider } from "react-redux";
import App from './deriv/app'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("main")
);