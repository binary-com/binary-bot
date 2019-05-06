import { insideBeforePurchase } from '../../../../relationChecker';
import { getPurchaseChoices, updatePurchaseChoices } from '../../../shared';
import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.purchase = {
    init() {
        this.jsonInit({
            message0: translate('Purchase %1'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'PURCHASE_LIST',
                    options: getPurchaseChoices,
                },
            ],
            previousStatement: null,
            colour           : Blockly.Colours.Binary.colour,
            colourSecondary  : Blockly.Colours.Binary.colourSecondary,
            colourTertiary   : Blockly.Colours.Binary.colourTertiary,
            tooltip          : translate('Payout for selected proposal'),
        });

        // Ensure one of this type per statement-stack
        this.setNextStatement(false);
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
        } else if (event.type === Blockly.Events.BLOCK_CHANGE || Blockly.Events.BLOCK_CREATE) {
            const tradeDefinitionBlock = this.workspace
                .getAllBlocks(true)
                .find(block => block.type === 'trade_definition');

            if (!tradeDefinitionBlock) {
                return;
            }

            const tradeTypeBlock = tradeDefinitionBlock.getChildByType('trade_definition_tradetype');
            if (!tradeTypeBlock) {
                return;
            }

            const tradeType = tradeTypeBlock.getFieldValue('TRADETYPE_LIST');
            const contractTypeBlock = tradeDefinitionBlock.getChildByType('trade_definition_contracttype');
            const contractType = contractTypeBlock.getFieldValue('TYPE_LIST');
            const oppositesName = tradeType.toUpperCase();

            if (tradeType && contractType && oppositesName) {
                updatePurchaseChoices(contractType, oppositesName);
            }
        }
    },
};

Blockly.JavaScript.purchase = block => {
    const purchaseList = block.getFieldValue('PURCHASE_LIST');

    const code = `Bot.purchase('${purchaseList}');\n`;
    return code;
};
