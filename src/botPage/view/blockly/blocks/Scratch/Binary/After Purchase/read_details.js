import { insideAfterPurchase } from '../../../../relationChecker';
import config from '../../../../../../common/const';
import { translate } from '../../../../../../../common/utils/tools';

Blockly.Blocks.read_details = {
    init() {
        this.jsonInit({
            message0: translate('Contract Detail: %1'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'DETAIL_INDEX',
                    options: config.lists.DETAILS,
                },
            ],
            output         : null,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate('Reads a selected option from contract details list'),
        });
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

Blockly.JavaScript.read_details = block => {
    const detailIndex = block.getFieldValue('DETAIL_INDEX');

    const code = `Bot.readDetails(${detailIndex})`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
