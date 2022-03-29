import React from "react";
import ReactDOM from "react-dom";
import Logo from "./react-components/logo.jsx";
import Footer from "./react-components/footer.jsx";
import { oauthLogin } from "../common/appId";
import GTM from "../common/gtm";
import { load as loadLang, showBanner } from "../common/lang";
import { getTokenList } from "../common/utils/storageManager";
import { createUrl } from "../common/utils/tools";

const renderElements = () => {
  ReactDOM.render(<Logo />, document.getElementById("binary-logo"));
  ReactDOM.render(<Footer />, document.getElementById("footer"));
  showBanner();
  $("#shop-url").attr("href", createUrl({ subdomain: "shop", path: "collections/strategies", isNonBotPage: true }));
};

const loginCheck = () => {
  if (!getTokenList().length) {
    loadLang();
    oauthLogin(() => {
      $(".show-on-load").show();
      $(".barspinner").hide();
      renderElements();
      GTM.init();
    });
  }
};

loginCheck();
