import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.math_on_list = {
    init() {
        this.jsonInit({
            message0: translate('%1 of list %2'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'OPERATION',
                    options: [
                        [translate('sum'), 'SUM'],
                        [translate('min'), 'MIN'],
                        [translate('max'), 'MAX'],
                        [translate('average'), 'AVERAGE'],
                        [translate('median'), 'MEDIAN'],
                        [translate('modes'), 'MODE'],
                        [translate('standard deviation'), 'STD_DEV'],
                        [translate('random item'), 'RANDOM'],
                    ],
                },
                {
                    type: 'input_value',
                    name: 'LIST',
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

/* eslint-disable no-underscore-dangle */
Blockly.JavaScript.math_on_list = block => {
    const operation = block.getFieldValue('OPERATION');

    let code;
    let list;

    if (operation === 'SUM') {
        list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_MEMBER) || '[]';
        code = `${list}.reduce(function(x, y) { return x + y; })`;
    } else if (operation === 'MIN') {
        list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_COMMA) || '[]';
        code = `Math.min.apply(null, ${list})`;
    } else if (operation === 'MAX') {
        list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_COMMA) || '[]';
        code = `Math.max.apply(null, ${list})`;
    } else if (operation === 'AVERAGE') {
        const functionName = Blockly.JavaScript.provideFunction_('mathMean', [
            `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(myList) {
                return myList.reduce(function(x, y) { 
                    return x + y; 
                }) / myList.length;
            }`,
        ]);

        list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_NONE) || '[]';
        code = `${functionName}(${list})`;
    } else if (operation === 'MEDIAN') {
        const functionName = Blockly.JavaScript.provideFunction_('mathMedian', [
            `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(myList) {
                var localList = myList.filter(function(x) { 
                    return typeof x == 'number'; 
                });
                if (!localList.length) {
                    return null;
                }
                localList.sort(function(a, b) { 
                    return b - a; 
                });
                if (localList.length % 2 == 0) {
                    return (localList[localList.length / 2 - 1] + localList[localList.length / 2]) / 2;
                } else {
                    return localList[(localList.length - 1) / 2];
                }
            }`,
        ]);

        list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_NONE) || '[]';
        code = `${functionName}(${list})`;
    } else if (operation === 'MODE') {
        const functionName = Blockly.JavaScript.provideFunction_('mathModes', [
            `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(values) {
                var modes = [];
                var counts = [];
                var maxCount = 0;

                for (var i = 0; i < values.length; i++) {
                    var value = values[i];
                    var found = false;
                    var thisCount;

                    for (var j = 0; j < counts.length; j++) {
                        if (counts[j][0] === value) {
                            thisCount = ++counts[j][1];
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        counts.push([value, 1]);
                        thisCount = 1;
                    }
                    maxCount = Math.max(thisCount, maxCount);
                }
                
                for (var j = 0; j < counts.length; j++) {
                    if (counts[j][1] == maxCount) {
                        modes.push(counts[j][0]);
                    }
                }

                return modes;
            }`,
        ]);

        list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_NONE) || '[]';
        code = `${functionName}(${list})`;
    } else if (operation === 'STD_DEV') {
        const functionName = Blockly.JavaScript.provideFunction_('mathStandardDeviation', [
            `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(numbers) {
                var n = numbers.length;
                if (!n) {
                    return null;
                }

                var mean = numbers.reduce(function(x, y) {
                    return x + y;
                }) / n;

                var variance = 0;
                for (var j = 0; j < n; j++) {
                    variance += Math.pow(numbers[j] - mean, 2);
                }
                variance = variance / n;
                return Math.sqrt(variance);
            }`,
        ]);

        list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_NONE) || '[]';
        code = `${functionName}(${list})`;
    } else if (operation === 'RANDOM') {
        const functionName = Blockly.JavaScript.provideFunction_('mathRandomList', [
            `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(list) {
                var x = Math.floor(Math.random() * list.length);
                return list[x];
            }`,
        ]);

        list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_NONE) || '[]';
        code = `${functionName}(${list})`;
    }

    return [code, Blockly.JavaScript.FUNCTION_CALL];
};
