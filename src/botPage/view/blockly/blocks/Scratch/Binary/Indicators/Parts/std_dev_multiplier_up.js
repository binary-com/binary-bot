import { translate } from '../../../../../../../../common/utils/tools';

Blockly.Blocks.std_dev_multiplier_up = {
    init() {
        this.jsonInit({
            message0: translate('Standard Deviation Up Multiplier %1'),
            args0   : [
                {
                    type : 'input_value',
                    name : 'UPMULTIPLIER',
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
    allowedParents: ['bb_statement', 'bba_statement'],
};

Blockly.JavaScript.std_dev_multiplier_up = () => {};
