/* eslint-disable func-names */
/**
 * Find all user-created variables that are in use in the workspace.
 * For use by generators.
 * To get a list of all variables on a workspace, including unused variables,
 * call Workspace.getAllVariables.
 * binary-bot: Required for JS generator to work.
 * @param {!Blockly.Workspace} ws The workspace to search for variables.
 * @return {!Array.<!Blockly.VariableModel>} Array of variable models.
 */
Blockly.Variables.allUsedVarModels = function(ws) {
    const blocks = ws.getAllBlocks(false);
    const variableHash = Object.create(null);

    // Iterate through every block and add each variable to the hash.
    blocks.forEach(block => {
        const blockVariables = block.getVarModels();
        if (blockVariables) {
            blockVariables.forEach(blockVariable => {
                const id = blockVariable.getId();
                if (id) {
                    variableHash[id] = blockVariable;
                }
            });
        }
    });

    // Flatten the hash into a list.
    const variableList = [];
    Object.keys(variableHash).forEach(id => {
        variableList.push(variableHash[id]);
    });

    return variableList;
};
