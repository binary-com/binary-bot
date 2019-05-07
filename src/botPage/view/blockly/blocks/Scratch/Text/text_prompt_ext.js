import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.text_prompt_ext = {
    init() {
        this.jsonInit({
            message0: translate('prompt for %1 with message %2'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'TYPE',
                    options: [[translate('string'), 'TEXT'], [translate('number'), 'NUMBER']],
                },
                {
                    type: 'input_value',
                    name: 'TEXT',
                },
            ],
            output         : 'String',
            outputShape    : Blockly.OUTPUT_SHAPE_SQUARE,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
        });

        // Change shape based on selected type
        const typeField = this.getField('TYPE');
        typeField.setValidator(value => {
            if (value === 'TEXT') {
                this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
                this.setOutput(true, 'String');
            } else if (value === 'NUMBER') {
                this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
                this.setOutput(true, 'Number');
            }
            this.initSvg();
            this.render(false);
            return undefined;
        });
    },
};

Blockly.JavaScript.text_prompt_ext = block => {
    let msg;

    if (block.getField('TEXT')) {
        // Internal message
        // eslint-disable-next-line no-underscore-dangle
        msg = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'));
    } else {
        // External message
        msg = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '\'\'';
    }

    let code;

    if (block.getFieldValue('TYPE') === 'NUMBER') {
        code = `parseFloat(window.prompt(${msg}))`;
    } else {
        code = `window.prompt(${msg})`;
    }

    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
