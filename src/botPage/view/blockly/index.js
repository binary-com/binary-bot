import { observer } from 'binary-common-utils/lib/observer'
import { translate, xml as translateXml } from '../../../common/i18n'
import { notifyError } from '../logger'
import config from '../../../common/const'
import { isMainBlock, save,
  disable, deleteBlocksLoadedBy,
  addLoadersFirst, cleanUpOnLoad, addDomAsBlock,
  backwardCompatibility, fixCollapsedBlocks,
} from './utils'
import blocks from './blocks'
import { getLanguage } from '../../../common/lang'

let toolbox = null

const disableStrayBlocks = () => {
  const topBlocks = Blockly.mainWorkspace.getTopBlocks()
  for (const block of topBlocks) {
    if (!isMainBlock(block.type)
      && [
        'block_holder',
        'timeout',
        'interval',
        'tick_analysis',
        'loader',
        'procedures_defreturn',
        'procedures_defnoreturn',
      ].indexOf(block.type) < 0
      && !block.disabled) {
      disable(block,
        translate('Blocks must be inside block holders, main blocks or functions'))
    }
  }
}

const disposeBlocksWithLoaders = () => {
  Blockly.mainWorkspace.addChangeListener(ev => {
    if (ev.type === 'create') {
      for (const blockId of ev.ids) {
        const block = Blockly.mainWorkspace.getBlockById(blockId)
        if (block.type === 'market') {
          observer.emit('tour:market_created')
        }
        if (config.conditions.indexOf(block.type) >= 0) {
          observer.emit('tour:condition_created')
        }
        if (block.type === 'math_number') {
          observer.emit('tour:number')
        }
        if (block.type === 'purchase') {
          observer.emit('tour:purchase_created')
        }
        if (block.type === 'trade_again') {
          observer.emit('tour:trade_again_created')
        }
      }
    }
    if (ev.type === 'delete' && ev.oldXml.getAttribute('type') === 'loader'
      && ev.group !== 'undo') {
      deleteBlocksLoadedBy(ev.blockId, ev.group)
    }
  })
}

const loadWorkspace = (xml) => {
  Blockly.Events.setGroup('load')
  Blockly.mainWorkspace.clear()
  addLoadersFirst(xml).then(() => {
    for (const block of Array.prototype.slice.call(xml.children)) {
      backwardCompatibility(block)
    }
    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace)
    fixCollapsedBlocks()
    observer.emit('ui.log.success',
      translate('Blocks are loaded successfully'))
    Blockly.Events.setGroup(false)
  }, e => {
    Blockly.Events.setGroup(false)
    observer.emit('ui.log.error', e)
  })
}

const loadBlocks = (xml, dropEvent = {}) => {
  Blockly.Events.setGroup('load')
  addLoadersFirst(xml).then((loaders) => {
    const addedBlocks = [...loaders]
    for (const block of Array.prototype.slice.call(xml.children)) {
      const newBlock = addDomAsBlock(block)
      if (newBlock) {
        addedBlocks.push(newBlock)
      }
    }
    cleanUpOnLoad(addedBlocks, dropEvent)
    fixCollapsedBlocks()
    observer.emit('ui.log.success',
      translate('Blocks are loaded successfully'))
  }, e => {
    observer.emit('ui.log.error', e)
  })
}

const resizeToolbox = () => {
  const toolboxMenu = $("[role='group']:first")
  toolboxMenu.addClass('toolboxMenu')
  toolboxMenu.on('click touchstart', e => e.stopPropagation())
}

const overrideDeleteArea = () => {
  Blockly.WorkspaceSvg.prototype.isDeleteArea = e => {
    const outsideWorkspace = e.clientX < $('.blocklyMainBackground').offset().left
    if (outsideWorkspace) {
      Blockly.Css.setCursor(Blockly.Css.Cursor.DELETE)
      return true
    }
    return false
  }
}

