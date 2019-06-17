import GTM from '../../../common/gtm';
import { translate, translateLangToLang } from '../../../common/i18n';
import { getLanguage } from '../../../common/lang';
import { save } from './utils';

/* eslint-disable */
Blockly.WorkspaceAudio.prototype.preload = function() {};
Blockly.FieldDropdown.prototype.render_ = function() {
    if (!this.visible_) {
        this.size_.width = 0;
        return;
    }
    if (this.sourceBlock_ && this.arrow_) {
        // Update arrow's colour.
        this.arrow_.style.fill = this.sourceBlock_.getColour();
    }
    goog.dom.removeChildren(this.textElement_);
    goog.dom.removeNode(this.imageElement_);
    this.imageElement_ = null;

    if (this.imageJson_) {
        this.renderSelectedImage_();
    } else {
        this.renderSelectedText_();
    }
    this.borderRect_.setAttribute('height', this.size_.height - 8);
    this.borderRect_.setAttribute('width', this.size_.width + Blockly.BlockSvg.SEP_SPACE_X);
};
Blockly.FieldDropdown.prototype.renderSelectedText_ = function() {
    // Text option is selected.
    // Replace the text.
    const textNode = document.createTextNode(this.getDisplayText_());
    this.textElement_.appendChild(textNode);
    // Insert dropdown arrow.
    if (this.sourceBlock_.RTL) {
        this.textElement_.insertBefore(this.arrow_, this.textElement_.firstChild);
    } else {
        this.textElement_.appendChild(this.arrow_);
    }
    this.textElement_.setAttribute('text-anchor', 'start');
    this.textElement_.setAttribute('x', 0);

    this.size_.height = 30;
    this.size_.width = Blockly.Field.getCachedWidth(this.textElement_);
};

