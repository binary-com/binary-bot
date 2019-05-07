import { getPurchaseChoices } from '../../../shared';
import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.ask_price = {
    init() {
        this.jsonInit({
            message0: translate('Ask Price %1'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'PURCHASE_LIST',
                    options: getPurchaseChoices,
                },
            ],
            output         : 'Number',
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate('Ask Price for selected proposal'),
        });
    },
    onchange(event) {
        if (!this.workspace || this.isInFlyout || this.workspace.isDragging()) {
            return;
        }

        if (event.type === Blockly.Events.END_DRAG) {
            if (this.isDescendantOf('before_purchase')) {
                if (this.disabled) {
                    this.setDisabled(false);
                }
            } else if (!this.disabled) {
                this.setDisabled(true);
            }
        }
    },
};

Blockly.JavaScript.ask_price = block => {
    const purchaseList = block.getFieldValue('PURCHASE_LIST');

    const code = `Bot.getAskPrice('${purchaseList}')`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
