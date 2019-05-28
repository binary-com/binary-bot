Blockly.Blocks.math_number_positive = {
    init: Blockly.Blocks.math_number.init,
    numberValidator(input) {
        if (/^([0][,.]|[1-9]+[,.])?([0]|[1-9])*$/.test(input)) {
            return undefined;
        }
        return null;
    },
};

Blockly.JavaScript.math_number_positive = block => {
    const code = block.getFieldValue('NUM');
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
