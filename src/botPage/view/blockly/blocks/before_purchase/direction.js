// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#n3drko
import { translator } from '../../../../../common/translator';
import { insideStrategy } from '../../relationChecker';

Blockly.Blocks.direction = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Tick Direction'));
    this.setOutput(true, 'String');
    this.setColour('#f2f2f2');
    this.setTooltip(translator.translateText("Returns the tick direction received by a strategy block, its value could be 'up' if the tick is more than before, 'down' if less than before and empty ('') if the tick is equal to the previous tick")); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function onchange(ev) {
    insideStrategy(this, ev, 'Tick Direction');
  },
};

Blockly.JavaScript.direction = () => ['ticks.direction', Blockly.JavaScript.ORDER_ATOMIC];
