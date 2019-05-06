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
    for (let i = 0; i < blocks.length; i++) {
        const blockVariables = blocks[i].getVarModels();
        if (blockVariables) {
            for (let j = 0; j < blockVariables.length; j++) {
                const variable = blockVariables[j];
                var id = variable.getId();
                if (id) {
                    variableHash[id] = variable;
                }
            }
        }
    }
    // Flatten the hash into a list.
    const variableList = [];
    for (var id in variableHash) {
        variableList.push(variableHash[id]);
    }
    return variableList;
};
