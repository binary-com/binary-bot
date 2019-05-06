import { translate } from '../../../../common/i18n';

/**
 * Construct the blocks required by the flyout for the procedure category.
 * @param {!Blockly.Workspace} workspace The workspace containing procedures.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.Procedures.flyoutCategory = function(workspace) {
    const xmlList = [];

    if (Blockly.Blocks.procedures_defnoreturn) {
        const label = document.createElement('label');
        label.setAttribute('text', translate('procedures_defnoreturn'));
        xmlList.push(label);

        // <block type="procedures_defnoreturn" gap="16">
        //     <field name="NAME">do something</field>
        // </block>
        var block = document.createElement('block');
        block.setAttribute('type', 'procedures_defnoreturn');
        block.setAttribute('gap', 16);

        // TEMP
        var nameField = document.createElement('field');
        nameField.setAttribute('name', 'NAME');
        nameField.appendChild(document.createTextNode(translate('do something')));

        block.appendChild(nameField);
        xmlList.push(block);
    }

    if (Blockly.Blocks.procedures_defreturn) {
        const label = document.createElement('label');
        label.setAttribute('text', translate('procedures_defreturn')); // TEMP
        label.setAttribute('web-class', 'test');
        xmlList.push(label);

        // <block type="procedures_defreturn" gap="16">
        //     <field name="NAME">do something</field>
        // </block>
        var block = document.createElement('block');
        block.setAttribute('type', 'procedures_defreturn');
        block.setAttribute('gap', 16);
        var nameField = document.createElement('field');
        nameField.setAttribute('name', 'NAME');
        nameField.appendChild(document.createTextNode(translate('do something')));
        block.appendChild(nameField);
        xmlList.push(block);
    }

    if (Blockly.Blocks.procedures_ifreturn) {
        const label = document.createElement('label');
        label.setAttribute('text', translate('procedures_ifreturn')); // TEMP
        xmlList.push(label);

        // <block type="procedures_ifreturn" gap="16"></block>
        var block = document.createElement('block');
        block.setAttribute('type', 'procedures_ifreturn');
        block.setAttribute('gap', 16);
        xmlList.push(block);
    }

    if (xmlList.length) {
        // Add slightly larger gap between system blocks and user calls.
        xmlList[xmlList.length - 1].setAttribute('gap', 24);
    }

    function populateProcedures(procedureList, templateName) {
        for (let i = 0; i < procedureList.length; i++) {
            const name = procedureList[i][0];
            const args = procedureList[i][1];
            // <block type="procedures_callnoreturn" gap="16">
            //   <mutation name="do something">
            //     <arg name="x"></arg>
            //   </mutation>
            // </block>
            const block = document.createElement('block');
            block.setAttribute('type', templateName);
            block.setAttribute('gap', 16);

            const mutation = document.createElement('mutation');
            mutation.setAttribute('name', name);
            block.appendChild(mutation);

            for (let j = 0; j < args.length; j++) {
                const arg = document.createElement('arg');
                arg.setAttribute('name', args[j]);
                mutation.appendChild(arg);
            }

            xmlList.push(block);
        }
    }

    const tuple = Blockly.Procedures.allProcedures(workspace);
    populateProcedures(tuple[0], 'procedures_callnoreturn');
    populateProcedures(tuple[1], 'procedures_callreturn');
    return xmlList;
};

/**
 * Find the definition block for the named procedure.
 * @param {string} name Name of procedure.
 * @param {!Blockly.Workspace} workspace The workspace to search.
 * @return {Blockly.Block} The procedure definition block, or null not found.
 */
Blockly.Procedures.getDefinition = function(name, workspace) {
    // Assume that a procedure definition is a top block.
    const blocks = workspace.getTopBlocks(false);
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].getProcedureDef) {
            const tuple = blocks[i].getProcedureDef();
            if (tuple && Blockly.Names.equals(tuple[0], name)) {
                return blocks[i];
            }
        }
    }
    return null;
};

// Scratch has a broken version where they return `false` if Blockly.Names.equals(procName[0], name).
// https://github.com/LLK/scratch-blocks/pull/1930
Blockly.Procedures.isNameUsed = function(name, workspace, opt_exclude) {
    const blocks = workspace.getAllBlocks(false);
    // Iterate through every block and check the name.
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] == opt_exclude) {
            continue;
        }
        if (blocks[i].getProcedureDef) {
            const procName = blocks[i].getProcedureDef();
            if (Blockly.Names.equals(procName[0], name)) {
                return true;
            }
        }
    }
    return false;
};
