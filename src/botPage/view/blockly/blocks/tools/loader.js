// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#tkcvmb
import { translator } from '../../../../../common/translator'
import { getTopBlocksByType, disable, enable, deleteBlocksLoadedBy } from '../../utils'

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
  },
  onchange: function onchange(ev) {
    if (!this.isInFlyout
      && ev.type === 'change' && ev.element === 'disabled' && ev.newValue === true
      && ev.blockId === this.id) {
        deleteBlocksLoadedBy(this.id)
      }
    if (!this.isInFlyout
      && ((ev.type === 'change' && ev.element === 'field') || ev.type === 'create')
      && ev.blockId === this.id) {
        const url = this.getFieldValue('URL');
        let isNew = true
        for (const block of getTopBlocksByType('loader')) {
          if (block.url === url) {
            isNew = false
          }
        }
        if (!isNew) {
          disable(this, translator.translateText('This url is already loaded'))
        } else {
          enable(this)
          $.ajax({
            type: 'GET',
            url,
          }).then((xml) => {
            Bot.load(xml, null, this) // eslint-disable-line no-undef
            this.url = url
          })
        }
      }
  },
}

Blockly.JavaScript.loader = () => ''
