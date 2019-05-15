import { minusIconDark } from '../../../images';

Blockly.Blocks.lists_statement = {
    init() {
        this.requiredParentId = '';

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
    onchange(event) {
        if (!this.workspace || this.isInFlyout || this.workspace.isDragging()) {
            return;
        }

        const surroundParent = this.getSurroundParent();
        if (event.type === Blockly.Events.END_DRAG) {
            if (!this.requiredParentId && surroundParent.type === 'lists_create_with') {
                this.requiredParentId = surroundParent.id;
            } else if (!surroundParent || surroundParent.id !== this.requiredParentId) {
                Blockly.Events.disable();
                this.unplug(false);

                const parentBlock = this.workspace.getAllBlocks().find(block => block.id === this.requiredParentId);

                if (parentBlock) {
                    const parentConnection = parentBlock.getLastConnectionInStatement('STACK');
                    parentConnection.connect(this.previousConnection);
                } else {
                    this.dispose();
                }
                Blockly.Events.enable();
            }
        }
    },
};

Blockly.JavaScript.lists_statement = block => {
    const code = Blockly.JavaScript.valueToCode(block, 'VALUE') || 'null';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
