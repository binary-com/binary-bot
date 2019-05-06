import { translate } from '../../../../../../../common/i18n';
import { plusIconDark } from '../../../images';

Blockly.Blocks.lists_create_with = {
    init() {
        this.jsonInit({
            message0: translate('set %1 to create list with'),
            message1: '%1',
            args0   : [
                {
                    type    : 'field_variable',
                    name    : 'VARIABLE',
                    variable: translate('list'),
                },
            ],
            args1: [
                {
                    type: 'input_statement',
                    name: 'STACK',
                },
            ],
            colour           : Blockly.Colours.Binary.colour,
            colourSecondary  : Blockly.Colours.Binary.colourSecondary,
            colourTertiary   : Blockly.Colours.Binary.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
        });

        // Render a ➕-icon for adding additional `lists_statement` blocks
        const fieldImage = new Blockly.FieldImage(plusIconDark, 25, 25, '', () => this.onIconClick());
        this.appendDummyInput('ADD_ICON').appendField(fieldImage);
        this.moveInputBefore('ADD_ICON', 'STACK');
    },
    onIconClick() {
        if (!this.workspace || this.isInFlyout) {
            return;
        }

        const statementBlock = this.workspace.newBlock('lists_statement');
        statementBlock.setMovable(false);
        statementBlock.initSvg();
        statementBlock.render();

        const connection = this.getLastConnectionInStatement('STACK');
        connection.connect(statementBlock.previousConnection);
    },
    onchange(event) {
        if (!this.workspace || this.isInFlyout || this.workspace.isDragging()) {
            return;
        }

        if (event.type === Blockly.Events.END_DRAG) {
            // Only allow `lists_statement` blocks to be part of the `STACK`
            let currentBlock = this.getInputTargetBlock('STACK');
            while (currentBlock !== null) {
                if (currentBlock.type !== 'lists_statement') {
                    currentBlock.unplug(false);
                }
                currentBlock = currentBlock.getNextBlock();
            }
        }
    },
};

Blockly.JavaScript.lists_create_with = block => {
    const variable = block.getFieldValue('VARIABLE');
    const varName = Blockly.JavaScript.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
    const elements = [];

    let currentBlock = block.getInputTargetBlock('STACK');
    while (currentBlock !== null) {
        const value = Blockly.JavaScript[currentBlock.type](currentBlock);

        if (Array.isArray(value) && value.length === 2) {
            elements.push(value[0]);
        } else {
            elements.push(value);
        }

        currentBlock = currentBlock.getNextBlock();
    }

    const code = `${varName} = [${elements.join(', ')}];\n`;
    return code;
};
