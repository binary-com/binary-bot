var globals = require('./globals/globals');
var config = require('./globals/config');
var storageManager = require('storageManager');
var blockly = require('blockly');
var i18n = require('i18n');
var appId = require('appId');
var activeTutorial = null;
var tours = {}; // e
var botUtils = require('./utils/utils');
var commonUtils = require('utils');
var fileSaver = require('filesaverjs');
require('./utils/draggable');

var initTours = function initTours() {
  tours.introduction = require('./tours/introduction').init();
  tours.welcome = require('./tours/welcome').init();
  if ( tours.welcome.welcome() ){
    activeTutorial = tours.welcome;
  }
};

var selectBlockByText = function selectBlockByText(text) {
  var returnVal;
  $('.blocklyText').each(function(){
    if ( this.innerHTML === text ){
      returnVal = $(this).parent()[0];
    }
  });
  return returnVal;
};

var selectTextBlock = function selectTextBlock(text) {
  var returnVal;
  $('.blocklyText').each(function(){
    if ( this.innerHTML === text ){
      returnVal = this;
    }
  });
  return returnVal;
};

var setBlockColors = function setBlockColors() {
  selectTextBlock('Step&nbsp;1:&nbsp;Define&nbsp;Trade').style.setProperty('fill', 'white', 'important');
  selectTextBlock('Step&nbsp;2:&nbsp;Strategy').style.setProperty('fill', 'white', 'important');
  selectTextBlock('Step&nbsp;3:&nbsp;Result').style.setProperty('fill', 'white', 'important');
};

var uiComponents = {
  tutorialList: '.tutorialList',
  logout: '.logout',
  workspace_inside: 'svg > .blocklyWorkspace > .blocklyBlockCanvas',
  workspace: '.blocklyWorkspace',
  toolbox: '.blocklyToolboxDiv',
  group_load: '.group-load',
  token: '.intro-token',
  group_save: '.group-save',
  group_undo_redo: '.group-undo-redo',
  group_summary: '.group-summary',
  group_start_stop: '.group-start-stop',
  center: '#center',
  flyout: '.blocklyFlyoutBackground',
  submarket: ".blocklyDraggable:contains('Trade'):last",
  strategy: ".blocklyDraggable:contains('Strategy'):last",
  finish: ".blocklyDraggable:contains('Result'):last",
};

var doNotHide = ['center', 'flyout', 'workspace_inside', 'submarket', 'strategy', 'finish'];

var getUiComponent = function getUiComponent(component) {
  return $(uiComponents[component]);
};

var startTutorial = function startTutorial(e) {
  if (e) {
    e.preventDefault();
  }
  if (activeTutorial) {
    activeTutorial.stop();
  }
  $('#tours').on('change', function(e) {
      var value = $(this).val();
      if (value === '') return;
      activeTutorial = tours[value];
      activeTutorial.start();
  });
};

var stopTutorial = function stopTutorial(e) {
  if (e) {
    e.preventDefault();
  }
  if (activeTutorial) {
      activeTutorial.stop();
      activeTutorial = null;
  }
};

var setOpacityForAll = function setOpacityForAll(enabled, opacity) {
	if (enabled) {
		Object.keys(uiComponents)
			.forEach(function (key) {
				if (doNotHide.indexOf(key) < 0) {
					getUiComponent(key)
						.css('opacity', opacity);
					var disabled = +opacity < 1;
					getUiComponent(key)
						.find('button')
						.prop('disabled', disabled);
					getUiComponent(key)
						.find('input')
						.prop('disabled', disabled);
					getUiComponent(key)
						.find('select')
						.prop('disabled', disabled);
				}
			});
	}
};

var setOpacity = function setOpacity(enabled, componentName, opacity) {
	if (enabled) {
		getUiComponent(componentName)
			.css('opacity', opacity);
		var disabled = +opacity < 1;
		getUiComponent(componentName)
			.find('button')
			.prop('disabled', disabled);
		getUiComponent(componentName)
			.find('input')
			.prop('disabled', disabled);
		getUiComponent(componentName)
			.find('select')
			.prop('disabled', disabled);
	}
};

