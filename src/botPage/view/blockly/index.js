'use strict';
import fileSaver from 'filesaverjs';
import config from 'const';
import Translator from 'translator';
import tools from 'binary-common-utils/tools';
import Observer from 'binary-common-utils/observer';
import Bot from '../../bot';
import Utils from './utils.js';
import codeGenerators from './code_generators';
import definitions from './definitions';

var _Blockly = function _Blockly(){
	if ( _Blockly.instance ) {
		return _Blockly.instance;
	}
	_Blockly.instance = this;
	this.blocksXmlStr = '';
	this.generatedJs = '';
	this.observer = new Observer();
	this.bot = new Bot();
	this.utils = new Utils();
	this.translator = new Translator();
	this.addBlocklyTranslation();
	var that = this;
	this.initPromise = new Promise(function(resolve, reject){
		$.get('xml/toolbox.xml', function (toolbox) {
			codeGenerators();
			definitions();
			var workspace = Blockly.inject('blocklyDiv', {
				media: 'js/blockly/media/',
				toolbox: that.xmlToStr(that.translator.translateXml($.parseXML(that.marketsToXml(toolbox.getElementsByTagName('xml')[0])))),
				zoom: {
					wheel: false,
				},
				trashcan: false,
				collapse: false,
			});
			$.get('xml/main.xml', function (main) {
				that.blocksXmlStr = Blockly.Xml.domToPrettyText(main);
				Blockly.Xml.domToWorkspace(main.getElementsByTagName('xml')[0], workspace);
				that.disableDeleteForMainBlocks();
				that.overrideBlocklyDefaultShape();
				that.zoomOnPlusMinus();
				Blockly.mainWorkspace.clearUndo();
				that.utils.addPurchaseOptions();
				resolve();
			});
		});
	});
};

_Blockly.prototype = Object.create(null, {
	zoomOnPlusMinus: {
		value: function zoomOnPlusMinus(zoomIn){
			var metrics = Blockly.mainWorkspace.getMetrics();
			if ( zoomIn ) {
				Blockly.mainWorkspace.zoom(metrics.viewWidth/2, metrics.viewHeight/2, 1);
			} else {
				Blockly.mainWorkspace.zoom(metrics.viewWidth/2, metrics.viewHeight/2, -1);
			}
		}
	},
	createXmlTag: {
		value: function createXmlTag(obj, assetIndex) {
			var xmlStr = '<category name="Markets" colour="#2a3052" i18n-text="Markets">\n';
			var that = this;
			Object.keys(obj).forEach(function(market){
				xmlStr += '\t<category name="'+ obj[market].name +'" colour="#2a3052">\n';
					Object.keys(obj[market].submarkets).forEach(function(submarket){
						xmlStr += '\t\t<category name="'+ obj[market].submarkets[submarket].name +'" colour="#2a3052">\n';
							Object.keys(obj[market].submarkets[submarket].symbols).forEach(function(symbol){
								xmlStr += '\t\t\t<block type="'+ symbol.toLowerCase() +'"></block>\n';
							});
						xmlStr += '\t\t</category>\n';
					});
				xmlStr += '\t</category>\n';
			});
			xmlStr += '</category>\n';
			return xmlStr;
		}
	},
	xmlToStr: {
		value: function xmlToStr(xml){
			var serializer = new XMLSerializer();
			return serializer.serializeToString(xml);
		}
	},
	marketsToXml: {
		value: function marketsToXml(xml){
			var xmlStr = this.xmlToStr(xml);
			var marketXml = this.createXmlTag(this.bot.symbol.activeSymbols.getMarkets(), this.bot.symbol.assetIndex);
			return xmlStr.replace('<!--Markets-->', marketXml);
		}
	},
	disableDeleteForMainBlocks: {
		value: function disableDeleteForMainBlocks(){
			Blockly.mainWorkspace.getBlockById('trade')
				.setDeletable(false);
			Blockly.mainWorkspace.getBlockById('strategy')
				.setDeletable(false);
			Blockly.mainWorkspace.getBlockById('finish')
				.setDeletable(false);
		}
	},
	overrideBlocklyDefaultShape: {
		value: function overrideBlocklyDefaultShape(){
			Blockly.Blocks.text.newQuote_ = function(open) {
				var file;
				if (open == this.RTL) {
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
	},
	loadBlocks: {
		value: function loadBlocks(str){
			if ( str ) {
				this.blocksXmlStr = str;
			}
			Blockly.mainWorkspace.clear();
			var xml = Blockly.Xml.textToDom(this.blocksXmlStr);
			Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
			this.reconfigureBlocklyAfterLoad();
		}
	},
	reconfigureBlocklyAfterLoad: {
		value: function reconfigureBlocklyAfterLoad(){
			Blockly.mainWorkspace.clearUndo();
			this.setBlockColors();
			this.utils.addPurchaseOptions();
		}
	},
	selectBlockByText: {
		value: function selectBlockByText(text) {
			var returnVal;
			$('.blocklyText').each(function(){
				if ( $(this).text().indexOf(text) >= 0 ){
					returnVal = $(this).parent()[0];
				}
			});
			return returnVal;
		}
	},
	selectTextBlock: {
		value: function selectTextBlock(text) {
			var returnVal;
			$('.blocklyText').each(function(){
				if ( $(this).text() === text ){
					returnVal = this;
				}
			});
			return returnVal;
		}
	},
	setBlockColors: {
		value: function setBlockColors() {
			this.selectTextBlock('Step 1: Define Trade').style.setProperty('fill', 'white', 'important');
			this.selectTextBlock('Step 2: Strategy').style.setProperty('fill', 'white', 'important');
			this.selectTextBlock('Step 3: Result').style.setProperty('fill', 'white', 'important');
		}
	},
	saveXml: {
		value: function saveXml(showOnly) {
			var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
			Array.prototype.slice.apply(xmlDom.getElementsByTagName('field'))
				.forEach(function (field) {
					if (field.getAttribute('name') === 'ACCOUNT_LIST') {
						if (field.childNodes.length >= 1) {
							field.childNodes[0].nodeValue = '';
						}
					}
				});
			Array.prototype.slice.apply(xmlDom.getElementsByTagName('block'))
				.forEach(function (block) {
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
				});
			var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
			if (showOnly) {
				this.observer.emit('ui.log', xmlText);
			} else {
				var filename = 'binary-bot' + parseInt(new Date()
					.getTime() / 1000) + '.xml';
				var blob = new Blob([xmlText], {
					type: 'text/xml;charset=utf-8'
				});
				fileSaver.saveAs(blob, filename);
			}
		}
	},
	run: {
		value: function run() {
			try {
				window.LoopTrap = 1000;
				Blockly.JavaScript.INFINITE_LOOP_TRAP =
					'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
				var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace) + '\n trade();';
				Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
				var EVAL_BLOCKLY_CODE = eval;
				this.generatedJs = code;
				EVAL_BLOCKLY_CODE(code);
				$('#summaryPanel')
					.show();
			} catch (e) {
				this.observer.emit('ui.log', 'There was a problem running your blocks');
				this.observer.emit('ui.error', e);
				this.bot.stop();
			}
		}
	},
	addBlocklyTranslation: {
		value: function addBlocklyTranslation(){
			$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
				 options.async = true;
			});
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'js/blockly/msg/js/' + this.translator.getLanguage() + '.js';		
			$('body').append(script);
		}
	},
	undo: {
		value: function undo(){
			Blockly.mainWorkspace.undo();
		}
	},
	redo: {
		value: function redo(){
			Blockly.mainWorkspace.undo(true);
		}
	}
});

module.exports = _Blockly;
