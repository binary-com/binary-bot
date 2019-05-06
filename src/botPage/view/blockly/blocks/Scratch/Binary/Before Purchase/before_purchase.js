import { purchase } from '../../../images';
import { setBlockTextColor } from '../../../../utils';
import { translate } from '../../../../../../../common/utils/tools';

Blockly.Blocks.before_purchase = {
    init() {
        this.jsonInit({
            message0: translate('%1 (2) Watch and purchase your contract %2'),
            message1: '%1',
            args0   : [
                {
                    type  : 'field_image',
                    src   : purchase,
                    width : 25,
                    height: 25,
                    alt   : 'P',
                },
                {
                    type: 'input_dummy',
                },
            ],
            args1: [
                {
                    type : 'input_statement',
                    name : 'BEFOREPURCHASE_STACK',
                    check: 'Purchase',
                },
            ],
            colour         : '#2a3052',
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate('Watch the tick stream and purchase the desired contract (Runs on tick update)'),
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

Blockly.JavaScript.before_purchase = block => {
    const stack = Blockly.JavaScript.statementToCode(block, 'BEFOREPURCHASE_STACK');

    const code = `BinaryBotPrivateBeforePurchase = function BinaryBotPrivateBeforePurchase() {
        ${stack}
    };\n`;
    return code;
};
