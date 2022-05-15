import config, { updateConfigCurrencies } from "../../../botPage/common/const";
import logHandler from "../../view/logger";
import { updateTokenList } from "./utils";
import {
  getTokenList,
  set as setStorage,
  syncWithDerivApp,
  getToken,
  removeAllTokens,
} from "../../../common/utils/storageManager";
import { observer as globalObserver } from "../../../common/utils/observer";
import { translate } from "../../../common/i18n";
import { logoutAllTokens, AppConstants } from "../../../common/appId";
import IntegrationsDialog from "../Dialogs/IntegrationsDialog";
import Chart from "../Dialogs/Chart";
import TradingView from "../Dialogs/TradingView";
import Limits from "../Dialogs/Limits";
import {
  saveBeforeUnload,
  getMissingBlocksTypes,
  getDisabledMandatoryBlocks,
  getUnattachedMandatoryPairs,
} from "../blockly/utils";
import GTM from "../../../common/gtm";
import google_drive_util from "../../../common/integrations/GoogleDrive";
import { load } from "../../view/blockly";
import api from "./api";

const integrationsDialog = new IntegrationsDialog();
const tradingView = new TradingView();
let chart;

const checkForRequiredBlocks = () => {
  const displayError = errorMessage => {
    const error = new Error(errorMessage);
    globalObserver.emit("Error", error);
  };

  const blockLabels = { ...config.blockLabels };
  const missingBlocksTypes = getMissingBlocksTypes();
  const disabledBlocksTypes = getDisabledMandatoryBlocks().map(block => block.type);
  const unattachedPairs = getUnattachedMandatoryPairs();

  if (missingBlocksTypes.length) {
    missingBlocksTypes.forEach(blockType =>
      displayError(`"${blockLabels[blockType]}" ${translate("block should be added to the workspace")}.`)
    );
    return false;
  }

  if (disabledBlocksTypes.length) {
    disabledBlocksTypes.forEach(blockType =>
      displayError(`"${blockLabels[blockType]}" ${translate("block should be enabled")}.`)
    );
    return false;
  }

  if (unattachedPairs.length) {
    unattachedPairs.forEach(pair =>
      displayError(
        `"${blockLabels[pair.childBlock]}" ${translate("must be added inside:")} "${blockLabels[pair.parentBlock]}"`
      )
    );
    return false;
  }

  return true;
};

export function applyToolboxPermissions() {
  const fn = getTokenList().length ? "show" : "hide";
  $("#runButton, #showSummary, #logButton")
    [fn]()
    .prevAll(".toolbox-separator:first")
    [fn]();
};

const setFileBrowser = () => {
  const readFile = (f, dropEvent = {}) => {
    const reader = new FileReader();
    reader.onload = e => load(e.target.result, dropEvent);
    reader.readAsText(f);
  };

  const handleFileSelect = e => {
    let files;
    let dropEvent;
    if (e.type === "drop") {
      e.stopPropagation();
      e.preventDefault();
      ({ files } = e.dataTransfer);
      dropEvent = e;
    } else {
      ({ files } = e.target);
    }
    files = Array.from(files);
    files.forEach(file => {
      if (file.type.match("text/xml")) {
        readFile(file, dropEvent);
      } else {
        globalObserver.emit("ui.log.info", `${translate("File is not supported:")} ${file.name}`);
      }
    });
    $("#files").val("");
  };

  const handleDragOver = e => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy"; // eslint-disable-line no-param-reassign
  };

  const dropZone = document.body;

  dropZone.addEventListener("dragover", handleDragOver, false);
  dropZone.addEventListener("drop", handleFileSelect, false);

  $("#files").on("change", handleFileSelect);

  $("#open_btn")
    .on("click", () => {
      $.FileDialog({
        // eslint-disable-line new-cap
        accept: ".xml",
        cancelButton: "Close",
        dragMessage: "Drop files here",
        dropheight: 400,
        errorMessage: "An error occured while loading file",
        multiple: false,
        okButton: "OK",
        readAs: "DataURL",
        removeMessage: "Remove&nbsp;file",
        title: "Load file",
      });
    })
    .on("files.bs.filedialog", ev => {
      handleFileSelect(ev.files);
    })
    .on("cancel.bs.filedialog", ev => {
      handleFileSelect(ev);
    });
};

const setElementActions = blockly => {
  setFileBrowser();
  addBindings(blockly);
  addEventHandlers(blockly);
};

