// https://github.com/google/blockly/blob/master/generators/javascript/math.js
Blockly.Blocks.math_round = {
    /**
     * Check if a number is even, odd, prime, whole, positive, or negative
     * or if it is divisible by certain number. Returns true or false.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            message0: '%1 %2',
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'OP',
                    options: [['round', 'ROUND'], ['round up', 'ROUNDUP'], ['round down', 'ROUNDDOWN']],
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

Blockly.JavaScript.math_round = block => {
    const operation = block.getFieldValue('OP');
    const argument0 = Blockly.JavaScript.valueToCode(block, 'NUM') || '0';

    let code;

    if (operation === 'ROUND') {
        code = `Math.round(${argument0})`;
    } else if (operation === 'ROUNDUP') {
        code = `Math.ceil(${argument0})`;
    } else if (operation === 'ROUNDDOWN') {
        code = `Math.floor(${argument0})`;
    }

    return [code, Blockly.JavaScript.FUNCTION_CALL];
};
