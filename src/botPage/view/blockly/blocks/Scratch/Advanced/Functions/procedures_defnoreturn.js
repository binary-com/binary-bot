import { plusIconLight } from '../../../images';
import { setBlockTextColor } from '../../../../utils';
import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.procedures_defnoreturn = {
    init() {
        this.arguments = [];
        this.argumentVarModels = [];

        this.jsonInit({
            message0: translate('function %1 %2'),
            args0   : [
                {
                    type: 'field_input',
                    name: 'NAME',
                    text: '',
                },
                {
                    type: 'field_label',
                    name: 'PARAMS',
                    text: '',
                },
            ],
            colour         : Blockly.Colours.BinaryProcedures.colour,
            colourSecondary: Blockly.Colours.BinaryProcedures.colourSecondary,
            colourTertiary : Blockly.Colours.BinaryProcedures.colourTertiary,
        });

        // Enforce unique procedure names
        const nameField = this.getField('NAME');
        nameField.setValidator(Blockly.Procedures.rename);

        // Render a ➕-icon for adding parameters
        const fieldImage = new Blockly.FieldImage(plusIconLight, 24, 24, '+', () => this.onAddClick());
        this.appendDummyInput('ADD_ICON').appendField(fieldImage);

        this.setStatements(true);
    },
    /**
     * Sets the block colour and updates this procedure's caller blocks
     * to reflect the same name on a change.
     * @param {!Blockly.Events.Abstract} event Change event.
     * @this Blockly.Block
     */
    onchange(event) {
        setBlockTextColor(this);

        const allowedEvents = [Blockly.Events.BLOCK_DELETE, Blockly.Events.BLOCK_CREATE, Blockly.Events.BLOCK_CHANGE];
        if (!this.workspace || this.workspace.isFlyout || !allowedEvents.includes(event.type)) {
            return;
        }

        if (event.type === Blockly.Events.BLOCK_CHANGE) {
            // Sync names between definition- and execution-block
            if (event.blockId === this.id && event.name === 'NAME') {
                this.getProcedureCallers().forEach(block => {
                    block.setFieldValue(event.newValue, 'NAME');
                });
            }
        }
    },
    /**
     * Prompt the user for parameter name
     * @this Blockly.Block
     */
    onAddClick() {
        // Wrap in setTimeout so block doesn't stick to mouse (Blockly.Events.END_DRAG event isn't blocked).
        setTimeout(() => {
            const promptMessage = translate('Specify a parameter name:');
            Blockly.prompt(promptMessage, '', paramName => {
                if (paramName) {
                    const variable = Blockly.Variables.getOrCreateVariablePackage(this.workspace, null, paramName, '');
                    if (variable) {
                        this.arguments.push(paramName);
                        this.argumentVarModels.push(variable);

                        const paramField = this.getField('PARAMS');
                        paramField.setText(`${translate('with: ')} ${this.arguments.join(', ')}`);

                        this.getProcedureCallers().forEach(block => {
                            block.setProcedureParameters(this.arguments);
                            block.initSvg();
                            block.render(false);
                        });
                    }
                }
            });
        }, 200);
    },
    /**
     * Add or remove the statement block from this function definition.
     * @param {boolean} hasStatements True if a statement block is needed.
     * @this Blockly.Block
     */
    setStatements(hasStatements) {
        if (this.hasStatements === hasStatements) {
            return;
        }

        if (hasStatements) {
            this.appendStatementInput('STACK').appendField('');
            if (this.getInput('RETURN')) {
                this.moveInputBefore('STACK', 'RETURN');
            }
        } else {
            this.removeInput('STACK', true);
        }

        this.hasStatements = hasStatements;
    },
    /**
     * Update the display of parameters for this procedure definition block.
     * @private
     * @this Blockly.Block
     */
    updateParams() {
        let paramString = '';

        if (this.arguments.length) {
            paramString = `${translate('with:')} ${this.arguments.join(', ')}`;
        }

        // The params field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
            this.setFieldValue(paramString, 'PARAMS');
        } finally {
            Blockly.Events.enable();
        }
    },
    /**
     * Create XML to represent the argument inputs.
     * @param {boolean=} optParamIds If true include the IDs of the parameter
     *     quarks.  Used by Blockly.Procedures.mutateCallers for reconnection.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom(optParamIds) {
        const container = document.createElement('mutation');

        if (optParamIds) {
            container.setAttribute('name', this.getFieldValue('NAME'));
        }

        this.argumentVarModels.forEach((arg, i) => {
            const parameter = document.createElement('arg');

            parameter.setAttribute('name', arg.name);
            parameter.setAttribute('varid', arg.getId());

            if (optParamIds && this.paramIds) {
                parameter.setAttribute('paramId', this.paramIds[i]);
            }
            container.appendChild(parameter);
        });

        // Save whether the statement input is visible.
        if (!this.hasStatements) {
            container.setAttribute('statements', 'false');
        }

        return container;
    },
    /**
     * Parse XML to restore the argument inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation(xmlElement) {
        this.arguments = [];
        this.argumentVarModels = [];

        xmlElement.childNodes.forEach(childNode => {
            if (childNode.nodeName.toLowerCase() === 'arg') {
                const varName = childNode.getAttribute('name');
                this.arguments.push(varName);

                const varId = childNode.getAttribute('varid') || childNode.getAttribute('varId');
                const variable = Blockly.Variables.getOrCreateVariablePackage(this.workspace, varId, varName, '');

                if (variable !== null) {
                    this.argumentVarModels.push(variable);
                } else {
                    // eslint-disable-next-line no-console
                    console.log(`Failed to create a variable with name ${varName}, ignoring.`);
                }
            }
        });

        this.updateParams();

        // Show or hide the statement input.
        this.setStatements(xmlElement.getAttribute('statements') !== 'false');
    },
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES NOT have a return value.
     * @this Blockly.Block
     */
    getProcedureDef() {
        return [this.getFieldValue('NAME'), this.arguments, false];
    },
    /**
     * Return all procedure callers related to this block.
     * @return {!Array.<Blockly.Block>} List of procedure caller blocks
     * @this Blockly.Block
     */
    getProcedureCallers() {
        return this.workspace
            .getAllBlocks(false)
            .filter(block => block.type === this.callType && block.data === this.id);
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars() {
        return this.arguments;
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<!Blockly.VariableModel>} List of variable models.
     * @this Blockly.Block
     */
    getVarModels() {
        return this.argumentVarModels;
    },
    /**
     * Add custom menu options to this block's context menu.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu(options) {
        if (this.isInFlyout) {
            return;
        }
        // Add option to create caller.
        const option = { enabled: true };
        const name = this.getFieldValue('NAME');
        option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);

        const xmlMutation = document.createElement('mutation');
        xmlMutation.setAttribute('name', name);

        this.arguments.forEach(argumentName => {
            const xmlArg = document.createElement('arg');
            xmlArg.setAttribute('name', argumentName);
            xmlMutation.appendChild(xmlArg);
        });

        const xmlBlock = document.createElement('block');
        xmlBlock.setAttribute('type', this.callType);
        xmlBlock.appendChild(xmlMutation);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);

        // Add options to create getters for each parameter.
        if (!this.isCollapsed()) {
            this.argumentVarModels.forEach(argumentVarModel => {
                const getOption = { enabled: true };

                getOption.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', argumentVarModel.name);

                const xmlField = Blockly.Variables.generateVariableFieldDom(argumentVarModel);
                const xmlOptionBlock = document.createElement('block');

                xmlOptionBlock.setAttribute('type', 'variables_get');
                xmlOptionBlock.appendChild(xmlField);

                getOption.callback = Blockly.ContextMenu.callbackFactory(this, xmlOptionBlock);
                options.push(getOption);
            });
        }
    },
    callType: 'procedures_callnoreturn',
};

Blockly.JavaScript.procedures_defnoreturn = block => {
    // eslint-disable-next-line no-underscore-dangle
    const functionName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'),
        Blockly.Procedures.NAME_TYPE
    );

    let branch = Blockly.JavaScript.statementToCode(block, 'STACK');

    if (Blockly.JavaScript.STATEMENT_PREFIX) {
        const id = block.id.replace(/\$/g, '$$$$'); // Issue 251.

        branch =
            Blockly.JavaScript.prefixLines(
                Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g, `'${id}'`),
                Blockly.JavaScript.INDENT
            ) + branch;
    }

    if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
        branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g, `'${block.id}'`) + branch;
    }

    let returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN', Blockly.JavaScript.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = `${Blockly.JavaScript.INDENT}return ${returnValue};\n`;
    }

    const args = block.arguments.map(
        argumentName => Blockly.JavaScript.variableDB_.getName(argumentName, Blockly.Variables.NAME_TYPE) // eslint-disable-line no-underscore-dangle
    );

    // eslint-disable-next-line no-underscore-dangle
    const code = Blockly.JavaScript.scrub_(
        block,
        `
    function ${functionName}(${args.join(', ')}) {
        ${branch}
        ${returnValue}
    }\n`
    );

    // Add % so as not to collide with helper functions in definitions list.
    // eslint-disable-next-line no-underscore-dangle
    Blockly.JavaScript.definitions_[`%${functionName}`] = code;
    return null;
};