Blockly.BlockSvg.SEP_SPACE_X = 20;
Blockly.Field.prototype.init = function() {
    if (this.fieldGroup_) {
        // Field has already been initialized once.
        return;
    }
    // Build the DOM.
    this.fieldGroup_ = Blockly.utils.createSvgElement('g', {}, null);
    if (!this.visible_) {
        this.fieldGroup_.style.display = 'none';
    }
    this.borderRect_ = Blockly.utils.createSvgElement(
        'rect',
        {
            rx: 4,
            ry: 4,
            x: -Blockly.BlockSvg.SEP_SPACE_X / 2,
            y: 0,
            height: 16,
        },
        this.fieldGroup_
    );
    this.textElement_ = Blockly.utils.createSvgElement(
        'text',
        { class: 'blocklyText', y: this.size_.height - 10 },
        this.fieldGroup_
    );

    this.updateEditable();
    this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
    this.mouseDownWrapper_ = Blockly.bindEventWithChecks_(this.fieldGroup_, 'mousedown', this, this.onMouseDown_);
    // Force a render.
    this.render_();
};
Blockly.FieldLabel.prototype.init = function() {
    if (this.textElement_) {
        // Text has already been initialized once.
        return;
    }
    // Build the DOM.
    this.textElement_ = Blockly.utils.createSvgElement(
        'text',
        { class: 'blocklyText', y: this.size_.height - 2 },
        null
    );
    if (this.class_) {
        Blockly.utils.addClass(this.textElement_, this.class_);
    }
    if (!this.visible_) {
        this.textElement_.style.display = 'none';
    }
    this.sourceBlock_.getSvgRoot().appendChild(this.textElement_);

    // Configure the field to be transparent with respect to tooltips.
    this.textElement_.tooltip = this.sourceBlock_;
    Blockly.Tooltip.bindMouseEvents(this.textElement_);
    // Force a render.
    this.render_();
};
Blockly.BlockSvg.prototype.renderCompute_ = function(iconWidth) {
    const inputList = this.inputList;
    const inputRows = [];
    inputRows.rightEdge = iconWidth + Blockly.BlockSvg.SEP_SPACE_X * 2;
    if (this.previousConnection || this.nextConnection) {
        inputRows.rightEdge = Math.max(
            inputRows.rightEdge,
            Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.SEP_SPACE_X
        );
    }
    let fieldValueWidth = 0; // Width of longest external value field.
    let fieldStatementWidth = 0; // Width of longest statement field.
    let hasValue = false;
    let hasStatement = false;
    let hasDummy = false;
    let lastType;
    const isInline = this.getInputsInline() && !this.isCollapsed();
    for (var i = 0, input; (input = inputList[i]); i++) {
        if (!input.isVisible()) {
            continue;
        }
        var row;
        if (!isInline || !lastType || lastType == Blockly.NEXT_STATEMENT || input.type == Blockly.NEXT_STATEMENT) {
            // Create new row.
            lastType = input.type;
            row = [];
            if (isInline && input.type != Blockly.NEXT_STATEMENT) {
                row.type = Blockly.BlockSvg.INLINE;
            } else {
                row.type = input.type;
            }
            row.height = 0;
            inputRows.push(row);
        } else {
            row = inputRows[inputRows.length - 1];
        }
        row.push(input);

        // Compute minimum input size.
        input.renderHeight = Blockly.BlockSvg.MIN_BLOCK_Y;
        // The width is currently only needed for inline value inputs.
        if (isInline && input.type == Blockly.INPUT_VALUE) {
            input.renderWidth = Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X * 1.25;
        } else {
            input.renderWidth = 0;
        }
        // Expand input size if there is a connection.
        if (input.connection && input.connection.isConnected()) {
            const linkedBlock = input.connection.targetBlock();
            const bBox = linkedBlock.getHeightWidth();
            input.renderHeight = Math.max(input.renderHeight, bBox.height);
            input.renderWidth = Math.max(input.renderWidth, bBox.width);
        }
        // Blocks have a one pixel shadow that should sometimes overhang.
        if (!isInline && i == inputList.length - 1) {
            // Last value input should overhang.
            input.renderHeight--;
        } else if (
            !isInline &&
            input.type == Blockly.INPUT_VALUE &&
            inputList[i + 1] &&
            inputList[i + 1].type == Blockly.NEXT_STATEMENT
        ) {
            // Value input above statement input should overhang.
            input.renderHeight--;
        }

        row.height = Math.max(row.height, input.renderHeight);
        input.fieldWidth = 0;
        if (inputRows.length == 1) {
            // The first row gets shifted to accommodate any icons.
            input.fieldWidth += this.RTL ? -iconWidth : iconWidth;
        }
        let previousFieldEditable = false;
        for (var j = 0, field; (field = input.fieldRow[j]); j++) {
            if (j != 0) {
                input.fieldWidth += Blockly.BlockSvg.SEP_SPACE_X;
            }
            // Get the dimensions of the field.
            const fieldSize = field.getSize();
            field.renderWidth = fieldSize.width;
            field.renderSep = previousFieldEditable && field.EDITABLE ? Blockly.BlockSvg.SEP_SPACE_X : 0;
            input.fieldWidth += field.renderWidth + field.renderSep;
            row.height = Math.max(row.height, fieldSize.height) + 1;
            previousFieldEditable = field.EDITABLE;
        }

        if (row.type != Blockly.BlockSvg.INLINE) {
            if (row.type == Blockly.NEXT_STATEMENT) {
                hasStatement = true;
                fieldStatementWidth = Math.max(fieldStatementWidth, input.fieldWidth);
            } else {
                if (row.type == Blockly.INPUT_VALUE) {
                    hasValue = true;
                } else if (row.type == Blockly.DUMMY_INPUT) {
                    hasDummy = true;
                }
                fieldValueWidth = Math.max(fieldValueWidth, input.fieldWidth);
            }
        }
    }

    // Make inline rows a bit thicker in order to enclose the values.
    for (var y = 0, row; (row = inputRows[y]); y++) {
        row.thicker = false;
        if (row.type == Blockly.BlockSvg.INLINE) {
            for (var z = 0, input; (input = row[z]); z++) {
                if (input.type == Blockly.INPUT_VALUE) {
                    row.height += 2 * Blockly.BlockSvg.INLINE_PADDING_Y;
                    row.thicker = true;
                    break;
                }
            }
        }
    }

    // Compute the statement edge.
    // This is the width of a block where statements are nested.
    inputRows.statementEdge = 2 * Blockly.BlockSvg.SEP_SPACE_X + fieldStatementWidth;
    // Compute the preferred right edge.  Inline blocks may extend beyond.
    // This is the width of the block where external inputs connect.
    if (hasStatement) {
        inputRows.rightEdge = Math.max(inputRows.rightEdge, inputRows.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH);
    }
    if (hasValue) {
        inputRows.rightEdge = Math.max(
            inputRows.rightEdge,
            fieldValueWidth + Blockly.BlockSvg.SEP_SPACE_X * 2 + Blockly.BlockSvg.TAB_WIDTH
        );
    } else if (hasDummy) {
        inputRows.rightEdge = Math.max(inputRows.rightEdge, fieldValueWidth + Blockly.BlockSvg.SEP_SPACE_X * 2);
    }

    inputRows.hasValue = hasValue;
    inputRows.hasStatement = hasStatement;
    inputRows.hasDummy = hasDummy;
    return inputRows;
};
Blockly.FieldLabel.prototype.init = function() {
    if (this.textElement_) {
        // Text has already been initialized once.
        return;
    }
    // Build the DOM.
    this.textElement_ = Blockly.utils.createSvgElement(
        'text',
        { class: 'blocklyText', y: this.size_.height - 3 },
        null
    );
    if (this.class_) {
        Blockly.utils.addClass(this.textElement_, this.class_);
    }
    if (!this.visible_) {
        this.textElement_.style.display = 'none';
    }
    this.sourceBlock_.getSvgRoot().appendChild(this.textElement_);

    // Configure the field to be transparent with respect to tooltips.
    this.textElement_.tooltip = this.sourceBlock_;
    Blockly.Tooltip.bindMouseEvents(this.textElement_);
    // Force a render.
    this.render_();
};
// Override inline editor blockly
Blockly.FieldTextInput.prototype.showInlineEditor_ = function(quietInput) {
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, this.widgetDispose_());
    var div = Blockly.WidgetDiv.DIV;
    // Create the input.
    var htmlInput = document.createElement('input');
    htmlInput.className = 'blocklyHtmlInput';
    htmlInput.setAttribute('spellcheck', this.spellcheck_);
    htmlInput.setAttribute('data-lpignore', 'true');
    var fontSize = Blockly.FieldTextInput.FONTSIZE * this.workspace_.scale + 'pt';
    div.style.fontSize = fontSize;
    htmlInput.style.fontSize = fontSize;

    Blockly.FieldTextInput.htmlInput_ = htmlInput;
    div.appendChild(htmlInput);

    htmlInput.value = htmlInput.defaultValue = this.text_;
    htmlInput.oldValue_ = null;
    this.validate_();
    this.resizeEditor_();
    if (!quietInput) {
        htmlInput.focus();
        htmlInput.select();
    }

    this.bindEvents_(htmlInput);
};
const originalContextMenuFn = Blockly.ContextMenu.show;
Blockly.ContextMenu.show = (e, menuOptions, rtl) => {
    // Rename 'Clean up blocks'
    menuOptions.some(option => {
        if (option.text === Blockly.Msg.CLEAN_UP) {
            option.text = translate('Rearrange vertically'); // eslint-disable-line no-param-reassign
            return true;
        }
        return false;
    }) &&
        /* Remove delete all blocks, but only when 'Clean up blocks' is available (i.e. workspace)
         * This allows users to still delete root blocks containing blocks
         */
        menuOptions.some((option, i) => {
            if (
                option.text === Blockly.Msg.DELETE_BLOCK ||
                option.text.replace(/[0-9]+/, '%1') === Blockly.Msg.DELETE_X_BLOCKS
            ) {
                menuOptions.splice(i, 1);
                return true;
            }
            return false;
        });
    // Open the Elev.io widget when clicking 'Help'
    // eslint-disable-next-line no-underscore-dangle
    if (window._elev) {
        menuOptions.some(option => {
            if (option.text === Blockly.Msg.HELP) {
                option.callback = () => window._elev.open(); // eslint-disable-line no-param-reassign, no-underscore-dangle
                return true;
            }
            return false;
        });
    }
    originalContextMenuFn(e, menuOptions, rtl);
};
Blockly.Input.prototype.attachShadowBlock = function(value, name, shadowBlockType) {
    const shadowBlock = this.sourceBlock_.workspace.newBlock(shadowBlockType);
    shadowBlock.setShadow(true);
    shadowBlock.setFieldValue(value, name); // Refactor when using shadow block for strings in future
    shadowBlock.outputConnection.connect(this.connection);
    shadowBlock.initSvg();
    shadowBlock.render();
};

