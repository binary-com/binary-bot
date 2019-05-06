Blockly.Blocks.logic_null = {
    init() {
        this.jsonInit({
            message0       : 'null',
            output         : null,
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
        });
    },
};
Blockly.JavaScript.logic_null = () => ['null', Blockly.JavaScript.ORDER_ATOMIC];
