import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.controls_for = {
    init() {
        this.jsonInit({
            message0: translate('count with %1 from %2 to %3 by %4'),
            args0   : [
                {
                    type    : 'field_variable',
                    name    : 'VAR',
                    variable: null,
                },
                {
                    type : 'input_value',
                    name : 'FROM',
                    check: 'Number',
                },
                {
                    type : 'input_value',
                    name : 'TO',
                    check: 'Number',
                },
                {
                    type : 'input_value',
                    name : 'BY',
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
            colour          : Blockly.Colours.Binary.colour,
            colourSecondary : Blockly.Colours.Binary.colourSecondary,
            colourTertiary  : Blockly.Colours.Binary.colourTertiary,
            previousStaement: null,
            nextStatement   : null,
        });
    },
};

Blockly.JavaScript.controls_for = block => {
    const variable0 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    const argument0 = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    const argument1 = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    const increment = Blockly.JavaScript.valueToCode(block, 'BY', Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';

    let branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block.id);

    let code = '';

    if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) && Blockly.isNumber(increment)) {
        const up = parseFloat(argument0) <= parseFloat(argument1);
        const operator = up ? '<=' : '>=';
        const step = Math.abs(parseFloat(increment));

        const assignment = `${variable0} = ${argument0}`;
        const condition = `${variable0} ${operator} ${argument1}`;
        const statement = `${variable0} ${up ? '+=' : '-='} ${step}`;

        code = `
        for (${assignment}; ${condition}; ${statement}) {
            ${branch}
        }\n`;
    } else {
        // Cache non-trivial values to variables to prevent repeated look-ups.
        let startVar = argument0;
        if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
            startVar = Blockly.JavaScript.variableDB_.getDistinctName(
                `${variable0}_start`,
                Blockly.Variables.NAME_TYPE
            );
            code = `var ${startVar} = ${argument0};\n`;
        }

        let endVar = argument1;
        if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
            endVar = Blockly.JavaScript.variableDB_.getDistinctName(`${variable0}_end`, Blockly.Variables.NAME_TYPE);
            code += `var ${endVar} = ${argument1};\n`;
        }

        // Determine loop direction at start, in case one of the bounds changes during loop execution.
        const incVar = Blockly.JavaScript.variableDB_.getDistinctName(`${variable0}_inc`, Blockly.Variables.NAME_TYPE);
        const incVal = Blockly.isNumber(increment) ? Math.abs(increment) : `Math.abs(${increment})`;

        code += `
        var ${incVar} = ${incVal};
        if (${startVar} > ${endVar}) {
            ${incVar} = -${incVar};
        }
        for (
           ${variable0} = ${startVar}; 
           ${incVar} >= 0 ? ${variable0} <= ${endVar} : ${variable0} >= ${endVar};
           ${variable0} += ${incVar}
        ) {
            ${branch};
        }\n`;
    }

    return code;
};
