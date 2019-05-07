/* eslint-disable func-names, no-underscore-dangle */
/**
 * Render the icon.
 * @param {number} cursorX Horizontal offset at which to position the icon.
 * @return {number} Horizontal offset for next item to draw.
 */
Blockly.Icon.prototype.renderIcon = function(cursorX) {
    if (this.collapseHidden && this.block_.isCollapsed()) {
        this.iconGroup_.setAttribute('display', 'none');
        return cursorX;
    }

    this.iconGroup_.setAttribute('display', 'block');

    let newCursorX = cursorX;

    const TOP_MARGIN = 9;
    const width = this.SIZE;

    if (this.block_.RTL) {
        newCursorX -= width;
    }

    this.iconGroup_.setAttribute('transform', `translate(${newCursorX},${TOP_MARGIN})`);
    this.computeIconLocation();

    if (this.block_.RTL) {
        newCursorX -= Blockly.BlockSvg.SEP_SPACE_X;
    } else {
        newCursorX += width + Blockly.BlockSvg.SEP_SPACE_X;
    }

    return newCursorX;
};
