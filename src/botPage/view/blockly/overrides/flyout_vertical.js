/**
 * Move the flyout to the edge of the workspace.
 */
Blockly.VerticalFlyout.prototype.position = function() {
    if (!this.isVisible()) {
        return;
    }
    const targetWorkspaceMetrics = this.targetWorkspace_.getMetrics();
    if (!targetWorkspaceMetrics) {
        // Hidden components will return null.
        return;
    }
    // Record the height for Blockly.Flyout.getMetrics_
    // binary-bot: -20 so it's unattached to bottom.
    this.height_ = targetWorkspaceMetrics.viewHeight - 20;

    const edgeWidth = this.width_ - this.CORNER_RADIUS;
    // binary-bot: use this.height_ instead of targetWorkspaceMetrics.veiwHeight
    const edgeHeight = this.height_ - 2 * this.CORNER_RADIUS;
    this.setBackgroundPath_(edgeWidth, edgeHeight);

    // Y is always 0 since this is a vertical flyout.
    // binary-bot: We want some spacing between top and toolbox.
    const y = 10;
    // If this flyout is the toolbox flyout.
    if (this.targetWorkspace_.toolboxPosition == this.toolboxPosition_) {
        // If there is a category toolbox.
        if (targetWorkspaceMetrics.toolboxWidth) {
            if (this.toolboxPosition_ == Blockly.TOOLBOX_AT_LEFT) {
                var x = targetWorkspaceMetrics.toolboxWidth - 100; // binary-bot: Dirty spacing, but it works. TODO, calc properly.
            } else {
                var x = targetWorkspaceMetrics.viewWidth - this.width_;
            }
        } else if (this.toolboxPosition_ == Blockly.TOOLBOX_AT_LEFT) {
            var x = 0;
        } else {
            var x = targetWorkspaceMetrics.viewWidth;
        }
    } else if (this.toolboxPosition_ == Blockly.TOOLBOX_AT_LEFT) {
        var x = 0;
    } else {
        // Because the anchor point of the flyout is on the left, but we want
        // to align the right edge of the flyout with the right edge of the
        // blocklyDiv, we calculate the full width of the div minus the width
        // of the flyout.
        var x = targetWorkspaceMetrics.viewWidth + targetWorkspaceMetrics.absoluteLeft - this.width_;
    }
    this.positionAt_(this.width_, this.height_, x, y);
};

/**
 * Compute width of flyout.  Position mat under each block.
 * For RTL: Lay out the blocks and buttons to be right-aligned.
 * binary-bot: Imported from Blockly to allow for dynamic width flyout.
 * @private
 */
Blockly.VerticalFlyout.prototype.reflowInternal_ = function() {
    this.workspace_.scale = this.targetWorkspace_.scale;
    let flyoutWidth = 0;
    const blocks = this.workspace_.getTopBlocks(false);
    for (var i = 0, block; (block = blocks[i]); i++) {
        let width = block.getHeightWidth().width;
        if (block.outputConnection) {
            width -= 8; // binary-bot: 8 is the original Blockly.BlockSvg.TAB_WIDTH
        }
        flyoutWidth = Math.max(flyoutWidth, width);
    }
    for (var i = 0, button; (button = this.buttons_[i]); i++) {
        flyoutWidth = Math.max(flyoutWidth, button.width);
    }
    flyoutWidth += this.MARGIN * 1.5 + 8; // binary-bot: 8 is the original Blockly.BlockSvg.TAB_WIDTH
    flyoutWidth *= this.workspace_.scale;
    flyoutWidth += Blockly.Scrollbar.scrollbarThickness;

    if (this.width_ != flyoutWidth) {
        for (var i = 0, block; (block = blocks[i]); i++) {
            if (this.RTL) {
                // With the flyoutWidth known, right-align the blocks.
                const oldX = block.getRelativeToSurfaceXY().x;
                const newX = flyoutWidth / this.workspace_.scale - this.MARGIN - Blockly.BlockSvg.TAB_WIDTH;
                block.moveBy(newX - oldX, 0);
            }
            // if (block.flyoutRect_) {
            //     this.moveRectToBlock_(block.flyoutRect_, block);
            // }
        }
        if (this.RTL) {
            // With the flyoutWidth known, right-align the buttons.
            for (var i = 0, button; (button = this.buttons_[i]); i++) {
                const y = button.getPosition().y;
                const x = flyoutWidth / this.workspace_.scale - button.width - this.MARGIN - Blockly.BlockSvg.TAB_WIDTH;
                button.moveTo(x, y);
            }
        }
        // Record the width for .getMetrics_ and .position.
        this.width_ = flyoutWidth;
        this.position();
    }
};
