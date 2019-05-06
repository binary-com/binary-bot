import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.math_change = {
    init() {
        this.jsonInit({
            message0: translate('change %1 by %2'),
            args0   : [
                {
                    type    : 'field_variable',
                    name    : 'VAR',
                    variable: translate('item'),
                },
                {
                    type : 'input_value',
                    name : 'DELTA',
                    check: 'Number',
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

Blockly.JavaScript.math_change = block => {
    const variable = block.getFieldValue('VAR');
    const argument0 = Blockly.JavaScript.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
    const argument1 = Blockly.JavaScript.valueToCode(block, 'DELTA', Blockly.JavaScript.ORDER_ADDITION) || '0';

    const code = `
    if (typeof ${argument0} != 'number') {
        ${argument0} = 0;
    };
    ${argument0} += ${argument1};\n`;
    return code;
};
