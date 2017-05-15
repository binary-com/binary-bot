// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335
import { mainScope } from '../../relationChecker';
import { translate } from '../../../../../common/i18n';

Blockly.Blocks.last_digit = {
    init: function init() {
        this.appendDummyInput().appendField(translate('Last Digit'));
        this.setOutput(true, 'Number');
        this.setColour('#f2f2f2');
        this.setTooltip(translate('Returns the last digit of the latest tick'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        mainScope(this, ev, 'Tick Value');
    },
};
Blockly.JavaScript.last_digit = () => ['Bot.getLastDigit()', Blockly.JavaScript.ORDER_ATOMIC];
