import fileSaver from 'filesaverjs';
import { observer } from 'binary-common-utils/lib/observer';
import { translator } from '../../../common/translator';
import { bot } from '../../bot';
import { utils } from './utils.js';
import codeGenerators from './code_generators';
import definitions from './definitions';

export default class _Blockly {
  constructor() {
    this.blocksXmlStr = '';
    this.generatedJs = '';
    this.addBlocklyTranslation();
    this.initPromise = new Promise((resolve) => {
      $.get('xml/toolbox.xml', (toolbox) => {
        codeGenerators();
        definitions();
        let workspace = Blockly.inject('blocklyDiv', {
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
          utils.addPurchaseOptions();
          resolve();
        });
      });
    });
  }
  zoomOnPlusMinus(zoomIn) {
    let metrics = Blockly.mainWorkspace.getMetrics();
    if (zoomIn) {
      Blockly.mainWorkspace.zoom(metrics.viewWidth / 2, metrics.viewHeight / 2, 1);
    } else {
      Blockly.mainWorkspace.zoom(metrics.viewWidth / 2, metrics.viewHeight / 2, -1);
    }
  }
  createXmlTag(obj) {
    let xmlStr = '<category name="Markets" colour="#2a3052" i18n-text="Markets">\n';
    for (let market of Object.keys(obj)) {
      xmlStr += '\t<category name="' + obj[market].name + '" colour="#2a3052">\n';
      for (let submarket of Object.keys(obj[market].submarkets)) {
        xmlStr += '\t\t<category name="' + obj[market].submarkets[submarket].name + '" colour="#2a3052">\n';
        for (let symbol of Object.keys(obj[market].submarkets[submarket].symbols)) {
          xmlStr += '\t\t\t<block type="' + symbol.toLowerCase() + '"></block>\n';
        }
        xmlStr += '\t\t</category>\n';
      }
      xmlStr += '\t</category>\n';
    }
    xmlStr += '</category>\n';
    return xmlStr;
  }
  xmlToStr(xml) {
    let serializer = new XMLSerializer();
    return serializer.serializeToString(xml);
  }
  marketsToXml(xml) {
    let xmlStr = this.xmlToStr(xml);
    let marketXml = this.createXmlTag(bot.symbol.activeSymbols.getMarkets(), bot.symbol.assetIndex);
    return xmlStr.replace('<!--Markets-->', marketXml);
  }
  disableDeleteForMainBlocks() {
    Blockly.mainWorkspace.getBlockById('trade')
      .setDeletable(false);
    Blockly.mainWorkspace.getBlockById('strategy')
      .setDeletable(false);
    Blockly.mainWorkspace.getBlockById('finish')
      .setDeletable(false);
  }
  overrideBlocklyDefaultShape() {
    Blockly.Blocks.text.newQuote_ = (open) => {
      let file;
      if (open === this.RTL) {
        file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAYAAAAGuM1UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFpJREFUeNpiZGBg+M+ACRyh9H50CSYGEsEg1AACDlB8HxoAIKwAxAJIcu+h4u+RNcEUz0czMAFJroEBKfiQTUcG95FMF2BBUnAAiA8C8QM05z6A4o1A/AEgwACTSBqO/l02SwAAAABJRU5ErkJggg==';
      } else {
        file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAYAAAAGuM1UAAAAAXNSR0IArs4c6QAAActpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgSW1hZ2VSZWFkeTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KKS7NPQAAAHFJREFUGBljYICAAiC1H4odIEJwsgHIgskpgEQFgPg9EP8H4vtAjAwUgByQOAjvB2IwaACSMMEEsAiCmI8k5wASZgRikOkgWz4AcSAQg8AFIAaJ3QdxgOABECeCGCANINPRgSNUYD+6BBO6ACH+INQAAKsvFws0VtvEAAAAAElFTkSuQmCC';
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
  loadBlocks(str) {
    if (str) {
      this.blocksXmlStr = str;
    }
    Blockly.mainWorkspace.clear();
    let xml = Blockly.Xml.textToDom(this.blocksXmlStr);
    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
    this.reconfigureBlocklyAfterLoad();
  }
  reconfigureBlocklyAfterLoad() {
    Blockly.mainWorkspace.clearUndo();
    this.setBlockColors();
    utils.addPurchaseOptions();
  }
  selectBlockByText(text) {
    let returnVal;
    $('.blocklyText').each(function() {
      if ($(this).text().indexOf(text) >= 0) {
        returnVal = $(this).parent()[0];
      }
    });
    return returnVal;
  }
  selectTextBlock(text) {
    let returnVal;
    $('.blocklyText').each(function() {
      if ($(this).text() === text) {
        returnVal = this;
      }
    });
    return returnVal;
  }
  setBlockColors() {
    this.selectTextBlock('Step 1: Define Trade').style.setProperty('fill', 'white', 'important');
    this.selectTextBlock('Step 2: Before Purchase').style.setProperty('fill', 'white', 'important');
    this.selectTextBlock('Step 3: After Purchase').style.setProperty('fill', 'white', 'important');
  }
  saveXml(showOnly) {
    let xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
		for (let field of Array.prototype.slice.apply(xmlDom.getElementsByTagName('field'))) {
			if (field.getAttribute('name') === 'ACCOUNT_LIST') {
				if (field.childNodes.length >= 1) {
					field.childNodes[0].nodeValue = '';
				}
			}
		}
		for (let block of Array.prototype.slice.apply(xmlDom.getElementsByTagName('block'))) {
			switch (block.getAttribute('type')) {
				case 'trade':
					block.setAttribute('id', 'trade');
					break;
				case 'on_strategy':
					block.setAttribute('id', 'strategy');
					break;
				case 'on_finish':
					block.setAttribute('id', 'finish');
					break;
				default:
					block.removeAttribute('id');
					break;
			}
		}
    let xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    if (showOnly) {
      observer.emit('ui.log', xmlText);
    } else {
      let filename = 'binary-bot' + parseInt(new Date()
            .getTime() / 1000, 10) + '.xml';
      let blob = new Blob([xmlText], {
        type: 'text/xml;charset=utf-8',
      });
      fileSaver.saveAs(blob, filename);
    }
  }
  run() {
    try {
      window.LoopTrap = 1000;
      Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
      let topBlocks = Blockly.mainWorkspace.getTopBlocks();
      for (let block of topBlocks) {
        if (['on_strategy', 'on_finish', 'trade'].indexOf(block.type) < 0
          && block !== utils.findTopParentBlock(Blockly.mainWorkspace.getBlockById('trade'))) {
          block.dispose();
        }
      }
      let code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace) + '\n trade();';
      Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
      let EVAL_BLOCKLY_CODE = eval;
      this.generatedJs = code;
      EVAL_BLOCKLY_CODE(code);
      $('#summaryPanel')
        .show();
    } catch (e) {
      observer.emit('ui.log', 'There was a problem running your blocks');
      observer.emit('ui.error', e);
      bot.stop();
    }
  }
  addBlocklyTranslation() {
    $.ajaxPrefilter((options) => {
      options.async = true;
    });
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'js/blockly/msg/js/' + translator.getLanguage() + '.js';
    $('body').append(script);
  }
  undo() {
    Blockly.mainWorkspace.undo();
  }
  redo() {
    Blockly.mainWorkspace.undo(true);
  }
}
