/* eslint-disable func-names, no-underscore-dangle */
import { translate } from '../../../../common/i18n';

/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace containing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.DataCategory = function(workspace) {
    const variableModelList = workspace.getVariablesOfType('');
    const xmlList = [];

    // `Create Variable`-button
    Blockly.DataCategory.addCreateButton(xmlList, workspace);

    if (variableModelList.length > 0) {
        const generateVariableFieldXmlString = variableModel => {
            // The variable name may be user input, so it may contain characters that
            // need to be escaped to create valid XML.
            const escapedText = `<field name="VAR" id="${variableModel.getId()}" variabletype="${goog.string.htmlEscape(
                variableModel.type
            )}">${goog.string.htmlEscape(variableModel.name)}</field>`;
            return escapedText;
        };

        // TEMP: Label for testing only
        const operationsLabel = document.createElement('label');
        operationsLabel.setAttribute('text', translate('variables_set'));
        xmlList.push(operationsLabel);

        const firstVariable = variableModelList[0];

        // Create 'Set `var` to'-block
        if (Blockly.Blocks.variables_set) {
            const gap = Blockly.Blocks.math_change ? 8 : 24;
            const setBlockText = `<xml><block type="variables_set" gap="${gap}">${generateVariableFieldXmlString(
                firstVariable
            )}</block></xml>`;
            const setBlock = Blockly.Xml.textToDom(setBlockText).firstChild;
            xmlList.push(setBlock);
        }

        // TEMP: Label for testing only
        const changeLabel = document.createElement('label');
        changeLabel.setAttribute('text', translate('math_change'));
        xmlList.push(changeLabel);

        // Create 'Change `var` by `1`'-block
        if (Blockly.Blocks.math_change) {
            const gap = Blockly.Blocks.variables_get ? 20 : 8;
            const changeBlockText = `<xml><block type="math_change" gap="${gap}">${generateVariableFieldXmlString(
                firstVariable
            )}<value name="DELTA"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block></xml>`;
            const changeBlock = Blockly.Xml.textToDom(changeBlockText).firstChild;
            xmlList.push(changeBlock);
        }

        // TEMP: Label for testing only
        const variablesLabel = document.createElement('label');
        variablesLabel.setAttribute('text', translate('variable_get'));
        xmlList.push(variablesLabel);

        // Create `variable_get` block for each variable
        if (Blockly.Blocks.variables_get) {
            variableModelList.sort(Blockly.VariableModel.compareByName);

            variableModelList.forEach(variable => {
                const getBlockText = `<xml><block type="variables_get">${generateVariableFieldXmlString(
                    variable
                )}</block></xml>`;
                const getBlock = Blockly.Xml.textToDom(getBlockText).firstChild;
                xmlList.push(getBlock);
            });
        }
    }

    return xmlList;
};

/**
 * Construct a create variable button and push it to the xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {Blockly.Workspace} workspace Workspace to register callback to.
 * binary-bot: We only use a single type of variable, so `type` arg was removed.
 */
Blockly.DataCategory.addCreateButton = function(xmlList, workspace) {
    const buttonXml = goog.dom.createDom('button');
    // Set default msg, callbackKey, and callback values for type 'VARIABLE'
    const msg = Blockly.Msg.NEW_VARIABLE;
    const callbackKey = 'CREATE_VARIABLE';
    const callback = function(button) {
        const buttonWorkspace = button.getTargetWorkspace();
        Blockly.Variables.createVariable(buttonWorkspace, null, '');
        buttonWorkspace.toolbox_.showCategory_('Variables');
    };

    buttonXml.setAttribute('text', msg);
    buttonXml.setAttribute('callbackKey', callbackKey);
    workspace.registerButtonCallback(callbackKey, callback);
    xmlList.push(buttonXml);
};
