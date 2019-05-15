/**
 * Whether this gesture is a click on a field.  This should only be called when
 * ending a gesture (mouse up, touch end).
 * binary-bot: Don't allow block interaction while in flyout.
 * @return {boolean} Whether this gesture was a click on a field.
 * @private
 */
Blockly.Gesture.prototype.isFieldClick_ = function() {
    const fieldEditable = this.startField_ ? this.startField_.isCurrentlyEditable() : false;
    return fieldEditable && !this.hasExceededDragRadius_ && (!this.flyout_ || !this.flyout_.autoClose);
};
