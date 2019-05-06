import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.logic_ternary = {
    init() {
        this.jsonInit({
            message0: translate('test %1'),
            message1: translate('if true %1'),
            message2: translate('if false %1'),
            args0   : [
                {
                    type : 'input_value',
                    name : 'IF',
                    check: 'Boolean',
                },
            ],
            args1: [
                {
                    type: 'input_value',
                    name: 'THEN',
                },
            ],
            args2: [
                {
                    type: 'input_value',
                    name: 'ELSE',
                },
            ],
            output         : null,
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
        });
    },
};

Blockly.JavaScript.logic_ternary = block => {
    const valueIf = Blockly.JavaScript.valueToCode(block, 'IF', Blockly.JavaScript.ORDER_CONDITIONAL) || 'false';
    const valueThen = Blockly.JavaScript.valueToCode(block, 'THEN', Blockly.JavaScript.ORDER_CONDITIONAL) || 'null';
    const valueElse = Blockly.JavaScript.valueToCode(block, 'ELSE', Blockly.JavaScript.ORDER_CONDITIONAL) || 'null';

    const code = `${valueIf} ? ${valueThen} : ${valueElse}`;
    return [code, Blockly.JavaScript.ORDER_CONDITIONAL];
};
