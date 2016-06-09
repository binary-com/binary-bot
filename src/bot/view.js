var globals = require('./globals/globals');
var config = require('./globals/config');
var storageManager = require('./utils/storageManager');
var blockly = require('blockly');
var i18n = require('i18n');
var activeTutorial = null;
var tours = {}; // e
var utils = require('./utils/utils');
var fileSaver = require('filesaverjs');
var trade = require('./utils/trade');
require('./code_generators/index');
require('./definitions/index');
require('./utils/draggable');

var initTours = function initTours() {
	tours.introduction = require('./tours/introduction');
	tours.welcome = require('./tours/welcome');
	tours.welcome.welcome();
};

var uiComponents = {
	tutorialList: '.tutorialList',
	logout: '.logout',
	workspace_inside: 'svg > .blocklyWorkspace > .blocklyBlockCanvas',
	workspace: '.blocklyWorkspace',
	toolbox: '.blocklyToolboxDiv',
	file_management: '.intro-file-management',
	token: '.intro-token',
	run_stop: '.intro-run-stop',
	trash: '.blocklyTrash',
	undo_redo: '.intro-undo-redo',
	summary: '.intro-summary',
	center: '#center',
	flyout: '.blocklyFlyoutBackground',
	submarket: ".blocklyDraggable:contains('Submarket'):last",
	strategy: ".blocklyDraggable:contains('Strategy'):last",
	finish: ".blocklyDraggable:contains('Finish'):last",
};

var doNotHide = ['center', 'flyout', 'workspace_inside', 'trash', 'submarket', 'strategy', 'finish'];

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
	activeTutorial = tours[$('#tours')
		.val()];
	activeTutorial.start();
	$('#tutorialButton')
		.unbind('click', startTutorial);
	$('#tutorialButton')
		.bind('click', stopTutorial);
	$('#tutorialButton')
		.text(i18n._('Stop!'));
};

var stopTutorial = function stopTutorial(e) {
	if (e) {
		e.preventDefault();
	}
	if (activeTutorial) {
		if (e) {
			activeTutorial.stop();
		}
		activeTutorial = null;
	}
	$('#tutorialButton')
		.unbind('click', stopTutorial);
	$('#tutorialButton')
		.bind('click', startTutorial);
	$('#tutorialButton')
		.text(i18n._('Go!'));
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

var updateTokenList = function updateTokenList(tokenToAdd) {
	var tokenList = storageManager.getTokenList();
	blockly.WidgetDiv.hideIfOwner(blockly.mainWorkspace.getBlockById('trade')
		.getField('ACCOUNT_LIST'));
	if (tokenList.length === 0) {
		$('#addAccount')
			.text('Login');
		$('#logout')
			.hide();
		globals.lists.accounts = [
			[i18n._('Please add a token first'), '']
		];
		blockly.mainWorkspace.getBlockById('trade')
			.getField('ACCOUNT_LIST')
			.setValue('');
		blockly.mainWorkspace.getBlockById('trade')
			.getField('ACCOUNT_LIST')
			.setText(i18n._('Please add a token first'));
	} else {
		$('#addAccount')
			.text('Add Token');
		$('#logout')
			.show();
		globals.lists.accounts = [];
		tokenList.forEach(function (tokenInfo) {
			globals.lists.accounts.push([tokenInfo.account_name, tokenInfo.token]);
		});
		var tokenInfoToAdd = tokenList[0];
		if (tokenToAdd !== undefined) {
			var tokenInfoIndex = storageManager.findToken(tokenToAdd);
			if (tokenInfoIndex >= 0) {
				tokenInfoToAdd = tokenList[tokenInfoIndex];
			}
		}
		if (blockly.mainWorkspace.getBlockById('trade')
			.getField('ACCOUNT_LIST')
			.getValue() !== tokenInfoToAdd.token) {
			blockly.mainWorkspace.getBlockById('trade')
				.getField('ACCOUNT_LIST')
				.setValue(tokenInfoToAdd.token);
		}
		if (blockly.mainWorkspace.getBlockById('trade')
			.getField('ACCOUNT_LIST')
			.getText() !== tokenInfoToAdd.account_name) {
			blockly.mainWorkspace.getBlockById('trade')
				.getField('ACCOUNT_LIST')
				.setText(tokenInfoToAdd.account_name);
		}
	}
};

var addPurchaseOptions = function addPurchaseOptions() {
	var firstOption = {};
	var secondOption = {};
	var trade = blockly.mainWorkspace.getBlockById('trade');
	if (trade !== null && trade.getInputTargetBlock('SUBMARKET') !== null && trade.getInputTargetBlock('SUBMARKET')
		.getInputTargetBlock('CONDITION') !== null) {
		var condition_type = trade.getInputTargetBlock('SUBMARKET')
			.getInputTargetBlock('CONDITION')
			.type;
		var opposites = config.opposites[condition_type.toUpperCase()];
		globals.lists.purchase_choices = [];
		opposites.forEach(function (option, index) {
			if (index === 0) {
				firstOption = {
					condition: Object.keys(option)[0],
					name: option[Object.keys(option)[0]],
				};
			} else {
				secondOption = {
					condition: Object.keys(option)[0],
					name: option[Object.keys(option)[0]],
				};
			}
			globals.lists.purchase_choices.push([option[Object.keys(option)[0]], Object.keys(option)[0]]);
		});
		var purchases = [];
		blockly.mainWorkspace.getAllBlocks()
			.forEach(function (block) {
				if (block.type === 'purchase') {
					purchases.push(block);
				}
			});
		purchases.forEach(function (purchase) {
			var value = purchase.getField('PURCHASE_LIST')
				.getValue();
			blockly.WidgetDiv.hideIfOwner(purchase.getField('PURCHASE_LIST'));
			if (value === firstOption.condition) {
				purchase.getField('PURCHASE_LIST')
					.setText(firstOption.name);
			} else if (value === secondOption.condition) {
				purchase.getField('PURCHASE_LIST')
					.setText(secondOption.name);
			} else {
				purchase.getField('PURCHASE_LIST')
					.setValue(firstOption.condition);
				purchase.getField('PURCHASE_LIST')
					.setText(firstOption.name);
			}
		});
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
		updateTokenList();
		addPurchaseOptions();
		blockly.mainWorkspace.clearUndo();
		initTours();
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
				addPurchaseOptions();
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
	.bind('click', startTutorial);
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


module.exports = {
	uiComponents: uiComponents,
	getUiComponent: getUiComponent,
	setOpacityForAll: setOpacityForAll,
	setOpacity: setOpacity,
	stopTutorial: stopTutorial,
	startTutorial: startTutorial,
	addPurchaseOptions: addPurchaseOptions,
	updateTokenList: updateTokenList,
	initTours: initTours,
};