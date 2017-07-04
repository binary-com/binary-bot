// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qghes
import { translate } from '../../../../../common/i18n';
import { expectValue } from '../shared';

Blockly.Blocks.ema = {
    init: function init() {
        this.appendDummyInput().appendField(translate('Exponential Moving Average'));
        this.appendValueInput('INPUT').setCheck('Array').appendField(translate('Input List'));
        this.appendValueInput('PERIOD').setCheck('Number').appendField(translate('Period'));
        this.setOutput(true, 'Number');
        this.setColour('#dedede');
        this.setTooltip(translate('Calculates Exponential Moving Average (EMA) from a list with a period'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
};

Blockly.JavaScript.ema = block => {
    const input = expectValue(block, 'INPUT');
    const period = expectValue(block, 'PERIOD');
    return [`Bot.ema(${input}, ${period})`, Blockly.JavaScript.ORDER_NONE];
};
