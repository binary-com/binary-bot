import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.controls_repeat_ext = {
    init() {
        this.jsonInit({
            message0: translate('repeat %1 times'),
            args0   : [
                {
                    type : 'input_value',
                    name : 'TIMES',
                    check: 'Number',
                },
            ],
            message1: translate('do %1'),
            args1   : [
                {
                    type: 'input_statement',
                    name: 'DO',
                },
            ],
            colour           : Blockly.Colours.Binary.colour,
            colourSecondary  : Blockly.Colours.Binary.colourSecondary,
            colourTertiary   : Blockly.Colours.Binary.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
        });
    },
};

Blockly.JavaScript.controls_repeat_ext = block => {
    let repeats;
    if (block.getField('TIMES')) {
        repeats = String(Number(block.getFieldValue('TIMES')));
    } else {
        repeats = Blockly.JavaScript.valueToCode(block, 'TIMES') || '0';
    }

    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = '';

    // eslint-disable-next-line no-underscore-dangle
    const loopVar = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
    let endVar = repeats;

    if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
        // eslint-disable-next-line no-underscore-dangle
        endVar = Blockly.JavaScript.variableDB_.getDistinctName('repeat_end', Blockly.Variables.NAME_TYPE);
        code += `var ${endVar} = ${repeats};\n`;
    }

    code += `
    for (var ${loopVar} = 0; ${loopVar} < ${endVar}; ${loopVar}++) {
        ${branch}
    }\n`;
    return code;
};
