import { observer } from 'binary-common-utils/lib/observer';
import config from '../../../common/const';
import { translator } from '../../../common/translator';
import { bot } from '../../bot';
import {
  addPurchaseOptions, getBlockByType, isMainBlock, findTopParentBlock, save,
} from './utils';
import blocks from './blocks';

export default class _Blockly {
  constructor() {
    this.blocksXmlStr = '';
    this.generatedJs = '';
    this.addBlocklyTranslation();
    this.initPromise = new Promise((resolve) => {
      $.get('xml/toolbox.xml', (toolbox) => {
        blocks();
        const workspace = Blockly.inject('blocklyDiv', {
          media: 'js/blockly/media/',
          toolbox: this.xmlToStr(translator.translateXml($.parseXML(
            this.marketsToXml(toolbox.getElementsByTagName('xml')[0])
          ))),
          zoom: {
            wheel: false,
          },
          trashcan: false,
          collapse: false,
        });
        $.get('xml/main.xml', (main) => {
          this.blocksXmlStr = Blockly.Xml.domToPrettyText(main);
          Blockly.Xml.domToWorkspace(main.getElementsByTagName('xml')[0], workspace);
          this.disableDeleteForMainBlocks();
          this.overrideBlocklyDefaultShape();
          this.zoomOnPlusMinus();
          Blockly.mainWorkspace.clearUndo();
          addPurchaseOptions();
          resolve();
        });
      });
    });
  }
  zoomOnPlusMinus(zoomIn) {
    const metrics = Blockly.mainWorkspace.getMetrics();
    if (zoomIn) {
      Blockly.mainWorkspace.zoom(metrics.viewWidth / 2, metrics.viewHeight / 2, 1);
    } else {
      Blockly.mainWorkspace.zoom(metrics.viewWidth / 2, metrics.viewHeight / 2, -1);
    }
  }
  createXmlTag(obj) {
    let xmlStr = '<category name="Markets" colour="#2a3052" i18n-text="Markets">\n';
    for (const market of Object.keys(obj)) {
      xmlStr += `\t<category name="${obj[market].name}" colour="#2a3052">`;
      for (const submarket of Object.keys(obj[market].submarkets)) {
        xmlStr += `\t\t<category name="${
        obj[market].submarkets[submarket].name}" colour="#2a3052">`;
        for (const symbol of Object.keys(obj[market].submarkets[submarket].symbols)) {
          xmlStr += `\t\t\t<block type="${symbol.toLowerCase()}"></block>`;
        }
        xmlStr += '\t\t</category>\n';
      }
      xmlStr += '\t</category>\n';
    }
    xmlStr += '</category>\n';
    return xmlStr;
  }
  xmlToStr(xml) {
    const serializer = new XMLSerializer();
    return serializer.serializeToString(xml);
  }
  marketsToXml(xml) {
    const xmlStr = this.xmlToStr(xml);
    const marketXml = this.createXmlTag(
      bot.symbol.activeSymbols.getMarkets(), bot.symbol.assetIndex);
    return xmlStr.replace('<!--Markets-->', marketXml);
  }
  disableDeleteForMainBlocks() {
    for (const blockType of config.mainBlocks) {
      getBlockByType(blockType)
        .setDeletable(false);
    }
  }
  overrideBlocklyDefaultShape() {
    Blockly.Blocks.text.newQuote_ = (open) => { // eslint-disable-line no-underscore-dangle
      let file;
      if (open === this.RTL) {
        file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAYAAAAGuM1UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFpJREFUeNpiZGBg+M+ACRyh9H50CSYGEsEg1AACDlB8HxoAIKwAxAJIcu+h4u+RNcEUz0czMAFJroEBKfiQTUcG95FMF2BBUnAAiA8C8QM05z6A4o1A/AEgwACTSBqO/l02SwAAAABJRU5ErkJggg=='; // eslint-disable-line max-len
      } else {
        file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAYAAAAGuM1UAAAAAXNSR0IArs4c6QAAActpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgSW1hZ2VSZWFkeTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KKS7NPQAAAHFJREFUGBljYICAAiC1H4odIEJwsgHIgskpgEQFgPg9EP8H4vtAjAwUgByQOAjvB2IwaACSMMEEsAiCmI8k5wASZgRikOkgWz4AcSAQg8AFIAaJ3QdxgOABECeCGCANINPRgSNUYD+6BBO6ACH+INQAAKsvFws0VtvEAAAAAElFTkSuQmCC'; // eslint-disable-line max-len
      }
      return new Blockly.FieldImage(file, 12, 12, '"');
    };
    Blockly.Blocks.texts.HUE = '#dedede';
    Blockly.Blocks.math.HUE = '#dedede';
    Blockly.Blocks.logic.HUE = '#dedede';
    Blockly.Blocks.lists.HUE = '#dedede';
    Blockly.Blocks.variables.HUE = '#dedede';
    Blockly.Blocks.procedures.HUE = '#dedede';
    this.setBlockColors();
  }
  addMissingMainBlocks() {
    for (const mainBlock of config.mainBlocks) {
      if (!getBlockByType(mainBlock)) {
        const block = Blockly.mainWorkspace.newBlock(mainBlock);
        block.initSvg();
        block.render();
        this.setBlockColors();
        block.setDeletable(false);
      }
    }
  }
  reconfigureBlocklyAfterLoad() {
    this.addMissingMainBlocks();
    Blockly.mainWorkspace.clearUndo();
    this.setBlockColors();
    addPurchaseOptions();
  }
  loadBlocks(str) {
    if (str) {
      this.blocksXmlStr = str;
    }
    try {
      Blockly.mainWorkspace.clear();
      const xml = Blockly.Xml.textToDom(this.blocksXmlStr);
      Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
      this.reconfigureBlocklyAfterLoad();
      observer.emit('ui.log.success',
        translator.translateText('Blocks are loaded successfully'));
    } catch (e) {
      if (e.name === 'BlocklyError') {
        // pass
      } else {
        throw e;
      }
    }
  }
  selectBlockByText(text) {
    let returnVal;
    $('.blocklyText').each(function each() {
      if ($(this).text().indexOf(text) >= 0) {
        returnVal = $(this).parent()[0];
      }
    });
    return returnVal;
  }
  setBlockColors() {
    for (const blockType of config.mainBlocks) {
      const block = getBlockByType(blockType);
      if (block) {
        block.getField().getSvgRoot()
          .style.setProperty('fill', 'white', 'important');
      }
    }
  }
  saveXml() {
    save(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
  }
  deleteStrayBlocks() {
    const topBlocks = Blockly.mainWorkspace.getTopBlocks();
    for (const block of topBlocks) {
      if (!isMainBlock(block.type)
        && block !== findTopParentBlock(getBlockByType('trade'))
        && block.type.indexOf('procedures_def') < 0
        && block.type !== 'block_holder') {
        block.dispose();
      }
    }
  }
  run() {
    let code;
    try {
      window.LoopTrap = 99999999999;
      Blockly.JavaScript
        .INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
      this.deleteStrayBlocks();
      this.blocksXmlStr = Blockly.Xml.domToPrettyText(
        Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
      code = `
        ${Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace)}
        try {
          if (typeof trade !== 'undefined') {
            trade();
          }
        } catch (e) {
          if (e.name === 'RuntimeError') {
            // pass
          } else {
            throw e;
          }
        }
      `;
      Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
      this.generatedJs = code;
    } catch (e) {
      if (e.name === 'BlocklyError') {
        // pass
      } else {
        throw e;
      }
    }
    if (code) {
      eval(code); // eslint-disable-line no-eval
      $('#summaryPanel')
        .show();
    }
  }
  addBlocklyTranslation() {
    $.ajaxPrefilter((options) => {
      options.async = true; // eslint-disable-line no-param-reassign
    });
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `js/blockly/msg/js/${translator.getLanguage()}.js`;
    $('body').append(script);
  }
  undo() {
    Blockly.mainWorkspace.undo();
    this.setBlockColors();
  }
  redo() {
    Blockly.mainWorkspace.undo(true);
    this.setBlockColors();
  }
}
