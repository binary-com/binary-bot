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
