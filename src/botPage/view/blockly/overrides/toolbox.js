/* eslint-disable func-names, no-underscore-dangle */
// /**
//  * Fill the toolbox with categories and blocks.
//  * @param {!Node} newTree DOM tree of blocks.
//  * @private
//  */
Blockly.Toolbox.prototype.populate_ = function(newTree) {
    this.categoryMenu_.populate(newTree);
};

/**
 * Show blocks for specific category in flyout
 * This is different from Scratch as they show everything in one single flyout.
 * @private
 */
Blockly.Toolbox.prototype.showCategory_ = function(categoryName) {
    let allContents = [];

    const category = this.categoryMenu_.categories_.find(menuCategory => menuCategory.name_ === categoryName);
    if (!category) {
        return;
    }

    allContents = allContents.concat(category.getContents());

    // TEMP: For testing only, generate labels for each block for QA
    let newAllContents = [];
    if (Array.isArray(allContents) && allContents.length > 1) {
        allContents.forEach(node => {
            if (node.nodeName === 'block') {
                const type = node.getAttribute('type');
                const labelString = `<xml><label text="[type: ${type}]" web-class="description"></label></xml>`;

                const labelXml = Blockly.Xml.textToDom(labelString);
                newAllContents.push(...[labelXml.firstChild, node]);
            }
        });
    } else {
        newAllContents = allContents;
    }

    this.flyout_.autoClose = true;
    this.flyout_.show(newAllContents);
};

/**
 * Opens the selected category
 * binary-bot: unlike in Scratch, we want to have category-specific flyouts + removed opt_shouldScroll
 * @param {Blockly.Toolbox.Category} item The category to select.
 */
Blockly.Toolbox.prototype.setSelectedItem = function(item) {
    if (this.selectedItem_) {
        // They selected a different category but one was already open.  Close it.
        this.selectedItem_.setSelected(false);
    }
    this.selectedItem_ = item;
    if (this.selectedItem_ != null) {
        this.selectedItem_.setSelected(true);
        // Scroll flyout to the top of the selected category
        const categoryId = item.id_;
        this.showCategory_(categoryId);
    } else {
        this.flyout_.hide();
    }
};

/**
 * Update the flyout's contents without closing it.  Should be used in response
 * to a change in one of the dynamic categories, such as variables or
 * procedures.
 * binary-bot: We don't want to showAll_() cause it'll populate the entire
 * flyout with all available blocks. This method is called by refreshToolboxSelection_()
 * which does the actual refreshing.
 */
Blockly.Toolbox.prototype.refreshSelection = function() {
    // this.showAll_();
};

/**
 * Move the toolbox to the edge.
 */
Blockly.Toolbox.prototype.position = function() {
    const treeDiv = this.HtmlDiv;
    if (!treeDiv) {
        // Not initialized yet.
        return;
    }
    const svg = this.workspace_.getParentSvg();
    const svgSize = Blockly.svgSize(svg);
    if (this.horizontalLayout_) {
        treeDiv.style.left = '0';
        treeDiv.style.height = 'auto';
        treeDiv.style.width = `${svgSize.width}px`;
        this.height = treeDiv.offsetHeight;
        if (this.toolboxPosition === Blockly.TOOLBOX_AT_TOP) {
            // Top
            treeDiv.style.top = '0';
        } else {
            // Bottom
            treeDiv.style.bottom = '0';
        }
    } else {
        if (this.toolboxPosition === Blockly.TOOLBOX_AT_RIGHT) {
            // Right
            treeDiv.style.right = '0';
        } else {
            // Left
            treeDiv.style.left = '0';
        }
        treeDiv.style.height = '100%';
    }
    this.flyout_.position();
};
