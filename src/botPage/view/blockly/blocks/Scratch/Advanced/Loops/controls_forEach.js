import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.controls_forEach = {
    init() {
        this.jsonInit({
            message0: translate('for each item %1 in list %2'),
            args0   : [
                {
                    type    : 'field_variable',
                    name    : 'VAR',
                    variable: null,
                },
                {
                    type : 'input_value',
                    name : 'LIST',
                    check: 'Array',
                },
            ],
            message1: translate('do %1'),
            args1   : [
                {
                    type: 'input_statement',
                    name: 'DO',
                },
            ],
            colour          : Blockly.Colours.Binary.colour,
            colourSecondary : Blockly.Colours.Binary.colourSecondary,
            colourTertiary  : Blockly.Colours.Binary.colourTertiary,
            previousStaement: null,
            nextStatement   : null,
        });
    },
};

Blockly.JavaScript.controls_forEach = block => {
    // eslint-disable-next-line no-underscore-dangle
    const variable0 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    const argument0 = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ASSIGNMENT) || '[]';

    let branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block.id);

    let code = '';

    // Cache non-trivial values to variables to prevent repeated look-ups.
    let listVar = argument0;
    if (!argument0.match(/^\w+$/)) {
        // eslint-disable-next-line no-underscore-dangle
        listVar = Blockly.JavaScript.variableDB_.getDistinctName(`${variable0}_list`, Blockly.Variables.NAME_TYPE);
        code = `var ${listVar} = ${argument0};\n`;
    }

    // eslint-disable-next-line no-underscore-dangle
    const indexVar = Blockly.JavaScript.variableDB_.getDistinctName(`${variable0}_list`, Blockly.Variables.NAME_TYPE);

    code += `
    for (var ${indexVar} in ${listVar}) {
        ${variable0} = ${listVar}[${indexVar}];
        ${branch}
    }\n`;

    return code;
};
