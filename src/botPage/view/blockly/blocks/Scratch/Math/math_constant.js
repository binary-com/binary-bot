Blockly.Blocks.math_constant = {
    init() {
        this.jsonInit({
            message0: '%1',
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'CONSTANT',
                    options: [
                        ['\u03C0', 'PI'],
                        ['\u2107', 'E'],
                        ['\u03d5', 'GOLDEN_RATIO'],
                        ['sqrt(2)', 'SQRT2'],
                        ['sqrt(\u00bd)', 'SQRT1_2'],
                        ['\u221e', 'INFINITY'],
                    ],
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

Blockly.JavaScript.math_constant = block => {
    const constant = block.getFieldValue('CONSTANT');

    let code;
    let order;

    if (constant === 'PI') {
        code = 'Math.PI';
        order = Blockly.JavaScript.ORDER_MEMBER;
    } else if (constant === 'E') {
        code = 'Math.E';
        order = Blockly.JavaScript.ORDER_MEMBER;
    } else if (constant === 'GOLDEN_RATIO') {
        code = '(1 + Math.sqrt(5)) / 2';
        order = Blockly.JavaScript.ORDER_DIVISION;
    } else if (constant === 'SQRT2') {
        code = 'Math.SQRT2';
        order = Blockly.JavaScript.ORDER_MEMBER;
    } else if (constant === 'SQRT1_2') {
        code = 'Math.SQRT1_2';
        order = Blockly.JavaScript.ORDER_MEMBER;
    } else if (constant === 'INFINITY') {
        code = 'Infinity';
        order = Blockly.JavaScript.ORDER_ATOMIC;
    }

    return [code, order];
};
