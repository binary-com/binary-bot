import { translate } from '../../../../../../../../common/utils/tools';

Blockly.Blocks.signal_ema_period = {
    init() {
        this.jsonInit({
            message0: translate('Signal EMA Period %1'),
            args0   : [
                {
                    type : 'input_value',
                    name : 'SIGNAL_EMA_PERIOD',
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

Blockly.JavaScript.signal_ema_period = () => {};
