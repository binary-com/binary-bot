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
			var lastProfit = +(+trade.sell_price - (+trade.buy_price))
				.toFixed(2);
			var element = '<tr>' + '<td>' + trade.number + '</td>' + '<td>' + trade.transaction_ids.buy + '</td>' + '<td>' + trade.contract_type + '</td>' + '<td>' + trade.entry_tick + '</td>' + '<td>' + trade.exit_tick + '</td>' + '<td>' + trade.buy_price + '</td>' + '<td>' + trade.sell_price + '</td>' + '<td>' + lastProfit + '</td>' + '</tr>';
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
