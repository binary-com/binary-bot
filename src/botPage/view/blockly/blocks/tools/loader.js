// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#tkcvmb
import { translator } from '../../../../../common/translator'
import { enable, disable, deleteBlocksLoadedBy, loadRemoteBlock } from '../../utils'


Blockly.Blocks.loader = {
  init: function init() {
    this.appendDummyInput()
      .appendField(`${translator.translateText('Load Block From')}:`)
      .appendField(new Blockly.FieldTextInput('http://www.example.com/block.xml'), 'URL')
    this.setInputsInline(true)
    this.setColour('#dedede')
    this.setTooltip(translator.translateText('Load blocks from url'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
    this.loadedByMe = []
    this.loadedVariables = []
  },
  onchange: function onchange(ev) {
    if (!this.isInFlyout
      && ev.type === 'change' && ev.element === 'disabled' && ev.newValue === true
      && ev.blockId === this.id) {
        deleteBlocksLoadedBy(this.id)
      }
    if (!this.isInFlyout
      && (ev.type === 'change' && ev.element === 'field') && ev.blockId === this.id) {
        loadRemoteBlock(this).then(() => {
          enable(this)
        }, (e) => {
          disable(this, e)
        })
      }
  },
}

Blockly.JavaScript.loader = (block) => (block.loadedVariables.length ? `var ${
  block.loadedVariables.map((v) => Blockly.JavaScript.variableDB_.safeName_(v)).toString()
};` : '')
