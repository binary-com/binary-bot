import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.lists_getIndex = {
    init() {
        this.MODE_OPTIONS = [
            [translate('get'), 'GET'],
            [translate('get and remove'), 'GET_REMOVE'],
            [translate('remove'), 'REMOVE'],
        ];
        this.WHERE_OPTIONS = [
            ['#', 'FROM_START'],
            [translate('# from end'), 'FROM_END'],
            [translate('first'), 'FIRST'],
            [translate('last'), 'LAST'],
            [translate('random'), 'RANDOM'],
        ];
        const modeMenu = new Blockly.FieldDropdown(this.MODE_OPTIONS, value => {
            const isStatement = value === 'REMOVE';
            this.updateStatement(isStatement);
        });

        this.appendValueInput('VALUE')
            .setCheck('Array')
            .appendField(translate('in list'));
        this.appendDummyInput().appendField(modeMenu, 'MODE');
        this.appendDummyInput('AT');
        // eslint-disable-next-line no-underscore-dangle
        this.setColourFromRawValues_(
            Blockly.Colours.Binary.colour,
            Blockly.Colours.Binary.colourSecondary,
            Blockly.Colours.Binary.colourTertiary
        );
        this.setOutput(true, null);

        this.updateAt(true);
    },
    mutationToDom() {
        const container = document.createElement('mutation');
        const isStatement = !this.outputConnection;
        const isAt = this.getInput('AT').type === Blockly.INPUT_VALUE;

        container.setAttribute('statement', isStatement);
        container.setAttribute('at', isAt);

        return container;
    },
    domToMutation(xmlElement) {
        const isStatement = xmlElement.getAttribute('statement') === 'true';
        this.updateStatement(isStatement);

        const isAt = xmlElement.getAttribute('at') !== 'false';
        this.updateAt(isAt);
    },
    updateStatement(newStatement) {
        const oldStatement = !this.outputConnection;

        if (newStatement !== oldStatement) {
            this.unplug(true, true);

            this.setOutput(!newStatement);
            this.setPreviousStatement(newStatement);
            this.setNextStatement(newStatement);

            this.initSvg();
            this.render(false);
        }
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

        this.getInput('AT').appendField(menu, 'WHERE');

        this.initSvg();
        this.render(false);
    },
};

Blockly.JavaScript.lists_getIndex = block => {
    const mode = block.getFieldValue('MODE') || 'GET';
    const where = block.getFieldValue('WHERE') || 'FIRST';
    const listOrder = where === 'RANDOM' ? Blockly.JavaScript.ORDER_COMMA : Blockly.JavaScript.ORDER_MEMBER;
    const list = Blockly.JavaScript.valueToCode(block, 'VALUE', listOrder) || '[]';

    let code;
    let order;

    if (where === 'FIRST') {
        if (mode === 'GET') {
            code = `${list}[0]`;
            order = Blockly.JavaScript.ORDER_MEMBER;
        } else if (mode === 'GET_REMOVE') {
            code = `${list}.shift()`;
            order = Blockly.JavaScript.ORDER_MEMBER;
        } else if (mode === 'REMOVE') {
            return `${list}.shift();\n`;
        }
    } else if (where === 'LAST') {
        if (mode === 'GET') {
            code = `${list}.slice(-1)[0]`;
            order = Blockly.JavaScript.ORDER_MEMBER;
        } else if (mode === 'GET_REMOVE') {
            code = `${list}.pop()`;
            order = Blockly.JavaScript.ORDER_MEMBER;
        } else if (mode === 'REMOVE') {
            return `${list}.pop();\n`;
        }
    } else if (where === 'FROM_START') {
        const at = Blockly.JavaScript.getAdjusted(block, 'AT');
        if (mode === 'GET') {
            code = `${list}[${at}]`;
            order = Blockly.JavaScript.ORDER_MEMBER;
        } else if (mode === 'GET_REMOVE') {
            code = `${list}.splice(${at}, 1)[0]`;
            order = Blockly.JavaScript.ORDER_FUNCTION_CALL;
        } else if (mode === 'REMOVE') {
            return `${list}.splice(${at}, 1);\n`;
        }
    } else if (where === 'FROM_END') {
        const at = Blockly.JavaScript.getAdjusted(block, 'AT', 1, true);
        if (mode === 'GET') {
            code = `${list}.slice(${at})[0]`;
            order = Blockly.JavaScript.ORDER_FUNCTION_CALL;
        } else if (mode === 'GET_REMOVE') {
            code = `${list}.splice(${at}, 1)[0]`;
            order = Blockly.JavaScript.ORDER_FUNCTION_CALL;
        } else if (mode === 'REMOVE') {
            return `${list}.splice(${at}, 1);\n`;
        }
    } else if (where === 'RANDOM') {
        // eslint-disable-next-line no-underscore-dangle
        const functionName = Blockly.JavaScript.provideFunction_('listsGetRandomItem', [
            // eslint-disable-next-line no-underscore-dangle
            `function ${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_}(list, remove) {
                var x = Math.floor(Math.random() * list.length);
                if (remove) {
                    return list.splice(x, 1)[0];
                } else {
                    return list[x];
                }
            }`,
        ]);

        code = `${functionName}(${list}, ${mode !== 'GET'})`;

        if (mode === 'GET' || mode === 'GET_REMOVE') {
            order = Blockly.JavaScript.ORDER_FUNCTION_CALL;
        } else if (mode === 'REMOVE') {
            return `${code};\n`;
        }
    }

    return [code, order];
};
