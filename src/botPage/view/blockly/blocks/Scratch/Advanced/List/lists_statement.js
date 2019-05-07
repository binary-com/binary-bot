import { minusIconDark } from '../../../images';

Blockly.Blocks.lists_statement = {
    init() {
        this.jsonInit({
            message0: '%1',
            args0   : [
                {
                    type: 'input_value',
                    name: 'VALUE',
                },
            ],
            colour           : Blockly.Colours.BinaryLessGray.colour,
            colourSecondary  : Blockly.Colours.BinaryLessGray.colourSecondary,
            colourTertiary   : Blockly.Colours.BinaryLessGray.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
        });

        // Render a ➖-icon for removing self
        const fieldImage = new Blockly.FieldImage(minusIconDark, 25, 25, '', () => this.onIconClick());
        this.appendDummyInput('REMOVE_ICON').appendField(fieldImage);
    },
    onIconClick() {
        if (!this.workspace || this.isInFlyout) {
            return;
        }

        this.unplug(true);
        this.dispose();
    },
    onchange() {
        if (!this.workspace || this.isInFlyout || this.workspace.isDragging()) {
            return;
        }

        // Self-destruct if located outside `lists_create_with`
        const surroundParent = this.getSurroundParent();
        if (!surroundParent || surroundParent.type !== 'lists_create_with') {
            this.unplug(true);
            this.dispose();
        }
    },
};

Blockly.JavaScript.lists_statement = block => {
    const code = Blockly.JavaScript.valueToCode(block, 'VALUE') || 'null';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
