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
        let url = this.getFieldValue('URL');
        if (url.indexOf('http') !== 0) {
          url = `http://${url}`
        }
        let isNew = true
        for (const block of getTopBlocksByType('loader')) {
          if (block.id !== this.id && block.url === url) {
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
          }).error((e) => {
            window.amin = e
            if (e.status) {
              disable(this,
                `${translator.translateText('An error occurred while trying to load the url')}: ${e.status} ${e.statusText}`)
            } else {
              disable(this,
                translator.translateText('Make sure \'Access-Control-Allow-Origin\' exists in the response from the server'))
            }
            deleteBlocksLoadedBy(this.id)
          }).done((xml) => {
            Bot.load(xml, null, this) // eslint-disable-line no-undef
            this.url = url
          })
        }
      }
  },
}

Blockly.JavaScript.loader = () => ''