var saveXml = function saveXml(showOnly) {
	var xmlDom = blockly.Xml.workspaceToDom(blockly.mainWorkspace);
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
	var xmlText = blockly.Xml.domToPrettyText(xmlDom);
	if (showOnly) {
		botUtils.log(xmlText);
	} else {
		var filename = 'binary-bot' + parseInt(new Date()
			.getTime() / 1000) + '.xml';
		var blob = new Blob([xmlText], {
			type: 'text/xml;charset=utf-8'
		});
		fileSaver.saveAs(blob, filename);
	}
};

var run = function run() {
	// Generate JavaScript code and run it.
	try {
		window.LoopTrap = 1000;
		blockly.JavaScript.INFINITE_LOOP_TRAP =
			'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
		var code = blockly.JavaScript.workspaceToCode(blockly.mainWorkspace);
		blockly.JavaScript.INFINITE_LOOP_TRAP = null;
		var EVAL_BLOCKLY_CODE = eval;
		EVAL_BLOCKLY_CODE(code);
		$('#summaryPanel')
			.show();
		$('#stopButton')
			.unbind('click', reset);
		$('#stopButton')
			.bind('click', stop);
	} catch (e) {
		botUtils.showError(e);
	}
};

var handleFileSelect = function handleFileSelect(e) {
	var files;
	if (e.type === 'drop') {
		e.stopPropagation();
		e.preventDefault();
		files = e.dataTransfer.files;
	} else {
		files = e.target.files;
	}
	files = Array.prototype.slice.apply(files);
	var file = files[0];
	if (file) {
		if (file.type.match('text/xml')) {
			readFile(file);
		} else {
			botUtils.log(i18n._('File is not supported:' + ' ') + file.name, 'info');
		}
	}
};

var readFile = function readFile(f) {
	reader = new FileReader();
	reader.onload = (function (theFile) {
    $('#fileBrowser').hide();
		return function (e) {
			try {
				blockly.mainWorkspace.clear();
				var xml = blockly.Xml.textToDom(e.target.result);
				blockly.Xml.domToWorkspace(xml, blockly.mainWorkspace);
				botUtils.addPurchaseOptions();
				blockly.mainWorkspace.clearUndo();
				blockly.mainWorkspace.zoomToFit();
        setBlockColors();
				botUtils.log(i18n._('Blocks are loaded successfully'), 'success');
			} catch (err) {
				botUtils.showError(err);
			}
		};
	})(f);
	reader.readAsText(f);
};

var handleDragOver = function handleDragOver(e) {
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
};

var dropZone = document.getElementById('dropZone');

var reset = function reset(e) {
	if (e) {
		e.preventDefault();
	}
	globals.resetTradeInfo();
	botUtils.log(i18n._('Reset successful'), 'success');
};

var stop = function stop(e) {
	if (e) {
		e.preventDefault();
	}
	var trade = require('./trade/trade');
	trade.stop();
	globals.disableRun(false);
};

