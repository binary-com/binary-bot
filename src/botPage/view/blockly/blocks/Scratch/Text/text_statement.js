import { minusIconDark } from '../../images';

Blockly.Blocks.text_statement = {
    init() {
        this.jsonInit({
            message0: '%1',
            args0   : [
                {
                    type: 'input_value',
                    name: 'TEXT',
                },
            ],
            colour           : Blockly.Colours.BinaryLessGray.colour,
            colourSecondary  : Blockly.Colours.BinaryLessGray.colourSecondary,
            colourTertiary   : Blockly.Colours.BinaryLessGray.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
        });

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

        if (event.type === Blockly.Events.END_DRAG) {
            const surroundParent = this.getSurroundParent();
            if (!surroundParent || surroundParent.type !== 'text_join') {
                Blockly.Events.disable();
                this.unplug(true);
                this.dispose();
                Blockly.Events.enable();
            }
        }
    },
};

Blockly.JavaScript.text_statement = block => {
    const code = Blockly.JavaScript.valueToCode(block, 'TEXT') || '';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
