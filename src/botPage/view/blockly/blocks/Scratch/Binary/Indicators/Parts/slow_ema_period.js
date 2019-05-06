import { translate } from '../../../../../../../../common/utils/tools';

Blockly.Blocks.slow_ema_period = {
    init() {
        this.jsonInit({
            message0: translate('Slow EMA Period %1'),
            args0   : [
                {
                    type : 'input_value',
                    name : 'SLOW_EMA_PERIOD',
                    check: null,
                },
            ],
            colour           : Blockly.Colours.BinaryLessGray.colour,
            colourSecondary  : Blockly.Colours.BinaryLessGray.colourSecondary,
            colourTertiary   : Blockly.Colours.BinaryLessGray.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
        });

        this.setMovable(false);
        this.setDeletable(false);
    },
    onchange      : Blockly.Blocks.input_list.onchange,
    allowedParents: ['macda_statement'],
};

Blockly.JavaScript.slow_ema_period = () => {};
