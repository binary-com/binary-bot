/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2017 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Data Flyout components including variable and list blocks.
 * @author marisaleung@google.com (Marisa Leung)
 */

import { translate } from '../../../../common/i18n';

/**
 * @name Blockly.DataCategory
 * @namespace
 * */
goog.provide('Blockly.DataCategory');

goog.require('Blockly.Blocks');
goog.require('Blockly.VariableModel');
goog.require('Blockly.Variables');
goog.require('Blockly.Workspace');

/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace containing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.DataCategory = function(workspace) {
    const variableModelList = workspace.getVariablesOfType('');
    const xmlList = [];

    // Create Variable
    Blockly.DataCategory.addCreateButton(xmlList, workspace, 'VARIABLE');

    if (variableModelList.length > 0) {
        const generateVariableFieldXmlString = variableModel => {
            // The variable name may be user input, so it may contain characters that
            // need to be escaped to create valid XML.
            const escapedText = `<field name="VAR" id="${variableModel.getId()}" variabletype="${goog.string.htmlEscape(
                variableModel.type
            )}">${goog.string.htmlEscape(variableModel.name)}</field>`;
            return escapedText;
        };

        // TEMP
        const operationsLabel = document.createElement('label');
        operationsLabel.setAttribute('text', translate('variables_set'));
        xmlList.push(operationsLabel);

        const firstVariable = variableModelList[0];

        // Create 'Set `var` to'-block
        if (Blockly.Blocks.variables_set) {
            const gap = Blockly.Blocks.math_change ? 8 : 24;
            const setBlockText =
                `${'<xml>' + `<block type="variables_set" gap="${gap}">`}${generateVariableFieldXmlString(
                    firstVariable
                )}</block>` + '</xml>';
            const setBlock = Blockly.Xml.textToDom(setBlockText).firstChild;
            xmlList.push(setBlock);
        }

        // TEMP
        const changeLabel = document.createElement('label');
        changeLabel.setAttribute('text', translate('math_change'));
        xmlList.push(changeLabel);

        // Create 'Change `var` by `1`'-block
        if (Blockly.Blocks.math_change) {
            const gap = Blockly.Blocks.variables_get ? 20 : 8;
            const changeBlockText =
                `${'<xml>' + `<block type="math_change" gap="${gap}">`}${generateVariableFieldXmlString(
                    firstVariable
                )}<value name="DELTA">` +
                '<shadow type="math_number">' +
                '<field name="NUM">1</field>' +
                '</shadow>' +
                '</value>' +
                '</block>' +
                '</xml>';
            const changeBlock = Blockly.Xml.textToDom(changeBlockText).firstChild;
            xmlList.push(changeBlock);
        }

        const variablesLabel = document.createElement('label');
        variablesLabel.setAttribute('text', translate('variable_get'));
        xmlList.push(variablesLabel);

        // Create variable_get block for each variable
        if (Blockly.Blocks.variables_get) {
            variableModelList.sort(Blockly.VariableModel.compareByName);

            for (var i = 0, variable; (variable = variableModelList[i]); i++) {
                const getBlockText =
                    `${'<xml>' + '<block type="variables_get">'}${generateVariableFieldXmlString(variable)}</block>` +
                    '</xml>';

                const getBlock = Blockly.Xml.textToDom(getBlockText).firstChild;
                xmlList.push(getBlock);
            }
        }
    }

    return xmlList;
};

/**
 * Construct a create variable button and push it to the xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {Blockly.Workspace} workspace Workspace to register callback to.
 * @param {string} type Type of variable this is for. For example, 'LIST' or
 *     'VARIABLE'.
 */
Blockly.DataCategory.addCreateButton = function(xmlList, workspace, type) {
    const button = goog.dom.createDom('button');
    // Set default msg, callbackKey, and callback values for type 'VARIABLE'
    const msg = Blockly.Msg.NEW_VARIABLE;
    const callbackKey = 'CREATE_VARIABLE';
    const callback = function(button) {
        const workspace = button.getTargetWorkspace();
        Blockly.Variables.createVariable(workspace, null, '');
        workspace.toolbox_.showCategory_('Variables');
    };

    button.setAttribute('text', msg);
    button.setAttribute('callbackKey', callbackKey);
    workspace.registerButtonCallback(callbackKey, callback);
    xmlList.push(button);
};
