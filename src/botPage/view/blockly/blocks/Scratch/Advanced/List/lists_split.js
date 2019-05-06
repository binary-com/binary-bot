import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.lists_split = {
    init() {
        const dropdown = new Blockly.FieldDropdown(
            [[translate('make list from text'), 'SPLIT'], [translate('make text from list'), 'JOIN']],
            newMode => this.updateType_(newMode)
        );

        this.appendValueInput('INPUT')
            .setCheck('String')
            .appendField(dropdown, 'MODE');
        this.appendValueInput('DELIM')
            .setCheck('String')
            .appendField('', 'SPACE1')
            .appendField(translate('with delimiter'), 'DELIM_LABEL');
        this.appendDummyInput().appendField('', 'SPACE2');

        this.setOutput(true, 'Array');
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setColourFromRawValues_(
            Blockly.Colours.Binary.colour,
            Blockly.Colours.Binary.colourSecondary,
            Blockly.Colours.Binary.colourTertiary
        );
    },
    mutationToDom() {
        const container = document.createElement('mutation');
        container.setAttribute('mode', this.getFieldValue('MODE'));
        return container;
    },
    domToMutation(xmlElement) {
        this.updateType_(xmlElement.getAttribute('mode'));
    },
    updateType_(newMode) {
        const delimInput = this.getInput('DELIM');
        const spaceField = this.getField('SPACE1');

        if (newMode === 'SPLIT') {
            this.outputConnection.setCheck('Array');
            this.getInput('INPUT').setCheck('String');

            // Create extra spacing for OUTPUT_SHAPE_SQUARE (i.e. string shapes)
            if (!spaceField) {
                delimInput.insertFieldAt(0, '', 'SPACE1');
            }
        } else {
            this.outputConnection.setCheck('String');
            this.getInput('INPUT').setCheck(null);

            if (spaceField) {
                delimInput.removeField('SPACE1');
            }
        }

        this.initSvg();
        this.render(false);
    },
};

Blockly.JavaScript.lists_split = block => {
    const input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_MEMBER);
    const delimiter = Blockly.JavaScript.valueToCode(block, 'DELIM', Blockly.JavaScript.ORDER_NONE) || '\'\'';
    const mode = block.getFieldValue('MODE');

    let code;

    if (mode === 'SPLIT') {
        code = `${input || '\'\''}.split(${delimiter})`;
    } else if (mode === 'JOIN') {
        code = `${input || '[]'}.join(${delimiter})`;
    }

    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