/**
 * Expand or collapse the node on mouse click.
 * @param {!goog.events.BrowserEvent} _e The browser event.
 * @override
 */
Blockly.Toolbox.TreeNode.prototype.onClick_ = function(_e) {
    // eslint-disable-next-line no-underscore-dangle
    const blocklyCategoryName = translateLangToLang(_e.target.innerText, getLanguage(), 'en');
    GTM.pushDataLayer({ event: 'Click Block Category', blocklyCategoryName });

    // Expand icon.
    if (this.hasChildren() && this.isUserCollapsible_) {
        this.toggle();
        this.select();
    } else if (this.isSelected()) {
        this.getTree().setSelectedItem(null);
    } else {
        this.select();
    }
    this.updateRow();
};

// https://groups.google.com/forum/#!msg/blockly/eS1V49pI9c8/VEh5UuUcBAAJ
// Custom Variable Block with Download Context Menu
Blockly.defineBlocksWithJsonArray([
    // BEGIN JSON EXTRACT
    // Block for variable getter.
    {
        type: 'variables_get',
        message0: '%1',
        args0: [
            {
                type: 'field_variable',
                name: 'VAR',
                variable: '%{BKY_VARIABLES_DEFAULT_NAME}',
            },
        ],
        colour: '#DEDEDE',
        output: null,
        helpUrl: '%{BKY_VARIABLES_GET_HELPURL}',
        tooltip: '%{BKY_VARIABLES_GET_TOOLTIP}',
        extensions: ['customContextMenu_variableSetterGetter'],
    },
    // Block for variable setter.
    {
        type: 'variables_set',
        message0: '%{BKY_VARIABLES_SET}',
        args0: [
            {
                type: 'field_variable',
                name: 'VAR',
                variable: '%{BKY_VARIABLES_DEFAULT_NAME}',
            },
            {
                type: 'input_value',
                name: 'VALUE',
            },
        ],
        colour: '#DEDEDE',
        previousStatement: null,
        nextStatement: null,
        tooltip: '%{BKY_VARIABLES_SET_TOOLTIP}',
        helpUrl: '%{BKY_VARIABLES_SET_HELPURL}',
        extensions: ['customContextMenu_variableSetterGetter'],
    },
]); // END JSON EXTRACT (Do not delete this comment.)

