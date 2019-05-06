import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.math_single = {
    init() {
        this.jsonInit({
            message0: translate('%1 %2'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'OP',
                    options: [
                        [translate('square root'), 'ROOT'],
                        [translate('absolute'), 'ABS'],
                        ['-', 'NEG'],
                        ['ln', 'LN'],
                        ['log10', 'LOG10'],
                        ['e^', 'EXP'],
                        ['10^', 'POW10'],
                    ],
                },
                {
                    type: 'input_value',
                    name: 'NUM',
                },
            ],
            output         : 'Number',
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
        });
    },
};

Blockly.JavaScript.math_single = block => {
    const operator = block.getFieldValue('OP');

    let code;
    let arg;

    if (operator === 'NEG') {
        // Negation is a special case given its different operator precedence.
        arg = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_UNARY_NEGATION) || '0';
        if (arg[0] === '-') {
            // --3 is not legal in JS
            arg = ` ${arg}`;
        }
        code = `-${arg}`;
        return [code, Blockly.JavaScript.ORDER_UNARY_NEGATION];
    }

    if (['SIN', 'COS', 'TAN'].includes(operator)) {
        arg = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_DIVISION) || '0';
    } else {
        arg = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_NONE) || '0';
    }

    // First, handle cases which generate values that don't need parentheses
    // wrapping the code.
    if (operator === 'ABS') {
        code = `Math.abs(${arg})`;
    } else if (operator === 'ROOT') {
        code = `Math.sqrt(${arg})`;
    } else if (operator === 'LN') {
        code = `Math.log(${arg})`;
    } else if (operator === 'EXP') {
        code = `Math.pow(Math.E, ${arg})`;
    } else if (operator === 'POW10') {
        code = `Math.pow(10, ${arg})`;
    } else if (operator === 'ROUND') {
        code = `Math.round(${arg})`;
    } else if (operator === 'ROUNDUP') {
        code = `Math.ceil(${arg})`;
    } else if (operator === 'ROUNDDOWN') {
        code = `Math.floor(${arg})`;
    } else if (operator === 'SIN') {
        code = `Math.sin(${arg} / 180 * Math.PI)`;
    } else if (operator === 'COS') {
        code = `Math.cos(${arg} / 180 * Math.PI)`;
    } else if (operator === 'TAN') {
        code = `Math.tan(${arg} / 180 * Math.PI)`;
    }

    if (code) {
        return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    }

    // Second, handle cases which generate values that may need parentheses
    // wrapping the code.
    if (operator === 'LOG10') {
        code = `Math.log(${arg}) / Math.log(10)`;
    } else if (operator === 'ASIN') {
        code = `Math.asin(${arg} / 180 * Math.PI)`;
    } else if (operator === 'ACOS') {
        code = `Math.acos(${arg} / 180 * Math.PI)`;
    } else if (operator === 'ATAN') {
        code = `Math.atan(${arg} / 180 * Math.PI)`;
    }

    return [code, Blockly.JavaScript.ORDER_DIVISION];
};
