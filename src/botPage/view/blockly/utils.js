import config from '../../../common/const';
import { translator } from '../../../common/translator';

export default class Utils {
  constructor() {
    this.purchase_choices = [[translator.translateText('Click to select'), '']];
  }
  getBlockByType(type) {
    for (const block of Blockly.mainWorkspace.getAllBlocks()) {
      if (type === block.type) {
        return block;
      }
    }
    return null;
  }
  getPurchaseChoices() {
    return this.purchase_choices;
  }
  findTopParentBlock(block) {
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
  }
  addPurchaseOptions() {
    let firstOption = {};
    let secondOption = {};
    const trade = this.getBlockByType('trade');
    if (trade !== null && trade.getInputTargetBlock('SUBMARKET') !== null && trade.getInputTargetBlock('SUBMARKET')
        .getInputTargetBlock('CONDITION') !== null) {
      const conditionType = trade.getInputTargetBlock('SUBMARKET')
        .getInputTargetBlock('CONDITION')
        .type;
      const opposites = config.opposites[conditionType.toUpperCase()];
      this.purchase_choices = [];
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
        this.purchase_choices.push([option[Object.keys(option)[0]], Object.keys(option)[0]]);
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
  }
}

export const utils = new Utils();
