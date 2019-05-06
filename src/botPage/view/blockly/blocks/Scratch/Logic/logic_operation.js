import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.logic_operation = {
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
                    options: [[translate('and'), 'AND'], [translate('or'), 'OR']],
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

Blockly.JavaScript.logic_operation = block => {
    const selectedOperator = block.getFieldValue('OP');

    let operator;
    let order;
    if (selectedOperator === 'AND') {
        operator = '&&';
        order = Blockly.JavaScript.ORDER_LOGICAL_AND;
    } else if (selectedOperator === 'OR') {
        operator = '||';
        order = Blockly.JavaScript.ORDER_LOGICAL_OR;
    }

    const argument0 = Blockly.JavaScript.valueToCode(block, 'A');
    const argument1 = Blockly.JavaScript.valueToCode(block, 'B');

    const code = `${argument0} ${operator} ${argument1}`;
    return [code, order];
};
