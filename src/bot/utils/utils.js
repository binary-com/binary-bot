var globals = require('../globals/globals');
var config = require('../globals/config');
var activeSymbols = require('./active_symbols');
var storageManager = require('storageManager');
var appId = require('appId');
var blockly = require('blockly');
var commonUtils = require('utils');
var i18n = require('i18n');

var isConditionAllowedInSymbol = function isConditionAllowedInSymbol(symbol, condition) {
	var allowedConditions = getAllowedConditions(symbol).conditions;
	return allowedConditions.indexOf(condition) >= 0;
};

var getFirstObjectValue = function getFirstObjectValue(obj) {
	return obj[Object.keys(obj)[0]];
};

var getConditionName = function getConditionName(condition) {
	var opposites = config.opposites[condition.toUpperCase()];
	return getFirstObjectValue(opposites[0]) + '/' + getFirstObjectValue(opposites[1]);
};

var getCategory = function getCategory(condition) {
	for( var category in config.conditionsCategory ) {
		if ( config.conditionsCategory[category].indexOf(condition.toLowerCase()) >= 0 ) {
			return category;
		}
	}
};

var getCategoryName = function getCategoryName(condition) {
	return config.conditionsCategoryName[getCategory(condition)];
};

var getAllowedCategoryNames = function getAllowedCategoryNames(symbol) {
	var allowedCategories = getAllowedConditions(symbol).categories;
	return allowedCategories.map(function(el){
		return config.conditionsCategoryName[el];
	});
};

var getAllowedConditions = function getAllowedConditions(symbol) {
	var allowedConditions = [];
	var allowedCategories = [];
	globals.assetIndex.forEach(function(assetIndex){
		if (assetIndex[0].toLowerCase() === symbol.toLowerCase()) {
			assetIndex[2].forEach(function(conditionInfo){
				var conditionName = conditionInfo[0];
				if ( config.conditionsCategory.hasOwnProperty(conditionName) ) {
					allowedConditions = allowedConditions.concat(config.conditionsCategory[conditionName]);
					allowedCategories.push(conditionName);
				}
			});
		}
	});
	return {
		conditions: allowedConditions,
		categories: allowedCategories
	};
};

var findSymbol = function findSymbol(symbol) {
	var activeSymbols = globals.activeSymbols.getSymbolNames();
	var result;
	Object.keys(activeSymbols).forEach(function(key){
		if (key.toLowerCase() === symbol.toLowerCase()) {
			if (!result) {
				result = {};
			}
			result[key] = activeSymbols[key];
		}
	});
	return result;
};

var getAssetIndex = function getAssetIndex(api, cb) {
	api.getAssetIndex().then(function(response){
		globals.assetIndex = response.asset_index;
		if ( cb ) {
			cb();
		}
	});
};

var createXmlTag = function createXmlTag(obj) {
	var xmlStr = '<category name="Markets" colour="#2a3052" i18n-text="Markets">\n';
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
};

var xmlToStr = function xmlToStr(xml){
	var serializer = new XMLSerializer();
	return serializer.serializeToString(xml);
};

var marketsToXml = function marketsToXml(xml){
	var xmlStr = xmlToStr(xml);
	var marketXml = createXmlTag(globals.activeSymbols.getMarkets());
	return xmlStr.replace('<!--Markets-->', marketXml);
};

var getActiveSymbols = function getActiveSymbols(callback) {
	var LiveApi = require('binary-live-api')
		.LiveApi;
	var api = new LiveApi();
	api.getActiveSymbolsBrief().then(function(response){
		activeSymbols.getMarkets(response.active_symbols);
		getAssetIndex(api, function(){
			callback(activeSymbols);
		});
	});
};

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
	if (tokenList.length === 0) {
		$('#login').show();
		$('#accountSelect').hide();
		$('#logout').hide();
	} else {
		$('#login').hide();
		$('#accountSelect').show();
		$('#logout').show();
		tokenList.forEach(function (tokenInfo) {
			var str;
			if ( tokenInfo.hasOwnProperty('isVirtual') ) {
				str = (tokenInfo.isVirtual) ? 'Virtual Account' : 'Real Account';
			} else {
				str = '';
			}
			$('#accountSelect').append('<option value="' + tokenInfo.token + '">'+str + ' (' + tokenInfo.account_name+ ') ' + '</option>');
		});
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

$('#login')
	.bind('click.login', function(e){
		appId.redirectOauth();
	})
	.text('Log in');
module.exports = {
	showError: showError,
	log: log,
	getUTCTime: getUTCTime,
	broadcast: broadcast,
	findTopParentBlock: findTopParentBlock,
	updateTokenList: updateTokenList,
	addPurchaseOptions: addPurchaseOptions,
	logout: logout,
	getActiveSymbols: getActiveSymbols,
	marketsToXml: marketsToXml,
	xmlToStr: xmlToStr,
	findSymbol: findSymbol,
	getAssetIndex: getAssetIndex,
	isConditionAllowedInSymbol: isConditionAllowedInSymbol,
	getAllowedCategoryNames: getAllowedCategoryNames,
	getCategoryName: getCategoryName,
	getConditionName: getConditionName
};
