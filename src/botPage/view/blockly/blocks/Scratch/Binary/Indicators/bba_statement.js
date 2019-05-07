import config from '../../../../../../common/const';
import { translate } from '../../../../../../../common/utils/tools';

Blockly.Blocks.bba_statement = {
    init() {
        this.jsonInit({
            message0: translate('set %1 to Bollinger Bands Array %2 %3'),
            message1: '%1',
            args0   : [
                {
                    type    : 'field_variable',
                    name    : 'VARIABLE',
                    variable: 'bb',
                },
                {
                    type   : 'field_dropdown',
                    name   : 'BBRESULT_LIST',
                    options: config.bbResult,
                },
                {
                    type: 'input_dummy',
                },
            ],
            args1: [
                {
                    type : 'input_statement',
                    name : 'STATEMENT',
                    check: null,
                },
            ],
            colour           : Blockly.Colours.Binary.colour,
            colourSecondary  : Blockly.Colours.Binary.colourSecondary,
            colourTertiary   : Blockly.Colours.Binary.colourTertiary,
            tooltip          : translate('Calculates Bollinger Bands (BB) list from a list with a period'),
            previousStatement: null,
            nextStatement    : null,
        });
    },
    onchange           : Blockly.Blocks.bb_statement.onchange,
    requiredParamBlocks: ['input_list', 'period', 'std_dev_multiplier_up', 'std_dev_multiplier_down'],
};

Blockly.JavaScript.bba_statement = block => {
    // eslint-disable-next-line no-underscore-dangle
    const varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VARIABLE'),
        Blockly.Variables.NAME_TYPE
    );
    const bbResult = block.getFieldValue('BBRESULT_LIST');
    const input = block.getChildFieldValue('input_list', 'INPUT_LIST') || '[]';
    const period = block.getChildFieldValue('period', 'PERIOD') || '10';
    const stdDevUp = block.getChildFieldValue('std_dev_multiplier_up', 'UPMULTIPLIER') || '5';
    const stdDevDown = block.getChildFieldValue('std_dev_multiplier_down', 'DOWNMULTIPLIER') || '5';

    const code = `${varName} = Bot.bba(${input}, { periods: ${period}, stdDevUp: ${stdDevUp}, stdDevDown: ${stdDevDown} }, ${bbResult});\n`;
    return code;
};
