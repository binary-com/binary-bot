import { translate } from '../../../../../../../common/utils/tools';
import config from '../../../../../../common/const';

Blockly.Blocks.bb = {
    init() {
        this.jsonInit({
            message0: translate('Bollinger Bands %1\n'),
            message1: translate('%1 Input List %2 %3'),
            message2: translate('Period %1'),
            message3: translate('Std. Dev. Up Multiplier'),
            message4: translate('Std. Dev. Down Multiplier'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'BBRESULT_LIST',
                    options: config.bbResult,
                },
            ],
            args1: [
                { type: 'input_dummy' },
                {
                    type : 'input_value',
                    name : 'INPUT',
                    check: 'Array',
                },
                { type: 'input_dummy' },
            ],
            args2: [
                {
                    type : 'input_value',
                    name : 'PERIOD',
                    check: 'Number',
                },
            ],
            args3: [
                {
                    type : 'input_value',
                    name : 'UPMULTIPLIER',
                    check: 'Number',
                },
            ],
            args4: [
                {
                    type : 'input_value',
                    name : 'DOWNMULTIPLIER',
                    check: 'Number',
                },
            ],
            output         : 'Number',
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate('Calculates Bollinger Bands (BB) from a list with a period'),
        });
    },
};

Blockly.JavaScript.bb = block => {
    const bbResult = block.getFieldValue('BBRESULT_LIST');
    const input = Blockly.JavaScript.valueToCode(block, 'INPUT') || '[]';
    const period = Blockly.JavaScript.valueToCode(block, 'PERIOD', Blockly.JavaScript.ORDER_ATOMIC) || '10';
    const stdDevUp = Blockly.JavaScript.valueToCode(block, 'UPMULTIPLIER', Blockly.JavaScript.ORDER_ATOMIC) || '5';
    const stdDevDown = Blockly.JavaScript.valueToCode(block, 'DOWNMULTIPLIER', Blockly.JavaScript.ORDER_ATOMIC) || '5';

    const code = `Bot.bb(${input}, {
        periods: ${period},
        stdDevUp: ${stdDevUp},
        stdDevDown: ${stdDevDown}
    }, {
        ${bbResult}
    })\n`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
