import { sellContract } from '../../../images';
import { setBlockTextColor } from '../../../../utils';
import { translate } from '../../../../../../../common/utils/tools';

Blockly.Blocks.during_purchase = {
    init() {
        this.jsonInit({
            message0: translate('%1 (3) Watch and sell your purchased contract %2'),
            message1: '%1',
            args0   : [
                {
                    type  : 'field_image',
                    src   : sellContract,
                    width : 25,
                    height: 25,
                    alt   : 'S',
                },
                {
                    type: 'input_dummy',
                },
            ],
            args1: [
                {
                    type : 'input_statement',
                    name : 'DURING_PURCHASE_STACK',
                    check: 'SellAtMarket',
                },
            ],
            colour         : '#2a3052',
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate(
                'Watch the purchased contract info and sell at market if available (Runs on contract update)'
            ),
        });
    },
    onchange(event) {
        setBlockTextColor(this);
        if (!this.workspace || this.isInFlyout) {
            return;
        }

        // Maintain single instance of this block
        if (event.type === Blockly.Events.BLOCK_CREATE) {
            if (event.ids && event.ids.includes(this.id)) {
                this.workspace.getAllBlocks(true).forEach(block => {
                    if (block.type === this.type && block.id !== this.id) {
                        block.dispose();
                    }
                });
            }
        }
    },
};

Blockly.JavaScript.during_purchase = block => {
    const stack = Blockly.JavaScript.statementToCode(block, 'DURING_PURCHASE_STACK');

    const code = `BinaryBotPrivateDuringPurchase = function BinaryBotPrivateDuringPurchase() {
        ${stack}
    };\n`;
    return code;
};
