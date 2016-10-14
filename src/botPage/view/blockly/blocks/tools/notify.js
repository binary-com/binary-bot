// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pmhydb
import { translator } from '../../../../../common/translator';
import config from '../../../../../common/const';

Blockly.Blocks.notify = {
  init: function init() {
    this.appendValueInput('MESSAGE')
      .setCheck(null)
      .appendField(translator.translateText('Notify'))
      .appendField(new Blockly.FieldDropdown(config.lists.NOTIFICATION_TYPE), 'NOTIFICATION_TYPE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#dedede');
    this.setTooltip(translator.translateText('Creates notification')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};
Blockly.JavaScript.notify = (block) => {
  const notificationType = block.getFieldValue('NOTIFICATION_TYPE');
  const message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
  const code = `Bot.log(String(${message}), '${notificationType}');\n`;
  return code;
};
