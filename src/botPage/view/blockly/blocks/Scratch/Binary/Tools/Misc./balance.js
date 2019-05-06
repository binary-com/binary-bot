import { translate } from '../../../../../../../../common/i18n';
import config from '../../../../../../../common/const';

Blockly.Blocks.balance = {
    init() {
        this.jsonInit({
            message0: translate('Balance: %1'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'BALANCE_TYPE',
                    options: config.lists.BALANCE_TYPE,
                },
            ],
            output         : null,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
        });

        // Change shape based on selected type
        const balanceTypeField = this.getField('BALANCE_TYPE');
        balanceTypeField.setValidator(value => {
            if (value === 'STR') {
                this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
                this.setOutput(true, 'String');
            } else if (value === 'NUM') {
                this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
                this.setOutput(true, 'Number');
            }
            this.initSvg();
            this.render(false);
            return undefined;
        });
    },
};

Blockly.JavaScript.balance = block => {
    const balanceType = block.getFieldValue('BALANCE_TYPE');

    const code = `Bot.getBalance('${balanceType}')`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
