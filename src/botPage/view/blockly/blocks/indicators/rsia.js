// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qghes
import { translate } from '../../../../../common/i18n';
import { expectValue } from '../shared';

Blockly.Blocks.rsia = {
    init: function init() {
        this.appendDummyInput().appendField(translate('Relative Strength Index Array'));
        this.appendValueInput('INPUT').setCheck('Array').appendField(translate('Input List'));
        this.appendValueInput('PERIOD').setCheck('Number').appendField(translate('Period'));
        this.setOutput(true, 'Array');
        this.setColour('#dedede');
        this.setTooltip(translate('Calculates Relative Strength Index (RSI) list from a list of values with a period'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
};

Blockly.JavaScript.rsia = block => {
    const input = expectValue(block, 'INPUT');
    const period = Blockly.JavaScript.valueToCode(block, 'PERIOD', Blockly.JavaScript.ORDER_ATOMIC) || '14';
    return [`Bot.rsia(${input}, ${period})`, Blockly.JavaScript.ORDER_NONE];
};
