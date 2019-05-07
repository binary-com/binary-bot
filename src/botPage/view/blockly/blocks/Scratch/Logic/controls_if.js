import { plusIconDark, minusIconDark } from '../../images';
import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.controls_if = {
    init() {
        this.elseIfCount = 0;
        this.elseCount = 0;

        this.jsonInit({
            message0: translate('if %1 then'),
            message1: '%1',
            args0   : [
                {
                    type : 'input_value',
                    name : 'IF0',
                    check: 'Boolean',
                },
            ],
            args1: [
                {
                    type: 'input_statement',
                    name: 'DO0',
                },
            ],
            colour           : Blockly.Colours.Binary.colour,
            colourSecondary  : Blockly.Colours.Binary.colourSecondary,
            colourTertiary   : Blockly.Colours.Binary.colourTertiary,
            category         : Blockly.Categories.control,
            previousStatement: null,
            nextStatement    : null,
        });

        const addInputIcon = this.getAddInputIcon();
        this.appendDummyInput('MUTATOR').appendField(addInputIcon);
    },
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom() {
        if (!this.elseIfCount && !this.elseCount) {
            return null;
        }

        const container = document.createElement('mutation');

        if (this.elseIfCount) {
            container.setAttribute('elseif', this.elseIfCount);
        }

        if (this.elseCount) {
            container.setAttribute('else', 1);
        }

        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation(xmlElement) {
        this.elseIfCount = parseInt(xmlElement.getAttribute('elseif')) || 0;
        this.elseCount = parseInt(xmlElement.getAttribute('else')) || 0;

        this.updateShape();
    },
    updateShape() {
        // Delete everything.
        if (this.getInput('ELSE')) {
            this.removeInput('ELSE');
        }

        let i = 1;
        while (this.getInput(`IF${i}`)) {
            this.removeInput(`IF${i}`);
            this.removeInput(`DO${i}`);

            i++;
        }

        if (this.getInput('MUTATOR')) {
            this.removeInput('MUTATOR');
        }

        // Rebuild block
        for (let j = 1; j <= this.elseIfCount; j++) {
            this.appendDummyInput(`IF_LABEL${j}`).appendField(translate('else if'));
            this.appendValueInput(`IF${j}`).setCheck('Boolean');
            this.appendDummyInput(`THEN_LABEL${j}`).appendField(translate('then'));
            this.appendDummyInput(`DELETE_ICON${j}`).appendField(this.getRemoveInputIcon(j, false));
            this.appendStatementInput(`DO${j}`);
        }

        if (this.elseCount) {
            this.appendDummyInput('ELSE_LABEL').appendField(translate('else'));
            this.appendDummyInput('DELETE_ELSE').appendField(this.getRemoveInputIcon(this.elseIfCount + 1, true));
            this.appendStatementInput('ELSE');
        }

        this.appendDummyInput('MUTATOR').appendField(this.getAddInputIcon());

        this.initSvg();
        this.render();
    },
    getAddInputIcon() {
        const onAddClick = () => {
            if (!this.workspace || this.isInFlyout) {
                return;
            }

            const newInputNum = this.elseIfCount + 1;

            if (this.elseCount === 0) {
                // No `elseif`, just add an `else`-statement
                this.appendDummyInput('ELSE_LABEL').appendField(translate('else'));
                this.appendDummyInput('DELETE_ELSE').appendField(this.getRemoveInputIcon(newInputNum, true));
                this.appendStatementInput('ELSE');

                this.elseCount++;
            } else {
                // We've already got `elseif` + `else`, keep adding more `elseif`'s
                this.appendDummyInput(`IF_LABEL${newInputNum}`).appendField(translate('else if'));
                this.appendValueInput(`IF${newInputNum}`).setCheck('Boolean');
                this.appendDummyInput(`THEN_LABEL${newInputNum}`).appendField(translate('then'));
                this.appendDummyInput(`DELETE_ICON${newInputNum}`).appendField(
                    this.getRemoveInputIcon(newInputNum, false)
                );
                this.appendStatementInput(`DO${newInputNum}`);

                this.elseIfCount++;
            }

            // We already have an else, this input needs to be moved to the bottom where it belongs.
            if (this.getInput('ELSE')) {
                this.moveInputBefore('ELSE_LABEL', null);
                this.moveInputBefore('DELETE_ELSE', null);
                this.moveInputBefore('ELSE', null);
            }

            // Move plus-icon to the bottom
            this.moveInputBefore('MUTATOR', null);

            this.initSvg();
            this.render();
        };

        const fieldImage = new Blockly.FieldImage(plusIconDark, 24, 24, '+', onAddClick);
        return fieldImage;
    },
    getRemoveInputIcon(index, isElseStack) {
        const onRemoveClick = () => {
            if (!this.workspace || this.isInFlyout) {
                return;
            }

            if (isElseStack) {
                this.removeInput('ELSE_LABEL');
                this.removeInput('DELETE_ELSE');
                this.removeInput('ELSE');
                this.elseCount = 0;
            } else {
                // Determine which label it is, has to be done inside this function.
                const inputNames = ['IF_LABEL', 'IF', 'THEN_LABEL', 'DELETE_ICON', 'DO'];

                inputNames.forEach(inputName => {
                    this.removeInput(`${inputName}${index}`);

                    // Re-number inputs w/ indexes larger than this one, e.g. when removing `IF5` becomes `IF4`
                    let i = 1;
                    let j = 0;

                    // e.g. we've removed `IF5`, name of larger input `IF6` should become `IF5`
                    let largerInput = this.getInput(inputName + (index + i));

                    while (largerInput) {
                        const newIndex = index + j;
                        largerInput.name = inputName + newIndex;

                        // Re-attach click handler with correct index.
                        if (inputName === 'DELETE_ICON') {
                            for (let k = 0; k < largerInput.fieldRow.length; k++) {
                                const field = largerInput.fieldRow[k];
                                field.dispose();
                                largerInput.fieldRow.splice(k, 1);
                            }

                            largerInput.appendField(this.getRemoveInputIcon(newIndex, false));
                        }

                        i++;
                        j++;

                        largerInput = this.getInput(inputName + (index + i));
                    }
                });

                this.elseIfCount--;
            }
        };

        const fieldImage = new Blockly.FieldImage(minusIconDark, 24, 24, '-', onRemoveClick);
        return fieldImage;
    },
};

Blockly.JavaScript.controls_if = block => {
    // If/elseif/else condition.
    let n = 0;
    let code = '';

    do {
        const condition = Blockly.JavaScript.valueToCode(block, `IF${n}`, Blockly.JavaScript.ORDER_NONE) || 'false';

        // i.e. (else)? if { // code }
        const keyword = n > 0 ? 'else if' : 'if';
        code += `
        ${keyword} (${condition}) {
            ${Blockly.JavaScript.statementToCode(block, `DO${n}`)}
        }`;
        n++;
    } while (block.getInput(`IF${n}`));

    if (block.getInput('ELSE')) {
        code += `
        else {
            ${Blockly.JavaScript.statementToCode(block, 'ELSE')}
        }`;
    }

    return `${code}\n`;
};
