import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.text_getSubstring = {
    init() {
        this.WHERE_OPTIONS_1 = [
            [translate('letter\u00A0#'), 'FROM_START'],
            [translate('letter\u00A0#\u00A0from end'), 'FROM_END'],
            [translate('first'), 'FIRST'],
        ];
        this.WHERE_OPTIONS_2 = [
            [translate('letter\u00A0#'), 'FROM_START'],
            [translate('letter\u00A0#\u00A0from end'), 'FROM_END'],
            [translate('last'), 'LAST'],
        ];

        this.jsonInit({
            message0: translate('in text %1 get substring from %2 %3 to %4 %5'),
            args0   : [
                {
                    type: 'input_value',
                    name: 'STRING',
                },
                {
                    type   : 'field_dropdown',
                    name   : 'WHERE1',
                    options: this.WHERE_OPTIONS_1,
                },
                {
                    type: 'input_dummy',
                    name: 'AT1',
                },
                {
                    type   : 'field_dropdown',
                    name   : 'WHERE2',
                    options: this.WHERE_OPTIONS_2,
                },
                {
                    type: 'input_dummy',
                    name: 'AT2',
                },
            ],
            output         : 'String',
            outputShape    : Blockly.OUTPUT_SHAPE_SQUARE,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
        });

        this.updateAt(1, true);
        this.updateAt(2, true);
    },
    mutationToDom() {
        const container = document.createElement('mutation');
        const isAt1 = this.getInput('AT1').type === Blockly.INPUT_VALUE;
        const isAt2 = this.getInput('AT2').type === Blockly.INPUT_VALUE;

        container.setAttribute('at1', isAt1);
        container.setAttribute('at2', isAt2);

        return container;
    },
    domToMutation(xmlElement) {
        const isAt1 = xmlElement.getAttribute('at1') === 'true';
        const isAt2 = xmlElement.getAttribute('at2') === 'true';

        this.updateAt(1, isAt1);
        this.updateAt(2, isAt2);
    },
    updateAt(n, isAt) {
        this.removeInput(`AT${n}`, true);
        if (isAt) {
            this.appendValueInput(`AT${n}`).setCheck('Number');
        } else {
            this.appendDummyInput(`AT${n}`);
        }

        const menu = new Blockly.FieldDropdown(this[`WHERE_OPTIONS_${n}`], value => {
            const newAt = ['FROM_START', 'FROM_END'].includes(value);
            if (newAt !== isAt) {
                this.updateAt(n, newAt);
                this.setFieldValue(value, `WHERE${n}`);
                return null;
            }
            return undefined;
        });

        this.getInput(`AT${n}`).appendField(menu, `WHERE${n}`);
        if (n === 1) {
            this.moveInputBefore('AT1', 'AT2');
        }

        this.initSvg();
        this.render(false);
    },
};

Blockly.JavaScript.text_getSubstring = block => {
    const text = Blockly.JavaScript.valueToCode(block, 'STRING', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    const where1 = block.getFieldValue('WHERE1');
    const where2 = block.getFieldValue('WHERE2');

    let at1;
    let at2;
    let code;

    if (where1 === 'FIRST' && where2 === 'LAST') {
        code = text;
    } else if (
        text.match(/^'?\w+'?$/) ||
        (where1 !== 'FROM_END' && where1 !== 'LAST' && where2 !== 'FROM_END' && where2 !== 'LAST')
    ) {
        if (where1 === 'FROM_START') {
            at1 = Blockly.JavaScript.getAdjusted(block, 'AT1');
        } else if (where1 === 'FROM_END') {
            at1 = Blockly.JavaScript.getAdjusted(block, 'AT1', 1, false, Blockly.JavaScript.ORDER_SUBTRACTION);
            at1 = `${text}.length - ${at1}`;
        } else if (where1 === 'FIRST') {
            at1 = '0';
        }

        if (where2 === 'FROM_START') {
            at2 = Blockly.JavaScript.getAdjusted(block, 'AT2');
        } else if (where2 === 'FROM_END') {
            at2 = Blockly.JavaScript.getAdjusted(block, 'AT2', 0, false, Blockly.JavaScript.ORDER_SUBTRACTION);
            at2 = `${text}.length - ${at2}`;
        } else if (where2 === 'LAST') {
            at2 = `${text}.length`;
        }
    } else {
        at1 = Blockly.JavaScript.getAdjusted(block, 'AT1');
        at2 = Blockly.JavaScript.getAdjusted(block, 'AT2');
        const { getIndex_ } = Blockly.JavaScript.text;
        const wherePascalCase = {
            FIRST     : 'First',
            LAST      : 'Last',
            FROM_START: 'FromStart',
            FROM_END  : 'FromEnd',
        };
        // eslint-disable-next-line no-underscore-dangle
        const functionName = Blockly.JavaScript.provideFunction_(
            `subsequence${wherePascalCase[where1]}${wherePascalCase[where2]}`,
            [
                // eslint-disable-next-line no-underscore-dangle
                `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(
                    sequence
                    ${where1 === 'FROM_END' || where1 === 'FROM_START' ? ', at1' : ''}
                    ${where2 === 'FROM_END' || where2 === 'FROM_START' ? ', at2' : ''}
                ) {
                    var start = ${getIndex_('sequence', where1, 'at1')};
                    var end = ${getIndex_('sequence', where2, 'at2')};
                    return sequence.slice(start, end);
                }`,
            ]
        );

        code = `${functionName}(
            ${text}
            ${where1 === 'FROM_END' || where1 === 'FROM_START' ? `, ${at1}` : ''}
            ${where2 === 'FROM_END' || where2 === 'FROM_START' ? `, ${at2}` : ''}
        )`;
    }

    code = `${text}.slice(${at1}, ${at2})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
