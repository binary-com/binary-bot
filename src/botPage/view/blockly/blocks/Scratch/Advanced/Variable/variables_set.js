import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.variables_set = {
    init() {
        this.jsonInit({
            type    : 'field_variable',
            message0: translate('set %1 to %2'),
            args0   : [
                {
                    type    : 'field_variable',
                    name    : 'VAR',
                    variable: translate('item'),
                },
                {
                    type: 'input_value',
                    name: 'VALUE',
                },
            ],
            colour           : Blockly.Colours.Binary.colour,
            colourSecondary  : Blockly.Colours.Binary.colourSecondary,
            colourTertiary   : Blockly.Colours.Binary.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
            tooltip          : '',
        });
    },
};

Blockly.JavaScript.variables_set = block => {
    const argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    // eslint-disable-next-line no-underscore-dangle
    const varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    const code = `${varName} = ${argument0};\n`;
    return code;
};
