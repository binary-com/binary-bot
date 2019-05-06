import { finishSign } from '../../../images';
import { setBlockTextColor } from '../../../../utils';
import { translate } from '../../../../../../../common/utils/tools';

Blockly.Blocks.after_purchase = {
    init() {
        this.jsonInit({
            message0: translate('%1 (4) Get your trade result and trade again %2'),
            message1: '%1',
            args0   : [
                {
                    type  : 'field_image',
                    src   : finishSign,
                    width : 25,
                    height: 25,
                    alt   : 'F',
                },
                {
                    type: 'input_dummy',
                },
            ],
            args1: [
                {
                    type : 'input_statement',
                    name : 'AFTERPURCHASE_STACK',
                    check: 'TradeAgain',
                },
            ],
            colour         : '#2a3052',
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate(
                'Get the previous trade information and result, then trade again (Runs on trade finish)'
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

Blockly.JavaScript.after_purchase = block => {
    const stack = Blockly.JavaScript.statementToCode(block, 'AFTERPURCHASE_STACK');
    const code = `
    BinaryBotPrivateAfterPurchase = function BinaryBotPrivateAfterPurchase() {
        ${stack}
        return false;
    };`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
