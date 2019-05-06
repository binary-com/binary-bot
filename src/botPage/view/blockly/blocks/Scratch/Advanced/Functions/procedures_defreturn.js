import { translate } from '../../../../../../../common/utils/tools';
import { plusIconDark } from '../../../images';

Blockly.Blocks.procedures_defreturn = {
    init() {
        this.arguments_ = [];
        this.argumentVarModels_ = [];

        this.jsonInit({
            message0: translate('function %1 %2 %3'),
            message1: 'return %1',
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
                {
                    type: 'input_dummy',
                },
            ],
            args1: [
                {
                    type : 'input_value',
                    name : 'RETURN',
                    check: null,
                    align: Blockly.ALIGN_RIGHT,
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
        const fieldImage = new Blockly.FieldImage(plusIconDark, 24, 24, '+', () => this.onAddClick_());
        this.appendDummyInput('ADD_ICON').appendField(fieldImage);
        this.moveInputBefore('ADD_ICON', 'RETURN');

        this.setStatements_(true);
        this.registerWorkspaceListener();
    },
    onAddClick_   : Blockly.Blocks.procedures_defnoreturn.onAddClick_,
    onchange      : Blockly.Blocks.procedures_defnoreturn.onchange,
    setStatements_: Blockly.Blocks.procedures_defnoreturn.setStatements_,
    updateParams_ : Blockly.Blocks.procedures_defnoreturn.updateParams_,
    mutationToDom : Blockly.Blocks.procedures_defnoreturn.mutationToDom,
    domToMutation : Blockly.Blocks.procedures_defnoreturn.domToMutation,
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES have a return value.
     * @this Blockly.Block
     */
    getProcedureDef() {
        return [this.getFieldValue('NAME'), this.arguments_, true];
    },
    getProcedureCallers      : Blockly.Blocks.procedures_defnoreturn.getProcedureCallers,
    getVars                  : Blockly.Blocks.procedures_defnoreturn.getVars,
    getVarModels             : Blockly.Blocks.procedures_defnoreturn.getVarModels,
    renameVarById            : Blockly.Blocks.procedures_defnoreturn.renameVarById,
    updateVarName            : Blockly.Blocks.procedures_defnoreturn.updateVarName,
    displayRenamedVar_       : Blockly.Blocks.procedures_defnoreturn.displayRenamedVar_,
    customContextMenu        : Blockly.Blocks.procedures_defnoreturn.customContextMenu,
    callType_                : 'procedures_callreturn',
    registerWorkspaceListener: Blockly.Blocks.procedures_defnoreturn.registerWorkspaceListener,
};

Blockly.JavaScript.procedures_defreturn = Blockly.JavaScript.procedures_defnoreturn;
