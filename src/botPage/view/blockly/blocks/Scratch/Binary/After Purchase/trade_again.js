import { translate } from '../../../../../../../common/utils/tools';

Blockly.Blocks.trade_again = {
    init() {
        this.jsonInit({
            message0         : translate('Trade Again'),
            colour           : Blockly.Colours.Binary.colour,
            colourSecondary  : Blockly.Colours.Binary.colourSecondary,
            colourTertiary   : Blockly.Colours.Binary.colourTertiary,
            previousStatement: null,
            tooltip          : translate('Runs the trade block again'),
        });

        // Ensure one of this type per statement-stack
        this.setNextStatement(false);
    },
    onchange(event) {
        if (!this.workspace || this.isInFlyout || this.workspace.isDragging()) {
            return;
        }

        if (event.type === Blockly.Events.END_DRAG) {
            if (this.isDescendantOf('after_purchase')) {
                if (this.disabled) {
                    this.setDisabled(false);
                }
            } else if (!this.disabled) {
                this.setDisabled(true);
            }
        }
    },
};

Blockly.JavaScript.trade_again = () => 'return true;\n';
