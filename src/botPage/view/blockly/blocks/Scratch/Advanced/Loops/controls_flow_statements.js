import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.controls_flow_statements = {
    init() {
        this.jsonInit({
            message0: '%1',
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'FLOW',
                    options: [
                        [translate('break out'), 'BREAK'],
                        [translate('continue with next iteration'), 'CONTINUE'],
                    ],
                },
            ],
            colour           : Blockly.Colours.Binary.colour,
            colourSecondary  : Blockly.Colours.Binary.colourSecondary,
            colourTertiary   : Blockly.Colours.Binary.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
        });
    },
};

Blockly.JavaScript.controls_flow_statements = block => {
    // Flow statements: continue, break.
    if (block.getFieldValue('FLOW') === 'BREAK') {
        return 'break;\n';
    } else if (block.getFieldValue('FLOW') === 'CONTINUE') {
        return 'continue;\n';
    }
};
