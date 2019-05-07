import { translate } from '../../../../../../../common/utils/tools';

Blockly.Blocks.sma_statement = {
    init() {
        this.jsonInit({
            message0: translate('set %1 to Simple Moving Average %2'),
            message1: '%1',
            args0   : [
                {
                    type    : 'field_variable',
                    name    : 'VARIABLE',
                    variable: 'sma',
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
            tooltip          : translate('Calculates Simple Moving Average (SMA) from a list with a period'),
            previousStatement: null,
            nextStatement    : null,
        });
    },
    onchange           : Blockly.Blocks.bb_statement.onchange,
    requiredParamBlocks: ['input_list', 'period'],
};

Blockly.JavaScript.sma_statement = block => {
    // eslint-disable-next-line no-underscore-dangle
    const varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VARIABLE'),
        Blockly.Variables.NAME_TYPE
    );
    const input = block.getChildFieldValue('input_list', 'INPUT_LIST') || '[]';
    const period = block.getChildFieldValue('period', 'PERIOD') || '10';

    const code = `${varName} = Bot.sma(${input}, ${period});\n`;
    return code;
};
