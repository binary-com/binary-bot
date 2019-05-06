import { plusIconDark, minusIconDark } from '../../images';
import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.controls_if = {
    init() {
        this.elseIfCount_ = 0;
        this.elseCount_ = 0;

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

        const addInputIcon = this.getAddInputIcon_();
        this.appendDummyInput('MUTATOR').appendField(addInputIcon);
    },
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom() {
        if (!this.elseIfCount_ && !this.elseCount_) {
            return null;
        }

        const container = document.createElement('mutation');

        if (this.elseIfCount_) {
            container.setAttribute('elseif', this.elseIfCount_);
        }

        if (this.elseCount_) {
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
        this.elseIfCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
        this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;

        this.updateShape_();
    },
    updateShape_() {
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
        for (let i = 1; i <= this.elseIfCount_; i++) {
            this.appendDummyInput(`IF_LABEL${i}`).appendField(translate('else if'));
            this.appendValueInput(`IF${i}`).setCheck('Boolean');
            this.appendDummyInput(`THEN_LABEL${i}`).appendField(translate('then'));
            this.appendDummyInput(`DELETE_ICON${i}`).appendField(this.getRemoveInputIcon_(i, false));
            this.appendStatementInput(`DO${i}`);
        }

        if (this.elseCount_) {
            this.appendDummyInput('ELSE_LABEL').appendField(translate('else'));
            this.appendDummyInput('DELETE_ELSE').appendField(this.getRemoveInputIcon_(this.elseIfCount_ + 1, true));
            this.appendStatementInput('ELSE');
        }

        this.appendDummyInput('MUTATOR').appendField(this.getAddInputIcon_());

        this.initSvg();
        this.render();
    },
    getAddInputIcon_() {
        const onAddClick = () => {
            if (!this.workspace || this.isInFlyout) {
                return;
            }

            const newInputNum = this.elseIfCount_ + 1;

            if (this.elseCount_ === 0) {
                // No `elseif`, just add an `else`-statement
                this.appendDummyInput('ELSE_LABEL').appendField(translate('else'));
                this.appendDummyInput('DELETE_ELSE').appendField(this.getRemoveInputIcon_(newInputNum, true));
                this.appendStatementInput('ELSE');

                this.elseCount_++;
            } else {
                // We've already got `elseif` + `else`, keep adding more `elseif`'s
                this.appendDummyInput(`IF_LABEL${newInputNum}`).appendField(translate('else if'));
                this.appendValueInput(`IF${newInputNum}`).setCheck('Boolean');
                this.appendDummyInput(`THEN_LABEL${newInputNum}`).appendField(translate('then'));
                this.appendDummyInput(`DELETE_ICON${newInputNum}`).appendField(
                    this.getRemoveInputIcon_(newInputNum, false)
                );
                this.appendStatementInput(`DO${newInputNum}`);

                this.elseIfCount_++;
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
    getRemoveInputIcon_(index, isElseStack) {
        const onRemoveClick = () => {
            if (!this.workspace || this.isInFlyout) {
                return;
            }

            if (isElseStack) {
                this.removeInput('ELSE_LABEL');
                this.removeInput('DELETE_ELSE');
                this.removeInput('ELSE');
                this.elseCount_ = 0;
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
                            largerInput.fieldRow.forEach((field, fieldIndex) => {
                                field.dispose();
                                largerInput.fieldRow.splice(fieldIndex, 1);
                            });

                            largerInput.appendField(this.getRemoveInputIcon_(newIndex, false));
                        }

                        i++;
                        j++;

                        largerInput = this.getInput(inputName + (index + i));
                    }
                });

                this.elseIfCount_--;
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
