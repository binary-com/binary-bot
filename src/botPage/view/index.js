/* eslint-disable import/no-extraneous-dependencies */
import "notifyjs-browser";
import "jquery-ui/ui/widgets/dialog";
import { TrackJS } from "trackjs";
import { trackjs_config } from "../../botPage/view/trackJs_config";
import GTM from '../../common/gtm';
import renderComponents from "./render-components";
import { symbolPromise } from "./shared";

TrackJS.install(trackjs_config);

GTM.init();

$.ajaxSetup({
  cache: false,
});

symbolPromise.then(() => renderComponents());
