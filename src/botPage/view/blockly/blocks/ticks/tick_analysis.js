// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i7qkfj
import { translator } from '../../../../../common/translator'

Blockly.Blocks.tick_analysis = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('This block is called on every tick'))
    this.appendStatementInput('TICKANALYSIS_STACK')
      .setCheck(null)
    this.setColour('#fef1cf')
    this.setTooltip(translator.translateText('You can use this block to analyze the ticks comming regardless of your trades'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
}

Blockly.JavaScript.tick_analysis = (block) => {
  const stack = Blockly.JavaScript.statementToCode(block, 'TICKANALYSIS_STACK')
  return `
    tick_analysis_list.push(function tick_analysis(){
      try {
        ${stack}
      } catch (e) { 
        if (e.name !== 'BlocklyError') {
          Bot.notifyError(e);
          throw e;
        }
      }
    });
  `
}
