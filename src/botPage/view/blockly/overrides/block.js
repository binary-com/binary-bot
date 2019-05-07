/* eslint-disable func-names */

Blockly.Block.prototype.getSiblings = function() {
    const siblings = [this];
    ['getPreviousBlock', 'getNextBlock'].forEach(functionName => {
        let block = this[functionName]();
        while (block !== null) {
            const parent = this.getParent();
            if (parent && parent.id === block.id) {
                break;
            }

            siblings.push(block);
            block = block[functionName]();
        }
    });
    return siblings;
};

Blockly.Block.prototype.getChildByType = function(type) {
    return this.getDescendants().find(child => child.type === type);
};

Blockly.Block.prototype.getChildFieldValue = function(childType, childField) {
    const childBlock = this.getChildByType(childType);
    if (childBlock) {
        const value = childBlock.getFieldValue(childField);
        return value;
    }
    return null;
};

Blockly.Block.prototype.childValueToCode = function(childType, childField) {
    const childBlock = this.getChildByType(childType);
    return childBlock && Blockly.JavaScript.valueToCode(childBlock, childField, Blockly.JavaScript.ORDER_ATOMIC);
};

Blockly.Block.prototype.getBlocksInStatement = function(statementInputName) {
    const blocksInStatement = [];
    const firstBlock = this.getInputTargetBlock(statementInputName);

    if (firstBlock) {
        return firstBlock.getSiblings();
    }
    return blocksInStatement;
};

Blockly.Block.prototype.getLastConnectionInStatement = function(statementInputName) {
    const firstBlockInStack = this.getInputTargetBlock(statementInputName);
    if (firstBlockInStack) {
        return firstBlockInStack.lastConnectionInStack();
    }
    const statementInput = this.getInput(statementInputName);
    return statementInput.connection;
};

Blockly.Block.prototype.isDescendantOf = function(type) {
    let parentBlock = this.getParent();
    while (parentBlock !== null) {
        if (parentBlock.type === type) {
            return true;
        }
        parentBlock = parentBlock.getParent();
    }
    return false;
};

Blockly.Block.prototype.getTopParent = function() {
    let parent = this.getParent();
    while (parent !== null) {
        const nextParent = parent.getParent();
        if (!nextParent) {
            return parent;
        }
        parent = nextParent;
    }
    return null;
};
