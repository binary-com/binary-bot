import config from '../../../../../../common/const';
import { translate } from '../../../../../../../common/utils/tools';

Blockly.Blocks.contract_check_result = {
    init() {
        this.jsonInit({
            message0: translate('Result is %1'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'CHECK_RESULT',
                    options: config.lists.CHECK_RESULT,
                },
            ],
            output         : 'Boolean',
            outputShape    : Blockly.OUTPUT_SHAPE_HEXAGONAL,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate('True if the result matches the selection'),
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

Blockly.JavaScript.contract_check_result = block => {
    const checkWith = block.getFieldValue('CHECK_RESULT');

    const code = `Bot.isResult('${checkWith}')`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
