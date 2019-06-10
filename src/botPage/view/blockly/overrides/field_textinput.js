/* eslint-disable no-underscore-dangle, func-names */

/**
 * Show the inline free-text editor on top of the text.
 * @param {boolean=} optQuietInput True if editor should be created without
 *     focus.  Defaults to false.
 * @param {boolean=} optReadOnly True if editor should be created with HTML
 *     input set to read-only, to prevent virtual keyboards.
 * @param {boolean=} optWithArrow True to show drop-down arrow in text editor.
 * @param {Function=} optArrowCallback Callback for when drop-down arrow clicked.
 * @private
 */
Blockly.FieldTextInput.prototype.showEditor_ = function(optQuietInput, optReadOnly, optWithArrow, optArrowCallback) {
    this.workspace_ = this.sourceBlock_.workspace;

    const quietInput = optQuietInput || false;
    const readOnly = optReadOnly || false;

    Blockly.WidgetDiv.show(
        this,
        this.sourceBlock_.RTL,
        this.widgetDispose_(),
        this.widgetDisposeAnimationFinished_(),
        Blockly.FieldTextInput.ANIMATION_TIME
    );

    const div = Blockly.WidgetDiv.DIV;

    // Apply text-input-specific fixed CSS
    div.className += ' fieldTextInput';

    // Create the input.
    const htmlInput = goog.dom.createDom(goog.dom.TagName.INPUT, 'blocklyHtmlInput');
    htmlInput.setAttribute('spellcheck', this.spellcheck_);
    htmlInput.setAttribute('data-lpignore', 'true');

    if (readOnly) {
        htmlInput.setAttribute('readonly', 'true');
    }

    /** @type {!HTMLInputElement} */
    Blockly.FieldTextInput.htmlInput_ = htmlInput;

    div.appendChild(htmlInput);

    if (optWithArrow) {
        // Move text in input to account for displayed drop-down arrow.
        if (this.sourceBlock_.RTL) {
            htmlInput.style.paddingLeft = `${this.arrowSize_ + Blockly.BlockSvg.DROPDOWN_ARROW_PADDING}px`;
        } else {
            htmlInput.style.paddingRight = `${this.arrowSize_ + Blockly.BlockSvg.DROPDOWN_ARROW_PADDING}px`;
        }
        // Create the arrow.
        const dropDownArrow = goog.dom.createDom(goog.dom.TagName.IMG, 'blocklyTextDropDownArrow');
        dropDownArrow.setAttribute('src', `${Blockly.mainWorkspace.options.pathToMedia}dropdown-arrow-dark.svg`);
        dropDownArrow.style.width = `${this.arrowSize_}px`;
        dropDownArrow.style.height = `${this.arrowSize_}px`;
        dropDownArrow.style.top = `${this.arrowY_}px`;
        dropDownArrow.style.cursor = 'pointer';

        // Magic number for positioning the drop-down arrow on top of the text editor.
        const dropdownArrowMagic = '11px';

        if (this.sourceBlock_.RTL) {
            dropDownArrow.style.left = dropdownArrowMagic;
        } else {
            dropDownArrow.style.right = dropdownArrowMagic;
        }

        if (optArrowCallback) {
            htmlInput.dropDownArrowMouseWrapper_ = Blockly.bindEvent_(
                dropDownArrow,
                'mousedown',
                this,
                optArrowCallback
            );
        }

        div.appendChild(dropDownArrow);
    }

    htmlInput.value = htmlInput.defaultValue = this.text_; // eslint-disable-line no-multi-assign
    htmlInput.oldValue_ = null;

    this.validate_();
    this.resizeEditor_();

    if (!quietInput) {
        htmlInput.focus();
        htmlInput.select();
        // For iOS only
        htmlInput.setSelectionRange(0, 99999);
    }

    this.bindEvents_(htmlInput);

    // Add animation transition properties
    const transitionProperties = `box-shadow ${Blockly.FieldTextInput.ANIMATION_TIME}s`;

    if (Blockly.BlockSvg.FIELD_TEXTINPUT_ANIMATE_POSITIONING) {
        div.style.transition +=
            `,padding ${Blockly.FieldTextInput.ANIMATION_TIME}s,` +
            `width ${Blockly.FieldTextInput.ANIMATION_TIME}s,` +
            `height ${Blockly.FieldTextInput.ANIMATION_TIME}s,` +
            `margin-left ${Blockly.FieldTextInput.ANIMATION_TIME}s`;
    }

    div.style.transition = transitionProperties;
    htmlInput.style.transition = `font-size ${Blockly.FieldTextInput.ANIMATION_TIME}s`;

    // The animated properties themselves
    htmlInput.style.fontSize = `${Blockly.BlockSvg.FIELD_TEXTINPUT_FONTSIZE_FINAL}pt`;

    div.style.boxShadow = `0px 0px 0px 4px ${Blockly.Colours.fieldShadow}`;
};
