Bot = {};
Bot.Config = function Config() {
	return {
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
};

Bot.Globals = function Globals() {
	Bot.tours = {};

	Bot.display = {
		numOfRuns: 0,
		logQueue: [],
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

	Bot.initialDisplay = {};

	Bot.copyObjectKeys = function copyObjectKeys(obj1, obj2) {
		$.extend(obj1, JSON.parse(JSON.stringify(obj2)));
	};

	Bot.copyObjectKeys(Bot.initialDisplay, Bot.display);

	Bot.resetDisplay = function resetDisplay() {
		Bot.copyObjectKeys(Bot.display, Bot.initialDisplay);
		Bot.updateDisplay();
		Bot.showTrades();
	};

	Bot.updateDisplay = function updateDisplay() {
		Object.keys(Bot.display)
			.forEach(function (key) {
				$('.' + key)
					.text(Bot.display[key]);
				if (key === 'totalProfit' || key === 'lastProfit') {
					if (+Bot.display[key] > 0) {
						$('.' + key)
							.css('color', 'green');
					} else if (+Bot.display[key] < 0) {
						$('.' + key)
							.css('color', 'red');
					} else {
						$('.' + key)
							.css('color', 'black');
					}
				}
			});
	};

	Bot.undo = function undo() {
		Blockly.mainWorkspace.undo();
	};

	Bot.redo = function redo() {
		Blockly.mainWorkspace.undo(true);
	};

	Bot.addTrade = function addTrade(trade) {
		trade.number = Bot.display.numOfRuns;
		// Bot.display.tradeTable.reverse(); //reverse the table row growth
		if (Bot.display.tradeTable.length > Bot.display.tradesCount) {
			Bot.display.tradeTable.shift();
		}
		Bot.display.tradeTable.push(trade);
		// Bot.display.tradeTable.reverse();
		Bot.showTrades();
	};

	Bot.showTrades = function showTrades() {
		$('#tradesDisplay tbody')
			.children()
			.remove();
		var count = 0;
		Bot.display.tradeTable.forEach(function (trade, index) {
			var payout = (trade.result !== 'win') ? 0 : +trade.payout;
			var lastProfit = +(payout - +trade.askPrice)
				.toFixed(2);
			var element = '<tr>' + '<td>' + trade.number + '</td>' + '<td>' + trade.statement + '</td>' + '<td>' + trade.type + '</td>' + '<td>' + trade.entrySpot + '</td>' + '<td>' + trade.exitSpot + '</td>' + '<td>' + trade.askPrice + '</td>' + '<td>' + payout + '</td>' + '<td>' + lastProfit + '</td>' + '</tr>';
			$('#tradesDisplay tbody')
				.append(element);
			count += 1;
		});
		for (var i = count; i < Bot.display.tableSize; i += 1) {
			var element = '<tr>';
			for (var j = 0; j < 8; j += 1) {
				element += '<td></td>';
			}
			element += '</tr>';
			$('#tradesDisplay tbody')
				.append(element);
		}
		$('.table-scroll')
			.scrollTop($('.table-scroll')[0].scrollHeight);
	};

	Bot.toggleDebug = function toggleDebug() {
		if (Bot.debug === undefined) {
			Bot.debug = false;
		}
		Bot.debug = !Bot.debug;
		if (Bot.debug) {
			Bot.display.logQueue.forEach(function (log) {
				console.log.apply(console, log);
			});
			Bot.display.logQueue = [];
		}
	};

	Bot.queueLog = function queueLog() {
		Bot.display.logQueue.push(Array.prototype.slice.apply(arguments));
	};

	Bot.saveXml = function saveXml(showOnly) {
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
			Bot.utils.log(xmlText);
		} else {
			var filename = 'binary-bot' + parseInt(new Date()
				.getTime() / 1000) + '.xml';
			var blob = new Blob([xmlText], {
				type: 'text/xml;charset=utf-8'
			});
			saveAs(blob, filename);
		}
	};

	Bot.showCode = function showCode() {
		// Generate JavaScript code and display it.
		try {
			Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
			var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
			Bot.utils.log(code);
		} catch (e) {
			Bot.utils.showError(e);
		}

	};

	Bot.run = function run() {
		// Generate JavaScript code and run it.
		try {
			window.LoopTrap = 1000;
			Blockly.JavaScript.INFINITE_LOOP_TRAP =
				'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
			var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
			Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
			var EVAL_BLOCKLY_CODE = eval;
			EVAL_BLOCKLY_CODE(code);
			$('#stopButton')
				.text('Stop');
			$('#runButton')
				.text('Restart');
			$('#summaryPanel')
				.show();
			$('#stopButton')
				.unbind('click', Bot.reset);
			$('#stopButton')
				.bind('click', Bot.stop);
		} catch (e) {
			Bot.utils.showError(e);
		}
	};

	Bot.addAccount = function addAccount() {
		var token = prompt(i18n._('Please enter your token here:'), '');
		Bot.server.addAccount(token);
	};

	Bot.startTutorial = function startTutorial(e) {
		if (e) {
			e.preventDefault();
		}
		if (Bot.activeTutorial) {
			Bot.activeTutorial.stop();
		}
		Bot.activeTutorial = Bot.tours[$('#tours')
			.val()];
		Bot.activeTutorial.start();
		$('#tutorialButton')
			.unbind('click', Bot.startTutorial);
		$('#tutorialButton')
			.bind('click', Bot.stopTutorial);
		$('#tutorialButton')
			.text(i18n._('Stop!'));
	};

	Bot.stopTutorial = function stopTutorial(e) {
		if (e) {
			e.preventDefault();
		}
		if (Bot.activeTutorial) {
			if (e) {
				Bot.activeTutorial.stop();
			}
			Bot.activeTutorial = null;
		}
		$('#tutorialButton')
			.unbind('click', Bot.stopTutorial);
		$('#tutorialButton')
			.bind('click', Bot.startTutorial);
		$('#tutorialButton')
			.text(i18n._('Go!'));
	};

	Bot.reset = function reset(e) {
		if (e) {
			e.preventDefault();
		}
		Bot.resetDisplay();
		Bot.utils.log(i18n._('Reset successful'), 'success');
	};

	Bot.stop = function stop(e) {
		if (e) {
			e.preventDefault();
		}
		Bot.server.stop();
		$('#stopButton')
			.text(i18n._('Reset'));
		$('#runButton')
			.text(i18n._('Run'));
		$('#stopButton')
			.unbind('click', Bot.stop);
		$('#stopButton')
			.bind('click', Bot.reset);
	};

	Bot.disableRun = function disableRun(disabled) {
		$('#runButton')
			.prop('disabled', disabled);
	};

	Bot.showSummary = function showSummary() {
		$('#summaryPanel')
			.show();
	};

};

Bot.Version = function Version() {
	Bot.version = '1.1.5';
	if (Bot.debug) {
		console.log('%cBinary Bot (v' + Bot.version + ') started.', 'color: green');
	} else {
		Bot.queueLog('%cBinary Bot (v' + Bot.version + ') started.', 'color: green');
	}
};

Bot.View = function View() {
	var workspace;
	$.get('www/xml/toolbox.xml', function (toolbox) {
		workspace = Blockly.inject('blocklyDiv', {
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
			Blockly.Xml.domToWorkspace(main.getElementsByTagName('xml')[0], workspace);
			Blockly.mainWorkspace.getBlockById('trade')
				.setDeletable(false);
			Blockly.mainWorkspace.getBlockById('strategy')
				.setDeletable(false);
			Blockly.mainWorkspace.getBlockById('finish')
				.setDeletable(false);
			Bot.utils.updateTokenList();
			Bot.utils.addPurchaseOptions();
			Blockly.mainWorkspace.clearUndo();
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
				Bot.utils.log(i18n._('File is not supported:' + ' ') + file.name, 'info');
			}
		}
	};

	var readFile = function readFile(f) {
		reader = new FileReader();
		reader.onload = (function (theFile) {
			return function (e) {
				try {
					Blockly.mainWorkspace.clear();
					var xml = Blockly.Xml.textToDom(e.target.result);
					Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
					Bot.utils.addPurchaseOptions();
					var tokenList = Bot.utils.getStorageManager()
						.getTokenList();
					if (tokenList.length !== 0) {
						Blockly.mainWorkspace.getBlockById('trade')
							.getField('ACCOUNT_LIST')
							.setValue(tokenList[0].token);
						Blockly.mainWorkspace.getBlockById('trade')
							.getField('ACCOUNT_LIST')
							.setText(tokenList[0].account_name);
					}
					Blockly.mainWorkspace.clearUndo();
					Blockly.mainWorkspace.zoomToFit();
					Bot.utils.log(i18n._('Blocks are loaded successfully'), 'success');
				} catch (err) {
					Bot.utils.showError(err);
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
		.bind('click', Bot.startTutorial);
	$('#stopButton')
		.text(i18n._('Reset'));
	$('#stopButton')
		.bind('click', Bot.reset);

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

	Bot.showTrades();

	var BinaryChart = window['binary-charts'];
	Bot.chart = BinaryChart.createChart('chart', {
		ticks: []
	});

	Bot.uiComponents = {
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

	Bot.doNotHide = ['center', 'flyout', 'workspace_inside', 'trash', 'submarket', 'strategy', 'finish'];

	Bot.getUiComponent = function getUiComponent(component) {
		return $(Bot.uiComponents[component]);
	};

};

Bot.Definitions = function Definitions(){
Blockly.Blocks.trade = {
	init: function () {
		this.appendDummyInput()
			.appendField(i18n._("Trade With Account:"))
			.appendField(new Blockly.FieldDropdown(Bot.server.getAccounts), "ACCOUNT_LIST");
		this.appendStatementInput("SUBMARKET")
			.setCheck("Submarket")
			.appendField(i18n._("Submarket"));
		this.setPreviousStatement(true, null);
		this.setColour(60);
		this.setTooltip(i18n._('The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts.'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function (ev) {
		Bot.utils.getRelationChecker()
			.trade(this, ev);
	},
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#cur8so

Object.keys(Bot.config.opposites).forEach(function(opposites){
	Blockly.Blocks[opposites.toLowerCase()] = {
		init: function() {
			var option_names = [];
			Bot.config.opposites[opposites].forEach(function(options){
				
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
				.appendField(new Blockly.FieldDropdown(Bot.config.lists.PAYOUTTYPE), "PAYOUTTYPE_LIST");
			this.appendDummyInput()
				.appendField(i18n._("Currency:"))
				.appendField(new Blockly.FieldDropdown(Bot.config.lists.CURRENCY), "CURRENCY_LIST");
			this.appendValueInput("AMOUNT")
				.setCheck("Number")
				.appendField(i18n._("Amount:"));
			if ( Bot.config.opposites_have_barrier.indexOf(opposites) > -1 ) {
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
			Bot.utils.getRelationChecker().condition(this, ev);
		},
	};
});

Blockly.Blocks.contract_check_result = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Result is"))
				.appendField(new Blockly.FieldDropdown(Bot.config.lists.CHECK_RESULT), "CHECK_RESULT");
    this.setOutput(true, "Boolean");
    this.setColour(180);
    this.setTooltip(i18n._('True if the result matches the selection'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_finish(this, ev, 'Check Result');
	},
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xq4ajc

Blockly.Blocks.contract_details = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Contract Details"));
    this.setOutput(true, "Array");
    this.setColour(180);
    this.setTooltip(i18n._('Returns the list of details for the finished contract'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_finish(this, ev, 'Contract Details');
	},
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i7qkfj

Blockly.Blocks.on_finish = {
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

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u8i287

Blockly.Blocks.read_details = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Contract Detail:"))
        .appendField(new Blockly.FieldDropdown(Bot.config.lists.DETAILS), "DETAIL_INDEX");
		this.setOutput(true, null);
    this.setColour(180);
    this.setTooltip(i18n._('Reads a selected option from contract details list'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_finish(this, ev, 'Read Contract Details');
	},
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#e54skh

Blockly.Blocks.contract_result = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Contract Result"));
    this.setOutput(true, "String");
    this.setColour(180);
    this.setTooltip(i18n._('Returns the result of the finished contract'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_finish(this, ev, 'Contract Result');
	},
};


// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xkasg4

Blockly.Blocks.trade_again = {
	init: function() {
		this.appendDummyInput()
			.appendField(i18n._("Trade Again"));
		this.setPreviousStatement(true, 'TradeAgain');
		this.setColour(180);
		this.setTooltip(i18n._('Runs the trade block again'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_finish(this, ev, 'Trade Again');
	},
};

Blockly.Blocks.check_direction = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Direction is"))
				.appendField(new Blockly.FieldDropdown(Bot.config.lists.CHECK_DIRECTION), "CHECK_DIRECTION");
    this.setOutput(true, "Boolean");
    this.setColour(180);
    this.setTooltip(i18n._('True if the direction matches the selection'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_strategy(this, ev, 'Check Direction');
	},
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#n3drko

Blockly.Blocks.direction = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Tick Direction"));
    this.setOutput(true, "String");
    this.setColour(180);
    this.setTooltip(i18n._('Returns the tick direction received by a strategy block, its value could be "up" if the tick is more than before, "down" if less than before and empty ("") if the tick is equal to the previous tick'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_strategy(this, ev, 'Tick Direction');
	},
};


// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo

Blockly.Blocks.purchase = {
	init: function() {
		this.appendDummyInput()
			.appendField(i18n._("Purchase"))
			.appendField(new Blockly.FieldDropdown(Bot.server.getPurchaseChoices), "PURCHASE_LIST");
		this.setPreviousStatement(true, 'Purchase');
		this.setColour(180);
		this.setTooltip(i18n._('Purchases a chosen contract. Accepts index to choose between the contracts.'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_strategy(this, ev, 'Purchase');
	},
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u7tjez

Blockly.Blocks.on_strategy = {
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

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335

Blockly.Blocks.tick = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Tick Value"));
    this.setOutput(true, "Number");
    this.setColour(180);
    this.setTooltip(i18n._('Returns the tick value received by a strategy block'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_strategy(this, ev, 'Tick Value');
	},
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kqvz7z

Blockly.Blocks.balance = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Balance:"))
        .appendField(new Blockly.FieldDropdown([[i18n._("string"), "STR"], [i18n._("number"), "NUM"]]), "BALANCE_TYPE");
    this.setOutput(true, null);
    this.setColour(180);
    this.setTooltip(i18n._('Get balance number or string'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pmhydb

Blockly.Blocks.notify = {
  init: function() {
    this.appendValueInput("MESSAGE")
        .setCheck(null)
        .appendField(i18n._("Notify type:"))
        .appendField(new Blockly.FieldDropdown([[i18n._("success"), "success"], [i18n._("information"), "info"], [i18n._("warning"), "warn"], [i18n._("error"), "error"]]), "NOTIFICATION_TYPE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip(i18n._('Creates notification'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3bwqd4

Blockly.Blocks.total_profit = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Total Profit"));
    this.setOutput(true, "Number");
    this.setColour(180);
    this.setTooltip(i18n._('Returns the total profit'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#abpy8a

Bot.config.ticktrade_markets.forEach(function(market, index){
	Blockly.Blocks[market] = {
		init: function() {
			this.appendDummyInput()
				.appendField(Bot.config.ticktrade_market_names[index]);
			this.appendStatementInput("CONDITION")
				.setCheck("Condition");
			this.setInputsInline(true);
			this.setPreviousStatement(true, "Submarket");
			this.setColour(345);
			this.setTooltip(i18n._('Chooses the market:') + ' ' + Bot.config.ticktrade_market_names[index]);
			this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
		},
		onchange: function(ev){
			Bot.utils.getRelationChecker().submarket(this, ev);
		}
	};
});

};
Bot.CodeGenerators = function CodeGenerators(){
Blockly.JavaScript.trade = function (block) {
	var account = block.getFieldValue('ACCOUNT_LIST');
	var submarket = Blockly.JavaScript.statementToCode(block, 'SUBMARKET');
	if (submarket === '') {
		throw {
			message: i18n._('You have to add a submarket first')
		};
	}
	// TODO: Assemble JavaScript into code variable.
	var code = 'var trade = function(trade_again){\nBot.server.trade(\'' + account.trim() + '\', ' + submarket.trim() + ', trade_again);\n};\ntrade();\n';
	return code;
};

Object.keys(Bot.config.opposites).forEach(function(opposites){
	Blockly.JavaScript[opposites.toLowerCase()] = function(block) {
		if ( this.parentBlock_ === null ) {
			return '';
		}
		var duration = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC);
		var payouttype = block.getFieldValue('PAYOUTTYPE_LIST');
		var currency = block.getFieldValue('CURRENCY_LIST');
		var amount = Blockly.JavaScript.valueToCode(block, 'AMOUNT', Blockly.JavaScript.ORDER_ATOMIC);
		var prediction;
		if ( Bot.config.opposites_have_barrier.indexOf(opposites) > -1 ) {
			prediction = Blockly.JavaScript.valueToCode(block, 'PREDICTION', Blockly.JavaScript.ORDER_ATOMIC);
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
			((Bot.config.opposites_have_barrier.indexOf(opposites) > -1 && prediction !== '' )? 'barrier: ' + prediction + ',\n' : '' )+
		'})';
		return code;
	};
});

Blockly.JavaScript.contract_check_result = function(block) {
	var check_with = block.getFieldValue('CHECK_RESULT');
	var code = '(result === \'' + check_with + '\')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.contract_details = function(block) {
	var code = 'details';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.on_finish = function(block) {
  var stack = Blockly.JavaScript.statementToCode(block, 'FINISH_STACK');
  var code = 'Bot.on_finish = function on_finish(result, details){\n' + stack + '\n};\n';
  return code;
};

Blockly.JavaScript.read_details = function(block) {
  var detail_index = block.getFieldValue('DETAIL_INDEX');
  // TODO: Assemble JavaScript into code variable.
  var code = '((details instanceof Array && details.length === Bot.config.lists.DETAILS.length) ? details[' + ( parseInt(detail_index.trim()) - 1 ) + '] : \'\' )';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.contract_result = function(block) {
	var code = 'result';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.trade_again = function(block) {
	if ( this.parentBlock_ === null ) {
		return '';
	}
	var code = 'trade(true);\n';
	return code;
};

Blockly.JavaScript.check_direction = function(block) {
	var check_with = block.getFieldValue('CHECK_DIRECTION');
	var code = '(direction === \'' + check_with + '\')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.direction = function(block) {
	var code = 'direction';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.purchase = function(block) {
	if ( this.parentBlock_ === null ) {
		return '';
	}
	var purchase_list = block.getFieldValue('PURCHASE_LIST');
	var code = purchase_list;
	code = 'Bot.server.purchase(\'' + code + '\');\n';
	return code;
};

Blockly.JavaScript.on_strategy = function(block) {
  var stack = Blockly.JavaScript.statementToCode(block, 'STRATEGY_STACK');
  var code = 'Bot.on_strategy = function on_strategy(tick, direction){\n' + stack + '\n};\n';
  return code;
};

Blockly.JavaScript.tick = function(block) {
	var code = 'tick';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.balance = function(block) {
  var balance_type = block.getFieldValue('BALANCE_TYPE');
	var code = 'Bot.server.getBalance(\''+ balance_type +'\')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.notify = function(block) {
  var notification_type = block.getFieldValue('NOTIFICATION_TYPE');
  var message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'Bot.utils.log('+ message +', \''+ notification_type +'\', \'bottom left\');\n';
  return code;
};

Blockly.JavaScript.total_profit = function(block) {
	var code = 'Bot.server.getTotalProfit()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Bot.config.ticktrade_markets.forEach(function(market){
	Blockly.JavaScript[market] = function(block) {
		if ( this.parentBlock_ === null ) {
			return '';
		}
		var condition = Blockly.JavaScript.statementToCode(block, 'CONDITION');
		if ( !condition ) {
			throw {message: 'A condition has to be defined for the market'};
		}
		var code = 'Bot.markets.volatility.' + market + '('+condition.trim()+')';
		return code;
	};
});

};
Bot.Conditions = function Conditions() {
	return {
		ticktrade: function ticktrade(parameters) {
			var options = [];
			var opposites = Bot.config.opposites[parameters.condition];
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
};

/* jshint ignore:start */
(function ($) {
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

	}
})(jQuery);
/* jshint ignore:end */

Bot.Markets = function Markets() {
	Bot.markets = {};
	Bot.markets.volatility = {};
	Bot.config.ticktrade_markets.forEach(function (market) {
		Bot.markets.volatility[market] = function (options) {
			Bot.server.symbol = market.toUpperCase();

			options.forEach(function (option) {
				option.symbol = Bot.server.symbol;
			});

			var submarket = function submarket(cb) {
				Bot.server.submitProposal(options[0]);
				Bot.server.submitProposal(options[1]);
			};

			return submarket;
		};
	});
};

Bot.RelationChecker = function RelationChecker() {

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
			if (Bot.config.ticktrade_markets.indexOf(Blockly.mainWorkspace.getBlockById(ev.blockId)
					.type) >= 0) {
				Bot.utils.broadcast('tour:submarket_created');
			}
			if (Bot.config.conditions.indexOf(Blockly.mainWorkspace.getBlockById(ev.blockId)
					.type) >= 0) {
				Bot.utils.broadcast('tour:condition_created');
			}
			if (Blockly.mainWorkspace.getBlockById(ev.blockId)
				.type === 'math_number') {
				Bot.utils.broadcast('tour:number');
			}
			if (Blockly.mainWorkspace.getBlockById(ev.blockId)
				.type === 'purchase') {
				Bot.utils.broadcast('tour:purchase_created');
			}
			if (Blockly.mainWorkspace.getBlockById(ev.blockId)
				.type === 'trade_again') {
				Bot.utils.broadcast('tour:trade_again_created');
			}
		}
		if (_trade.childBlocks_.length > 0 && Bot.config.ticktrade_markets.indexOf(_trade.childBlocks_[0].type) < 0) {
			Bot.utils.log(i18n._('The trade block can only accept submarket blocks'), 'warning');
			Array.prototype.slice.apply(_trade.childBlocks_)
				.forEach(function (child) {
					child.unplug();
				});
		} else if (_trade.childBlocks_.length > 0) {
			submarket(_trade.childBlocks_[0], ev);
			Bot.utils.broadcast('tour:submarket');
			if (ev.hasOwnProperty('newInputName')) {
				Bot.utils.addPurchaseOptions();
			}
		}
		var topParent = Bot.utils.findTopParentBlock(_trade);
		if (topParent !== null) {
			if (Bot.config.ticktrade_markets.indexOf(topParent.type) >= 0 || topParent.type === 'on_strategy' || topParent.type === 'on_finish') {
				Bot.utils.log(i18n._('The trade block cannot be inside binary blocks'), 'warning');
				_trade.unplug();
			}
		}
	};
	var submarket = function submarket(_submarket, ev) {
		if (_submarket.childBlocks_.length > 0 && Bot.config.conditions.indexOf(_submarket.childBlocks_[0].type) < 0) {
			Bot.utils.log(i18n._('Submarket blocks can only accept condition blocks'), 'warning');
			Array.prototype.slice.apply(_submarket.childBlocks_)
				.forEach(function (child) {
					child.unplug();
				});
		} else if (_submarket.childBlocks_.length > 0) {
			condition(_submarket.childBlocks_[0], ev, true);
		}
		if (_submarket.parentBlock_ !== null) {
			if (_submarket.parentBlock_.type !== 'trade') {
				Bot.utils.log(i18n._('Submarket blocks have to be added to the trade block'), 'warning');
				_submarket.unplug();
			}
		}
	};
	var condition = function condition(_condition, ev, calledByParent) {
		if (_condition.parentBlock_ !== null) {
			if (Bot.config.ticktrade_markets.indexOf(_condition.parentBlock_.type) < 0) {
				Bot.utils.log(i18n._('Condition blocks have to be added to submarket blocks'), 'warning');
				_condition.unplug();
			} else {
				Bot.utils.broadcast('tour:condition');
				if (!calledByParent) {
					if ((ev.type === 'change' && ev.element && ev.element === 'field') || (ev.type === 'move' && typeof ev.newInputName === 'string')) {
						var added = [];
						var duration = getNumField(_condition, 'DURATION');
						if (duration !== '') {
							if (!isInteger(duration) || !isInRange(duration, 5, 15)) {
								Bot.utils.log(i18n._('Number of ticks must be between 5 and 10'), 'warning');
							} else {
								Bot.utils.broadcast('tour:ticks');
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
								Bot.utils.log(i18n._('Prediction must be one digit'), 'warning');
							} else {
								added.push('PREDICTION');
							}
						}
						if (added.indexOf('AMOUNT') >= 0 && added.indexOf('DURATION') >= 0) {
							if (_condition.inputList.slice(-1)[0].name === 'PREDICTION') {
								if (added.indexOf('PREDICTION') >= 0) {
									Bot.utils.broadcast('tour:options');
								}
							} else {
								Bot.utils.broadcast('tour:options');
							}
						}
					}
				}
			}
		}
	};
	var inside_strategy = function inside_strategy(blockObject, ev, name) {
		var topParent = Bot.utils.findTopParentBlock(blockObject);
		if (topParent !== null && (topParent.type === 'on_finish' || topParent.type === 'trade')) {
			Bot.utils.log(name + ' ' + i18n._('must be added inside the strategy block'), 'warning');
			blockObject.unplug();
		} else if (topParent !== null && topParent.type === 'on_strategy') {
			if (blockObject.type === 'purchase') {
				Bot.utils.broadcast('tour:purchase');
			}
		}
	};
	var inside_finish = function inside_finish(blockObject, ev, name) {
		var topParent = Bot.utils.findTopParentBlock(blockObject);
		if (topParent !== null && (topParent.type === 'on_strategy' || topParent.type === 'trade')) {
			Bot.utils.log(name + ' ' + i18n._('must be added inside the finish block'), 'warning');
			blockObject.unplug();
		} else if (topParent !== null && topParent.type === 'on_finish') {
			if (blockObject.type === 'trade_again') {
				Bot.utils.broadcast('tour:trade_again');
			}
		}
	};
	return {
		trade: trade,
		submarket: submarket,
		condition: condition,
		inside_strategy: inside_strategy,
		inside_finish: inside_finish,
	};
};

Bot.StorageManager = function StorageManager() {
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
	return {
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
};

Bot.Trade = function () {
	var showError = Bot.utils.showError;
	var log = Bot.utils.log;
	var LiveApi = window['binary-live-api'].LiveApi;
	Bot.server = {};
	Bot.server.ticks = [];
	Bot.server.contractForChart = null; 

	// influences display, calls on_finish
	Bot.server.on_contract_finish = function on_contract_finish(contract) {
		Bot.addTrade(contract);
		var payout = (contract.result !== 'win') ? 0 : +contract.payout;
		Bot.display.lastProfit = +(payout - +contract.askPrice)
			.toFixed(2);
		Bot.display.totalStake = +(+Bot.display.totalStake + (+contract.askPrice))
			.toFixed(2);
		Bot.display.totalPayout = +(+Bot.display.totalPayout + payout)
			.toFixed(2);
		Bot.display.totalProfit = +(+Bot.display.totalProfit + (+Bot.display.lastProfit))
			.toFixed(2);
		Bot.display.lastResult = contract.result;
		Bot.updateDisplay();

		var detail_list = [
			contract.statement, +contract.askPrice, +payout,
			Bot.display.lastProfit,
			contract.type, +contract.entrySpot,
			Bot.utils.getUTCTime(new Date(parseInt(contract.entrySpotTime + '000'))), +contract.exitSpot,
			Bot.utils.getUTCTime(new Date(parseInt(contract.exitSpotTime + '000'))), +((contract.barrier) ? contract.barrier : 0),
		];

		log(i18n._('Purchase was finished, result is:') + ' ' + contract.result, (contract.result === 'win') ? 'success' : 'error');

		Bot.on_finish(contract.result, detail_list);
		Bot.server.purchaseNotDone = false;
		Bot.server.contractForChart = null;
		Bot.disableRun(false);
	};

	Bot.server.updateChart = function updateChart(){
		var contract;
		if ( Bot.server.contractForChart ) {
			contract = {
				barrier: Bot.server.contractForChart.barrier,
				entry_tick_time: Bot.server.contractForChart.entry_tick_time,
				contract_type: Bot.server.contractForChart.contract_type,
			};
			if ( Bot.server.contractForChart.exit_tick_time ) {
				contract.exit_tick_time = Bot.server.contractForChart.exit_tick_time;
			} else {
				contract.date_expiry = Bot.server.contractForChart.date_expiry;
			}
		}
		Bot.chart.updateChart({
			ticks: Bot.server.ticks,
			contract: contract
		});
	};

	Bot.server.on_contract_update = function on_contract_update(contract) {
		Bot.server.contractForChart = contract;
		Bot.server.updateChart();
	};

	Bot.server.callStrategy = function callStrategy() {
		if ( Bot.server.strategyEnabled ) {
			var direction = '';
			if ( Bot.server.ticks.length > 1 ) {
				if ( +Bot.server.ticks.slice(-1)[0].quote > +Bot.server.ticks.slice(-2).quote ) {
					direction = 'up';
				} else if ( +Bot.server.ticks.slice(-1)[0].quote < +Bot.server.ticks.slice(-2).quote ) {
					direction = 'down';
				} 
			}
			Bot.on_strategy(+Bot.server.ticks.slice(-1)[0].quote, direction);
		}
	};

	Bot.server.accounts = [
		[i18n._('Please add a token first'), '']
	];
	Bot.server.purchase_choices = [
		[i18n._('Click to select'), '']
	];

	Bot.server.getAccounts = function getAccounts() {
		return Bot.server.accounts;
	};

	Bot.server.getPurchaseChoices = function getPurchaseChoices() {
		return Bot.server.purchase_choices;
	};

	Bot.server.getTotalProfit = function getTotalProfit() {
		return +Bot.display.totalProfit;
	};

	Bot.server.getBalance = function getBalance(balance_type) {
		if (!isNaN(parseFloat(Bot.server.balance))) {
			return (balance_type === 'NUM') ? parseFloat(Bot.server.balance) : Bot.server.balance_currency + ' ' + parseFloat(Bot.server.balance);
		} else {
			return 0;
		}
	};

	Bot.server.findToken = function findToken(token) {
		var index = -1;
		Bot.server.accounts.forEach(function (tokenInfo, i) {
			if (tokenInfo[1] === token) {
				index = i;
			}
		});
		return index;
	};

	Bot.server.removeToken = function removeToken(token) {
		var index = Bot.server.findToken(token);
		Bot.utils.getStorageManager()
			.removeToken(token);
		Bot.utils.updateTokenList();
	};

	Bot.server.logout = function logout() {
		Bot.utils.getStorageManager()
			.removeAllTokens();
		Bot.utils.updateTokenList();
		log(i18n._('Logged you out!'), 'info');
	};

	Bot.server.addAccount = function addAccount(token) {
		var index = Bot.server.findToken(token);
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
					Bot.utils.getStorageManager()
						.addToken(token, response.authorize.loginid);
					Bot.utils.updateTokenList(token);
					log(i18n._('Your token was added successfully'), 'info');
				}, function (reason) {
					api.disconnect();
					Bot.server.removeToken(token);
					showError(i18n._('Authentication failed using token:') + ' ' + token);
				});
		}
	};

	Bot.server.updateBalance = function updateBalance(data) {
		Bot.server.balance = data.balance;
		Bot.server.balance_currency = data.currency;
		Bot.display.balance = Bot.server.balance_currency + ' ' + parseFloat(Bot.server.balance);
		Bot.updateDisplay();
	};

	Bot.server.requestBalance = function requestBalance() {
		Bot.server.api.send({
				balance: 1,
			})
			.then(function (response) {
				Bot.server.updateBalance(response.balance);
			}, function (reason) {
				log(i18n._('Could not get balance'));
			});
	};

	Bot.server.observeTicks = function observeTicks() {
		Bot.server.api.events.on('tick', function (feed) {
			log(i18n._('tick received at:') + ' ' + feed.tick.epoch);
			Bot.server.ticks = Bot.server.ticks.concat({
				epoch: +feed.tick.epoch,
				quote: +feed.tick.quote,
			});
			Bot.server.updateChart();
			Bot.server.callStrategy();
		});

		Bot.server.api.events.on('history', function (feed) {
			Bot.server.ticks = [];
			feed.history.times.forEach(function(time, index){
				Bot.server.ticks.push({
					epoch: +time,
					quote: +feed.history.prices[index]
				});
			});
		});
	};

	Bot.server.requestHistory = function requestHistory() {
		Bot.server.api.getTickHistory(Bot.server.symbol, {
				"end": "latest",
				"count": 600,
				"subscribe": 1
			})
			.then(function (value) {
				log(i18n._('Request received for history'));
			}, function (reason) {
				log(reason);
				Bot.server.reconnect();
			});
	};

	Bot.server.requestTransaction = function requestTransaction() {
		Bot.server.api.subscribeToTransactions();
	};

	Bot.server.observeTransaction = function observeTransaction() {
		Bot.server.api.events.on('transaction', function(response) {
			var transaction = response.transaction;
			Bot.server.updateBalance(transaction);
			if ( transaction.action === 'sell' ) {
				var result;
				if (+transaction.amount === 0) {
					result = 'loss';
				} else {
					result = 'win';
				}
				Bot.server.getContractInfo(result, transaction.contract_id, null);
			} else if ( transaction.action === 'buy' ) {
				Bot.server.api.unsubscribeFromAllProposals().then(function(){
					Bot.server.contracts = [];
					Bot.server.api.subscribeToOpenContract(transaction.contract_id);
				});
			}
		});
	};

	Bot.server.observeOpenContracts = function observeOpenContracts() {
		Bot.server.api.events.on('proposal_open_contract', function(response) {
			Bot.server.on_contract_update(response.proposal_open_contract);
		});
	};

	Bot.server.observeProposal = function observeProposal(options) {
		Bot.server.api.events.on('proposal', function (value) {
			if (Bot.server.contracts.length === 2) {
				Bot.server.contracts = [];
				Bot.server.strategyEnabled = false;
			}
			Bot.server.contracts.push(value);
			if (Bot.server.contracts.length === 2) {
				log(i18n._('Contracts are ready to be purchased by the strategy'), 'info');
				Bot.server.strategyEnabled = true;
			}
		});
	};

	Bot.server.submitProposal = function submitProposal(options) {
		Bot.server.api.subscribeToPriceForContractProposal(options)
			.then(function (value) {}, function (reason) {
				Bot.stop();
				showError(reason);
			});
	};

	Bot.server.getContractInfo = function getContractInfo(result, contract_id, callback) {
		Bot.server.api.send({
				proposal_open_contract: 1,
				contract_id: contract_id
			})
			.then(function (response) {
				var data = response.proposal_open_contract;
				Bot.server.on_contract_finish({
					result: result,
					askPrice: data.buy_price,
					statement: data.transaction_ids.buy,
					type: data.contract_type,
					entrySpot: data.entry_tick,
					entrySpotTime: data.entry_tick_time,
					exitSpot: data.exit_tick,
					exitSpotTime: data.exit_tick_time,
					barrier: data.barrier,
					payout: data.payout,
				});
				if (callback) {
					callback(response.proposal_open_contract);
				}
			}, function (reason) {
				showError(reason);
				Bot.server.reconnect();
			});
	};

	Bot.server.getLastPurchaseInfo = function getLastPurchaseInfo(callback) {
		Bot.server.api.getStatement({
				description: 1,
				limit: 1
			})
			.then(function (response) {
				var transaction = response.statement.transactions[0];
				if (transaction.action_type === 'sell') {
					var result;
					if (+transaction.amount === 0) {
						result = 'loss';
					} else {
						result = 'win';
					}
					Bot.server.getContractInfo(result, transaction.contract_id, callback);
				}
			}, function (reason) {
				showError(reason);
				Bot.server.reconnect();
			});
	};

	Bot.server.purchase = function purchase(option) {
		Bot.server.strategyEnabled = false;
		var proposalContract = (option === Bot.server.contracts[1].echo_req.contract_type) ? Bot.server.contracts[1] : Bot.server.contracts[0];
		log(i18n._('Purchased') + ': ' + proposalContract.proposal.longcode, 'info');
		Bot.server.api.buyContract(proposalContract.proposal.id, proposalContract.proposal.ask_price)
			.then(function (purchaseContract) {
				Bot.server.purchaseNotDone = true;
				Bot.display.numOfRuns++;
				Bot.updateDisplay();
				Bot.disableRun(true);
			}, function (reason) {
				Bot.stop();
				showError(reason);
			});
	};

	Bot.server.restartContracts = function restartContracts() {
		Bot.server.strategyEnabled = false;
		Bot.server.api.unsubscribeFromAllProposals()
			.then(function (response) {
				Bot.server.authorizeCallback();
			}, function (reason) {
				showError(reason);
			});
	};

	Bot.server.observeAuthorize = function observeAuthorize() {
		Bot.server.api.events.on('authorize', function (response) {
			if (response.error) {
				showError(response.error);
			} else {
				var now = parseInt((new Date()
					.getTime()) / 1000);
				if (Bot.server.lastAuthorized === undefined || now - Bot.server.lastAuthorized >= 1) { // prevent live-api to call this many times in case of disconnect
					Bot.server.lastAuthorized = now;
					log(i18n._('Authenticated using token:') + ' ' + Bot.server.token, 'info');
					if (Bot.server.purchaseNotDone) {
						Bot.server.getLastPurchaseInfo(function () {
							Bot.server.restartContracts();
						});
					} else {
						Bot.server.restartContracts();
					}
					Bot.server.requestBalance();
					Bot.server.requestHistory();
					Bot.server.requestTransaction();
				}
			}
		});
	};

	Bot.server.reconnect = function reconnect() {
		Bot.server.stop();
		Bot.server.api.token = Bot.server.token;
		Bot.server.api.connect();
		Bot.server.api.authorize(Bot.server.token);
	};

	Bot.server.stop = function stop() {
		if (Bot.server.api) {
			try {
				Bot.server.api.disconnect();
				Bot.disableRun(false);
			} catch (e) {}
		}
	};

	Bot.server.trade = function trade(token, callback, trade_again) {
		if (token === '') {
			showError(i18n._('No token is available to authenticate'));
		} else {
			Bot.server.authorizeCallback = callback;
			Bot.server.purchaseNotDone = false;
			Bot.disableRun(false);
			Bot.server.contracts = [];
			if (trade_again) {
				Bot.server.restartContracts();
			} else {
				Bot.server.token = token;
				Bot.server.stop();
				Bot.server.api = new LiveApi();
				Bot.server.observeTicks();
				Bot.server.observeProposal();
				Bot.server.observeTransaction();
				Bot.server.observeOpenContracts();
				Bot.server.observeAuthorize();
				Bot.server.api.authorize(Bot.server.token);
			}
		}
	};

	/*
	 Order of calls:
	 trade [-> authorize] ->  do subscriptions -> submitProposal -> callStrategy -> purchase -> contract_finished
	 */

};

Bot.Utils = function Utils() {
	var relationChecker = new Bot.RelationChecker();
	var storageManager = new Bot.StorageManager();

	var getUTCTime = function getUTCTime(date) {
		var dateObject = new Date(date);
		return ('0' + dateObject.getUTCHours())
			.slice(-2) + ':' + ('0' + dateObject.getUTCMinutes())
			.slice(-2) + ':' + ('0' + dateObject.getUTCSeconds())
			.slice(-2);
	};

	var showError = function showError(error) {
		if (error.stack) {
			if (Bot.debug) {
				console.log('%c' + error.stack, 'color: red');
			} else {
				Bot.queueLog('%c' + error.stack, 'color: red');
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
		if (Bot.debug) {
			console.log('%cError: ' + message, 'color: red');
		} else {
			Bot.queueLog('%cError: ' + message, 'color: red');
		}
	};

	var log = function log(message, notify_type, position) {
		if (notify_type !== undefined) {
			$.notify(message, {
				position: (position === undefined) ? 'bottom right' : position,
				className: notify_type,
			});
		}
		if (Bot.debug) {
			console.log(message);
		} else {
			Bot.queueLog(message);
		}
	};

	var broadcast = function broadcast(eventName, data) {
		window.dispatchEvent(new CustomEvent(eventName, {
			detail: data
		}));
	};

	var chooseByIndex = function chooseByIndex(caps_name, index, list) {
		list = (typeof list === 'undefined') ? Bot.config.lists[caps_name] : list;
		index = parseInt(index);
		if (isNaN(index)) {
			return null;
		}
		if (index > 0 && index <= list.length) {
			index--;
			return list[index][1];
		} else {
			return null;
		}
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
		Blockly.WidgetDiv.hideIfOwner(Blockly.mainWorkspace.getBlockById('trade')
			.getField('ACCOUNT_LIST'));
		if (tokenList.length === 0) {
			Bot.server.accounts = [
				[i18n._('Please add a token first'), '']
			];
			Blockly.mainWorkspace.getBlockById('trade')
				.getField('ACCOUNT_LIST')
				.setValue('');
			Blockly.mainWorkspace.getBlockById('trade')
				.getField('ACCOUNT_LIST')
				.setText(i18n._('Please add a token first'));
		} else {
			Bot.server.accounts = [];
			tokenList.forEach(function (tokenInfo) {
				Bot.server.accounts.push([tokenInfo.account_name, tokenInfo.token]);
			});
			var tokenInfoToAdd = tokenList[0];
			if (tokenToAdd !== undefined) {
				var tokenInfoIndex = storageManager.findToken(tokenToAdd);
				if (tokenInfoIndex >= 0) {
					tokenInfoToAdd = tokenList[tokenInfoIndex];
				}
			}
			if (Blockly.mainWorkspace.getBlockById('trade')
				.getField('ACCOUNT_LIST')
				.getValue() !== tokenInfoToAdd.token) {
				Blockly.mainWorkspace.getBlockById('trade')
					.getField('ACCOUNT_LIST')
					.setValue(tokenInfoToAdd.token);
			}
			if (Blockly.mainWorkspace.getBlockById('trade')
				.getField('ACCOUNT_LIST')
				.getText() !== tokenInfoToAdd.account_name) {
				Blockly.mainWorkspace.getBlockById('trade')
					.getField('ACCOUNT_LIST')
					.setText(tokenInfoToAdd.account_name);
			}
		}
	};

	var getStorageManager = function getStorageManager() {
		return storageManager;
	};

	var addPurchaseOptions = function addPurchaseOptions() {
		var firstOption = {};
		var secondOption = {};
		var trade = Blockly.mainWorkspace.getBlockById('trade');
		if (trade !== null && trade.getInputTargetBlock('SUBMARKET') !== null && trade.getInputTargetBlock('SUBMARKET')
			.getInputTargetBlock('CONDITION') !== null) {
			var condition_type = trade.getInputTargetBlock('SUBMARKET')
				.getInputTargetBlock('CONDITION')
				.type;
			var opposites = Bot.config.opposites[condition_type.toUpperCase()];
			Bot.server.purchase_choices = [];
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
				Bot.server.purchase_choices.push([option[Object.keys(option)[0]], Object.keys(option)[0]]);
			});
			var purchases = [];
			Blockly.mainWorkspace.getAllBlocks()
				.forEach(function (block) {
					if (block.type === 'purchase') {
						purchases.push(block);
					}
				});
			purchases.forEach(function (purchase) {
				var value = purchase.getField('PURCHASE_LIST')
					.getValue();
				Blockly.WidgetDiv.hideIfOwner(purchase.getField('PURCHASE_LIST'));
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

	var getRelationChecker = function getRelationChecker() {
		return relationChecker;
	};

	var setOpacityForAll = function setOpacityForAll(enabled, opacity) {
		if (enabled) {
			Object.keys(Bot.uiComponents)
				.forEach(function (key) {
					if (Bot.doNotHide.indexOf(key) < 0) {
						Bot.getUiComponent(key)
							.css('opacity', opacity);
						var disabled = +opacity < 1;
						Bot.getUiComponent(key)
							.find('button')
							.prop('disabled', disabled);
						Bot.getUiComponent(key)
							.find('input')
							.prop('disabled', disabled);
						Bot.getUiComponent(key)
							.find('select')
							.prop('disabled', disabled);
					}
				});
		}
	};

	var setOpacity = function setOpacity(enabled, componentName, opacity) {
		if (enabled) {
			Bot.getUiComponent(componentName)
				.css('opacity', opacity);
			var disabled = +opacity < 1;
			Bot.getUiComponent(componentName)
				.find('button')
				.prop('disabled', disabled);
			Bot.getUiComponent(componentName)
				.find('input')
				.prop('disabled', disabled);
			Bot.getUiComponent(componentName)
				.find('select')
				.prop('disabled', disabled);
		}
	};

	return {
		showError: showError,
		log: log,
		getUTCTime: getUTCTime,
		broadcast: broadcast,
		chooseByIndex: chooseByIndex,
		findTopParentBlock: findTopParentBlock,
		updateTokenList: updateTokenList,
		getStorageManager: getStorageManager,
		addPurchaseOptions: addPurchaseOptions,
		getRelationChecker: getRelationChecker,
		setOpacityForAll: setOpacityForAll,
		setOpacity: setOpacity,
	};
};

Bot.Introduction = function Introduction() {
	var steps = [{
		content: '<p>' + i18n._("Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot.") + '</p>',
		target: Bot.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacityForAll(started, 0.3);
		},
	}, {
		content: '<p>' + i18n._("You will need to add the blocks to this area which is called the <b>workspace</b>.") + '</p>',
		target: Bot.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'workspace', 1);
		},
		teardown: function (tour, options) {},
	}, {
		content: '<p>' + i18n._("To start pick a <b>submarket</b> block from volatility markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a submarket from left should lead you to the next step.)") + '</p>',
		target: Bot.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_submarket_created'],
		tour_submarket_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:submarket_created', this.tour_submarket_created);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].children_[0].reveal(true);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].children_[0].select();
			Bot.utils.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:submarket_created', this.tour_submarket_created);
			Bot.utils.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._("Great! Now add it to the <b>trade</b> block.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.submarket),
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
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].setExpanded(false);
		},
	}, {
		content: '<p>' + i18n._("Alright! Now pick a <b>condition</b> block.") + '</p>',
		target: Bot.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_condition_created'],
		tour_condition_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:condition_created', this.tour_condition_created);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[1].select();
			Bot.utils.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:condition_created', this.tour_condition_created);
			Bot.utils.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._("OK! Now add it to the submarket you added in the previous step.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.submarket),
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
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
		},
	}, {
		content: '<p>' + i18n._("Very good! It's time to add the options needed by the condition block, pick a number") + ' (<img src="www/image/number.png"/>) ' + i18n._("from the Math menu") + '</p>',
		target: Bot.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_number_created'],
		tour_number_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:number', this.tour_number_created);
			Blockly.mainWorkspace.toolbox_.tree_.children_[1].select();
			Bot.utils.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:number', this.tour_number_created);
			Bot.utils.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._("Click on the number block to edit its value") + ' (<img src="www/image/number_editing.png"/>), ' + i18n._("change the value to 5 and add it to the <b>ticks</b> field of the condition block") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.submarket),
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
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_options_added'],
		tour_options_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			Blockly.mainWorkspace.toolbox_.tree_.children_[1].select();
			window.addEventListener('tour:options', this.tour_options_added);
			Bot.getUiComponent('toolbox')
				.css('opacity', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:options', this.tour_options_added);
			Bot.getUiComponent('toolbox')
				.css('opacity', 1);
		},
	}, {
		content: '<p>' + i18n._("That's it, now you have a complete trade block with its options. It's time to define a strategy") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu") + '</p>',
		target: Bot.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		nextButton: true,
		setup: function (tour, options) {
			Bot.getUiComponent('toolbox')
				.css('opacity', 1);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].reveal(true);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].select();
		},
		teardown: function (tour, options) {
			Bot.getUiComponent('toolbox')
				.css('opacity', 0.3);
		},
	}, {
		content: '<p>' + i18n._("For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block") + '</p>',
		target: Bot.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_purchase_created'],
		tour_purchase_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].reveal(true);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].select();
			Bot.getUiComponent('toolbox')
				.css('opacity', 1);
			window.addEventListener('tour:purchase_created', this.tour_purchase_created);
		},
		teardown: function (tour, options) {
			Bot.getUiComponent('toolbox')
				.css('opacity', 0.3);
			window.removeEventListener('tour:purchase_created', this.tour_purchase_created);
		},
	}, {
		content: '<p>' + i18n._("Now add it to the Strategy block.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.strategy),
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
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("After a purchase was started, the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.") + '</p>',
		target: Bot.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_trade_again_created'],
		tour_trade_again_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[3].reveal(true);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[3].select();
			Bot.getUiComponent('toolbox')
				.css('opacity', 1);
			window.addEventListener('tour:trade_again_created', this.tour_trade_again_created);
		},
		teardown: function (tour, options) {
			Bot.getUiComponent('toolbox')
				.css('opacity', 0.3);
			window.removeEventListener('tour:trade_again_created', this.tour_trade_again_created);
		},
	}, {
		content: '<p>' + i18n._("Now add it to the On Finish block") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.finish),
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
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
		},
	}, {
		content: '<p>' + i18n._("Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its condition is unmet.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
		teardown: function (tour, options) {
			Bot.utils.setOpacityForAll(started, 1);
		},
	}, {
		content: '<p>' + i18n._("If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo") + '</p>',
		target: Bot.getUiComponent('undo_redo'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can save/load your blocks using these tools") + '</p>',
		target: Bot.getUiComponent('file_management'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on these buttons. Please make sure you have chosen a Virtual Account before running the blocks.") + '</p>',
		target: Bot.getUiComponent('run_stop'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can choose the token you want by the <b>Account</b> dropdown on the trade block. If you do not have any token in the dropdown please add one using the <b>Add Token</b> button above. Please make sure to use Virtual Account tokens for testing.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can add a token to the bot using the <b>Add Token</b> button.") + '</p>',
		target: Bot.getUiComponent('token'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can see the summary of your trades by clicking on this button.") + '</p>',
		target: Bot.getUiComponent('summary'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("Go ahead and run the blocks. You can stop the code anytime you want using the stop button, or reset the values in the result panels using the reset button.") + '</p>',
		target: Bot.getUiComponent('run_stop'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
		teardown: function (tour, options) {
			Bot.stopTutorial();
		},
	}, ];

	var tour = new Tourist.Tour({
		steps: steps
	});

	var started = false;

	return {
		start: function start() {
			if (!Bot.tour) {
				started = true;
				Bot.tour = tour;
				Bot.tour.start();
			}
		},
		stop: function stop() {
			Bot.utils.setOpacityForAll(true, 1);
			started = false;
			Bot.tour.stop();
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
			delete Bot.tour;
		},
	};
};

Bot.Welcome = function Welcome() {
	var steps = [{
		content: '<p>' + i18n._('Welcome to the binary bot, a blockly based automation tool for binary.com trades') + '</p>',
		target: Bot.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacityForAll(started, 0.3);
		},
	}, {
		content: '<p>' + i18n._('The blocks you put in here will create a binary bot code which you can then execute using the run button.') + '</p>',
		target: Bot.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'workspace', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'workspace', 0.3);
		},
	}, {
		content: '<p>' + i18n._('You can add blocks from here to the workspace') + '</p>',
		target: Bot.getUiComponent('toolbox'),
		nextButton: true,
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Erase the blocks by dropping them in here.') + '</p>',
		target: Bot.getUiComponent('trash'),
		nextButton: true,
		highlightTarget: true,
		my: 'right bottom',
		at: 'left top',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'trash', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'trash', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Use these buttons to load and save blocks') + '</p>',
		target: Bot.getUiComponent('file_management'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'file_management', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'file_management', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Click to add a token, at least one token is needed. Get your token from') + ' <a href="https://www.binary.com/user/api_tokenws" target="_blank">' + i18n._('here') + '</a></p>',
		target: Bot.getUiComponent('token'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'token', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'token', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Use these buttons to Undo/Redo changes to your blocks.') + '</p>',
		target: Bot.getUiComponent('undo_redo'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'undo_redo', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'undo_redo', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Click on this button to see the summary of your trades.') + '</p>',
		target: Bot.getUiComponent('summary'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'summary', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'summary', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Use these buttons to run or stop your blocks, or reset your result panels.') + '</p>',
		target: Bot.getUiComponent('run_stop'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'run_stop', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'run_stop', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Good Luck!') + '</p>',
		target: Bot.getUiComponent('center'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		teardown: function (tour, options) {
			Bot.utils.setOpacityForAll(started, 1);
			Bot.utils.getStorageManager()
				.setDone('welcomeFinished');
			Bot.stopTutorial();
		},
	}, ];

	var tour = new Tourist.Tour({
		steps: steps
	});

	var started = false;

	return {
		start: function start() {
			if (!Bot.tour) {
				started = true;
				Bot.tour = tour;
				Bot.tour.start();
			}
		},
		welcome: function welcome() {
			if (!Bot.utils.getStorageManager()
				.isDone('welcomeFinished')) {
				if (!Bot.tour) {
					started = true;
					Bot.tour = tour;
					Bot.tour.start();
				}
			}
		},
		stop: function stop() {
			Bot.utils.setOpacityForAll(true, 1);
			started = false;
			Bot.tour.stop();
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
			delete Bot.tour;
		},
	};
};
