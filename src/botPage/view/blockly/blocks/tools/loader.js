// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#tkcvmb
import { translator } from '../../../../../common/translator'

Blockly.Blocks.loader = {
  init: function init() {
    this.loaderId = Math.random()
    this.appendDummyInput()
      .appendField(`${translator.translateText('Load Block From')}:`)
      .appendField(new Blockly.FieldTextInput('http://www.example.com/block.xml'), 'URL')
    this.setInputsInline(true)
    this.setColour('#dedede')
    this.setTooltip(translator.translateText('Load blocks from url'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
    this.loadedByMe = []
  },
  onchange: function onchange(ev) {
    if (!this.isInFlyout && ['create', 'change'].indexOf(ev.type) >= 0 && ev.blockId === this.id) {
      const url = this.getFieldValue('URL');
      $.ajax({
        type: 'GET',
        url,
      }).then((xml) => Bot.load(xml, null, this)) // eslint-disable-line no-undef
    }
  },
}

Blockly.JavaScript.loader = () => ''
