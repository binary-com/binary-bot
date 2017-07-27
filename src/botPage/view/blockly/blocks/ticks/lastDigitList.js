// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335
import { mainScope } from '../../relationChecker';
import { translate } from '../../../../../common/i18n';

Blockly.Blocks.lastDigitList = {
    init: function init() {
        this.appendDummyInput().appendField(translate('Last Digit List'));
        this.setOutput(true, 'Array');
        this.setColour('#f2f2f2');
        this.setTooltip(translate('Returns the list of last digit values'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        mainScope(this, ev, 'Last Digit List');
    },
};
Blockly.JavaScript.lastDigitList = () => ['Bot.getLastDigitList()', Blockly.JavaScript.ORDER_ATOMIC];
