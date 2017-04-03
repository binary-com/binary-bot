import config from '../../../../common/const'
import { moveMarketDefsToMainBlock } from './tools'
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
        moveMarketDefsToMainBlock(this)
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
