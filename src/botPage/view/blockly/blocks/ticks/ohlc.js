// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335
import { mainScope } from '../../relationChecker';
import { translate } from '../../../../../common/i18n';

Blockly.Blocks.ohlc = {
  init: function init() {
    this.appendDummyInput().appendField(translate('Candles List'));
    this.setOutput(true, 'Array');
    this.setColour('#f2f2f2');
    this.setTooltip(translate('Returns the candle list'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function onchange(ev) {
    mainScope(this, ev, 'Candles List');
  },
};
Blockly.JavaScript.ohlc = () => [
  'Bot.getOhlc()',
  Blockly.JavaScript.ORDER_ATOMIC,
];
