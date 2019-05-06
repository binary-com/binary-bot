import { translate } from '../../../../../../../../common/utils/tools';

Blockly.Blocks.period = {
    init() {
        this.jsonInit({
            message0: translate('Period %1'),
            args0   : [
                {
                    type : 'input_value',
                    name : 'PERIOD',
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
    allowedParents: [
        'bb_statement',
        'bba_statement',
        'ema_statement',
        'emaa_statement',
        'macda_statement',
        'rsi_statement',
        'rsia_statement',
        'sma_statement',
        'smaa_statement',
    ],
};

Blockly.JavaScript.period = () => {};
