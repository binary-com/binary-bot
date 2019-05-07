import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.lists_setIndex = {
    init() {
        this.MODE_OPTIONS = [[translate('set'), 'SET'], [translate('insert at'), 'INSERT']];
        this.WHERE_OPTIONS = [
            [translate('#'), 'FROM_START'],
            [translate('# from end'), 'FROM_END'],
            [translate('first'), 'FIRST'],
            [translate('last'), 'LAST'],
            [translate('random'), 'RANDOM'],
        ];

        this.appendValueInput('LIST')
            .setCheck('Array')
            .appendField(translate('in list'));
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(this.MODE_OPTIONS), 'MODE');
        this.appendDummyInput('AT');
        this.appendValueInput('TO').appendField(translate('as'));

        // eslint-disable-next-line no-underscore-dangle
        this.setColourFromRawValues_(
            Blockly.Colours.Binary.colour,
            Blockly.Colours.Binary.colourSecondary,
            Blockly.Colours.Binary.colourTertiary
        );
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

        this.updateAt(true);
    },
    mutationToDom() {
        const container = document.createElement('mutation');
        const isAt = this.getInput('AT').type === Blockly.INPUT_VALUE;

        container.setAttribute('at', isAt);
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
        } else {
            this.appendDummyInput('AT');
        }

        const menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, value => {
            const newAt = ['FROM_START', 'FROM_END'].includes(value);
            if (newAt !== isAt) {
                this.updateAt(newAt);
                this.setFieldValue(value, 'WHERE');
                return null;
            }
            return undefined;
        });

        this.moveInputBefore('AT', 'TO');
        this.getInput('AT').appendField(menu, 'WHERE');
        this.initSvg();
        this.render(false);
    },
};

Blockly.JavaScript.lists_setIndex = block => {
    const mode = block.getFieldValue('MODE') || 'SET';
    const where = block.getFieldValue('WHERE') || 'FIRST';
    const value = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_ASSIGNMENT) || 'null';

    let list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_MEMBER) || '[]';

    const cacheList = () => {
        if (list.match(/^\w+$/)) {
            return '';
        }

        // eslint-disable-next-line no-underscore-dangle
        const listVar = Blockly.JavaScript.variableDB_.getDistinctName('tmpList', Blockly.Variables.NAME_TYPE);
        const code = `var ${listVar} = ${list};\n`;

        list = listVar;
        return code;
    };

    let code;

    if (where === 'FIRST') {
        if (mode === 'SET') {
            code = `list[0] = ${value};\n`;
        } else if (mode === 'INSERT') {
            code = `${list}.unshift(${value});\n`;
        }
    } else if (where === 'LAST') {
        if (mode === 'SET') {
            code = cacheList();
            code += `${list}[${list}.length - 1] = ${value};\n`;
        } else if (mode === 'INSERT') {
            code = `${list}.push(${value});\n`;
        }
    } else if (where === 'FROM_START') {
        const at = Blockly.JavaScript.getAdjusted(block, 'AT');
        if (mode === 'SET') {
            code = `${list}[${at}] = ${value};\n`;
        } else if (mode === 'INSERT') {
            code = `${list}.splice(${at}, 0, ${value});\n`;
        }
    } else if (where === 'FROM_END') {
        const at = Blockly.JavaScript.getAdjusted(block, 'AT', 1, false, Blockly.JavaScript.ORDER_SUBTRACTION);
        code = cacheList();
        if (mode === 'SET') {
            code = `${list}[${list}.length - ${at}] = ${value};\n`;
        } else if (mode === 'INSERT') {
            code = `${list}.splice(${list}.length - ${at}, 0, ${value});\n`;
        }
    } else if (where === 'RANDOM') {
        code = cacheList();

        // eslint-disable-next-line no-underscore-dangle
        const xVar = Blockly.JavaScript.variableDB_.getDistinctName('tmpX', Blockly.Variables.NAME_TYPE);

        code += `var ${xVar} = Math.floor(Math.random() * ${list}.length);\n`;

        if (mode === 'SET') {
            code += `${list}[${xVar}] = ${value};\n`;
        } else if (mode === 'INSERT') {
            code += `${list}.splice(${xVar}, 0, ${value});\n`;
        }
    }

    return code;
};
