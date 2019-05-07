import { translate } from '../../../../../../../common/i18n';
import { setBlockTextColor } from '../../../../utils';

/**
 * Block for conditionally returning a value from a procedure.
 * @this Blockly.Block
 */
Blockly.Blocks.procedures_ifreturn = {
    init() {
        this.hasReturnValue = true;

        this.jsonInit({
            message0: translate('if %1 return %2'),
            args0   : [
                {
                    type: 'input_value',
                    name: 'CONDITION',
                },
                {
                    type: 'input_value',
                    name: 'VALUE',
                },
            ],
            colour           : Blockly.Colours.BinaryProcedures.colour,
            colourSecondary  : Blockly.Colours.BinaryProcedures.colourSecondary,
            colourTertiary   : Blockly.Colours.BinaryProcedures.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
        });
    },
    /**
     * Create XML to represent whether this block has a return value.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom() {
        const container = document.createElement('mutation');
        container.setAttribute('value', Number(this.hasReturnValue));
        return container;
    },
    /**
     * Parse XML to restore whether this block has a return value.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation(xmlElement) {
        const value = xmlElement.getAttribute('value');
        this.hasReturnValue = value === 1;

        if (!this.hasReturnValue) {
            this.removeInput('VALUE');
            this.appendDummyInput('VALUE').appendField(translate('return'));
            this.initSvg();
            this.render();
        }
    },
    /**
     * Called whenever anything on the workspace changes.
     * Add warning if this flow block is not nested inside a loop.
     * @param {!Blockly.Events.Abstract} e Change event.
     * @this Blockly.Block
     */
    onchange(/* e */) {
        setBlockTextColor(this);

        if (!this.workspace.isDragging || this.workspace.isDragging()) {
            return; // Don't change state at the start of a drag.
        }

        let legal = false;

        // Is the block nested in a procedure?
        let block = this;
        do {
            if (this.FUNCTION_TYPES.indexOf(block.type) !== -1) {
                legal = true;
                break;
            }
            block = block.getSurroundParent();
        } while (block);

        if (legal) {
            const rerender = () => {
                this.initSvg();
                this.render();
            };

            // If needed, toggle whether this block has a return value.
            if (block.type === 'procedures_defnoreturn' && this.hasReturnValue) {
                this.removeInput('VALUE');
                this.appendDummyInput('VALUE').appendField(translate('return'));
                rerender();
                this.hasReturnValue = false;
            } else if (block.type === 'procedures_defreturn' && !this.hasReturnValue) {
                this.removeInput('VALUE');
                this.appendValueInput('VALUE').appendField(translate('return'));
                rerender();
                this.hasReturnValue = true;
            }

            if (!this.isInFlyout) {
                this.setDisabled(false);
            }
        } else if (!this.isInFlyout && !this.getInheritedDisabled()) {
            this.setDisabled(true);
        }
    },
    /**
     * List of block types that are functions and thus do not need warnings.
     * To add a new function type add this to your code:
     * Blockly.Blocks['procedures_ifreturn'].FUNCTION_TYPES.push('custom_func');
     */
    FUNCTION_TYPES: ['procedures_defnoreturn', 'procedures_defreturn'],
};

Blockly.JavaScript.procedures_ifreturn = block => {
    const condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'false';

    let branch;
    if (block.hasReturnValue) {
        const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || 'null';
        branch = `return ${value};\n`;
    } else {
        branch = 'return;\n';
    }

    const code = `
    if ${condition} {
        ${branch}
    }\n`;
    return code;
};
