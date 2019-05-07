// eslint-disable-next-line func-names
Blockly.ContextMenu.blockDeleteOption = function(block) {
    // Option to delete this block but not blocks lower in the stack.
    // Count the number of blocks that are nested in this block,
    // ignoring shadows and without ordering.
    let descendantCount = block.getDescendants(false, true).length;
    const nextBlock = block.getNextBlock();
    if (nextBlock) {
        // Blocks in the current stack would survive this block's deletion.
        descendantCount -= nextBlock.getDescendants(false, true).length;
    }
    const deleteOption = {
        text:
            descendantCount === 1
                ? Blockly.Msg.DELETE_BLOCK
                : Blockly.Msg.DELETE_X_BLOCKS.replace('%1', String(descendantCount)),
        enabled: true,
        callback() {
            Blockly.Events.setGroup(true);
            block.dispose(true, true);
            Blockly.Events.setGroup(false);
        },
    };
    return deleteOption;
};
