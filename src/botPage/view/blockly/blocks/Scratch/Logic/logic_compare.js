Blockly.Blocks.logic_compare = {
    init() {
        this.jsonInit({
            message0: '%1 %2 %3',
            args0   : [
                {
                    type: 'input_value',
                    name: 'A',
                },
                {
                    type   : 'field_dropdown',
                    name   : 'OP',
                    options: [
                        ['=', 'EQ'],
                        ['\u2260', 'NEQ'],
                        ['\u200F<', 'LT'],
                        ['\u200F\u2264', 'LTE'],
                        ['\u200F>', 'GT'],
                        ['\u200F\u2265', 'GTE'],
                    ],
                },
                {
                    type: 'input_value',
                    name: 'B',
                },
            ],
            output         : 'Boolean',
            outputShape    : Blockly.OUTPUT_SHAPE_HEXAGONAL,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
        });
    },
};

Blockly.JavaScript.logic_compare = block => {
    const operatorMapping = {
        EQ : '==',
        NEQ: '!=',
        LT : '<',
        LTE: '<=',
        GT : '>',
        GTE: '>=',
    };

    const operator = operatorMapping[block.getFieldValue('OP') || 'EQ'];
    const order = ['==', '!='].includes(operator)
        ? Blockly.JavaScript.ORDER_EQUALITY
        : Blockly.JavaScript.ORDER_RELATIONAL;

    const argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
    const argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);

    const code = `${argument0} ${operator} ${argument1}`;
    return [code, order];
};
