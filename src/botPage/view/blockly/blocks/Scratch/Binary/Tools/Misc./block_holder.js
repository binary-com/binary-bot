import { translate } from '../../../../../../../../common/i18n';

Blockly.Blocks.block_holder = {
    init() {
        this.jsonInit({
            message0: translate('Blocks inside are ignored %1 %2'),
            args0   : [
                {
                    type: 'input_dummy',
                },
                {
                    type : 'input_statement',
                    name : 'USELESS_STACK',
                    check: null,
                },
            ],
            colour         : '#fef1cf',
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate('Put your blocks in here to prevent them from being removed'),
        });
    },
};

Blockly.JavaScript.block_holder = () => '';
