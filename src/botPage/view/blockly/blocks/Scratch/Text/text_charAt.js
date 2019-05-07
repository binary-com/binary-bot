import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.text_charAt = {
    init() {
        this.jsonInit({
            message0: translate('in text %1 get %2'),
            args0   : [
                {
                    type: 'input_value',
                    name: 'VALUE',
                },
                {
                    type   : 'field_dropdown',
                    name   : 'WHERE',
                    options: [
                        ['#', 'FROM_START'],
                        [translate('# from end'), 'FROM_END'],
                        [translate('first letter'), 'FIRST'],
                        [translate('last letter'), 'LAST'],
                        [translate('random letter'), 'RANDOM'],
                    ],
                },
            ],
            output         : 'String',
            outputShape    : Blockly.OUTPUT_SHAPE_SQUARE,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
        });

        const dropdown = this.getField('WHERE');
        dropdown.setValidator(value => {
            const newAt = ['FROM_START', 'FROM_END'].includes(value);
            if (newAt !== this.isAt) {
                this.updateAt(newAt);
                this.setFieldValue(value, 'WHERE');
                return null;
            }
            return undefined;
        });

        this.updateAt(true);
    },
    mutationToDom() {
        const container = document.createElement('mutation');
        container.setAttribute('at', !!this.isAt);
        return container;
    },
    domToMutation(xmlElement) {
        const isAt = xmlElement.getAttribute('at') !== 'false';
        this.updateAt(isAt);
    },
    updateAt(isAt) {
        this.removeInput('AT', true);
        if (isAt) {
            this.appendValueInput('AT').setCheck('Number');
        }

        this.isAt = isAt;
        this.initSvg();
        this.render(false);
    },
};

Blockly.JavaScript.text_charAt = block => {
    const where = block.getFieldValue('WHERE') || 'FROM_START';
    const textOrder = where === 'RANDOM' ? Blockly.JavaScript.ORDER_NONE : Blockly.JavaScript.ORDER_MEMBER;
    const text = Blockly.JavaScript.valueToCode(block, 'VALUE', textOrder) || '\'\'';

    let code;

    if (where === 'FROM_START') {
        const at = Blockly.JavaScript.getAdjusted(block, 'AT');
        // Adjust index if using one-based indices
        code = `${text}.charAt(${at})`;
    } else if (where === 'FROM_END') {
        const at = Blockly.JavaScript.getAdjusted(block, 'AT', 1, true);
        code = `${text}.slice(${at}).charAt(0)`;
    } else if (where === 'FIRST') {
        code = `${text}.charAt(0)`;
    } else if (where === 'LAST') {
        code = `${text}.slice(-1)`;
    } else if (where === 'RANDOM') {
        // eslint-disable-next-line no-underscore-dangle
        const functionName = Blockly.JavaScript.provideFunction_('textRandomLetter', [
            // eslint-disable-next-line no-underscore-dangle
            `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(text) {
                var x = Math.floor(Math.random() * text.length);
                return text[x];
            }`,
        ]);
        code = `${functionName}(${text})`;
    }

    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
