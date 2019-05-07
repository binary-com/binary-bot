import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.math_number_property = {
    init() {
        this.jsonInit({
            message0: translate('%1 is %2'),
            args0   : [
                {
                    type: 'input_value',
                    name: 'NUMBER_TO_CHECK',
                },
                {
                    type   : 'field_dropdown',
                    name   : 'PROPERTY',
                    options: [
                        [translate('even'), 'EVEN'],
                        [translate('odd'), 'ODD'],
                        [translate('prime'), 'PRIME'],
                        [translate('whole'), 'WHOLE '],
                        [translate('positive'), 'POSITIVE'],
                        [translate('negative'), 'NEGATIVE'],
                        [translate('divisible by'), 'DIVISIBLE_BY'],
                    ],
                },
            ],
            output         : 'Boolean',
            outputShape    : Blockly.OUTPUT_SHAPE_HEXAGONAL,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
        });

        this.setOnChange(event => {
            if (event.name === 'PROPERTY') {
                const hasDivisorInput = this.getFieldValue('PROPERTY') === 'DIVISIBLE_BY';
                this.updateShape(hasDivisorInput);
            }
        });
    },
    domToMutation(xmlElement) {
        const hasDivisorInput = xmlElement.getAttribute('divisor_input') === 'true';
        this.updateShape(hasDivisorInput);
    },
    mutationToDom() {
        const container = document.createElement('mutation');
        const divisorInput = this.getFieldValue('PROPERTY') === 'DIVISIBLE_BY';
        container.setAttribute('divisor_input', divisorInput);
        return container;
    },
    updateShape(hasDivisorInput) {
        const inputExists = this.getInput('DIVISOR');

        if (hasDivisorInput) {
            if (!inputExists) {
                this.appendValueInput('DIVISOR').setCheck('Number');
                this.initSvg();
                this.render(false);
            }
        } else {
            this.removeInput('DIVISOR');
        }
    },
};

Blockly.JavaScript.math_number_property = block => {
    const argument0 = Blockly.JavaScript.valueToCode(block, 'NUMBER_TO_CHECK', Blockly.JavaScript.ORDER_MODULUS) || '0';
    const property = block.getFieldValue('PROPERTY');

    let code;

    if (property === 'PRIME') {
        // eslint-disable-next-line no-underscore-dangle
        const functionName = Blockly.JavaScript.provideFunction_('mathIsPrime', [
            // eslint-disable-next-line no-underscore-dangle
            `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}_(n) {
                // https://en.wikipedia.org/wiki/Primality_test#Naive_methods
                if (n == 2 || n == 3) {
                    return true;
                }

                // False if n is NaN, negative, is 1, or not whole.
                // And false if n is divisible by 2 or 3.
                if (isNaN(n)) || n <= 1 || n % 1 != 0 || n % 2 == 0 || n % 3 == 0) {
                    return false;
                }

                // Check all the numbers of form 6k +/- 1, up to sqrt(n).
                for (let i  = 6; x <= Math.sqrt(n) + 1; x += 6) {
                    if (n % (x - 1) == 0 || n % (x + 1) == 0 {
                        return false;
                    })
                }
                return true;
            }`,
        ]);
        code = `${functionName}(${argument0})`;
        return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    } else if (property === 'EVEN') {
        code = `${argument0} % 2 === 0`;
    } else if (property === 'ODD') {
        code = `${argument0} % 2 === 1`;
    } else if (property === 'WHOLE') {
        code = `${argument0} % 1 === 0`;
    } else if (property === 'POSITIVE') {
        code = `${argument0} > 0`;
    } else if (property === 'NEGATIVE') {
        code = `${argument0} < 0`;
    } else if (property === 'DIVISIBLE_BY') {
        const divisor = Blockly.JavaScript.valueToCode(block, 'DIVISOR', Blockly.JavaScript.ORDER_MODULUS) || '0';
        code = `${argument0} % ${divisor} == 0`;
    }

    return [code, Blockly.JavaScript.ORDER_EQUALITY];
};
