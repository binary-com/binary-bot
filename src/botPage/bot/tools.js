import { getUTCTime } from "../../common/utils/tools";
import { translate } from "../../common/i18n";
import { roundBalance } from "../common/tools";
import { notify } from "./broadcast";

export const noop = () => {};

export const tradeOptionToProposal = (trade_option, purchase_reference) =>
  trade_option.contractTypes.map(type => {
    const proposal = {
      proposal: 1,
      duration_unit: trade_option.duration_unit,
      basis: trade_option.basis,
      currency: trade_option.currency,
      symbol: trade_option.symbol,
      duration: trade_option.duration,
      amount: roundBalance({ currency: trade_option.currency, balance: trade_option.amount }),
      contract_type: type,
      passthrough: {
        contract_type: type,
        purchase_reference,
      },
    };
    if (trade_option.prediction !== undefined) {
      proposal.selected_tick = trade_option.prediction;
    }
    if (!["TICKLOW", "TICKHIGH"].includes(type) && trade_option.prediction !== undefined) {
      proposal.barrier = trade_option.prediction;
    } else if (trade_option.barrierOffset !== undefined) {
      proposal.barrier = trade_option.barrierOffset;
    }
    if (trade_option.secondBarrierOffset !== undefined) {
      proposal.barrier2 = trade_option.secondBarrierOffset;
    }
    return proposal;
  });

export const getDirection = ticks => {
  const { length } = ticks;
  const [tick_old, tick_new] = ticks.slice(-2);

  let direction = "";
  if (length >= 2) {
    direction = tick_old.quote < tick_new.quote ? "rise" : direction;
    direction = tick_old.quote > tick_new.quote ? "fall" : direction;
  }

  return direction;
};

export const getLastDigit = (tick, pip_size) => Number(tick.toFixed(pip_size).slice(-1)[0]);

export const subscribeToStream = (observer, name, respHandler, request, registerOnce, type, unregister) =>
  new Promise(resolve => {
    observer.register(
      name,
      (...args) => {
        respHandler(...args);
        resolve();
      },
      registerOnce,
      type && { type, unregister },
      true
    );
    request();
  });

export const registerStream = (observer, name, cb) => {
  if (observer.isRegistered(name)) {
    return;
  }
  observer.register(name, cb);
};

const MAX_RETRIES = 12;

const notifyRetry = (msg, error, delay) =>
  notify("warn", `${msg}: ${error.error.msg_type}, ${translate("retrying in")} ${delay}s`);

const getBackoffDelay = (error, delay_index) => {
  const offset = 0.5; // 500ms
  const delay = 1000;

  const error_code = error && error.error.code;

  if (error_code === "DisconnectError") {
    return offset * delay;
  }

  const max_exp_tries = 4;
  const exponential_increase = 2 ** delay_index + offset;

  if (error_code === "RateLimit" || delay_index < max_exp_tries) {
    notifyRetry(translate("Rate limit reached for"), error, exponential_increase);
    return exponential_increase * delay;
  }

  const linear_increase = exponential_increase + (max_exp_tries - delay_index + 1);

  notifyRetry(translate("Request failed for"), error, linear_increase);
  return linear_increase * delay;
};

export const shouldThrowError = (error, types = [], delay_index = 0) => {
  if (!error) return false;
  const default_errors = ["CallError", "WrongResponse", "GetProposalFailure", "RateLimit", "DisconnectError"];
  const auth_errors = ["InvalidToken", "AuthorizationRequired"];
  const errors = types.concat(default_errors);

  if (auth_errors.includes(error.error.code)) {
    // If auth error, reload page.
    window.location.reload();
    return true;
  }

  if (!errors.includes(error.error.code)) {
    // If error is unrecoverable, throw error.
    return true;
  }

  if (error.error.code !== "DisconnectError" && delay_index > MAX_RETRIES) {
    // If exceeded MAX_RETRIES, throw error.
    return true;
  }

  return false;
};

export const recoverFromError = (f, r, types, delay_index) =>
  new Promise((resolve, reject) => {
    const promise = f();

    if (!promise) {
      resolve();
      return;
    }

    promise.then(resolve).catch(e => {
      if (shouldThrowError(e, types, delay_index)) {
        reject(e);
        return;
      }

      r(e.name, () => new Promise(delayPromise => setTimeout(delayPromise, getBackoffDelay(e, delay_index))));
    });
  });

export const doUntilDone = (f, types) => {
  let delay_index = 0;

  return new Promise((resolve, reject) => {
    const repeat = () => {
      recoverFromError(f, (errorCode, makeDelay) => makeDelay().then(repeat), types, delay_index++)
        .then(resolve)
        .catch(reject);
    };
    repeat();
  });
};

export const createDetails = (contract, pip_size) => {
  const { sell_price, buy_price, currency } = contract;
  const profit = Number(roundBalance({ currency, balance: sell_price - buy_price }));
  const result = profit < 0 ? "loss" : "win";

  return [
    contract.transaction_ids.buy,
    +contract.buy_price,
    +contract.sell_price,
    profit,
    contract.contract_type,
    getUTCTime(new Date(parseInt(`${contract.entry_tick_time}000`))),
    +contract.entry_tick,
    getUTCTime(new Date(parseInt(`${contract.exit_tick_time}000`))),
    +contract.exit_tick,
    +(contract.barrier ? contract.barrier : 0),
    result,
    (+contract.entry_tick).toFixed(pip_size),
    (+contract.exit_tick).toFixed(pip_size),
  ];
};

export const getUUID = () => `${new Date().getTime() * Math.random()}`;

export const showDialog = options =>
  new Promise((resolve, reject) => {
    const $dialog = $("<div/>", { class: `draggable-dialog ${options.className}`, title: options.title });
    options.text.forEach(text => $dialog.append(`<p style="margin: 0.7em;">${text}</p>`));
    const defaultButtons = [
      {
        text: translate("No"),
        class: "button-secondary",
        click() {
          $(this).dialog("close");
          $(this).remove();
          reject();
        },
      },
      {
        text: translate("Yes"),
        class: "button-primary",
        click() {
          $(this).dialog("close");
          $(this).remove();
          resolve();
        },
      },
    ];
    const dialogOptions = {
      autoOpen: false,
      classes: { "ui-dialog-titlebar-close": "icon-close" },
      closeText: "",
      height: "auto",
      width: 600,
      modal: true,
      resizable: false,
      open() {
        $(this)
          .parent()
          .find(".ui-dialog-buttonset > button")
          .removeClass("ui-button ui-corner-all ui-widget");
      },
    };
    Object.assign(dialogOptions, { buttons: options.buttons || defaultButtons });

    $dialog.dialog(dialogOptions);
    $dialog.dialog("open");
  });
