import React from "react";
import classNames from "classnames";
import { observer as globalObserver } from "../../../common/utils/observer";
import { translate } from "../../../common/i18n";
import { roundBalance } from "../../common/tools";
import useIsMounted from "../../../common/hooks/isMounted";
import Stage from "./components/Stage";

const INDICATOR_MESSAGES = {
  not_running: translate("Bot is not running."),
  starting: translate("Bot is starting..."),
  running: translate("Bot is running..."),
  stopping: translate("Bot is stopping..."),
  stopped: translate("Bot has stopped."),
};

const CONTRACT_STATUS = {
  not_running: "not_running",
  attempting_to_buy: "attempting_to_buy",
  buy_succeeded: "buy_succeeded",
  contract_closed: "contract_closed",
};

const AnimateTrade = () => {
  const [indicator_message, setIndicatorMessage] = React.useState(INDICATOR_MESSAGES.not_running);
  const [buy_price, setBuyPrice] = React.useState(0);
  const [buy_id, setBuyId] = React.useState(0);
  const [sell_id, setSellId] = React.useState(0);
  const [contract_status, setContractStatus] = React.useState(CONTRACT_STATUS.not_running);
  const isMounted = useIsMounted();

  React.useEffect(() => {
    globalObserver.register("reset_animation", resetSummary);
    globalObserver.register("summary.clear", resetSummary);
    globalObserver.register("bot.running", () => {
      if (isMounted()) setIndicatorMessage(INDICATOR_MESSAGES.running);
    });

    globalObserver.register("bot.stop", () => {
      if (isMounted()) setIndicatorMessage(INDICATOR_MESSAGES.stopped);
    });
    $("#stopButton").on("click", () => {
      setIndicatorMessage(
        globalObserver.getState("isRunning") ? INDICATOR_MESSAGES.stopping : INDICATOR_MESSAGES.stopped
      );
    });

    $("#runButton").on("click", () => {
      setIndicatorMessage(INDICATOR_MESSAGES.starting);
      setContractStatus(CONTRACT_STATUS.not_running);
      globalObserver.emit("summary.disable_clear");
      globalObserver.register("contract.status", contract => animateStage(contract));
    });
    return () => {
      $("#stopButton").off("click");
      $("#runButton").off("click");
    };
  }, []);

  const resetSummary = () => {
    setIndicatorMessage(INDICATOR_MESSAGES.not_running);
  };

  const animateStage = contract => {
    if (contract.id === "contract.purchase_sent") {
      setContractStatus(CONTRACT_STATUS.attempting_to_buy);
      setBuyPrice(
        roundBalance({
          balance: contract.proposal.ask_price,
          currency: contract.currency,
        })
      );
      return;
    }

    if (contract.id === "contract.purchase_recieved") {
      setContractStatus(CONTRACT_STATUS.buy_succeeded);
      setBuyId(contract.data);
      return;
    }

    if (contract.id === "contract.sold") {
      setContractStatus(CONTRACT_STATUS.contract_closed);
      setSellId(contract.data);
    }
  };

  const is_running = indicator_message === INDICATOR_MESSAGES.running;
  const is_starting = indicator_message === INDICATOR_MESSAGES.starting;
  const is_stopping = indicator_message === INDICATOR_MESSAGES.stopping;
  const is_not_running = indicator_message === INDICATOR_MESSAGES.not_running;

  const is_attempting_to_buy = contract_status === CONTRACT_STATUS.attempting_to_buy;
  const is_buy_succeeded = contract_status === CONTRACT_STATUS.buy_succeeded;
  const is_contract_closed = contract_status === CONTRACT_STATUS.contract_closed;

  return (
    <div>
      <div className="trade-animator">
        <div className="trade-animator__indicator-message">
          <div className={classNames("active", { running: is_running })}>
            <p>{indicator_message}</p>
          </div>
        </div>
        <div className="trade-animator__stages">
          <Stage
            title={translate("Attempting to Buy")}
            inner_classes={{
              circle: classNames("circle", {
                active: is_running && is_attempting_to_buy,
                complete: !(is_starting || is_not_running),
              }),
              tooltip: classNames("tooltip", {
                active: !(is_starting || is_not_running),
              }),
            }}
            tooltip_text={`${translate("Buy amount")}: ${buy_price || 0}`}
          />
          <Stage
            title={translate("Buy succeeded")}
            inner_classes={{
              circle: classNames("circle", {
                active: (is_running || is_stopping) && is_buy_succeeded,
                complete: !(is_starting || is_not_running) && (is_buy_succeeded || is_contract_closed),
              }),
              tooltip: classNames("tooltip", {
                active: !is_starting && (is_buy_succeeded || is_contract_closed),
              }),
            }}
            tooltip_text={`${translate("ID")}: ${buy_id || ""}`}
          />
          <Stage
            title={translate("Contract closed")}
            inner_classes={{
              circle: classNames("circle", {
                active: is_running && is_contract_closed,
                complete: !is_starting && is_contract_closed,
              }),
              tooltip: classNames("tooltip", {
                active: !is_starting && is_contract_closed,
              }),
            }}
            tooltip_text={`${translate("ID")}: ${sell_id || ""}`}
          />
          <span
            className={classNames("trade-animator__progress-bar", {
              active: !is_starting && (is_buy_succeeded || is_contract_closed),
              complete: is_contract_closed && !is_starting,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimateTrade;
