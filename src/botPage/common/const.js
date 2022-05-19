import { translate } from "../../common/i18n";
import api from "../view/deriv/api";
import { load as loadLang } from "../../common/lang";

loadLang();

const CRYPTO_CURRENCIES = ["BTC", "ETH", "LTC", "BCH", "ETC"];

const config = {
  lists: {
    CRYPTO_CURRENCIES,
    DETAILS: [
      [translate("statement"), "1"],
      [translate("ask price"), "2"],
      [translate("payout"), "3"],
      [translate("profit"), "4"],
      [translate("contract type"), "5"],
      [translate("entry spot"), "6"],
      [translate("entry value"), "7"],
      [translate("entry value string"), "12"],
      [translate("exit spot"), "8"],
      [translate("exit value"), "9"],
      [translate("exit value string"), "13"],
      [translate("barrier"), "10"],
      [translate("result"), "11"],
    ],
    CHECK_RESULT: [
      [translate("Win"), "win"],
      [translate("Loss"), "loss"],
    ],
    CHECK_DIRECTION: [
      [translate("Rise"), "rise"],
      [translate("Fall"), "fall"],
      [translate("No Change"), ""],
    ],
    BALANCE_TYPE: [
      [translate("string"), "STR"],
      [translate("number"), "NUM"],
    ],
    NOTIFICATION_TYPE: [
      [translate("green"), "success"],
      [translate("blue"), "info"],
      [translate("yellow"), "warn"],
      [translate("red"), "error"],
    ],
    NOTIFICATION_SOUND: [
      [translate("Silent"), "silent"],
      [translate("Announcement"), "announcement"],
      [translate("Earned money"), "earned-money"],
      [translate("Job done"), "job-done"],
      [translate("Error"), "error"],
      [translate("Severe error"), "severe-error"],
    ],
  },
  opposites: {
    RISEFALL: [
      {
        CALL: translate("Rise"),
      },
      {
        PUT: translate("Fall"),
      },
    ],
    RISEFALLEQUALS: [
      {
        CALLE: translate("Rise Equals"),
      },
      {
        PUTE: translate("Fall Equals"),
      },
    ],
    HIGHERLOWER: [
      {
        CALL: translate("Higher"),
      },
      {
        PUT: translate("Lower"),
      },
    ],
    TOUCHNOTOUCH: [
      {
        ONETOUCH: translate("Touch"),
      },
      {
        NOTOUCH: translate("No Touch"),
      },
    ],
    ENDSINOUT: [
      {
        EXPIRYRANGE: translate("Ends In"),
      },
      {
        EXPIRYMISS: translate("Ends Out"),
      },
    ],
    STAYSINOUT: [
      {
        RANGE: translate("Stays In"),
      },
      {
        UPORDOWN: translate("Goes Out"),
      },
    ],
    ASIANS: [
      {
        ASIANU: translate("Asian Up"),
      },
      {
        ASIAND: translate("Asian Down"),
      },
    ],
    MATCHESDIFFERS: [
      {
        DIGITMATCH: translate("Matches"),
      },
      {
        DIGITDIFF: translate("Differs"),
      },
    ],
    EVENODD: [
      {
        DIGITEVEN: translate("Even"),
      },
      {
        DIGITODD: translate("Odd"),
      },
    ],
    OVERUNDER: [
      {
        DIGITOVER: translate("Over"),
      },
      {
        DIGITUNDER: translate("Under"),
      },
    ],
    HIGHLOWTICKS: [
      {
        TICKHIGH: translate("High Tick"),
      },
      {
        TICKLOW: translate("Low Tick"),
      },
    ],
    RESET: [
      {
        RESETCALL: translate("Reset Call"),
      },
      {
        RESETPUT: translate("Reset Put"),
      },
    ],
    RUNS: [
      {
        RUNHIGH: translate("Only Ups"),
      },
      {
        RUNLOW: translate("Only Downs"),
      },
    ],
  },
  barrierTypes: [
    ["Offset +", "+"],
    ["Offset -", "-"],
  ],
  ohlcFields: [
    [translate("Open"), "open"],
    [translate("High"), "high"],
    [translate("Low"), "low"],
    [translate("Close"), "close"],
    [translate("Open Time"), "epoch"],
  ],
  candleIntervals: [
    [translate("Default"), "default"],
    [translate("1 minute"), "60"],
    [translate("2 minutes"), "120"],
    [translate("3 minutes"), "180"],
    [translate("5 minutes"), "300"],
    [translate("10 minutes"), "600"],
    [translate("15 minutes"), "900"],
    [translate("30 minutes"), "1800"],
    [translate("1 hour"), "3600"],
    [translate("2 hours"), "7200"],
    [translate("4 hours"), "14400"],
    [translate("8 hours"), "28800"],
    [translate("1 day"), "86400"],
  ],
  mainBlocks: ["trade", "before_purchase", "after_purchase", "during_purchase"],
  mandatoryBlocks: ["trade", "before_purchase", "tradeOptions", "purchase"],
  mandatoryMainBlocks: ["trade", "before_purchase"],
  mandatoryBlockPairs: [
    {
      parentBlock: "trade",
      childBlock: "tradeOptions",
    },
    {
      parentBlock: "before_purchase",
      childBlock: "purchase",
    },
    quick_strategies : ['martingale', 'dalembert'],
    blocked_countries: ['au'],
};

export async function updateConfigCurrencies() {
  try {
    const response = await api.send({ payout_currencies: 1 });
    config.lists.CURRENCY = response.payout_currencies.map(c => {
      if (c === "UST") return ["USDT", "UST"];
      return [c, c];
    });
  } catch (e) {
    config.lists.CURRENCY = ["USD", "EUR", "GBP", "AUD", ...CRYPTO_CURRENCIES].map(c => [c, c]);
  }
}

export default config;
