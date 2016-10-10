import { observer } from 'binary-common-utils/lib/observer';
import { translator } from '../../../common/translator';
import { bot } from '../../bot';
import { addPurchaseOptions, isMainBlock, save, getMainBlocks } from './utils';
import blocks from './blocks';

const backwardCompatibility = (block) => {
  if (block.getAttribute('type') === 'on_strategy') {
    block.setAttribute('type', 'before_purchase');
  } else if (block.getAttribute('type') === 'on_finish') {
    block.setAttribute('type', 'after_purchase');
  }
  for (const statement of block.getElementsByTagName('statement')) {
    if (statement.getAttribute('name') === 'STRATEGY_STACK') {
      statement.setAttribute('name', 'BEFOREPURCHASE_STACK');
    } else if (statement.getAttribute('name') === 'FINISH_STACK') {
      statement.setAttribute('name', 'AFTERPURCHASE_STACK');
    }
  }
};

const setMainBlocksDeletable = () => {
  for (const block of getMainBlocks()) {
    block.setDeletable(true);
  }
};

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
          this.overrideBlocklyDefaultShape();
          this.blocksXmlStr = Blockly.Xml.domToPrettyText(main);
          Blockly.Xml.domToWorkspace(main.getElementsByTagName('xml')[0], workspace);
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
    const addDownloadToMenu = (block) => {
      if (block instanceof Object) {
        block.customContextMenu = function customContextMenu(options) { // eslint-disable-line no-param-reassign, max-len
          if (!this.isCollapsed()) {
            options.push({
              text: translator.translateText('Download'),
              enabled: true,
              callback: () => {
                const xml = Blockly.Xml.textToDom('<xml xmlns="http://www.w3.org/1999/xhtml" collection="false"></xml>');
                xml.appendChild(Blockly.Xml.blockToDom(this));
                save('binary-bot-block', true, xml);
              },
            });
          }
        };
      }
    };
    for (const blockName of Object.keys(Blockly.Blocks)) {
      addDownloadToMenu(Blockly.Blocks[blockName]);
    }
  }
  addDomBlocks(blockXml) {
    backwardCompatibility(blockXml);
    const blockType = blockXml.getAttribute('type');
    if (isMainBlock(blockType)) {
      for (const b of Blockly.mainWorkspace.getTopBlocks()) {
        if (b.type === blockType) {
          b.dispose();
        }
      }
    }
    Blockly.Xml.domToBlock(blockXml, Blockly.mainWorkspace);
  }
  loadWorkspace(xml) {
    Blockly.mainWorkspace.clear();
    for (const block of xml.children) {
      backwardCompatibility(block);
    }
    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
    this.blocksXmlStr = Blockly.Xml.domToPrettyText(
      Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
    observer.emit('ui.log.success',
      translator.translateText('Blocks are loaded successfully'));
  }
  loadBlocks(xml) {
    for (const block of xml.children) {
      this.addDomBlocks(block);
    }
    this.blocksXmlStr = Blockly.Xml.domToPrettyText(
      Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
    observer.emit('ui.log.success',
      translator.translateText('Blocks are loaded successfully'));
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
  load(blockStr = '') {
    if (blockStr.indexOf('<xml') !== 0) {
      observer.emit('ui.log.error',
        translator.translateText('Unrecognized file format.'));
    } else {
      try {
        const xml = Blockly.Xml.textToDom(blockStr);
        if (xml.hasAttribute('collection') && xml.getAttribute('collection') === 'true') {
          this.loadBlocks(xml);
        } else {
          this.loadWorkspace(xml);
        }
        setMainBlocksDeletable();
        addPurchaseOptions();
      } catch (e) {
        if (e.name === 'BlocklyError') {
          // pass
        } else {
          observer.emit('ui.log.error',
            translator.translateText('Unrecognized file format.'));
        }
      }
    }
  }
  save(filename, collection) {
    save(filename, collection, Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
  }
  run() {
    let code;
    try {
      window.LoopTrap = 99999999999;
      Blockly.JavaScript
        .INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
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
  }
  redo() {
    Blockly.mainWorkspace.undo(true);
  }
}
