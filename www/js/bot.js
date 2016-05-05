/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Bot = {};
	var translator = __webpack_require__(1); // must be on top
	var i18n = __webpack_require__(3);
	translator.Translator(function(){
		Bot.config = __webpack_require__(4);
		Bot.globals = __webpack_require__(5);
		Bot.utils = __webpack_require__(7);
		Bot.version = __webpack_require__(9);
		Bot.conditions = __webpack_require__(10);
		Bot.markets = __webpack_require__(11);
		Bot.trade = __webpack_require__(12);
		Bot.toggleDebug = __webpack_require__(5).toggleDebug;
		var view = __webpack_require__(15); 
	  $('[data-i18n-text]').each(function(){
	    $(this).text(i18n._($(this).attr('data-i18n-text')));
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2);
	var i18n = __webpack_require__(3);
	// handle language in localStorage and query string
	var supportedLanguages = ['zh_tw', 'de', 'id', 'zh_cn', 'it', 'vi', 'ar', 'pl', 'ru', 'pt', 'es', 'fr', 'en'];
	var parseQueryString = function parseQueryString() {
		var str = window.location.search;
		var objURL = {};
		str.replace(
			new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
			function( $0, $1, $2, $3 ){
				objURL[ $1 ] = $3;
			}
		);
		return objURL;
	};
	$('#language').change(function change(e){
		localStorage.lang = e.target.value;
		window.location.search = '?l=' + e.target.value;
	});
	var queryStr = parseQueryString();
	if ( queryStr.hasOwnProperty('l') && queryStr.l !== '' && supportedLanguages.indexOf(queryStr.l) >= 0 ) {
		window.lang = queryStr.l;
		localStorage.lang = queryStr.l;
	} else if (localStorage.lang){
		window.lang = localStorage.lang;
	} else {
		window.lang = 'en';
	}
	$('#language').val(window.lang);
	// end of handling language

	// define the _ function for i18n
	i18n._ = function _(str, opt){
		var key = sha1(str);
		var result = i18n.t(key);
		return (result === '') ? str : result;
	};

	// to include script tag in html without warning
	$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
		options.async = true;
	});

	// definition of the xml function for i18n
	i18n.xml = function xml(dom){
		for ( var i in dom.children ) {
			if ( dom.children.hasOwnProperty(i) && !isNaN(+i) ) {
				var child = dom.children[i];
				var str = child.getAttribute('i18n-text');
				var key;
				var hasTranslation = false;
				if ( str === null ) {
					key = child.getAttribute('i18n');
					if ( key !== null ) {
						hasTranslation = true;
					}
				} else {
					key = sha1(str);
					hasTranslation = true;
				}
				var result = i18n.t(key);
				if ( hasTranslation ) {
					child.setAttribute('name', (result === '') ? str : result);
				}
				if ( child.children.length > 0 ) {
					i18n.xml(child);
				}
			}
		}
		return dom;
	};

	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	var blocklyLang;
	if ( lang === 'zh_tw' ) {
		blocklyLang = 'zh-hant';
	} else if ( lang === 'zh_cn' ) {
		blocklyLang = 'zh-hans';
	} else {
		blocklyLang = lang;
	}
	script.src = 'node_modules/blockly/msg/js/' + blocklyLang + '.js';
	$('body').append(script);

	module.exports = {
		Translator: function Translator(callback){
			// load the language file (this should not be called en)
			$.get('www/i18n/' + lang + '.json', function(translation) {
				var resources = {
					en: {
						translation: translation
					},
				};
				i18n.init({
					lng: 'en',
					fallbackLng: 'en',
					ns: [
						'translation'
					],
					defaultNS: [
						'translation'
					],
					resources: resources
				}, function() {
					callback();
				});
			});
		},
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = i18next;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var i18n = __webpack_require__(3);
	module.exports = {
		lists: {
			PAYOUTTYPE: [
				[i18n._('Payout'), 'payout'],
				[i18n._('Stake'), 'stake']
			],
			CURRENCY: [
				['USD', 'USD'],
				['EUR', 'EUR'],
				['GBP', 'GBP'],
				['AUD', 'AUD']
			],
			DETAILS: [
				[i18n._('statement'), '1'],
				[i18n._('ask price'), '2'],
				[i18n._('payout'), '3'],
				[i18n._('profit'), '4'],
				[i18n._('contract type'), '5'],
				[i18n._('entry spot'), '6'],
				[i18n._('entry value'), '7'],
				[i18n._('exit spot'), '8'],
				[i18n._('exit value'), '9'],
				[i18n._('barrier'), '10'],
			],
			CHECK_RESULT: [
				[i18n._('Win'), 'win'],
				[i18n._('Loss'), 'loss'],
			],
			CHECK_DIRECTION: [
				[i18n._('Up'), 'up'],
				[i18n._('Down'), 'down'],
				[i18n._('No Change'), ''],
			],
		},

		opposites: {
			UPDOWN: [{
				'CALL': i18n._('Up')
			}, {
				'PUT': i18n._('Down')
			}],
			ASIAN: [{
				'ASIANU': i18n._('Asian Up')
			}, {
				'ASIAND': i18n._('Asian Down')
			}],
			MATCHESDIFFERS: [{
				'DIGITMATCH': i18n._('Matches')
			}, {
				'DIGITDIFF': i18n._('Differs')
			}],
			EVENODD: [{
				'DIGITEVEN': i18n._('Even')
			}, {
				'DIGITODD': i18n._('Odd')
			}],
			OVERUNDER: [{
				'DIGITOVER': i18n._('Over')
			}, {
				'DIGITUNDER': i18n._('Under')
			}],
		},

		opposites_have_barrier: [
			'MATCHESDIFFERS',
			'OVERUNDER',
		],

		conditions: ['updown', 'asian', 'matchesdiffers', 'evenodd', 'overunder'],
		ticktrade_markets: ['r_25', 'r_50', 'r_75', 'r_100', 'rdbear', 'rdbull'],
		ticktrade_market_names: [i18n._('Volatility 25 Index'), i18n._('Volatility 50 Index'), i18n._('Volatility 75 Index'), i18n._('Volatility 100 Index'), i18n._('Bear Market Index'), i18n._('Bull Market Index')],
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	var $ = __webpack_require__(2);
	var i18n = __webpack_require__(3);
	var debug = false;
	var logQueue = [];

	var on_finish = function () {};
	var on_strategy = function () {};

	var tour = null;

	var accounts = [
		[i18n._('Please add a token first'), '']
	];
	var purchase_choices = [
		[i18n._('Click to select'), '']
	];


	var tradeInfo = {
		numOfRuns: 0,
		totalProfit: '',
		totalPayout: '',
		totalStake: '',
		lastProfit: '',
		lastResult: '',
		balance: '',
		tradeTable: [],
		tradesCount: 10000,
		tableSize: 5,
	};

	var initialTradeInfo = {};

	var copyObjectKeys = function copyObjectKeys(obj1, obj2) {
		$.extend(obj1, JSON.parse(JSON.stringify(obj2)));
	};

	copyObjectKeys(initialTradeInfo, tradeInfo);

	var resetTradeInfo = function resetTradeInfo() {
		copyObjectKeys(tradeInfo, initialTradeInfo);
		updateTradeInfo();
		showTradeInfo();
	};

	var updateTradeInfo = function updateTradeInfo() {
		Object.keys(tradeInfo)
			.forEach(function (key) {
				$('.' + key)
					.text(tradeInfo[key]);
				if (key === 'totalProfit' || key === 'lastProfit') {
					if (+tradeInfo[key] > 0) {
						$('.' + key)
							.css('color', 'green');
					} else if (+tradeInfo[key] < 0) {
						$('.' + key)
							.css('color', 'red');
					} else {
						$('.' + key)
							.css('color', 'black');
					}
				}
			});
	};

	var undoBlocks = function undoBlocks() {
		blockly.mainWorkspace.undo();
	};

	var redoBlocks = function redoBlocks() {
		blockly.mainWorkspace.undo(true);
	};

	var addTradeInfo = function addTradeInfo(trade) {
		trade.number = tradeInfo.numOfRuns;
		// tradeInfo.tradeTable.reverse(); //reverse the table row growth
		if (tradeInfo.tradeTable.length > tradeInfo.tradesCount) {
			tradeInfo.tradeTable.shift();
		}
		tradeInfo.tradeTable.push(trade);
		// tradeInfo.tradeTable.reverse();
		showTradeInfo();
	};

	var showTradeInfo = function showTradeInfo() {
		$('#tradesTradeInfo tbody')
			.children()
			.remove();
		var count = 0;
		tradeInfo.tradeTable.forEach(function (trade, index) {
			var lastProfit = +(+trade.sell_price - (+trade.buy_price))
				.toFixed(2);
			var element = '<tr>' + '<td>' + trade.number + '</td>' + '<td>' + trade.transaction_ids.buy + '</td>' + '<td>' + trade.contract_type + '</td>' + '<td>' + trade.entry_tick + '</td>' + '<td>' + trade.exit_tick + '</td>' + '<td>' + trade.buy_price + '</td>' + '<td>' + trade.sell_price + '</td>' + '<td>' + lastProfit + '</td>' + '</tr>';
			$('#tradesTradeInfo tbody')
				.append(element);
			count += 1;
		});
		for (var i = count; i < tradeInfo.tableSize; i += 1) {
			var element = '<tr>';
			for (var j = 0; j < 8; j += 1) {
				element += '<td></td>';
			}
			element += '</tr>';
			$('#tradesTradeInfo tbody')
				.append(element);
		}
		$('.table-scroll')
			.scrollTop($('.table-scroll')[0].scrollHeight);
	};

	var toggleDebug = function toggleDebug() {
		debug = !debug;
		if (debug) {
			logQueue.forEach(function (log) {
				console.log.apply(console, log);
			});
			logQueue = [];
		}
	};

	var addLogToQueue = function addLogToQueue() {
		logQueue.push(Array.prototype.slice.apply(arguments));
	};

	var isDebug = function isDebug() {
		return debug;
	};

	var disableRun = function disableRun(disabled) {
		$('#runButton')
			.prop('disabled', disabled);
	};

	module.exports = {
		tradeInfo: tradeInfo,
		resetTradeInfo: resetTradeInfo,
		updateTradeInfo: updateTradeInfo,
		undoBlocks: undoBlocks,
		redoBlocks: redoBlocks,
		addTradeInfo: addTradeInfo,
		showTradeInfo: showTradeInfo,
		toggleDebug: toggleDebug,
		addLogToQueue: addLogToQueue,
		isDebug: isDebug,
		accounts: accounts,
		purchase_choices: purchase_choices,
		disableRun: disableRun,
		on_finish: on_finish,
		on_strategy: on_strategy,
		tour: tour,
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = Blockly;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	var storageManager = __webpack_require__(8);
	var globals = __webpack_require__(5);
	var config = __webpack_require__(4);
	var i18n = __webpack_require__(3);

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
			globals.accounts = [
				[i18n._('Please add a token first'), '']
			];
			blockly.mainWorkspace.getBlockById('trade')
				.getField('ACCOUNT_LIST')
				.setValue('');
			blockly.mainWorkspace.getBlockById('trade')
				.getField('ACCOUNT_LIST')
				.setText(i18n._('Please add a token first'));
		} else {
			globals.accounts = [];
			tokenList.forEach(function (tokenInfo) {
				globals.accounts.push([tokenInfo.account_name, tokenInfo.token]);
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
			globals.purchase_choices = [];
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
				globals.purchase_choices.push([option[Object.keys(option)[0]], Object.keys(option)[0]]);
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
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	var getTokenList = function getTokenList() {
		if (!localStorage.hasOwnProperty('tokenList')) {
			localStorage.tokenList = JSON.stringify([]);
		}
		return JSON.parse(localStorage.tokenList);
	};

	var findToken = function findToken(token) {
		var tokenList = getTokenList();
		var index = -1;
		tokenList.forEach(function (tokenInfo, i) {
			if (tokenInfo.token === token) {
				index = i;
			}
		});
		return index;
	};

	var setTokenList = function setTokenList(tokenList) {
		localStorage.tokenList = JSON.stringify(tokenList);
	};

	var addToken = function addToken(token, account_name) {
		var tokenList = getTokenList();
		var index = findToken(token);
		if (index < 0) {
			tokenList.push({
				account_name: account_name,
				token: token
			});
			setTokenList(tokenList);
		}
	};
	var removeToken = function removeToken(token) {
		var tokenList = getTokenList();
		var index = findToken(token);
		if (index > -1) {
			tokenList.splice(index, 1);
			setTokenList(tokenList);
		}
	};
	var removeAllTokens = function removeAllTokens() {
		delete localStorage.tokenList;
	};
	var isDone = function isDone(varName) {
		return localStorage.hasOwnProperty(varName);
	};
	var setDone = function setDone(varName) {
		localStorage[varName] = true;
	};
	var setNotDone = function setNotDone(varName) {
		delete localStorage[varName];
	};
	module.exports = {
		getTokenList: getTokenList,
		findToken: findToken,
		setTokenList: setTokenList,
		addToken: addToken,
		removeToken: removeToken,
		removeAllTokens: removeAllTokens,
		isDone: isDone,
		setDone: setDone,
		setNotDone: setNotDone,
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var globals = __webpack_require__(5);
	var version = '1.1.6';
	if (globals.debug) {
		console.log('%cBinary Bot (v' + version + ') started.', 'color: green');
	} else {
		globals.addLogToQueue('%cBinary Bot (v' + version + ') started.', 'color: green');
	}
	module.exports = version;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(4);
	module.exports = {
		ticktrade: function ticktrade(parameters) {
			var options = [];
			var opposites = config.opposites[parameters.condition];
			opposites.forEach(function (option) {
				var option_name = Object.keys(option)[0];
				var option_data = {
					'amount': parameters.amount,
					'basis': parameters.payouttype,
					'contract_type': option_name,
					'currency': parameters.currency,
					'duration': parameters.duration,
					'duration_unit': 't',
				};
				if (parameters.hasOwnProperty('barrier')) {
					option_data.barrier = parameters.barrier;
				}
				options.push(option_data);
			});

			return options;
		}
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(4);
	var trade = __webpack_require__(12);
	var markets = {};
	markets.volatility = {};
	config.ticktrade_markets.forEach(function (market) {
		markets.volatility[market] = function (options) {
			var symbol = market.toUpperCase();

			trade.setSymbol(symbol);
			options.forEach(function (option) {
				option.symbol = symbol;
			});

			var submarket = function submarket(cb) {
				trade.submitProposal(options[0]);
				trade.submitProposal(options[1]);
			};

			return submarket;
		};
	});
	module.exports = markets;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var globals = __webpack_require__(5);
	var utils = __webpack_require__(7);
	var storageManager = __webpack_require__(8);
	var i18n = __webpack_require__(3);
	var LiveApi = __webpack_require__(13);
	var BinaryCharts = __webpack_require__(14);
	var showError = utils.showError;
	var log = utils.log;
	var api = new LiveApi();
	var ticks = [];
	var contractForChart = null;
	var symbol;
	var purchasedContractId;
	var strategyEnabled;
	var balance;
	var balance_currency;
	var contracts;
	var authorizeCallback;
	var lastAuthorized;
	var token;

	var chart = BinaryCharts.createChart('chart', {
		ticks: []
	});

	// influences display, calls on_finish
	var on_contract_finish = function on_contract_finish(contract) {
		var result = (+contract.sell_price === 0) ? 'loss' : 'win';
		globals.addTradeInfo(contract);
		globals.tradeInfo.lastProfit = +(+contract.sell_price - +contract.buy_price)
			.toFixed(2);
		globals.tradeInfo.totalStake = +(+globals.tradeInfo.totalStake + (+contract.buy_price))
			.toFixed(2);
		globals.tradeInfo.totalPayout = +(+globals.tradeInfo.totalPayout + (+contract.sell_price))
			.toFixed(2);
		globals.tradeInfo.totalProfit = +(+globals.tradeInfo.totalProfit + (+globals.tradeInfo.lastProfit))
			.toFixed(2);
		globals.tradeInfo.lastResult = result;
		globals.updateTradeInfo();

		var detail_list = [
			contract.transaction_ids.buy, +contract.buy_price, +contract.sell_price,
			globals.tradeInfo.lastProfit,
			contract.contract_type, +contract.entry_tick,
			utils.getUTCTime(new Date(parseInt(contract.entry_tick_time + '000'))), +contract.exit_tick,
			utils.getUTCTime(new Date(parseInt(contract.exit_tick_time + '000'))), +((contract.barrier) ? contract.barrier : 0),
		];

		log(i18n._('Purchase was finished, result is:') + ' ' + result, (result === 'win') ? 'success' : 'error');

		globals.on_finish(result, detail_list);
		on_contract_update(contract);
		purchasedContractId = null;
		contractForChart = null;
		globals.disableRun(false);
	};

	var updateChart = function updateChart() {
		var contract;
		if (checkBought(contractForChart)) {
			contract = {
				barrier: contractForChart.barrier,
				entry_tick_time: contractForChart.entry_tick_time,
				contract_type: contractForChart.contract_type,
			};
			if (contractForChart.exit_tick_time) {
				contract.exit_tick_time = contractForChart.exit_tick_time;
			} else {
				contract.date_expiry = contractForChart.date_expiry;
			}
		}
		chart.updateChart({
			ticks: ticks,
			contract: contract,
		});
	};

	var on_contract_update = function on_contract_update(contract) {
		contractForChart = contract;
		updateChart();
	};

	var callStrategy = function callStrategy() {
		if (strategyEnabled) {
			var direction = '';
			if (ticks.length > 1) {
				if (+ticks.slice(-1)[0].quote > +ticks.slice(-2)
					.quote) {
					direction = 'up';
				} else if (+ticks.slice(-1)[0].quote < +ticks.slice(-2)
					.quote) {
					direction = 'down';
				}
			}
			globals.on_strategy(+ticks.slice(-1)[0].quote, direction);
		}
	};

	var getTotalProfit = function getTotalProfit() {
		return +globals.tradeInfo.totalProfit;
	};

	var getBalance = function getBalance(balance_type) {
		if (!isNaN(parseFloat(balance))) {
			return (balance_type === 'NUM') ? parseFloat(balance) : balance_currency + ' ' + parseFloat(balance);
		} else {
			return 0;
		}
	};

	var findToken = function findToken(token) {
		var index = -1;
		globals.accounts.forEach(function (tokenInfo, i) {
			if (tokenInfo[1] === token) {
				index = i;
			}
		});
		return index;
	};

	var removeToken = function removeToken(token) {
		storageManager
			.removeToken(token);
		utils.updateTokenList();
	};

	var logout = function logout() {
		storageManager
			.removeAllTokens();
		utils.updateTokenList();
		log(i18n._('Logged you out!'), 'info');
	};

	var addAccount = function addAccount(token) {
		var index = findToken(token);
		if (index >= 0) {
			log(i18n._('Token already added.'), 'info');
			return;
		}
		if (token === '') {
			showError(i18n._('Token cannot be empty'));
		} else if (token !== null) {
			var api = new LiveApi();
			api.authorize(token)
				.then(function (response) {
					api.disconnect();
					storageManager
						.addToken(token, response.authorize.loginid);
					utils.updateTokenList(token);
					log(i18n._('Your token was added successfully'), 'info');
				}, function (reason) {
					api.disconnect();
					removeToken(token);
					showError(i18n._('Authentication failed using token:') + ' ' + token);
				});
		}
	};

	var updateBalance = function updateBalance(data) {
		balance = data.balance;
		balance_currency = data.currency;
		globals.tradeInfo.balance = balance_currency + ' ' + parseFloat(balance);
		globals.updateTradeInfo();
	};

	var requestBalance = function requestBalance() {
		api.send({
				balance: 1,
			})
			.then(function (response) {
				updateBalance(response.balance);
			}, function (reason) {
				log(i18n._('Could not get balance'));
			});
	};

	var observeTicks = function observeTicks() {
		api.events.on('tick', function (feed) {
			log(i18n._('tick received at:') + ' ' + feed.tick.epoch);
			ticks = ticks.concat({
				epoch: +feed.tick.epoch,
				quote: +feed.tick.quote,
			});
			updateChart();
			callStrategy();
		});

		api.events.on('history', function (feed) {
			ticks = [];
			feed.history.times.forEach(function (time, index) {
				ticks.push({
					epoch: +time,
					quote: +feed.history.prices[index]
				});
			});
		});
	};

	var requestHistory = function requestHistory() {
		api.getTickHistory(symbol, {
				"end": "latest",
				"count": 600,
				"subscribe": 1
			})
			.then(function (value) {
				log(i18n._('Request received for history'));
			}, function (reason) {
				log(reason);
				reconnect();
			});
	};

	var requestTransaction = function requestTransaction() {
		api.subscribeToTransactions();
	};

	var observeTransaction = function observeTransaction() {
		api.events.on('transaction', function (response) {
			var transaction = response.transaction;
			updateBalance(transaction);
			if (transaction.contract_id === purchasedContractId) {
				if (transaction.action === 'buy') {
					api.unsubscribeFromAllProposals()
						.then(function () {
							contracts = [];
						});
				} else if (transaction.action === 'sell') {
					getContractInfo();
				}
			}
		});
	};

	var checkBought = function checkBought(contract) {
		return (contract !== null && (!contract.hasOwnProperty('is_sold') || contract.is_sold === 1));
	};

	var observeOpenContracts = function observeOpenContracts() {
		api.events.on('proposal_open_contract', function (response) {
			var contract = response.proposal_open_contract;
			if (!contract.is_expired || contract.is_valid_to_sell) {
				if (checkBought(contract)) {
					on_contract_update(contract);
				}
			}
		});
	};

	var observeProposal = function observeProposal(options) {
		api.events.on('proposal', function (value) {
			if (contracts.length === 2) {
				contracts = [];
				strategyEnabled = false;
			}
			contracts.push(value);
			if (contracts.length === 2) {
				log(i18n._('Contracts are ready to be purchased by the strategy'), 'info');
				strategyEnabled = true;
			}
		});
	};

	var submitProposal = function submitProposal(options) {
		api.subscribeToPriceForContractProposal(options)
			.then(function (value) {}, function (reason) {
				stop();
				showError(reason);
			});
	};

	var getContractInfo = function getContractInfo(callback) {
		api.send({
				proposal_open_contract: 1,
				contract_id: purchasedContractId,
			})
			.then(function (response) {
				var contract = response.proposal_open_contract;
				if (contract.is_expired) {
					on_contract_finish(contract);
					if (callback) {
						callback(contract);
					}
				}
			}, function (reason) {
				showError(reason);
				reconnect();
			});
	};

	var purchase = function purchase(option) {
		strategyEnabled = false;
		var proposalContract = (option === contracts[1].echo_req.contract_type) ? contracts[1] : contracts[0];
		log(i18n._('Purchased') + ': ' + proposalContract.proposal.longcode, 'info');
		api.buyContract(proposalContract.proposal.id, proposalContract.proposal.ask_price)
			.then(function (purchaseContract) {
				purchasedContractId = purchaseContract.buy.contract_id;
				api.subscribeToOpenContract(purchasedContractId);
				globals.tradeInfo.numOfRuns++;
				globals.updateTradeInfo();
				globals.disableRun(true);
			}, function (reason) {
				stop();
				showError(reason);
			});
	};

	var restartContracts = function restartContracts() {
		strategyEnabled = false;
		api.unsubscribeFromAllProposals()
			.then(function (response) {
				authorizeCallback();
			}, function (reason) {
				showError(reason);
			});
	};

	var observeAuthorize = function observeAuthorize() {
		api.events.on('authorize', function (response) {
			if (response.error) {
				showError(response.error);
			} else {
				var now = parseInt((new Date()
					.getTime()) / 1000);
				if (lastAuthorized === undefined || now - lastAuthorized >= 1) { // prevent live-api to call this many times in case of disconnect
					lastAuthorized = now;
					log(i18n._('Authenticated using token:') + ' ' + token, 'info');
					if (purchasedContractId) {
						getContractInfo(function () {
							restartContracts();
						});
					} else {
						restartContracts();
					}
					requestBalance();
					requestHistory();
					requestTransaction();
				}
			}
		});
	};

	var reconnect = function reconnect() {
		stop();
		api.token = token;
		api.connect();
		api.authorize(token);
	};

	var stop = function stop() {
		if (api) {
			try {
				api.disconnect();
			} catch (e) {}
		}
	};

	var setSymbol = function setSymbol(_symbol) {
		symbol = _symbol;
	};

	var trade = function trade(token, callback, trade_again) {
		if (token === '') {
			showError(i18n._('No token is available to authenticate'));
		} else {
			authorizeCallback = callback;
			purchasedContractId = null;
			globals.disableRun(false);
			contracts = [];
			if (trade_again) {
				restartContracts();
			} else {
				token = token;
				stop();
				api = new LiveApi();
				observeTicks();
				observeProposal();
				observeTransaction();
				observeOpenContracts();
				observeAuthorize();
				api.authorize(token);
			}
		}
	};

	module.exports = {
		addAccount: addAccount,
		stop: stop,
		logout: logout,
		getTotalProfit: getTotalProfit,
		getBalance: getBalance,
		submitProposal: submitProposal,
		purchase: purchase,
		setSymbol: setSymbol,
		trade: trade,
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = window["binary-live-api"].LiveApi;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = window["binary-charts"];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(7);
	var globals = __webpack_require__(5);
	var storageManager = __webpack_require__(8);
	var blockly = __webpack_require__(6);
	__webpack_require__(16);
	__webpack_require__(34);
	__webpack_require__(53);
	var trade = __webpack_require__(12);
	var i18n = __webpack_require__(3);
	var workspace;
	var activeTutorial = null;
	var tours = {}; // e

	$.get('www/xml/toolbox.xml', function (toolbox) {
		workspace = blockly.inject('blocklyDiv', {
			media: 'node_modules/blockly/media/',
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
		$.get('www/xml/main.xml', function (main) {
			blockly.Xml.domToWorkspace(main.getElementsByTagName('xml')[0], workspace);
			blockly.mainWorkspace.getBlockById('trade')
				.setDeletable(false);
			blockly.mainWorkspace.getBlockById('strategy')
				.setDeletable(false);
			blockly.mainWorkspace.getBlockById('finish')
				.setDeletable(false);
			utils.updateTokenList();
			utils.addPurchaseOptions();
			blockly.mainWorkspace.clearUndo();
			tours.introduction = __webpack_require__(54);
			tours.welcome = __webpack_require__(55);
			tours.welcome.welcome();
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
					utils.addPurchaseOptions();
					var tokenList = storageManager
						.getTokenList();
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

	var addAccount = function addAccount() {
		var token = prompt(i18n._('Please enter your token here:'), '');
		trade.addAccount(token);
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
			saveAs(blob, filename);
		}
	};

	var showCode = function showCode() {
		// Generate JavaScript code and display it.
		try {
			blockly.JavaScript.INFINITE_LOOP_TRAP = null;
			var code = blockly.JavaScript.workspaceToCode(blockly.mainWorkspace);
			utils.log(code);
		} catch (e) {
			utils.showError(e);
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

	$('#logout')
		.click(function (e) {
			trade.logout();
		});

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
		addAccount: addAccount,
		saveXml: saveXml,
		showCode: showCode,
		setOpacityForAll: setOpacityForAll,
		setOpacity: setOpacity,
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(32);
	__webpack_require__(33);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);
	blockly.JavaScript.trade = function (block) {
		var account = block.getFieldValue('ACCOUNT_LIST');
		var submarket = blockly.JavaScript.statementToCode(block, 'SUBMARKET');
		if (submarket === '') {
			throw {
				message: i18n._('You have to add a submarket first')
			};
		}
		// TODO: Assemble JavaScript into code variable.
		var code = 'var trade = function(trade_again){\nBot.trade.trade(\'' + account.trim() + '\', ' + submarket.trim() + ', trade_again);\n};\ntrade();\n';
		return code;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	blockly.JavaScript.balance = function(block) {
	  var balance_type = block.getFieldValue('BALANCE_TYPE');
		var code = 'Bot.trade.getBalance(\''+ balance_type +'\')';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	blockly.JavaScript.notify = function(block) {
	  var notification_type = block.getFieldValue('NOTIFICATION_TYPE');
	  var message = blockly.JavaScript.valueToCode(block, 'MESSAGE', blockly.JavaScript.ORDER_ATOMIC);
	  // TODO: Assemble JavaScript into code variable.
	  var code = 'Bot.utils.log('+ message +', \''+ notification_type +'\', \'bottom left\');\n';
	  return code;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	blockly.JavaScript.total_profit = function(block) {
		var code = 'Bot.trade.getTotalProfit()';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	var config = __webpack_require__(4);
	config.ticktrade_markets.forEach(function(market){
		blockly.JavaScript[market] = function(block) {
			if ( this.parentBlock_ === null ) {
				return '';
			}
			var condition = blockly.JavaScript.statementToCode(block, 'CONDITION');
			if ( !condition ) {
				throw {message: 'A condition has to be defined for the market'};
			}
			var code = 'Bot.markets.volatility.' + market + '('+condition.trim()+')';
			return code;
		};
	});


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	blockly.JavaScript.check_direction = function(block) {
		var check_with = block.getFieldValue('CHECK_DIRECTION');
		var code = '(direction === \'' + check_with + '\')';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	blockly.JavaScript.direction = function(block) {
		var code = 'direction';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	blockly.JavaScript.purchase = function(block) {
		if ( this.parentBlock_ === null ) {
			return '';
		}
		var purchase_list = block.getFieldValue('PURCHASE_LIST');
		var code = purchase_list;
		code = 'Bot.trade.purchase(\'' + code + '\');\n';
		return code;
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	blockly.JavaScript.on_strategy = function(block) {
	  var stack = blockly.JavaScript.statementToCode(block, 'STRATEGY_STACK');
	  var code = 'Bot.globals.on_strategy = function on_strategy(tick, direction){\n' + stack + '\n};\n';
	  return code;
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	blockly.JavaScript.tick = function(block) {
		var code = 'tick';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	blockly.JavaScript.contract_check_result = function(block) {
		var check_with = block.getFieldValue('CHECK_RESULT');
		var code = '(result === \'' + check_with + '\')';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	blockly.JavaScript.contract_details = function(block) {
		var code = 'details';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	blockly.JavaScript.on_finish = function(block) {
	  var stack = blockly.JavaScript.statementToCode(block, 'FINISH_STACK');
	  var code = 'Bot.globals.on_finish = function on_finish(result, details){\n' + stack + '\n};\n';
	  return code;
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	blockly.JavaScript.read_details = function(block) {
	  var detail_index = block.getFieldValue('DETAIL_INDEX');
	  // TODO: Assemble JavaScript into code variable.
	  var code = '((details instanceof Array && details.length === Bot.config.lists.DETAILS.length) ? details[' + ( parseInt(detail_index.trim()) - 1 ) + '] : \'\' )';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	blockly.JavaScript.contract_result = function(block) {
		var code = 'result';
	  return [code, blockly.JavaScript.ORDER_ATOMIC];
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	blockly.JavaScript.trade_again = function(block) {
		if ( this.parentBlock_ === null ) {
			return '';
		}
		var code = 'trade(true);\n';
		return code;
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	var config = __webpack_require__(4);
	Object.keys(config.opposites).forEach(function(opposites){
		blockly.JavaScript[opposites.toLowerCase()] = function(block) {
			if ( this.parentBlock_ === null ) {
				return '';
			}
			var duration = blockly.JavaScript.valueToCode(block, 'DURATION', blockly.JavaScript.ORDER_ATOMIC);
			var payouttype = block.getFieldValue('PAYOUTTYPE_LIST');
			var currency = block.getFieldValue('CURRENCY_LIST');
			var amount = blockly.JavaScript.valueToCode(block, 'AMOUNT', blockly.JavaScript.ORDER_ATOMIC);
			var prediction;
			if ( config.opposites_have_barrier.indexOf(opposites) > -1 ) {
				prediction = blockly.JavaScript.valueToCode(block, 'PREDICTION', blockly.JavaScript.ORDER_ATOMIC);
				if ( prediction === '' ) {
					throw {message: 'All condition options are required'};
				}
			}
			if (opposites === '' || duration === '' || payouttype === '' || currency === '' || amount === ''){
				throw {message: 'All condition options are required'};
			}
			var code = 'Bot.conditions.ticktrade({\n'+
				'condition: \'' + opposites + '\',\n'+
				'duration: ' + duration + ',\n'+
				'payouttype: \'' + payouttype + '\',\n'+
				'currency: \'' + currency + '\',\n'+
				'amount: (' + amount + ').toFixed(2),\n'+
				((config.opposites_have_barrier.indexOf(opposites) > -1 && prediction !== '' )? 'barrier: ' + prediction + ',\n' : '' )+
			'})';
			return code;
		};
	});


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(35);
	__webpack_require__(37);
	__webpack_require__(38);
	__webpack_require__(39);
	__webpack_require__(40);
	__webpack_require__(41);
	__webpack_require__(42);
	__webpack_require__(43);
	__webpack_require__(44);
	__webpack_require__(45);
	__webpack_require__(46);
	__webpack_require__(47);
	__webpack_require__(48);
	__webpack_require__(49);
	__webpack_require__(50);
	__webpack_require__(51);
	__webpack_require__(52);


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(36);
	var globals = __webpack_require__(5);
	blockly.Blocks.trade = {
		init: function () {
			this.appendDummyInput()
				.appendField(i18n._("Trade With Account:"))
				.appendField(new blockly.FieldDropdown(globals.accounts), "ACCOUNT_LIST");
			this.appendStatementInput("SUBMARKET")
				.setCheck("Submarket")
				.appendField(i18n._("Submarket"));
			this.setPreviousStatement(true, null);
			this.setColour(60);
			this.setTooltip(i18n._('The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts.'));
			this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
		},
		onchange: function (ev) {
			relationChecker.trade(this, ev);
		},
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	var config = __webpack_require__(4);
	var utils = __webpack_require__(7);
	var i18n = __webpack_require__(3);
	var getNumField = function getNumField(block, fieldName) {
		var field = block.getInputTargetBlock(fieldName);
		if (field !== null && field.type === 'math_number') {
			field = field.getFieldValue('NUM')
				.trim();
			return field;
		}
		return '';
	};

	var isInteger = function isInteger(amount) {
		return !isNaN(+amount) && parseInt(amount) === parseFloat(amount);
	};

	var isInRange = function isInRange(amount, min, max) {
		return !isNaN(+amount) && +amount >= min && +amount <= max;
	};

	var trade = function trade(_trade, ev) {
		if (ev.type === 'create') {
			if (config.ticktrade_markets.indexOf(blockly.mainWorkspace.getBlockById(ev.blockId)
					.type) >= 0) {
				utils.broadcast('tour:submarket_created');
			}
			if (config.conditions.indexOf(blockly.mainWorkspace.getBlockById(ev.blockId)
					.type) >= 0) {
				utils.broadcast('tour:condition_created');
			}
			if (blockly.mainWorkspace.getBlockById(ev.blockId)
				.type === 'math_number') {
				utils.broadcast('tour:number');
			}
			if (blockly.mainWorkspace.getBlockById(ev.blockId)
				.type === 'purchase') {
				utils.broadcast('tour:purchase_created');
			}
			if (blockly.mainWorkspace.getBlockById(ev.blockId)
				.type === 'trade_again') {
				utils.broadcast('tour:trade_again_created');
			}
		}
		if (_trade.childBlocks_.length > 0 && config.ticktrade_markets.indexOf(_trade.childBlocks_[0].type) < 0) {
			utils.log(i18n._('The trade block can only accept submarket blocks'), 'warning');
			Array.prototype.slice.apply(_trade.childBlocks_)
				.forEach(function (child) {
					child.unplug();
				});
		} else if (_trade.childBlocks_.length > 0) {
			submarket(_trade.childBlocks_[0], ev);
			utils.broadcast('tour:submarket');
			if (ev.hasOwnProperty('newInputName')) {
				utils.addPurchaseOptions();
			}
		}
		var topParent = utils.findTopParentBlock(_trade);
		if (topParent !== null) {
			if (config.ticktrade_markets.indexOf(topParent.type) >= 0 || topParent.type === 'on_strategy' || topParent.type === 'on_finish') {
				utils.log(i18n._('The trade block cannot be inside binary blocks'), 'warning');
				_trade.unplug();
			}
		}
	};
	var submarket = function submarket(_submarket, ev) {
		if (_submarket.childBlocks_.length > 0 && config.conditions.indexOf(_submarket.childBlocks_[0].type) < 0) {
			utils.log(i18n._('Submarket blocks can only accept condition blocks'), 'warning');
			Array.prototype.slice.apply(_submarket.childBlocks_)
				.forEach(function (child) {
					child.unplug();
				});
		} else if (_submarket.childBlocks_.length > 0) {
			condition(_submarket.childBlocks_[0], ev, true);
		}
		if (_submarket.parentBlock_ !== null) {
			if (_submarket.parentBlock_.type !== 'trade') {
				utils.log(i18n._('Submarket blocks have to be added to the trade block'), 'warning');
				_submarket.unplug();
			}
		}
	};
	var condition = function condition(_condition, ev, calledByParent) {
		if (_condition.parentBlock_ !== null) {
			if (config.ticktrade_markets.indexOf(_condition.parentBlock_.type) < 0) {
				utils.log(i18n._('Condition blocks have to be added to submarket blocks'), 'warning');
				_condition.unplug();
			} else {
				utils.broadcast('tour:condition');
				if (!calledByParent) {
					if ((ev.type === 'change' && ev.element && ev.element === 'field') || (ev.type === 'move' && typeof ev.newInputName === 'string')) {
						var added = [];
						var duration = getNumField(_condition, 'DURATION');
						if (duration !== '') {
							if (!isInteger(duration) || !isInRange(duration, 5, 15)) {
								utils.log(i18n._('Number of ticks must be between 5 and 10'), 'warning');
							} else {
								utils.broadcast('tour:ticks');
								added.push('DURATION');
							}
						}
						var amount = getNumField(_condition, 'AMOUNT');
						if (amount !== '') {
							added.push('AMOUNT');
						}
						var prediction = getNumField(_condition, 'PREDICTION');
						if (prediction !== '') {
							if (!isInteger(prediction) || !isInRange(prediction, 0, 9)) {
								utils.log(i18n._('Prediction must be one digit'), 'warning');
							} else {
								added.push('PREDICTION');
							}
						}
						if (added.indexOf('AMOUNT') >= 0 && added.indexOf('DURATION') >= 0) {
							if (_condition.inputList.slice(-1)[0].name === 'PREDICTION') {
								if (added.indexOf('PREDICTION') >= 0) {
									utils.broadcast('tour:options');
								}
							} else {
								utils.broadcast('tour:options');
							}
						}
					}
				}
			}
		}
	};
	var inside_strategy = function inside_strategy(blockObject, ev, name) {
		var topParent = utils.findTopParentBlock(blockObject);
		if (topParent !== null && (topParent.type === 'on_finish' || topParent.type === 'trade')) {
			utils.log(name + ' ' + i18n._('must be added inside the strategy block'), 'warning');
			blockObject.unplug();
		} else if (topParent !== null && topParent.type === 'on_strategy') {
			if (blockObject.type === 'purchase') {
				utils.broadcast('tour:purchase');
			}
		}
	};
	var inside_finish = function inside_finish(blockObject, ev, name) {
		var topParent = utils.findTopParentBlock(blockObject);
		if (topParent !== null && (topParent.type === 'on_strategy' || topParent.type === 'trade')) {
			utils.log(name + ' ' + i18n._('must be added inside the finish block'), 'warning');
			blockObject.unplug();
		} else if (topParent !== null && topParent.type === 'on_finish') {
			if (blockObject.type === 'trade_again') {
				utils.broadcast('tour:trade_again');
			}
		}
	};
	module.exports = {
		trade: trade,
		submarket: submarket,
		condition: condition,
		inside_strategy: inside_strategy,
		inside_finish: inside_finish,
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kqvz7z
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);

	blockly.Blocks.balance = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Balance:"))
	        .appendField(new blockly.FieldDropdown([[i18n._("string"), "STR"], [i18n._("number"), "NUM"]]), "BALANCE_TYPE");
	    this.setOutput(true, null);
	    this.setColour(180);
	    this.setTooltip(i18n._('Get balance number or string'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  }
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pmhydb
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);

	blockly.Blocks.notify = {
	  init: function() {
	    this.appendValueInput("MESSAGE")
	        .setCheck(null)
	        .appendField(i18n._("Notify type:"))
	        .appendField(new blockly.FieldDropdown([[i18n._("success"), "success"], [i18n._("information"), "info"], [i18n._("warning"), "warn"], [i18n._("error"), "error"]]), "NOTIFICATION_TYPE");
	    this.setPreviousStatement(true, null);
	    this.setNextStatement(true, null);
	    this.setColour(180);
	    this.setTooltip(i18n._('Creates notification'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  }
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3bwqd4
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);

	blockly.Blocks.total_profit = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Total Profit"));
	    this.setOutput(true, "Number");
	    this.setColour(180);
	    this.setTooltip(i18n._('Returns the total profit'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  }
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#abpy8a
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);
	var config = __webpack_require__(4);
	var relationChecker = __webpack_require__(36);

	config.ticktrade_markets.forEach(function(market, index){
		blockly.Blocks[market] = {
			init: function() {
				this.appendDummyInput()
					.appendField(config.ticktrade_market_names[index]);
				this.appendStatementInput("CONDITION")
					.setCheck("Condition");
				this.setInputsInline(true);
				this.setPreviousStatement(true, "Submarket");
				this.setColour(345);
				this.setTooltip(i18n._('Chooses the market:') + ' ' + config.ticktrade_market_names[index]);
				this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
			},
			onchange: function(ev){
				relationChecker.submarket(this, ev);
			}
		};
	});


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(36);
	var config = __webpack_require__(4);
	blockly.Blocks.check_direction = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Direction is"))
					.appendField(new blockly.FieldDropdown(config.lists.CHECK_DIRECTION), "CHECK_DIRECTION");
	    this.setOutput(true, "Boolean");
	    this.setColour(180);
	    this.setTooltip(i18n._('True if the direction matches the selection'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  },
		onchange: function(ev) {
			relationChecker.inside_strategy(this, ev, 'Check Direction');
		},
	};


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#n3drko
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(36);

	blockly.Blocks.direction = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Tick Direction"));
	    this.setOutput(true, "String");
	    this.setColour(180);
	    this.setTooltip(i18n._('Returns the tick direction received by a strategy block, its value could be "up" if the tick is more than before, "down" if less than before and empty ("") if the tick is equal to the previous tick'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  },
		onchange: function(ev) {
			relationChecker.inside_strategy(this, ev, 'Tick Direction');
		},
	};



/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(36);
	var globals = __webpack_require__(5);

	blockly.Blocks.purchase = {
		init: function() {
			this.appendDummyInput()
				.appendField(i18n._("Purchase"))
				.appendField(new blockly.FieldDropdown(globals.purchase_choices), "PURCHASE_LIST");
			this.setPreviousStatement(true, 'Purchase');
			this.setColour(180);
			this.setTooltip(i18n._('Purchases a chosen contract. Accepts index to choose between the contracts.'));
			this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
		},
		onchange: function(ev) {
			relationChecker.inside_strategy(this, ev, 'Purchase');
		},
	};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u7tjez
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);

	blockly.Blocks.on_strategy = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Strategy (Decide when to purchase with each tick)"));
	    this.appendStatementInput("STRATEGY_STACK")
	        .setCheck('Purchase');
	    this.setColour(290);
	    this.setTooltip(i18n._('This block decides what to do each time a new tick is received'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  }
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335

	var blockly = __webpack_require__(6);
	var relationChecker = __webpack_require__(36);
	var i18n = __webpack_require__(3);

	blockly.Blocks.tick = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Tick Value"));
	    this.setOutput(true, "Number");
	    this.setColour(180);
	    this.setTooltip(i18n._('Returns the tick value received by a strategy block'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  },
		onchange: function(ev) {
			relationChecker.inside_strategy(this, ev, 'Tick Value');
		},
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);
	var config = __webpack_require__(4);
	var relationChecker = __webpack_require__(36);
	blockly.Blocks.contract_check_result = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Result is"))
					.appendField(new blockly.FieldDropdown(config.lists.CHECK_RESULT), "CHECK_RESULT");
	    this.setOutput(true, "Boolean");
	    this.setColour(180);
	    this.setTooltip(i18n._('True if the result matches the selection'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  },
		onchange: function(ev) {
			relationChecker.inside_finish(this, ev, 'Check Result');
		},
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xq4ajc
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(36);

	blockly.Blocks.contract_details = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Contract Details"));
	    this.setOutput(true, "Array");
	    this.setColour(180);
	    this.setTooltip(i18n._('Returns the list of details for the finished contract'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  },
		onchange: function(ev) {
			relationChecker.inside_finish(this, ev, 'Contract Details');
		},
	};


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i7qkfj
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);

	blockly.Blocks.on_finish = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("On Finish (Decide what to do after the contract is finished)"));
	    this.appendStatementInput("FINISH_STACK")
	        .setCheck("TradeAgain");
	    this.setColour(290);
	    this.setTooltip(i18n._('This block decides what to do when a purchased contract is finished'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  }
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u8i287
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(36);
	var config = __webpack_require__(4);

	blockly.Blocks.read_details = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Contract Detail:"))
	        .appendField(new blockly.FieldDropdown(config.lists.DETAILS), "DETAIL_INDEX");
			this.setOutput(true, null);
	    this.setColour(180);
	    this.setTooltip(i18n._('Reads a selected option from contract details list'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  },
		onchange: function(ev) {
			relationChecker.inside_finish(this, ev, 'Read Contract Details');
		},
	};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#e54skh
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(36);

	blockly.Blocks.contract_result = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField(i18n._("Contract Result"));
	    this.setOutput(true, "String");
	    this.setColour(180);
	    this.setTooltip(i18n._('Returns the result of the finished contract'));
	    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	  },
		onchange: function(ev) {
			relationChecker.inside_finish(this, ev, 'Contract Result');
		},
	};



/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xkasg4
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);
	var relationChecker = __webpack_require__(36);

	blockly.Blocks.trade_again = {
		init: function() {
			this.appendDummyInput()
				.appendField(i18n._("Trade Again"));
			this.setPreviousStatement(true, 'TradeAgain');
			this.setColour(180);
			this.setTooltip(i18n._('Runs the trade block again'));
			this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
		},
		onchange: function(ev) {
			relationChecker.inside_finish(this, ev, 'Trade Again');
		},
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#cur8so
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);
	var config = __webpack_require__(4);
	var utils = __webpack_require__(7);
	var relationChecker = __webpack_require__(36);

	Object.keys(config.opposites).forEach(function(opposites){
		blockly.Blocks[opposites.toLowerCase()] = {
			init: function() {
				var option_names = [];
				config.opposites[opposites].forEach(function(options){
					
					var option_alias = Object.keys(options)[0];
					var option_name = options[option_alias];
					option_names.push(option_name);	
				});
				this.appendDummyInput()
					.appendField(option_names[0] + '/' + option_names[1]);
				this.appendValueInput("DURATION")
					.setCheck("Number")
					.appendField(i18n._("Ticks:"));
				this.appendDummyInput()
					.appendField(i18n._("Payout:"))
					.appendField(new blockly.FieldDropdown(config.lists.PAYOUTTYPE), "PAYOUTTYPE_LIST");
				this.appendDummyInput()
					.appendField(i18n._("Currency:"))
					.appendField(new blockly.FieldDropdown(config.lists.CURRENCY), "CURRENCY_LIST");
				this.appendValueInput("AMOUNT")
					.setCheck("Number")
					.appendField(i18n._("Amount:"));
				if ( config.opposites_have_barrier.indexOf(opposites) > -1 ) {
					this.appendValueInput("PREDICTION")
						.setCheck("Number")
						.appendField(i18n._("Prediction:"));
				}
				this.setInputsInline(false);
				this.setPreviousStatement(true, "Condition");
				this.setColour(15);
				this.setTooltip(i18n._('Provides the contract conditions:') + ' ' + option_names[0] + '/' + option_names[1]);
				this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
			},
			onchange: function(ev){
				relationChecker.condition(this, ev);
			},
		};
	});


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint ignore:start */
	var $ = __webpack_require__(2);
	$.fn.drags = function (opt) {

		opt = $.extend({
			handle: "",
			cursor: "move"
		}, opt);

		if (opt.handle === "") {
			var $el = this;
		} else {
			var $el = this.find(opt.handle);
		}

		return $el.css('cursor', opt.cursor)
			.on("mousedown", function (e) {
				if (opt.handle === "") {
					var $drag = $(this)
						.addClass('draggable');
				} else {
					var $drag = $(this)
						.addClass('active-handle')
						.parent()
						.addClass('draggable');
				}
				var z_idx = $drag.css('z-index'),
					drg_h = $drag.outerHeight(),
					drg_w = $drag.outerWidth(),
					pos_y = $drag.offset()
					.top + drg_h - e.pageY,
					pos_x = $drag.offset()
					.left + drg_w - e.pageX;
				$drag.css('z-index', 1000)
					.parents()
					.on("mousemove", function (e) {
						$('.draggable')
							.offset({
								top: e.pageY + pos_y - drg_h,
								left: e.pageX + pos_x - drg_w
							})
							.on("mouseup", function () {
								$(this)
									.removeClass('draggable')
									.css('z-index', z_idx);
							});
					});
				e.preventDefault(); // disable selection
			})
			.on("mouseup", function () {
				if (opt.handle === "") {
					$(this)
						.removeClass('draggable');
				} else {
					$(this)
						.removeClass('active-handle')
						.parent()
						.removeClass('draggable');
				}
			});
	};
	/* jshint ignore:end */


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var globals = __webpack_require__(5);
	var view = __webpack_require__(15);
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);
	var steps = [{
		content: '<p>' + i18n._("Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot.") + '</p>',
		target: view.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacityForAll(started, 0.3);
		},
	}, {
		content: '<p>' + i18n._("You will need to add the blocks to this area which is called the <b>workspace</b>.") + '</p>',
		target: view.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacity(started, 'workspace', 1);
		},
		teardown: function (tour, options) {},
	}, {
		content: '<p>' + i18n._("To start pick a <b>submarket</b> block from volatility markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a submarket from left should lead you to the next step.)") + '</p>',
		target: view.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_submarket_created'],
		tour_submarket_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:submarket_created', this.tour_submarket_created);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].children_[0].reveal(true);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].children_[0].select();
			view.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:submarket_created', this.tour_submarket_created);
			view.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._("Great! Now add it to the <b>trade</b> block.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.submarket),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		bind: ['tour_submarket_added'],
		tour_submarket_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:submarket', this.tour_submarket_added);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:submarket', this.tour_submarket_added);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].setExpanded(false);
		},
	}, {
		content: '<p>' + i18n._("Alright! Now pick a <b>condition</b> block.") + '</p>',
		target: view.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_condition_created'],
		tour_condition_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:condition_created', this.tour_condition_created);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[1].select();
			view.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:condition_created', this.tour_condition_created);
			view.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._("OK! Now add it to the submarket you added in the previous step.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_condition_added'],
		tour_condition_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:condition', this.tour_condition_added);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:condition', this.tour_condition_added);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
		},
	}, {
		content: '<p>' + i18n._("Very good! It's time to add the options needed by the condition block, pick a number") + ' (<img src="www/image/number.png"/>) ' + i18n._("from the Math menu") + '</p>',
		target: view.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_number_created'],
		tour_number_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:number', this.tour_number_created);
			blockly.mainWorkspace.toolbox_.tree_.children_[1].select();
			view.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:number', this.tour_number_created);
			view.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._("Click on the number block to edit its value") + ' (<img src="www/image/number_editing.png"/>), ' + i18n._("change the value to 5 and add it to the <b>ticks</b> field of the condition block") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_ticks_added'],
		tour_ticks_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:ticks', this.tour_ticks_added);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:ticks', this.tour_ticks_added);
		},
	}, {
		content: '<p>' + i18n._("OK, Now add all remaining options to the condition block") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_options_added'],
		tour_options_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			blockly.mainWorkspace.toolbox_.tree_.children_[1].select();
			window.addEventListener('tour:options', this.tour_options_added);
			view.getUiComponent('toolbox')
				.css('opacity', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:options', this.tour_options_added);
			view.getUiComponent('toolbox')
				.css('opacity', 1);
		},
	}, {
		content: '<p>' + i18n._("That's it, now you have a complete trade block with its options. It's time to define a strategy") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu") + '</p>',
		target: view.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		nextButton: true,
		setup: function (tour, options) {
			view.getUiComponent('toolbox')
				.css('opacity', 1);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].reveal(true);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].select();
		},
		teardown: function (tour, options) {
			view.getUiComponent('toolbox')
				.css('opacity', 0.3);
		},
	}, {
		content: '<p>' + i18n._("For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block") + '</p>',
		target: view.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_purchase_created'],
		tour_purchase_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].reveal(true);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].select();
			view.getUiComponent('toolbox')
				.css('opacity', 1);
			window.addEventListener('tour:purchase_created', this.tour_purchase_created);
		},
		teardown: function (tour, options) {
			view.getUiComponent('toolbox')
				.css('opacity', 0.3);
			window.removeEventListener('tour:purchase_created', this.tour_purchase_created);
		},
	}, {
		content: '<p>' + i18n._("Now add it to the Strategy block.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		bind: ['tour_purchase_added'],
		tour_purchase_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:purchase', this.tour_purchase_added);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:purchase', this.tour_purchase_added);
		},
	}, {
		content: '<p>' + i18n._("Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your condition block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("After a purchase was started, the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.") + '</p>',
		target: view.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_trade_again_created'],
		tour_trade_again_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[3].reveal(true);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[3].select();
			view.getUiComponent('toolbox')
				.css('opacity', 1);
			window.addEventListener('tour:trade_again_created', this.tour_trade_again_created);
		},
		teardown: function (tour, options) {
			view.getUiComponent('toolbox')
				.css('opacity', 0.3);
			window.removeEventListener('tour:trade_again_created', this.tour_trade_again_created);
		},
	}, {
		content: '<p>' + i18n._("Now add it to the On Finish block") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		bind: ['tour_trade_again'],
		tour_trade_again: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:trade_again', this.tour_trade_again);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:trade_again', this.tour_trade_again);
			blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
		},
	}, {
		content: '<p>' + i18n._("Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its condition is unmet.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
		teardown: function (tour, options) {
			view.setOpacityForAll(started, 1);
		},
	}, {
		content: '<p>' + i18n._("If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo") + '</p>',
		target: view.getUiComponent('undo_redo'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can save/load your blocks using these tools") + '</p>',
		target: view.getUiComponent('file_management'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on these buttons. Please make sure you have chosen a Virtual Account before running the blocks.") + '</p>',
		target: view.getUiComponent('run_stop'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can choose the token you want by the <b>Account</b> dropdown on the trade block. If you do not have any token in the dropdown please add one using the <b>Add Token</b> button above. Please make sure to use Virtual Account tokens for testing.") + '</p>',
		target: view.getUiComponent('workspace')
			.find(view.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can add a token to the bot using the <b>Add Token</b> button.") + '</p>',
		target: view.getUiComponent('token'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can see the summary of your trades by clicking on this button.") + '</p>',
		target: view.getUiComponent('summary'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("Go ahead and run the blocks. You can stop the code anytime you want using the stop button, or reset the values in the result panels using the reset button.") + '</p>',
		target: view.getUiComponent('run_stop'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
		teardown: function (tour, options) {
			view.stopTutorial();
		},
	}, ];

	var tour = new Tourist.Tour({
		steps: steps
	});

	var started = false;

	module.exports = {
		start: function start() {
			if (!globals.tour) {
				started = true;
				globals.tour = tour;
				globals.tour.start();
			}
		},
		stop: function stop() {
			view.setOpacityForAll(true, 1);
			started = false;
			globals.tour.stop();
			blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
			delete globals.tour;
		},
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var globals = __webpack_require__(5);
	var view = __webpack_require__(15);
	var storageManager = __webpack_require__(8);
	var blockly = __webpack_require__(6);
	var i18n = __webpack_require__(3);
	var steps = [{
		content: '<p>' + i18n._('Welcome to the binary bot, a blockly based automation tool for binary.com trades') + '</p>',
		target: view.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacityForAll(started, 0.3);
		},
	}, {
		content: '<p>' + i18n._('The blocks you put in here will create a binary bot code which you can then execute using the run button.') + '</p>',
		target: view.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacity(started, 'workspace', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'workspace', 0.3);
		},
	}, {
		content: '<p>' + i18n._('You can add blocks from here to the workspace') + '</p>',
		target: view.getUiComponent('toolbox'),
		nextButton: true,
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		setup: function (tour, options) {
			view.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Erase the blocks by dropping them in here.') + '</p>',
		target: view.getUiComponent('trash'),
		nextButton: true,
		highlightTarget: true,
		my: 'right bottom',
		at: 'left top',
		setup: function (tour, options) {
			view.setOpacity(started, 'trash', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'trash', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Use these buttons to load and save blocks') + '</p>',
		target: view.getUiComponent('file_management'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacity(started, 'file_management', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'file_management', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Click to add a token, at least one token is needed. Get your token from') + ' <a href="https://www.binary.com/user/api_tokenws" target="_blank">' + i18n._('here') + '</a></p>',
		target: view.getUiComponent('token'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacity(started, 'token', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'token', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Use these buttons to Undo/Redo changes to your blocks.') + '</p>',
		target: view.getUiComponent('undo_redo'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacity(started, 'undo_redo', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'undo_redo', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Click on this button to see the summary of your trades.') + '</p>',
		target: view.getUiComponent('summary'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacity(started, 'summary', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'summary', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Use these buttons to run or stop your blocks, or reset your result panels.') + '</p>',
		target: view.getUiComponent('run_stop'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacity(started, 'run_stop', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'run_stop', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Good Luck!') + '</p>',
		target: view.getUiComponent('center'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		teardown: function (tour, options) {
			view.setOpacityForAll(started, 1);
			view.getStorageManager()
				.setDone('welcomeFinished');
			view.stopTutorial();
		},
	}, ];

	var tour = new Tourist.Tour({
		steps: steps
	});

	var started = false;

	module.exports = {
		start: function start() {
			if (!globals.tour) {
				started = true;
				globals.tour = tour;
				globals.tour.start();
			}
		},
		welcome: function welcome() {
			if (!storageManager.isDone('welcomeFinished')) {
				if (!globals.tour) {
					started = true;
					globals.tour = tour;
					globals.tour.start();
				}
			}
		},
		stop: function stop() {
			view.setOpacityForAll(true, 1);
			started = false;
			globals.tour.stop();
			blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
			delete globals.tour;
		},
	};


/***/ }
/******/ ]);