export default class _Blockly {
  constructor() {
    this.blocksXmlStr = ''
    this.generatedJs = ''
    this.addBlocklyTranslation()
    Blockly.WorkspaceSvg.prototype.preloadAudio_ = () => {
    } // https://github.com/google/blockly/issues/299
    this.initPromise = new Promise((resolve) => {
      $.get('xml/toolbox.xml', (toolboxXml) => {
        blocks()
        const workspace = Blockly.inject('blocklyDiv', {
          toolbox: this.xmlToStr(translateXml(toolboxXml.getElementsByTagName('xml')[0])),
          zoom: {
            wheel: false,
          },
          trashcan: false,
        })
        $.get('xml/main.xml', (main) => {
          this.overrideBlocklyDefaultShape()
          this.blocksXmlStr = Blockly.Xml.domToPrettyText(main)
          Blockly.Xml.domToWorkspace(main.getElementsByTagName('xml')[0], workspace)
          this.zoomOnPlusMinus()
          Blockly.mainWorkspace.clearUndo()
          disposeBlocksWithLoaders()
          toolbox = Blockly.mainWorkspace.toolbox_
          Blockly.mainWorkspace.toolbox_ = null
          resizeToolbox()
          overrideDeleteArea()
          resolve()
        })
      })
    })
  }
  zoomOnPlusMinus(zoomIn) {
    const metrics = Blockly.mainWorkspace.getMetrics()
    if (zoomIn) {
      Blockly.mainWorkspace.zoom(metrics.viewWidth / 2, metrics.viewHeight / 2, 1)
    } else {
      Blockly.mainWorkspace.zoom(metrics.viewWidth / 2, metrics.viewHeight / 2, -1)
    }
  }
  cleanUp() {
    Blockly.Events.setGroup(true)
    const topBlocks = Blockly.mainWorkspace.getTopBlocks(true)
    let cursorY = 0
    for (const block of topBlocks) {
      if (block.getSvgRoot().style.display !== 'none') {
        const xy = block.getRelativeToSurfaceXY()
        block.moveBy(-xy.x, cursorY - xy.y)
        block.snapToGrid()
        cursorY = block.getRelativeToSurfaceXY().y +
        block.getHeightWidth().height + Blockly.BlockSvg.MIN_BLOCK_Y
      }
    }
    Blockly.Events.setGroup(false)
    // Fire an event to allow scrollbars to resize.
    Blockly.mainWorkspace.resizeContents()
  }
  xmlToStr(xml) {
    const serializer = new XMLSerializer()
    return serializer.serializeToString(xml)
  }
  overrideBlocklyDefaultShape() {
    Blockly.Blocks.text.newQuote_ = (open) => { // eslint-disable-line no-underscore-dangle
      let file
      if (open === this.RTL) {
        file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAYAAAAGuM1UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFpJREFUeNpiZGBg+M+ACRyh9H50CSYGEsEg1AACDlB8HxoAIKwAxAJIcu+h4u+RNcEUz0czMAFJroEBKfiQTUcG95FMF2BBUnAAiA8C8QM05z6A4o1A/AEgwACTSBqO/l02SwAAAABJRU5ErkJggg=='
      } else {
        file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAYAAAAGuM1UAAAAAXNSR0IArs4c6QAAActpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgSW1hZ2VSZWFkeTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KKS7NPQAAAHFJREFUGBljYICAAiC1H4odIEJwsgHIgskpgEQFgPg9EP8H4vtAjAwUgByQOAjvB2IwaACSMMEEsAiCmI8k5wASZgRikOkgWz4AcSAQg8AFIAaJ3QdxgOABECeCGCANINPRgSNUYD+6BBO6ACH+INQAAKsvFws0VtvEAAAAAElFTkSuQmCC'
      }
      return new Blockly.FieldImage(file, 12, 12, '"')
    }
    Blockly.Blocks.texts.HUE = '#dedede'
    Blockly.Blocks.math.HUE = '#dedede'
    Blockly.Blocks.logic.HUE = '#dedede'
    Blockly.Blocks.loops.HUE = '#dedede'
    Blockly.Blocks.lists.HUE = '#dedede'
    Blockly.Blocks.variables.HUE = '#dedede'
    Blockly.Blocks.procedures.HUE = '#dedede'
    const addDownloadToMenu = (block) => {
      if (block instanceof Object) {
        block.customContextMenu = function customContextMenu(options) { // eslint-disable-line no-param-reassign, max-len
          options.push({
            text: translate('Download'),
            enabled: true,
            callback: () => {
              const xml = Blockly.Xml.textToDom('<xml xmlns="http://www.w3.org/1999/xhtml" collection="false"></xml>')
              xml.appendChild(Blockly.Xml.blockToDom(this))
              save('binary-bot-block', true, xml)
            },
          })
        }
      }
    }
    for (const blockName of Object.keys(Blockly.Blocks)) {
      addDownloadToMenu(Blockly.Blocks[blockName])
    }
  }
  resetWorkspace() {
    Blockly.Events.setGroup(true)
    Blockly.mainWorkspace.clear()
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(this.blocksXmlStr), Blockly.mainWorkspace)
    Blockly.Events.setGroup(false)
  }
  load(blockStr = '', dropEvent = {}) {
    if (blockStr.indexOf('<xml') !== 0) {
      observer.emit('ui.log.error',
        translate('Unrecognized file format.'))
    } else {
      try {
        const xml = Blockly.Xml.textToDom(blockStr)
        if (xml.hasAttribute('collection') && xml.getAttribute('collection') === 'true') {
          loadBlocks(xml, dropEvent)
        } else {
          loadWorkspace(xml)
        }
      } catch (e) {
        if (e.name === 'BlocklyError') {
          // pass
        } else {
          observer.emit('ui.log.error',
            translate('Unrecognized file format.'))
        }
      }
    }
  }
  save(filename, collection) {
    const xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)
    for (const blockDom of Array.prototype.slice.call(xml.children)) {
      const block = Blockly.mainWorkspace.getBlockById(blockDom.getAttribute('id'))
      if ('loaderId' in block) {
        blockDom.remove()
      }
    }
    save(filename, collection, xml)
  }
  run(limitations = {}) {
    let code
    try {
      window.LoopTrap = 99999999999
      Blockly.mainWorkspace.traceOn(true)
      Blockly.JavaScript
        .INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) { Bot.notifyError("Infinite loop!"); throw "Infinite loop."; }\n'
      disableStrayBlocks()
      code = `
        var trade, before_purchase, during_purchase, after_purchase;
        var tick_analysis_list = [];
        var limitations = ${JSON.stringify(limitations)}
        ${Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace)}
        try {
          if (typeof trade !== 'undefined') {
            trade();
          }
        } catch (e) {
          if (e.name !== 'BlocklyError') {
            Bot.notifyError(e);
            throw e;
          }
        }
      `
      Blockly.JavaScript.INFINITE_LOOP_TRAP = null
      this.generatedJs = code
    } catch (e) {
      if (e.name !== 'BlocklyError') {
        notifyError(e)
        throw e
      }
    }
    if (code) {
      eval(code) // eslint-disable-line no-eval
    }
  }
  addBlocklyTranslation() {
    $.ajaxPrefilter((options) => {
      options.async = true // eslint-disable-line no-param-reassign
    })
    const script = document.createElement('script')
    script.type = 'text/javascript'
    let lang = getLanguage()
    if (lang === 'ach') {
      lang = 'en'
    } else if (lang === 'zh_cn') {
      lang = 'zh-hans'
    } else if (lang === 'zh_tw') {
      lang = 'zh-hant'
    }
    script.src = `https://blockly-demo.appspot.com/static/msg/js/${lang}.js`
    $('body').append(script)
  }
  undo() {
    Blockly.Events.setGroup('undo')
    Blockly.mainWorkspace.undo()
    Blockly.Events.setGroup(false)
  }
  redo() {
    Blockly.mainWorkspace.undo(true)
  }
  getToolbox() {
    return toolbox
  }
}
