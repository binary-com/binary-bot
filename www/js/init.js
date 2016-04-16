var workspace = Blockly.inject('blocklyDiv', {
	media: 'node_modules/blockly/media/',
	toolbox: document.getElementById('toolbox')
});
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);

var saveXml = function saveXml(showOnly) {
	var xmlDom = Blockly.Xml.workspaceToDom(workspace);
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

var showCode = function showCode() {
	// Generate JavaScript code and display it.
	try {
		Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
		var code = Blockly.JavaScript.workspaceToCode(workspace);
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
		var code = Blockly.JavaScript.workspaceToCode(workspace);
		Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
		eval(code);
		$('#stopButton').text('Stop');
		$('#stopButton').unbind('click', Bot.reset);
		$('#stopButton').bind('click', Bot.stop);
	} catch (e) {
		Bot.utils.showError(e);
	}
};

var addAccount = function addAccount() {
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
	if (file.type.match('text/xml')) {
		readFile(file);
	} else {
		Bot.utils.log('File: ' + file.name + ' is not supported.', 'info');
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

Bot.startTutorial = function startTutorial(){
	Bot[$('#tours').val()].start();	
};

Bot.reset = function reset(e){
	e.preventDefault();
	Bot.server.reset();
};

Bot.stop = function stop(e){
	e.preventDefault();
	Bot.server.stop();
	$('#stopButton').text('Reset');
	$('#stopButton').unbind('click', Bot.stop);
	$('#stopButton').bind('click', Bot.reset);
};

$('#stopButton').text('Reset');
$('#stopButton').bind('click', Bot.reset);

$('#outputPanel .showPanel').click(function(){
	$('#outputPanel .showPanel').css('display', 'none');
	$('#outputPanel .hidePanel').css('display', 'block');
	$('#outputPanel .results').css('display', 'block');
	$('#outputPanel').animate({right: '0px'}, 1000);
});

$('#outputPanel .hidePanel').click(function(){
	$('#outputPanel .hidePanel').css('display', 'none');
	$('#outputPanel .showPanel').css('display', 'block');
	$('#outputPanel .results').css('display', 'none');
	$('#outputPanel').animate({right: '-185px'}, 300);
});

$('#summaryPanel .exitPanel').click(function(){
	$(this).parent().hide();
});

$('#summaryPanel').hide();

Bot.showSummary = function showSummary(){
	$('#summaryPanel').show();
};

Bot.showTrades();
