/* eslint-disable import/no-extraneous-dependencies */
import "notifyjs-browser";
import "jquery-ui/ui/widgets/dialog";
import renderComponents from "./render-components";
import { symbolPromise } from "./shared";

$.ajaxSetup({
  cache: false,
});

symbolPromise.then(() => renderComponents());