var show = function show(done) {
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  if (document.getElementById('files')) {
      document.getElementById('files')
        .addEventListener('change', handleFileSelect, false);
  }
  $('#open_btn')
        .on('click', function() {
            $.FileDialog({
                  accept: ".xml",
                  cancelButton: "Close",
                  dragMessage: "Drop files here",
                  dropheight: 400,
                  errorMessage: "An error occured while loading file",
                  multiple: false,
                  okButton: "OK",
                  readAs: "DataURL",
                  removeMessage: "Remove&nbsp;file",
                  title: "Load file"
            });
        })
        .on('files.bs.filedialog', function(ev) {
            var files_list = ev.files;
            handleFileSelect(files_list);
        })
        .on('cancel.bs.filedialog', function(ev) {
            handleFileSelect(ev);
        });

  startTutorial();
  $('#stopButton')
    .bind('click', reset);

  $('.panelExitButton')
    .click(function () {
      $(this)
        .parent()
        .hide();
    });

  $('.panel')
    .hide();

  $('.panel')
    .drags();

  $('#chart')
    .mousedown(function (e) { // prevent chart to trigger draggable
      e.stopPropagation();
    });

  $('table')
    .mousedown(function (e) { // prevent tables to trigger draggable
      e.stopPropagation();
    });

  globals.showTradeInfo();
  $('#saveXml')
    .click(function (e) {
      saveXml();
    });

  $('#undo')
    .click(function (e) {
      globals.undoBlocks();
    });

  $('#redo')
    .click(function (e) {
      globals.redoBlocks();
    });

  $('#showSummary')
    .click(function (e) {
      $('#summaryPanel')
        .show();
    });

 $('#loadXml')
    .click(function (e) {
      $('#fileBrowser')
        .show();
    });

  $('#run')
    .click(function (e) {
      run();
    });

  $('#logout')
    .click(function (e) {
      botUtils.logout();
      $('.logout').addClass('invisible');
    });

  $('#runButton')
    .click(function (e) {
      run();
    });

  $.get('xml/toolbox.xml', function (toolbox) {
    require('./code_generators');
    require('./definitions');
    Blockly.Blocks.text.newQuote_ = function(open) {
      var file;
      
      if (open == this.RTL) {
        file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAYAAAAGuM1UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFpJREFUeNpiZGBg+M+ACRyh9H50CSYGEsEg1AACDlB8HxoAIKwAxAJIcu+h4u+RNcEUz0czMAFJroEBKfiQTUcG95FMF2BBUnAAiA8C8QM05z6A4o1A/AEgwACTSBqO/l02SwAAAABJRU5ErkJggg==';
      } else {
        file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAYAAAAGuM1UAAAAAXNSR0IArs4c6QAAActpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgSW1hZ2VSZWFkeTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KKS7NPQAAAHFJREFUGBljYICAAiC1H4odIEJwsgHIgskpgEQFgPg9EP8H4vtAjAwUgByQOAjvB2IwaACSMMEEsAiCmI8k5wASZgRikOkgWz4AcSAQg8AFIAaJ3QdxgOABECeCGCANINPRgSNUYD+6BBO6ACH+INQAAKsvFws0VtvEAAAAAElFTkSuQmCC';
      }
      return new Blockly.FieldImage(file, 12, 12, '"');
    };

    var workspace = blockly.inject('blocklyDiv', {
      media: 'js/blockly/media/',
      toolbox: botUtils.xmlToStr(i18n.xml($.parseXML(botUtils.marketsToXml(toolbox.getElementsByTagName('xml')[0])))),
      zoom: {
        wheel: false,
      },
      trashcan: false,
    });
    $.get('xml/main.xml', function (main) {
      blockly.Xml.domToWorkspace(main.getElementsByTagName('xml')[0], workspace);
      blockly.mainWorkspace.getBlockById('trade')
        .setDeletable(false);
      blockly.mainWorkspace.getBlockById('strategy')
        .setDeletable(false);
      blockly.mainWorkspace.getBlockById('finish')
        .setDeletable(false);
      botUtils.updateTokenList();
      botUtils.addPurchaseOptions();
      blockly.mainWorkspace.clearUndo();
      initTours();
      Blockly.Blocks.texts.HUE = '#dedede';
      Blockly.Blocks.math.HUE = '#dedede';
      Blockly.Blocks.logic.HUE = '#dedede';
      Blockly.Blocks.lists.HUE = '#dedede';
      Blockly.Blocks.variables.HUE = '#dedede';
      Blockly.Blocks.procedures.HUE = '#dedede';
      setBlockColors();
      done();
    });
  });
};

module.exports = {
  uiComponents: uiComponents,
  getUiComponent: getUiComponent,
  setOpacityForAll: setOpacityForAll,
  setOpacity: setOpacity,
  stopTutorial: stopTutorial,
  startTutorial: startTutorial,
  initTours: initTours,
  show: show
};
