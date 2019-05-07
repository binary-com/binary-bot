Blockly.Blocks.text = {
    init() {
        this.jsonInit({
            message0: '%1',
            args0   : [
                {
                    type: 'field_input',
                    name: 'TEXT',
                },
            ],
            output         : 'String',
            outputShape    : Blockly.OUTPUT_SHAPE_SQUARE,
            colour         : '#dedede',
            colourSecondary: '#ffffff',
            colourTertiary : '#ffffff',
        });
    },
};

Blockly.JavaScript.text = block => {
    // eslint-disable-next-line no-underscore-dangle
    const code = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'));
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
