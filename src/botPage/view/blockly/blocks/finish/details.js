// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xq4ajc
import { insideFinish } from '../../relationChecker';
import { translator } from '../../../../../common/translator';

Blockly.Blocks.contract_details = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Contract Details'));
    this.setOutput(true, 'Array');
    this.setColour('#f2f2f2');
    this.setTooltip(translator.translateText('Returns the list of details for the finished contract')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function onchange(ev) {
    insideFinish(this, ev, 'Contract Details');
  },
};
Blockly.JavaScript.contract_details = () => ['details', Blockly.JavaScript.ORDER_ATOMIC];
