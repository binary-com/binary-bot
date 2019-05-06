import config from '../../../../../../common/const';
import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.check_direction = {
    init() {
        this.jsonInit({
            message0: translate('Direction is %1'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'CHECK_DIRECTION',
                    options: config.lists.CHECK_DIRECTION,
                },
            ],
            output         : 'Boolean',
            outputShape    : Blockly.OUTPUT_SHAPE_HEXAGONAL,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate('True if the direction matches the selection'),
        });
    },
    onchange(event) {
        if (!this.workspace || this.isInFlyout || this.workspace.isDragging()) {
            return;
        }

        if (event.type === Blockly.Events.END_DRAG) {
            const allowedScopes = [
                'trade_definition',
                'during_purchase',
                'before_purchase',
                'after_purchase',
                'tick_analysis',
            ];
            if (allowedScopes.some(scope => this.isDescendantOf(scope))) {
                if (this.disabled) {
                    this.setDisabled(false);
                }
            } else if (!this.disabled) {
                this.setDisabled(true);
            }
        }
    },
};

Blockly.JavaScript.check_direction = block => {
    const checkWith = block.getFieldValue('CHECK_DIRECTION');

    const code = `Bot.checkDirection('${checkWith}')`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