/**
 * Mixin to add context menu items to create getter/setter blocks for this
 * setter/getter.
 * Used by blocks 'variables_set' and 'variables_get'.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN = {
    /**
     * Add menu option to create getter/setter block for this setter/getter.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function(options) {
        if (!this.isInFlyout) {
            // Getter blocks have the option to create a setter block, and vice versa.
            if (this.type == 'variables_get') {
                var opposite_type = 'variables_set';
                var contextMenuMsg = Blockly.Msg['VARIABLES_GET_CREATE_SET'];
            } else {
                var opposite_type = 'variables_get';
                var contextMenuMsg = Blockly.Msg['VARIABLES_SET_CREATE_GET'];
            }

            var option = { enabled: this.workspace.remainingCapacity() > 0 };
            var name = this.getField('VAR').getText();
            option.text = contextMenuMsg.replace('%1', name);
            var xmlField = document.createElement('field');
            xmlField.setAttribute('name', 'VAR');
            xmlField.appendChild(document.createTextNode(name));
            var xmlBlock = document.createElement('block');
            xmlBlock.setAttribute('type', opposite_type);
            xmlBlock.appendChild(xmlField);
            option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
            options.push(option);

            const downloadOption = {
                text: translate('Download'),
                enabled: true,
                callback: () => {
                    const xml = Blockly.Xml.textToDom(
                        '<xml xmlns="http://www.w3.org/1999/xhtml" collection="false"></xml>'
                    );
                    xml.appendChild(Blockly.Xml.blockToDom(this));
                    save('binary-bot-block', true, xml);
                },
            };
            options.push(downloadOption);
            // Getter blocks have the option to rename or delete that variable.
        } else {
            if (this.type == 'variables_get' || this.type == 'variables_get_reporter') {
                var renameOption = {
                    text: Blockly.Msg.RENAME_VARIABLE,
                    enabled: true,
                    callback: Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY(this),
                };
                var name = this.getField('VAR').getText();
                var deleteOption = {
                    text: Blockly.Msg.DELETE_VARIABLE.replace('%1', name),
                    enabled: true,
                    callback: Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY(this),
                };
                options.unshift(renameOption);
                options.unshift(deleteOption);
            }
        }
    },
};

Blockly.Extensions.registerMixin(
    'customContextMenu_variableSetterGetter',
    Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN
);

// Custom Loop block with download Context Menu
Blockly.defineBlocksWithJsonArray([
    // Block for 'for' loop.
    {
        type: 'controls_for',
        message0: '%{BKY_CONTROLS_FOR_TITLE}',
        args0: [
            {
                type: 'field_variable',
                name: 'VAR',
                variable: null,
            },
            {
                type: 'input_value',
                name: 'FROM',
                check: 'Number',
                align: 'RIGHT',
            },
            {
                type: 'input_value',
                name: 'TO',
                check: 'Number',
                align: 'RIGHT',
            },
            {
                type: 'input_value',
                name: 'BY',
                check: 'Number',
                align: 'RIGHT',
            },
        ],
        message1: '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
        args1: [
            {
                type: 'input_statement',
                name: 'DO',
            },
        ],
        colour: '#DEDEDE',
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: 'loop_blocks',
        helpUrl: '%{BKY_CONTROLS_FOR_HELPURL}',
        extensions: ['customContextMenu_newGetVariableBlock', 'controls_for_customTooltip'],
    },
    // Block for 'for each' loop.
    {
        type: 'controls_forEach',
        message0: '%{BKY_CONTROLS_FOREACH_TITLE}',
        args0: [
            {
                type: 'field_variable',
                name: 'VAR',
                variable: null,
            },
            {
                type: 'input_value',
                name: 'LIST',
                check: 'Array',
            },
        ],
        message1: '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
        args1: [
            {
                type: 'input_statement',
                name: 'DO',
            },
        ],
        colour: '#DEDEDE',
        previousStatement: null,
        nextStatement: null,
        style: 'loop_blocks',
        helpUrl: '%{BKY_CONTROLS_FOREACH_HELPURL}',
        extensions: ['customContextMenu_newGetVariableBlock', 'controls_forEach_customTooltip'],
    },
]);

/**
 * Mixin to add a context menu item to create a 'variables_get' block.
 * Used by blocks 'controls_for' and 'controls_forEach'.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Loops.CUSTOM_CONTEXT_MENU_CREATE_VARIABLES_GET_MIXIN = {
    /**
     * Add context menu option to create getter block for the loop's variable.
     * (customContextMenu support limited to web BlockSvg.)
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function(options) {
        if (this.isInFlyout) {
            return;
        }
        var variable = this.getField('VAR').getVariable();
        var varName = variable.name;
        if (!this.isCollapsed() && varName != null) {
            var option = { enabled: true };
            option.text = Blockly.Msg['VARIABLES_SET_CREATE_GET'].replace('%1', varName);
            var xmlField = Blockly.Variables.generateVariableFieldDom(variable);
            var xmlBlock = document.createElement('block');
            xmlBlock.setAttribute('type', 'variables_get');
            xmlBlock.appendChild(xmlField);
            option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
            options.push(option);
        }
        const downloadOption = {
            text: translate('Download'),
            enabled: true,
            callback: () => {
                const xml = Blockly.Xml.textToDom(
                    '<xml xmlns="http://www.w3.org/1999/xhtml" collection="false"></xml>'
                );
                xml.appendChild(Blockly.Xml.blockToDom(this));
                save('binary-bot-block', true, xml);
            },
        };
        options.push(downloadOption);
    },
};

Blockly.Extensions.registerMixin(
    'customContextMenu_newGetVariableBlock',
    Blockly.Constants.Loops.CUSTOM_CONTEXT_MENU_CREATE_VARIABLES_GET_MIXIN
);

Blockly.Extensions.register(
    'controls_for_customTooltip',
    Blockly.Extensions.buildTooltipWithFieldText('%{BKY_CONTROLS_FOR_TOOLTIP}', 'VAR')
);

Blockly.Extensions.register(
    'controls_forEach_customTooltip',
    Blockly.Extensions.buildTooltipWithFieldText('%{BKY_CONTROLS_FOREACH_TOOLTIP}', 'VAR')
);
