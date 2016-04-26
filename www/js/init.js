(function init(){
	var BinaryChart = window['binary-charts'];
	var workspace = Blockly.inject('blocklyDiv', {
		media: 'node_modules/blockly/media/',
		toolbox: document.getElementById('toolbox')
	});
	Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);

	Bot.saveXml = function saveXml(showOnly) {
		var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
		Array.prototype.slice.apply(xmlDom.getElementsByTagName('field')).forEach(function(field){
			if ( field.getAttribute('name') === 'ACCOUNT_LIST' ) {
				if ( field.childNodes.length >= 1 ) {
					field.childNodes[0].nodeValue = '';
				}
			}
		});
		Array.prototype.slice.apply(xmlDom.getElementsByTagName('block')).forEach(function(block){
			switch(block.getAttribute('type')){
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
		if ( showOnly ) {
			Bot.utils.log(xmlText);
		} else {
			var filename = 'binary-bot' + parseInt(new Date()
				.getTime() / 1000) + '.xml';
			var blob = new Blob([xmlText], {
				type: "text/xml;charset=utf-8"
			});
			saveAs(blob, filename);
		}
	};

	Bot.showCode = function showCode() {
		// Generate JavaScript code and display it.
		try {
			Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
			var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
			console.log(code);
		} catch(e) {
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
			eval(code);
			$('#stopButton').text('Stop');
			$('#runButton').text('Restart');
			$('#summaryPanel').show();
			$('#stopButton').unbind('click', Bot.reset);
			$('#stopButton').bind('click', Bot.stop);
		} catch (e) {
			Bot.utils.showError(e);
		}
	};

	Bot.addAccount = function addAccount() {
		var token = prompt('Please enter your token here:', '');
		Bot.server.addAccount(token);
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
		files = Array.prototype.slice.apply( files );
		var file = files[0];
		if ( file ) {
			if (file.type.match('text/xml')) {
				readFile(file);
			} else {
				Bot.utils.log('File: ' + file.name + ' is not supported.', 'info');
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
					var tokenList = Bot.utils.getStorageManager().getTokenList();
					if ( tokenList.length !== 0 ) {
						Blockly.mainWorkspace.getBlockById('trade').getField('ACCOUNT_LIST').setValue(tokenList[0].token);
						Blockly.mainWorkspace.getBlockById('trade').getField('ACCOUNT_LIST').setText(tokenList[0].account_name);
					}
					Blockly.mainWorkspace.clearUndo();
					Bot.utils.log('Blocks are loaded successfully', 'success');
				} catch(e){
					Bot.utils.showError(e);
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

	Bot.startTutorial = function startTutorial(e){
		if ( e ) {
			e.preventDefault();
		}
		if ( Bot.activeTutorial ) {
			Bot.activeTutorial.stop();	
		}
		Bot.activeTutorial = Bot[$('#tours').val()];
		Bot.activeTutorial.start();	
		$('#tutorialButton').unbind('click', Bot.startTutorial);
		$('#tutorialButton').bind('click', Bot.stopTutorial);
		$('#tutorialButton').text('Stop!');
	};

	Bot.stopTutorial = function stopTutorial(e){
		if ( e ) {
			e.preventDefault();
		}
		if ( Bot.activeTutorial ) {
			if ( e ) {
				Bot.activeTutorial.stop();	
			}
			Bot.activeTutorial = null;
		}
		$('#tutorialButton').unbind('click', Bot.stopTutorial);
		$('#tutorialButton').bind('click', Bot.startTutorial);
		$('#tutorialButton').text('Go!');
	};

	$('#tutorialButton').bind('click', Bot.startTutorial);

	Bot.reset = function reset(e){
		if ( e ) {
			e.preventDefault();
		}
		Bot.server.reset();
	};

	Bot.stop = function stop(e){
		if ( e ) {
			e.preventDefault();
		}
		Bot.server.stop();
		$('#stopButton').text('Reset');
		$('#runButton').text('Run');
		$('#stopButton').unbind('click', Bot.stop);
		$('#stopButton').bind('click', Bot.reset);
	};

	$('#stopButton').text('Reset');
	$('#stopButton').bind('click', Bot.reset);

	$('#summaryPanel .exitPanel').click(function(){
		$(this).parent().hide();
	});

	$('#summaryPanel').hide();

	Bot.showSummary = function showSummary(){
		$('#summaryPanel').show();
	};

	$('#summaryPanel').drags();

	Bot.showTrades();
	Bot.chart = BinaryChart.createChart('chart', { ticks: [] });
})();
