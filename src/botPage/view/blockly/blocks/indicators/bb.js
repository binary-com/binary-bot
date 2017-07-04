// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qghes
import { translate } from '../../../../../common/i18n';
import config from '../../../../common/const';
import { expectValue } from '../shared';

Blockly.Blocks.bb = {
    init: function init() {
        this.appendDummyInput()
            .appendField(translate('Bollinger Bands'))
            .appendField(new Blockly.FieldDropdown(config.bbResult), 'BBRESULT_LIST');
        this.appendValueInput('INPUT').setCheck('Array').appendField(translate('Input List'));
        this.appendValueInput('PERIOD').setCheck('Number').appendField(translate('Period'));
        this.appendValueInput('UPMULTIPLIER').setCheck('Number').appendField(translate('Std. Dev. Up Multiplier'));
        this.appendValueInput('DOWNMULTIPLIER').setCheck('Number').appendField(translate('Std. Dev. Down Multiplier'));
        this.setOutput(true, 'Number');
        this.setColour('#dedede');
        this.setTooltip(translate('Calculates Bollinger Bands (BB) from a list with a period'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
};

Blockly.JavaScript.bb = block => {
    const bbResult = block.getFieldValue('BBRESULT_LIST');
    const input = expectValue(block, 'INPUT');
    const period = Blockly.JavaScript.valueToCode(block, 'PERIOD', Blockly.JavaScript.ORDER_ATOMIC) || '10';
    const stdDevUp = Blockly.JavaScript.valueToCode(block, 'UPMULTIPLIER', Blockly.JavaScript.ORDER_ATOMIC) || '5';
    const stdDevDown = Blockly.JavaScript.valueToCode(block, 'DOWNMULTIPLIER', Blockly.JavaScript.ORDER_ATOMIC) || '5';
    return [
        `Bot.bb(${input}, {
    periods: ${period},
    stdDevUp: ${stdDevUp},
    stdDevDown: ${stdDevDown},
  }, ${bbResult})`,
        Blockly.JavaScript.ORDER_NONE,
    ];
};
