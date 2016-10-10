import fileSaver from 'filesaverjs';
import config from '../../../common/const';
import { translator } from '../../../common/translator';

const purchaseChoices = [[translator.translateText('Click to select'), '']];

export const deleteBlockIfExists = (block) => {
  for (const mainBlock of Blockly.mainWorkspace.getTopBlocks()) {
    if (!block.isInFlyout && mainBlock.id !== block.id && mainBlock.type === block.type) {
      block.dispose();
      return true;
    }
  }
  return false;
};

export const setBlockTextColor = (block) => {
  const field = block.getField();
  if (field) {
    field.getSvgRoot()
      .style.setProperty('fill', 'white', 'important');
  }
};

export const configMainBlock = (ev, type) => {
  if (ev.type === 'create') {
    for (const blockId of ev.ids) {
      const block = Blockly.mainWorkspace.getBlockById(blockId);
      if (block) {
        if (block.type === type) {
          deleteBlockIfExists(block);
        }
      }
    }
  }
};

export const isMainBlock = (blockType) => config.mainBlocks.indexOf(blockType) >= 0;

export const getBlockByType = (type) => {
  for (const block of Blockly.mainWorkspace.getAllBlocks()) {
    if (type === block.type) {
      return block;
    }
  }
  return null;
};

export const getMainBlocks = () => {
  const result = [];
  for (const blockType of config.mainBlocks) {
    const block = getBlockByType(blockType);
    if (block) {
      result.push(block);
    }
  }
  return result;
};

export const getBlocksByType = (type) => {
  const result = [];
  for (const block of Blockly.mainWorkspace.getAllBlocks()) {
    if (type === block.type) {
      result.push(block);
    }
  }
  return result;
};

export const getPurchaseChoices = () => purchaseChoices;

export const findTopParentBlock = (b) => {
  let block = b;
  let pblock = block.parentBlock_; // eslint-disable-line no-underscore-dangle
  if (pblock === null) {
    return null;
  }
  while (pblock !== null) {
    if (pblock.type === 'trade') {
      return pblock;
    }
    block = pblock;
    pblock = block.parentBlock_; // eslint-disable-line no-underscore-dangle
  }
  return block;
};

export const addPurchaseOptions = () => {
  let firstOption = {};
  let secondOption = {};
  const trade = getBlockByType('trade');
  if (trade !== null && trade.getInputTargetBlock('SUBMARKET') !== null &&
    trade.getInputTargetBlock('SUBMARKET')
      .getInputTargetBlock('CONDITION') !== null) {
    const conditionType = trade.getInputTargetBlock('SUBMARKET')
      .getInputTargetBlock('CONDITION')
      .type;
    const opposites = config.opposites[conditionType.toUpperCase()];
    purchaseChoices.length = 0;
    opposites.forEach((option, index) => {
      if (index === 0) {
        firstOption = {
          condition: Object.keys(option)[0],
          name: option[Object.keys(option)[0]],
        };
      } else {
        secondOption = {
          condition: Object.keys(option)[0],
          name: option[Object.keys(option)[0]],
        };
      }
      purchaseChoices.push([option[Object.keys(option)[0]], Object.keys(option)[0]]);
    });
    const purchases = Blockly.mainWorkspace.getAllBlocks()
      .filter((r) => (['purchase', 'payout', 'ask_price'].indexOf(r.type) >= 0));
    for (const purchase of purchases) {
      const value = purchase.getField('PURCHASE_LIST')
        .getValue();
      Blockly.WidgetDiv.hideIfOwner(purchase.getField('PURCHASE_LIST'));
      if (value === firstOption.condition) {
        purchase.getField('PURCHASE_LIST')
          .setText(firstOption.name);
      } else if (value === secondOption.condition) {
        purchase.getField('PURCHASE_LIST')
          .setText(secondOption.name);
      } else {
        purchase.getField('PURCHASE_LIST')
          .setValue(firstOption.condition);
        purchase.getField('PURCHASE_LIST')
          .setText(firstOption.name);
      }
    }
  }
};

export const save = (filename = 'binary-bot', collection = false, xmlDom) => {
  xmlDom.setAttribute('collection', collection ? 'true' : 'false');
  const xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  const blob = new Blob([xmlText], {
    type: 'text/xml;charset=utf-8',
  });
  fileSaver.saveAs(blob, filename);
};
