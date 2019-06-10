import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.lists_sort = {
    init() {
        this.jsonInit({
            message0: translate('sort %1 %2 %3'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'TYPE',
                    options: [[translate('numeric'), 'NUMERIC'], [translate('alphabetic'), 'TEXT']],
                },
                {
                    type   : 'field_dropdown',
                    name   : 'DIRECTION',
                    options: [[translate('ascending'), '1'], [translate('descending'), '-1']],
                },
                {
                    type: 'input_value',
                    name: 'LIST',
                },
            ],
            output         : 'Array',
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
        });
    },
};

Blockly.JavaScript.lists_sort = block => {
    const list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '[]';
    const direction = block.getFieldValue('DIRECTION') === '1' ? 1 : -1;
    const type = block.getFieldValue('TYPE');
    // eslint-disable-next-line no-underscore-dangle
    const getCompareFunctionName = Blockly.JavaScript.provideFunction_('listsGetSortCompare', [
        // eslint-disable-next-line no-underscore-dangle
        `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(type, direction) {
            var compareFuncs = {
                NUMERIC: function(a, b) {
                    return parseFloat(a) - parseFloat(b);
                },
                TEXT: function(a, b) {
                    return a.toString().toLowerCase() > b.toString().toLowerCase() ? 1 : -1;
                }
            };

            return function(a, b) {
                return compareFuncs[type](a, b) * direction; 
            }
        }`,
    ]);

    const code = `${list}.slice(0).sort(${getCompareFunctionName}("${type}", ${direction}))`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
