import config from '../../../../../common/const'
import { translator } from '../../../../../common/translator'
import { bot } from '../../../../bot'


export function title(block, opposites, optionNames) {
  block.appendDummyInput()
    .setAlign(Blockly.ALIGN_CENTRE)
    .appendField(bot.symbol.getCategoryNameForCondition(opposites))
  block.appendDummyInput()
    .appendField(`> ${optionNames[0]}/${optionNames[1]}`)
}

export function candleInterval(block) {
  block.appendDummyInput()
    .appendField(translator.translateText('Candle Interval:'))
    .appendField(new Blockly.FieldDropdown(config.candleIntervals), 'CANDLEINTERVAL_LIST')
}

export function duration(block, opposites) {
  block.appendValueInput('DURATION')
    .setCheck('Number')
    .appendField(translator.translateText('Duration:'))
    .appendField(new Blockly.FieldDropdown(config.durationTypes[opposites]), 'DURATIONTYPE_LIST')
}

export function payout(block) {
  block.appendValueInput('AMOUNT')
    .setCheck('Number')
    .appendField(translator.translateText('Payout:'))
    .appendField(new Blockly.FieldDropdown(config.lists.PAYOUTTYPE), 'PAYOUTTYPE_LIST')
  block.appendDummyInput()
    .appendField(translator.translateText('Currency:'))
    .appendField(new Blockly.FieldDropdown(config.lists.CURRENCY), 'CURRENCY_LIST')
}

export function barrierOffset(block, opposites, name) {
  let fieldName = translator.translateText('Barrier Offset:')
  if (name) {
    fieldName = name
  }
  block.appendValueInput('BARRIEROFFSET')
    .setCheck('BarrierOffset')
    .appendField(fieldName)
}

export function secondBarrierOffset(block) {
  block.appendValueInput('SECONDBARRIEROFFSET')
    .setCheck('BarrierOffset')
    .appendField(translator.translateText('Low Barrier Offset:'))
}

export function prediction(block) {
  block.appendValueInput('PREDICTION')
    .setCheck('Number')
    .appendField(translator.translateText('Prediction:'))
}