const addBindings = blockly => {
  const stop = e => {
    if (e) {
      e.preventDefault();
    }
    stopBlockly(blockly);
  };

  const removeTokens = () => {
    logoutAllTokens().then(() => {
      updateTokenList();
      globalObserver.emit("ui.log.info", translate("Logged you out!"));
      clearActiveTokens();

      // Todo: Need to remove this reload, and add logic to clear redux state.
      // Need to stop the barspinner once removed this
      window.location.reload();
    });
  };

  const clearActiveTokens = () => {
    setStorage(AppConstants.STORAGE_ACTIVE_TOKEN, "");
    setStorage("active_loginid", null);
    syncWithDerivApp();
  };

  $(".panelExitButton").click(function onClick() {
    $(this)
      .parent()
      .hide();
  });

  $(".draggable-dialog")
    .hide()
    .dialog({
      resizable: false,
      autoOpen: false,
      width: Math.min(document.body.offsetWidth, 770),
      height: Math.min(document.body.offsetHeight, 600),
      closeText: "",
      classes: { "ui-dialog-titlebar-close": "icon-close" },
    });

  $("#integrations").click(() => integrationsDialog.open());

  $("#chartButton").click(() => {
    if (!chart) {
      chart = new Chart(api);
    }

    chart.open();
  });

  $("#tradingViewButton").click(() => {
    tradingView.open();
  });

  const exportContent = {};
  exportContent.summaryPanel = () => {
    globalObserver.emit("summary.export");
  };

  exportContent.logPanel = () => {
    globalObserver.emit("log.export");
  };

  const addExportButtonToPanel = panelId => {
    const buttonHtml =
      '<button class="icon-save" style="position:absolute;top:50%;margin:-10px 0 0 0;right:2em;padding:0.2em"></button>';
    const $button = $(buttonHtml);
    const panelSelector = `[aria-describedby="${panelId}"]`;
    if (!$(`${panelSelector} .icon-save`).length) {
      $button.insertBefore(`${panelSelector} .icon-close`);
      $(`${panelSelector} .icon-close`).blur();
      $($(`${panelSelector} .icon-save`)).click(() => {
        exportContent[panelId]();
      });
    }
  };

  const showSummary = () => {
    $("#summaryPanel")
      .dialog("option", "minWidth", 770)
      .dialog("open");
    addExportButtonToPanel("summaryPanel");
  };

  $("#logButton").click(() => {
    $("#logPanel").dialog("open");
    addExportButtonToPanel("logPanel");
  });

  $("#showSummary").click(showSummary);

  globalObserver.register("ui.logout", () => {
    saveBeforeUnload();
    $(".barspinner").show();
    stopBlockly(blockly);
    google_drive_util.logout();
    GTM.setVisitorId();
    removeTokens();
  });

  const startBot = limitations => {
    const elRunButtons = document.querySelectorAll("#runButton, #summaryRunButton");
    const elStopButtons = document.querySelectorAll("#stopButton, #summaryStopButton");

    elRunButtons.forEach(el => {
      const elRunButton = el;
      elRunButton.style.display = "none";
      elRunButton.setAttributeNode(document.createAttribute("disabled"));
    });
    elStopButtons.forEach(el => {
      const elStopButton = el;
      elStopButton.style.display = "inline-block";
    });

    showSummary();
    blockly.run(limitations);
  };

  $("#runButton").click(() => {
    // setTimeout is needed to ensure correct event sequence
    if (!checkForRequiredBlocks()) {
      setTimeout(() => $("#stopButton").triggerHandler("click"));
      return;
    }

    const token = document.getElementById("active-token").value;
    const tokenObj = getToken(token);

    if (tokenObj && tokenObj.hasTradeLimitation) {
      const limits = new Limits(api);
      limits
        .getLimits()
        .then(startBot)
        .catch(() => {});
    } else {
      startBot();
    }
  });

  $("#stopButton")
    .click(e => stop(e))
    .hide();

  $('[aria-describedby="summaryPanel"]').on("click", "#summaryRunButton", () => {
    $("#runButton").trigger("click");
  });

  $('[aria-describedby="summaryPanel"]').on("click", "#summaryStopButton", () => {
    $("#stopButton").trigger("click");
  });

  globalObserver.register("ui.switch_account", () => {
    stopBlockly(blockly);
    GTM.setVisitorId();
  });

  globalObserver.register("bot.reload", () => {
    blockly.initPromise.then(() => {
      updateConfigCurrencies().then(() => {
        blockly.resetAccount();
      })
    });
  })
};
const stopBlockly = blockly => blockly.stop();

const addEventHandlers = blockly => {
  const getRunButtonElements = () => document.querySelectorAll("#runButton, #summaryRunButton");
  const getStopButtonElements = () => document.querySelectorAll("#stopButton, #summaryStopButton");

  window.addEventListener("storage", e => {
    window.onbeforeunload = null;
    if (["activeToken", "active_loginid"].includes(e.key) && e.newValue !== e.oldValue) {
      window.location.reload();
    }
  });

  globalObserver.register("Error", error => {
    getRunButtonElements().forEach(el => {
      const elRunButton = el;
      elRunButton.removeAttribute("disabled");
    });
    if (error?.error?.code === "InvalidToken") {
      removeAllTokens();
      updateTokenList();
      stopBlockly(blockly);
    }
  });

  globalObserver.register("bot.running", () => {
    getRunButtonElements().forEach(el => {
      const elRunButton = el;
      elRunButton.style.display = "none";
      elRunButton.setAttributeNode(document.createAttribute("disabled"));
    });
    getStopButtonElements().forEach(el => {
      const elStopButton = el;
      elStopButton.style.display = "inline-block";
      elStopButton.removeAttribute("disabled");
    });
  });

  globalObserver.register("bot.stop", () => {
    // Enable run button, this event is emitted after the interpreter
    // killed the API connection.
    getStopButtonElements().forEach(el => {
      const elStopButton = el;
      elStopButton.style.display = null;
      elStopButton.removeAttribute("disabled");
    });
    getRunButtonElements().forEach(el => {
      const elRunButton = el;
      elRunButton.style.display = null;
      elRunButton.removeAttribute("disabled");
    });
  });

  globalObserver.register("bot.info", info => {
    if ("profit" in info) {
      const token = document.getElementById("active-token").value;
      const user = getToken(token);
      globalObserver.emit("log.revenue", {
        user,
        profit: info.profit,
        contract: info.contract,
      });
    }
  });
};

const initialize = blockly =>
  new Promise(resolve => {
    updateConfigCurrencies().then(() => {
      updateTokenList();
      logHandler();
      applyToolboxPermissions();
      setElementActions(blockly);
      resolve();
    });
  });

export default initialize;
