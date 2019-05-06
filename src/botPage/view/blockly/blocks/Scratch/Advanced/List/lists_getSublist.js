import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.lists_getSublist = {
    init() {
        this.WHERE_OPTIONS_1 = [
            [translate('get sub-list from #'), 'FROM_START'],
            [translate('get sub-list from # from end'), 'FROM_END'],
            [translate('get sub-list from first'), 'FIRST'],
        ];
        this.WHERE_OPTIONS_2 = [
            [translate('#'), 'FROM_START'],
            [translate('# from end'), 'FROM_END'],
            [translate('last'), 'LAST'],
        ];

        this.appendValueInput('LIST').appendField(translate('in list'));
        this.appendDummyInput('AT1');
        this.appendDummyInput('AT2');

        this.setColourFromRawValues_(
            Blockly.Colours.Binary.colour,
            Blockly.Colours.Binary.colourSecondary,
            Blockly.Colours.Binary.colourTertiary
        );
        this.setOutput(true, null);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);

        this.updateAt_(1, true);
        this.updateAt_(2, true);
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
        this.updateAt_(1, isAt1);
        this.updateAt_(2, isAt2);
    },
    updateAt_(n, isAt) {
        this.removeInput(`AT${n}`);

        if (isAt) {
            this.appendValueInput(`AT${n}`).setCheck('Number');
        } else {
            this.appendDummyInput(`AT${n}`);
        }

        const menu = new Blockly.FieldDropdown(this[`WHERE_OPTIONS_${n}`], value => {
            const newAt = ['FROM_START', 'FROM_END'].includes(value);
            if (newAt !== isAt) {
                this.updateAt_(n, newAt);
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

Blockly.JavaScript.lists_getSublist = block => {
    const list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_MEMBER) || '[]';
    const where1 = block.getFieldValue('WHERE1');
    const where2 = block.getFieldValue('WHERE2');

    let at1;
    let at2;
    let code;

    if (list.match(/^\w+$/)) {
        if (where1 === 'FROM_START') {
            at1 = Blockly.JavaScript.getAdjusted(block, 'AT1');
        } else if (where1 === 'FROM_END') {
            at1 = Blockly.JavaScript.getAdjusted(block, 'AT1', 1, false, Blockly.JavaScript.ORDER_SUBTRACTION);
            at1 = `${list}.length - ${at1}`;
        }
        if (where2 === 'FROM_START') {
            at2 = Blockly.JavaScript.getAdjusted(block, 'AT2', 1);
        } else if (where2 === 'FROM_END') {
            at2 = Blockly.JavaScript.getAdjusted(block, 'AT2', 0, false, Blockly.JavaScript.ORDER_SUBTRACTION);
            at2 = `${list}.length - ${at2}`;
        }

        code = `${list}.slice(${at1}, ${at2})`;
    } else {
        const at1 = Blockly.JavaScript.getAdjusted(block, 'AT1');
        const at2 = Blockly.JavaScript.getAdjusted(block, 'AT2');
        const wherePascalCase = {
            FROM_START: 'FromStart',
            FROM_END  : 'FromEnd',
        };
        const getIndex = (listName, where, at) => (where === 'FROM_END' ? `${listName}.length - 1 - ${at}` : at);

        const functionName = Blockly.JavaScript.provideFunction_(
            `subsequence${wherePascalCase[where1]}${wherePascalCase[where2]}`,
            [
                `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(sequence, at1, at2) {
                var start = ${getIndex('sequence', where1, 'at1')};
                var end = ${getIndex('sequence', where2, 'at2')};
                return sequence.slice(start, end);
            }`,
            ]
        );

        code = `${functionName}(${list}, ${at1}, ${at2})`;
    }

    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
