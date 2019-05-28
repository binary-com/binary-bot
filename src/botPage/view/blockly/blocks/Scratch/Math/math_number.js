Blockly.Blocks.math_number = {
    init() {
        this.jsonInit({
            message0: '%1',
            args0   : [
                {
                    type : 'field_number',
                    name : 'NUM',
                    value: 0,
                },
            ],
            output         : 'Number',
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : '#dedede',
            colourSecondary: '#ffffff',
            colourTertiary : '#ffffff',
        });

        const fieldInput = this.getField('NUM');
        fieldInput.setValidator(input => this.numberValidator(input));
    },
    numberValidator(input) {
        if (/^-?([0][,.]|[1-9]+[,.])?([0]|[1-9])*$/.test(input)) {
            return undefined;
        }
        return null;
    },
};

Blockly.JavaScript.math_number = block => {
    const code = block.getFieldValue('NUM');
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
