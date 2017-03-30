import config from '../../../../common/const'
import { findTopParentBlock } from '../../utils'
import { duration, payout, prediction, barrierOffset, secondBarrierOffset,
} from './components'

export default () => {
  Blockly.Blocks.allFields = {
    init: function init() {
      duration(this)
      payout(this)
      prediction(this)
      barrierOffset(this)
      secondBarrierOffset(this)
      this.setInputsInline(false)
      this.setPreviousStatement(true, 'Condition')
    },
  }
  Object.keys(config.opposites).forEach(oppositesName => {
    Blockly.Blocks[oppositesName.toLowerCase()] = {
      init: function init() {
        const optionNames = []
        config.opposites[oppositesName].forEach(options => {
          const optionName = options[Object.keys(options)[0]]
          optionNames.push(optionName)
        })
        duration(this)
        payout(this)
        // for backward compatibility
        const parent = findTopParentBlock(this)
        const extendParentFields = (field) => {
          const value = this.getFieldValue(field)
          if (value) {
            parent.setFieldValue(value, field)
          }
        }
        if (parent) {
          const recordUndo = Blockly.Events.recordUndo
          Blockly.Events.recordUndo = false
          Blockly.Events.setGroup('BackwardCompatibility')
          const fields = [
            'MARKET_LIST',
            'SUBMARKET_LIST',
            'SYMBOL_LIST',
            'TRADETYPECAT_LIST',
            'TRADETYPE_LIST',
            'TYPE_LIST',
            'CANDLEINTERVAL_LIST',
          ]

          fields.forEach(f => extendParentFields(f))
          Blockly.Events.setGroup(false)
          Blockly.Events.recordUndo = recordUndo
        }
        this.removeInput('MARKETDEFINITION')
        this.removeInput('TRADETYPEDEFINITION')
        this.removeInput('CONTRACT_TYPE')
        this.removeInput('CANDLE_INTERVAL')
        // end of bc
        if (config.hasPrediction.indexOf(oppositesName) > -1) {
          prediction(this)
        } else {
          this.removeInput('PREDICTION')
        }
        if (config.hasBarrierOffset.indexOf(oppositesName) > -1) {
          barrierOffset(this)
        } else {
          this.removeInput('BARRIEROFFSET')
        }
        if (config.hasSecondBarrierOffset.indexOf(oppositesName) > -1) {
          barrierOffset(this)
          secondBarrierOffset(this)
        } else {
          this.removeInput('SECONDBARRIEROFFSET')
        }
        this.setInputsInline(false)
        this.setPreviousStatement(true, 'Condition')
      },
    }
    Blockly.JavaScript[oppositesName.toLowerCase()] = () => ''
  })
}
