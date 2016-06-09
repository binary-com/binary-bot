var globals = require('../globals/globals');
var config = require('../globals/config');
var storageManager = require('storageManager');
var appId = require('appId');
var blockly = require('blockly');
var commonUtils = require('utils');
var i18n = require('i18n');

var findToken = function findToken(token) {
	var index = -1;
	globals.lists.accounts.forEach(function (tokenInfo, i) {
		if (tokenInfo[1] === token) {
			index = i;
		}
	});
	return index;
};

var logout = function logout() {
	commonUtils.removeAllTokens(function(){
		updateTokenList();
		log(i18n._('Logged you out!'), 'info');
	});
};

var addAccount = function addAccount() {
	var token = prompt(i18n._('Please enter your token here:'), '');
	var index = findToken(token);
	if (index >= 0) {
		log(i18n._('Token already added.'), 'info');
		return;
	}
	if (token === '') {
		showError(i18n._('Token cannot be empty'));
	} else if (token !== null) {
		commonUtils.addTokenIfValid(token, function(){
			updateTokenList(token);
		});
	}
};


var getUTCTime = function getUTCTime(date) {
	var dateObject = new Date(date);
	return ('0' + dateObject.getUTCHours())
		.slice(-2) + ':' + ('0' + dateObject.getUTCMinutes())
		.slice(-2) + ':' + ('0' + dateObject.getUTCSeconds())
		.slice(-2);
};

var showError = function showError(error) {
	if (error.stack) {
		if (globals.isDebug()) {
			console.log('%c' + error.stack, 'color: red');
		} else {
			globals.addLogToQueue('%c' + error.stack, 'color: red');
		}
	}
	var message;
	if (error.message) {
		message = error.message;
	} else {
		message = error;
	}
	$.notify(message, {
		position: 'bottom right',
		className: 'error',
	});
	if (globals.isDebug()) {
		console.log('%cError: ' + message, 'color: red');
	} else {
		globals.addLogToQueue('%cError: ' + message, 'color: red');
	}
};

var log = function log(message, notify_type, position) {
	if (notify_type !== undefined) {
		$.notify(message, {
			position: (position === undefined) ? 'bottom right' : position,
			className: notify_type,
		});
	}
	if (globals.isDebug()) {
		console.log(message);
	} else {
		globals.addLogToQueue(message);
	}
};

var broadcast = function broadcast(eventName, data) {
	window.dispatchEvent(new CustomEvent(eventName, {
		detail: data
	}));
};

var findTopParentBlock = function findTopParentBlock(block) {
	var pblock = block.parentBlock_;
	if (pblock === null) {
		return null;
	}
	while (pblock !== null) {
		block = pblock;
		pblock = block.parentBlock_;
	}
	return block;
};

var updateTokenList = function updateTokenList(tokenToAdd) {
	var tokenList = storageManager.getTokenList();
	blockly.WidgetDiv.hideIfOwner(blockly.mainWorkspace.getBlockById('trade')
		.getField('ACCOUNT_LIST'));
	if (tokenList.length === 0) {
		$('#addAccount')
			.click(function (e) {
				appId.redirectOauth();
			});
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
			.click(function (e) {
				addAccount();
			});
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

module.exports = {
	showError: showError,
	log: log,
	getUTCTime: getUTCTime,
	broadcast: broadcast,
	findTopParentBlock: findTopParentBlock,
	updateTokenList: updateTokenList,
	addPurchaseOptions: addPurchaseOptions,
	logout: logout
};
