// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335
import { mainScope } from '../../relationChecker';
import { translate } from '../../../../../common/i18n';

Blockly.Blocks.ticks = {
    init: function init() {
        this.appendDummyInput().appendField(translate('Ticks List'));
        this.setOutput(true, 'Array');
        this.setColour('#f2f2f2');
        this.setTooltip(translate('Returns the list of tick values'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: function onchange(ev) {
        mainScope(this, ev, 'Ticks List');
    },
};
Blockly.JavaScript.ticks = () => ['Bot.getTicks(false)', Blockly.JavaScript.ORDER_ATOMIC];

Blockly.Blocks.ticks_string = {
    init: function init() {
        this.appendDummyInput().appendField(translate('Ticks String List'));
        this.setOutput(true, 'Array');
        this.setColour('#f2f2f2');
        this.setTooltip(translate('Returns the list of tick values (String)'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: Blockly.Blocks.ticks.onchange,
};
Blockly.JavaScript.ticks_string = () => ['Bot.getTicks(true)', Blockly.JavaScript.ORDER_ATOMIC];
