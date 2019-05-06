/**
 * Margin around the edges of the blocks in the flyout.
 * @type {number}
 * @const
 */
Blockly.Flyout.prototype.MARGIN = 24;

/**
 * Update the view based on coordinates calculated in position().
 * @param {number} width The computed width of the flyout's SVG group
 * @param {number} height The computed height of the flyout's SVG group.
 * @param {number} x The computed x origin of the flyout's SVG group.
 * @param {number} y The computed y origin of the flyout's SVG group.
 * @protected
 * binary-bot: Imported from Blockly, used in flyout_vertical.js
 */
Blockly.Flyout.prototype.positionAt_ = function(width, height, x, y) {
    this.svgGroup_.setAttribute('width', width);
    this.svgGroup_.setAttribute('height', height);
    if (this.svgGroup_.tagName == 'svg') {
        var transform = `translate(${x}px,${y}px)`;
        Blockly.utils.setCssTransform(this.svgGroup_, transform);
    } else {
        // IE and Edge don't support CSS transforms on SVG elements so
        // it's important to set the transform on the SVG element itself
        var transform = `translate(${x},${y})`;
        this.svgGroup_.setAttribute('transform', transform);
    }

    // Update the scrollbar (if one exists).
    if (this.scrollbar_) {
        // Set the scrollbars origin to be the top left of the flyout.
        this.scrollbar_.setOrigin(x, y);
        this.scrollbar_.resize();
        // Set the position again so that if the metrics were the same (and the
        // resize failed) our position is still updated.
        this.scrollbar_.setPosition_(this.scrollbar_.position_.x, this.scrollbar_.position_.y);
    }
};

/**
 * Get the width of the flyout.
 * @return {number} The width of the flyout.
 * binary-bot: Return actual width rather than this.DEFAULT_WIDTH.
 */
Blockly.Flyout.prototype.getWidth = function() {
    return this.width_;
};
