import Observer from 'binary-common-utils/observer';
import tools from 'binary-common-utils/tools';
import config from '../../../common/const';
import { bot } from '../../bot';
import { translator } from '../../../common/translator';
import { utils } from './utils';

export default class RelationChecker {
  constructor() {
    this.observer = new Observer();
  }
  isInteger(amount) {
    return !isNaN(+amount) && parseInt(amount, 10) === parseFloat(amount);
  }
  isInRange(amount, min, max) {
    return !isNaN(+amount) && +amount >= min && +amount <= max;
  }
  getNumField(block, fieldName) {
    let field = block.getInputTargetBlock(fieldName);
    if (field !== null && field.type === 'math_number') {
      field = field.getFieldValue('NUM')
        .trim();
      return field;
    }
    return '';
  }
  getListField(block, fieldName) {
    return block.getFieldValue(fieldName);
  }
  trade(trade, ev) {
    if (ev.type === 'create') {
      if (bot.symbol.findSymbol(Blockly.mainWorkspace.getBlockById(ev.blockId).type)) {
        this.observer.emit('tour:submarket_created');
      }
      if (config.conditions.indexOf(Blockly.mainWorkspace.getBlockById(ev.blockId)
          .type) >= 0) {
        this.observer.emit('tour:condition_created');
      }
      if (Blockly.mainWorkspace.getBlockById(ev.blockId)
          .type === 'math_number') {
        this.observer.emit('tour:number');
      }
      if (Blockly.mainWorkspace.getBlockById(ev.blockId)
          .type === 'purchase') {
        this.observer.emit('tour:purchase_created');
      }
      if (Blockly.mainWorkspace.getBlockById(ev.blockId)
          .type === 'trade_again') {
        this.observer.emit('tour:trade_again_created');
      }
    }
    if (trade.childBlocks_.length && !bot.symbol.findSymbol(trade.childBlocks_[0].type)) {
      this.observer.emit('ui.log.warn',
        translator.translateText('The trade block can only accept submarket blocks'));
      for (let child of Array.prototype.slice.apply(trade.childBlocks_)) {
        child.unplug();
      }
    } else if (trade.childBlocks_.length > 0) {
      this.submarket(trade.childBlocks_[0], ev);
      this.observer.emit('tour:submarket');
      if ('newInputName' in ev) {
        utils.addPurchaseOptions();
      }
    }
    let topParent = utils.findTopParentBlock(trade);
    if (topParent !== null) {
      if (bot.symbol.findSymbol(topParent.type)
        || ['on_strategy', 'on_finish'].indexOf(topParent.type) >= 0) {
        this.observer.emit('ui.log.warn',
          translator.translateText('The trade block cannot be inside binary blocks'));
        trade.unplug();
      }
    }
  }
  submarket(submarket, ev) {
    if (submarket.childBlocks_.length > 0 && config.conditions.indexOf(submarket.childBlocks_[0].type) < 0) {
      this.observer.emit('ui.log.warn', translator.translateText('Submarket blocks can only accept trade type blocks'));
      for (let child of Array.prototype.slice.apply(submarket.childBlocks_)) {
        child.unplug();
      }
    } else if (submarket.childBlocks_.length > 0) {
      this.condition(submarket.childBlocks_[0], ev, true);
    }
    if (submarket.parentBlock_ !== null) {
      if (submarket.parentBlock_.type !== 'trade') {
        this.observer.emit('ui.log.warn',
          translator.translateText('Submarket blocks have to be added to the trade block'));
        submarket.unplug();
      }
    }
  }
  condition(condition, ev, calledByParent) {
    if (condition.parentBlock_ !== null) {
      if (!bot.symbol.findSymbol(condition.parentBlock_.type)) {
        this.observer.emit('ui.log.warn',
          translator.translateText('Trade Type blocks have to be added to submarket blocks'));
        condition.unplug();
      } else if (!bot.symbol.isConditionAllowedInSymbol(condition.parentBlock_.type, condition.type)) {
        let symbol = bot.symbol.findSymbol(condition.parentBlock_.type);
        this.observer.emit('ui.log.warn',
          `${symbol[Object.keys(symbol)[0]]} ${translator.translateText('does not support category:')}`
          + ` ${bot.symbol.getCategoryNameForCondition(condition.type)}`
          + `, ${translator.translateText('Allowed categories are')}`
          + ` ${bot.symbol.getAllowedCategoryNames(condition.parentBlock_.type)}`);
        condition.unplug();
      } else {
        this.observer.emit('tour:condition');
        if (!calledByParent) {
					if ((ev.type === 'change' && ev.element && ev.element === 'field')
						|| (ev.type === 'move' && typeof ev.newInputName === 'string')) {
            let duration = this.getNumField(condition, 'DURATION');
            let durationType = this.getListField(condition, 'DURATIONTYPE_LIST');
            if (duration !== '') {
              let minDuration = bot.symbol.getLimitation(condition.parentBlock_.type, condition.type).minDuration;
              if (!tools.durationAccepted(duration + durationType, minDuration)) {
								this.observer.emit('ui.log.warn',
									translator.translateText('Minimum duration is') +
									' ' + tools.expandDuration(minDuration));
              } else {
                this.observer.emit('tour:ticks');
              }
              if (durationType === 't') {
                if (!this.isInteger(duration) || !this.isInRange(duration, 5, 10)) {
									this.observer.emit('ui.log.warn',
										translator.translateText('Number of ticks must be between 5 and 10'));
                } else {
                  this.observer.emit('tour:ticks');
                }
              } else if (!this.isInteger(duration) || duration < 1) {
								this.observer.emit('ui.log.warn',
									translator.translateText('Expiry time cannot be equal to start time'));
              }
            }
            let prediction = this.getNumField(condition, 'PREDICTION');
            if (prediction !== '') {
              if (!this.isInteger(prediction) || !this.isInRange(prediction, 0, 9)) {
                this.observer.emit('ui.log.warn', translator.translateText('Prediction must be one digit'));
              }
            }
            for (let il of condition.inputList) {
              if (il.name !== '' && condition.getInputTargetBlock(il.name) === null) {
                return;
              }
            }
            this.observer.emit('tour:options');
          }
        }
      }
    }
  }
  insideCondition(blockObject, ev, name) {
    let topParent = utils.findTopParentBlock(blockObject);
    if (topParent !== null) {
      if (config.conditions.indexOf(blockObject.parentBlock_.type) < 0 && !ev.oldParentId) {
				this.observer.emit('ui.log.warn',
					name + ' ' + translator.translateText('must be added to the condition block'));
        blockObject.unplug();
      }
    }
  }
  insideStrategy(blockObject, ev, name) {
    let topParent = utils.findTopParentBlock(blockObject);
    if (topParent !== null) {
      if (topParent.type !== 'on_strategy' && !ev.oldParentId) {
				this.observer.emit('ui.log.warn',
					name + ' ' + translator.translateText('must be added inside the strategy block'));
        blockObject.unplug();
      } else if (blockObject.type === 'purchase') {
				this.observer.emit('tour:purchase');
      }
    }
  }
  insideFinish(blockObject, ev, name) {
    let topParent = utils.findTopParentBlock(blockObject);
    if (topParent !== null) {
      if (topParent.type !== 'on_finish' && !ev.oldParentId) {
				this.observer.emit('ui.log.warn',
					name + ' ' + translator.translateText('must be added inside the finish block'));
        blockObject.unplug();
      } else if (blockObject.type === 'trade_again') {
				this.observer.emit('tour:trade_again');
      }
    }
  }
}

export const relationChecker = new RelationChecker();
