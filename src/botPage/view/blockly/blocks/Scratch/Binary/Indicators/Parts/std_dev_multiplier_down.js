import { translate } from '../../../../../../../../common/i18n';

Blockly.Blocks.std_dev_multiplier_down = {
    init() {
        this.jsonInit({
            message0: translate('Standard Deviation Down Multiplier %1'),
            args0   : [
                {
                    type : 'input_value',
                    name : 'DOWNMULTIPLIER',
                    check: null,
                },
            ],
            colour           : Blockly.Colours.BinaryLessGray.colour,
            colourSecondary  : Blockly.Colours.BinaryLessGray.colourSecondary,
            colourTertiary   : Blockly.Colours.BinaryLessGray.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
        });
    },
    onchange      : Blockly.Blocks.input_list.onchange,
    allowedParents: ['bb_statement', 'bba_statement'],
};

Blockly.JavaScript.std_dev_multiplier_down = () => {};
