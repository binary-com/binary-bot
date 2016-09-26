/* eslint-disable no-underscore-dangle */
import { observer } from 'binary-common-utils/lib/observer';
import { durationAccepted, expandDuration } from 'binary-common-utils/lib/tools';
import config from '../../../common/const';
import { bot } from '../../bot';
import { translator } from '../../../common/translator';
import { findTopParentBlock, addPurchaseOptions } from './utils';

const isInteger = (amount) => !isNaN(+amount) && parseInt(amount, 10) === parseFloat(amount);
const isInRange = (amount, min, max) => !isNaN(+amount) && +amount >= min && +amount <= max;
const getNumField = (block, fieldName) => {
  let field = block.getInputTargetBlock(fieldName);
  if (field !== null && field.type === 'math_number') {
    field = field.getFieldValue('NUM')
      .trim();
    return field;
  }
  return '';
};
const insideHolder = (blockObj) => {
  const parent = findTopParentBlock(blockObj);
  if (parent !== null && parent.type === 'block_holder') {
    return true;
  }
  return false;
};
const getListField = (block, fieldName) => block.getFieldValue(fieldName);
const disable = (blockObj) => {
  Blockly.Events.recordUndo = false;
  blockObj.setDisabled(true);
  Blockly.Events.recordUndo = true;
};
const enable = (blockObj) => {
  Blockly.Events.recordUndo = false;
  blockObj.setDisabled(false);
  Blockly.Events.recordUndo = true;
};
export const condition = (blockObj, ev, calledByParent) => {
  if (insideHolder(blockObj)) {
    return;
  }
  if (blockObj.parentBlock_ !== null) {
    if (!bot.symbol.findSymbol(blockObj.parentBlock_.type)) {
      observer.emit('ui.log.warn',
        translator.translateText('Trade Type blocks have to be added to submarket blocks'));
      disable(blockObj);
      return;
    } else if (!bot.symbol.isConditionAllowedInSymbol(blockObj.parentBlock_.type, blockObj.type)) {
      const symbol = bot.symbol.findSymbol(blockObj.parentBlock_.type);
      observer.emit('ui.log.warn',
        `${symbol[Object.keys(symbol)[0]]} ${translator.translateText('does not support category:')}`
        + ` ${bot.symbol.getCategoryNameForCondition(blockObj.type)}`
        + `, ${translator.translateText('Allowed categories are')}`
        + ` ${bot.symbol.getAllowedCategoryNames(blockObj.parentBlock_.type)}`);
      disable(blockObj);
      return;
    }
    observer.emit('tour:condition');
    if (!calledByParent) {
      if ((ev.type === 'change' && ev.element && ev.element === 'field')
        || (ev.type === 'move' && typeof ev.newInputName === 'string')) {
        const duration = getNumField(blockObj, 'DURATION');
        const durationType = getListField(blockObj, 'DURATIONTYPE_LIST');
        if (duration !== '') {
          const minDuration = bot.symbol.getLimitation(blockObj.parentBlock_.type, blockObj.type).minDuration;
          if (!durationAccepted(duration + durationType, minDuration)) {
            observer.emit('ui.log.warn',
              translator.translateText('Minimum duration is') +
              ' ' + expandDuration(minDuration));
          } else {
            observer.emit('tour:ticks');
          }
          if (durationType === 't') {
            if (!isInteger(duration) || !isInRange(duration, 5, 10)) {
              observer.emit('ui.log.warn',
                translator.translateText('Number of ticks must be between 5 and 10'));
            } else {
              observer.emit('tour:ticks');
            }
          } else if (!isInteger(duration) || duration < 1) {
            observer.emit('ui.log.warn',
              translator.translateText('Expiry time cannot be equal to start time'));
          }
        }
        const prediction = getNumField(blockObj, 'PREDICTION');
        if (prediction !== '') {
          if (!isInteger(prediction) || !isInRange(prediction, 0, 9)) {
            observer.emit('ui.log.warn', translator.translateText('Prediction must be one digit'));
          }
        }
        for (const il of blockObj.inputList) {
          if (il.name !== '' && blockObj.getInputTargetBlock(il.name) === null) {
            return;
          }
        }
        observer.emit('tour:options');
      }
    }
  }
  enable(blockObj);
};
export const submarket = (blockObj, ev) => {
  if (insideHolder(blockObj)) {
    return;
  }
  if (blockObj.childBlocks_.length > 0 && config.conditions.indexOf(blockObj.childBlocks_[0].type) < 0) {
    observer.emit('ui.log.warn', translator.translateText('Submarket blocks can only accept trade type blocks'));
    for (const child of Array.prototype.slice.apply(blockObj.childBlocks_)) {
      child.unplug();
    }
  } else if (blockObj.childBlocks_.length > 0) {
    condition(blockObj.childBlocks_[0], ev, true);
  }
  if (blockObj.parentBlock_ !== null) {
    if (blockObj.parentBlock_.type !== 'trade') {
      observer.emit('ui.log.warn',
        translator.translateText('Submarket blocks have to be added to the trade block'));
      disable(blockObj);
      return;
    }
  }
  enable(blockObj);
};
export const trade = (blockObj, ev) => {
  if (insideHolder(blockObj)) {
    return;
  }
  if (ev.type === 'create') {
    if (bot.symbol.findSymbol(Blockly.mainWorkspace.getBlockById(ev.blockId).type)) {
      observer.emit('tour:submarket_created');
    }
    if (config.conditions.indexOf(Blockly.mainWorkspace.getBlockById(ev.blockId)
        .type) >= 0) {
      observer.emit('tour:condition_created');
    }
    if (Blockly.mainWorkspace.getBlockById(ev.blockId)
        .type === 'math_number') {
      observer.emit('tour:number');
    }
    if (Blockly.mainWorkspace.getBlockById(ev.blockId)
        .type === 'purchase') {
      observer.emit('tour:purchase_created');
    }
    if (Blockly.mainWorkspace.getBlockById(ev.blockId)
        .type === 'trade_again') {
      observer.emit('tour:trade_again_created');
    }
  }
  if (blockObj.childBlocks_.length && !bot.symbol.findSymbol(blockObj.childBlocks_[0].type)) {
    observer.emit('ui.log.warn',
      translator.translateText('The trade block can only accept submarket blocks'));
    for (const child of Array.prototype.slice.apply(blockObj.childBlocks_)) {
      child.unplug();
    }
  } else if (blockObj.childBlocks_.length > 0) {
    submarket(blockObj.childBlocks_[0], ev);
    observer.emit('tour:submarket');
    if ('newInputName' in ev) {
      addPurchaseOptions();
    }
  }
  const topParent = findTopParentBlock(blockObj);
  if (topParent !== null) {
    if (bot.symbol.findSymbol(topParent.type)
      || ['on_strategy', 'on_finish'].indexOf(topParent.type) >= 0) {
      observer.emit('ui.log.warn',
        translator.translateText('The trade block cannot be inside binary blocks'));
      disable(blockObj);
      return;
    }
  }
  enable(blockObj);
};
export const insideCondition = (blockObj, ev, name) => {
  if (insideHolder(blockObj)) {
    return;
  }
  const topParent = findTopParentBlock(blockObj);
  if (topParent !== null) {
    if (config.conditions.indexOf(blockObj.parentBlock_.type) < 0 && !ev.oldParentId) {
      observer.emit('ui.log.warn',
        name + ' ' + translator.translateText('must be added to the condition block'));
      disable(blockObj);
      return;
    }
  }
  enable(blockObj);
};
export const insideStrategy = (blockObj, ev, name) => {
  if (insideHolder(blockObj)) {
    return;
  }
  const topParent = findTopParentBlock(blockObj);
  if (topParent !== null) {
    if (topParent.type !== 'on_strategy' && !ev.oldParentId) {
      observer.emit('ui.log.warn',
        name + ' ' + translator.translateText('must be added inside the strategy block'));
      disable(blockObj);
      return;
    } else if (blockObj.type === 'purchase') {
      observer.emit('tour:purchase');
    }
  }
  enable(blockObj);
};
export const insideFinish = (blockObj, ev, name) => {
  if (insideHolder(blockObj)) {
    return;
  }
  const topParent = findTopParentBlock(blockObj);
  if (topParent !== null) {
    if (topParent.type !== 'on_finish' && !ev.oldParentId) {
      observer.emit('ui.log.warn',
        name + ' ' + translator.translateText('must be added inside the finish block'));
      disable(blockObj);
      return;
    }
    if (blockObj.type === 'trade_again') {
      observer.emit('tour:trade_again');
    }
  }
  enable(blockObj);
};
