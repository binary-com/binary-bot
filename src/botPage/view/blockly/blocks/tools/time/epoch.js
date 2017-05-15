// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3bwqd4
import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.epoch = {
    init: function init() {
        this.appendDummyInput().appendField(translate('Seconds Since Epoch'));
        this.setOutput(true, 'Number');
        this.setColour('#dedede');
        this.setTooltip(translate('Returns the epoch time (seconds since epoch)'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
};
Blockly.JavaScript.epoch = () => ['Bot.getTime()', Blockly.JavaScript.ORDER_ATOMIC];
