var view = require('./utils/view');
var utils = require('./utils/utils');
var globals = require('./globals/globals');
var storageManager = require('./utils/storageManager');
var blockly = require('blockly');
var fileSaver = require('filesaverjs');
var trade = require('./utils/trade');
var i18n = require('i18n');
require('./code_generators/index');
require('./definitions/index');
require('./utils/draggable');

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
		utils.log(xmlText);
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
		$('#stopButton')
			.text('Stop');
		$('#runButton')
			.text('Restart');
		$('#summaryPanel')
			.show();
		$('#stopButton')
			.unbind('click', reset);
		$('#stopButton')
			.bind('click', stop);
	} catch (e) {
		utils.showError(e);
	}
};

$.get('xml/toolbox.xml', function (toolbox) {
	var workspace = blockly.inject('blocklyDiv', {
		media: 'js/blockly/media/',
		toolbox: i18n.xml(toolbox.getElementsByTagName('xml')[0]),
		zoom: {
			controls: true,
			wheel: false,
			startScale: 1.0,
			maxScale: 3,
			minScale: 0.3,
			scaleSpeed: 1.2
		},
		trashcan: true,
	});
	$.get('xml/main.xml', function (main) {
		blockly.Xml.domToWorkspace(main.getElementsByTagName('xml')[0], workspace);
		blockly.mainWorkspace.getBlockById('trade')
			.setDeletable(false);
		blockly.mainWorkspace.getBlockById('strategy')
			.setDeletable(false);
		blockly.mainWorkspace.getBlockById('finish')
			.setDeletable(false);
		view.updateTokenList();
		view.addPurchaseOptions();
		blockly.mainWorkspace.clearUndo();
		view.initTours();
	});
});

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
			utils.log(i18n._('File is not supported:' + ' ') + file.name, 'info');
		}
	}
};

var readFile = function readFile(f) {
	reader = new FileReader();
	reader.onload = (function (theFile) {
		return function (e) {
			try {
				blockly.mainWorkspace.clear();
				var xml = blockly.Xml.textToDom(e.target.result);
				blockly.Xml.domToWorkspace(xml, blockly.mainWorkspace);
				view.addPurchaseOptions();
				var tokenList = storageManager.getTokenList();
				if (tokenList.length !== 0) {
					blockly.mainWorkspace.getBlockById('trade')
						.getField('ACCOUNT_LIST')
						.setValue(tokenList[0].token);
					blockly.mainWorkspace.getBlockById('trade')
						.getField('ACCOUNT_LIST')
						.setText(tokenList[0].account_name);
				}
				blockly.mainWorkspace.clearUndo();
				blockly.mainWorkspace.zoomToFit();
				utils.log(i18n._('Blocks are loaded successfully'), 'success');
			} catch (err) {
				utils.showError(err);
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

var dropZone = document.getElementById('drop_zone');

dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
document.getElementById('files')
	.addEventListener('change', handleFileSelect, false);

var reset = function reset(e) {
	if (e) {
		e.preventDefault();
	}
	globals.resetTradeInfo();
	utils.log(i18n._('Reset successful'), 'success');
};

var stop = function stop(e) {
	if (e) {
		e.preventDefault();
	}
	trade.stop();
	globals.disableRun(false);
	$('#stopButton')
		.text(i18n._('Reset'));
	$('#runButton')
		.text(i18n._('Run'));
	$('#stopButton')
		.unbind('click', stop);
	$('#stopButton')
		.bind('click', reset);
};

$('#tutorialButton')
	.bind('click', view.startTutorial);
$('#stopButton')
	.text(i18n._('Reset'));
$('#stopButton')
	.bind('click', reset);

$('#summaryPanel .exitPanel')
	.click(function () {
		$(this)
			.parent()
			.hide();
	});

$('#summaryPanel')
	.hide();

$('#summaryPanel')
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

$('#addAccount')
	.click(function (e) {
		addAccount();
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

$('#run')
	.click(function (e) {
		run();
	});

var addAccount = function addAccount() {
	var token = prompt(i18n._('Please enter your token here:'), '');
	trade.addAccount(token);
};

$('#logout')
	.click(function (e) {
		trade.logout();
	});

$('#runButton')
	.click(function (e) {
		run();
	});
