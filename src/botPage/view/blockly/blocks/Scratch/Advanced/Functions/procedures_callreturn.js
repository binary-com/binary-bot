Blockly.Blocks.procedures_callreturn = {
    init() {
        this.arguments_ = [];
        this.previousDisabledState_ = false;

        this.jsonInit({
            message0: '%1 %2',
            args0   : [
                {
                    type: 'field_label',
                    name: 'NAME',
                    text: this.id,
                },
                {
                    type: 'input_dummy',
                    name: 'TOPROW',
                },
            ],
            output         : null,
            colour         : Blockly.Colours.BinaryProcedures.colour,
            colourSecondary: Blockly.Colours.BinaryProcedures.colourSecondary,
            colourTertiary : Blockly.Colours.BinaryProcedures.colourTertiary,
        });
    },
    onchange               : Blockly.Blocks.procedures_callnoreturn.onchange,
    getProcedureDefinition : Blockly.Blocks.procedures_callnoreturn.getProcedureDefinition,
    getProcedureCall       : Blockly.Blocks.procedures_callnoreturn.getProcedureCall,
    renameProcedure        : Blockly.Blocks.procedures_callnoreturn.renameProcedure,
    setProcedureParameters_: Blockly.Blocks.procedures_callnoreturn.setProcedureParameters_,
    updateShape_           : Blockly.Blocks.procedures_callnoreturn.updateShape_,
    mutationToDom          : Blockly.Blocks.procedures_callnoreturn.mutationToDom,
    domToMutation          : Blockly.Blocks.procedures_callnoreturn.domToMutation,
    getVarModels           : Blockly.Blocks.procedures_callnoreturn.getVarModels,
    customContextMenu      : Blockly.Blocks.procedures_callnoreturn.customContextMenu,
    defType_               : 'procedures_defreturn',
};

Blockly.JavaScript.procedures_callreturn = Blockly.JavaScript.procedures_callnoreturn;
