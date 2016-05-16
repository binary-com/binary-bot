var globals = require('../globals/globals');
var config = require('../globals/config');
var storageManager = require('./storageManager');
var blockly = require('blockly');
var i18n = require('i18n');
var activeTutorial = null;
var tours = {}; // e

var initTours = function initTours(){
	tours.introduction = require('../tours/introduction');
	tours.welcome = require('../tours/welcome');
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
		$('#addAccount').text('Login');
		$('#logout').hide();
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
		$('#addAccount').text('Add Token');
		$('#logout').show();
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
