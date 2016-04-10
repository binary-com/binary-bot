var workspace = Blockly.inject('blocklyDiv', {
	media: 'node_modules/blockly/media/',
	toolbox: document.getElementById('toolbox')
});
Blockly.Xml.domToWorkspace(workspace,
	document.getElementById('startBlocks'));

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
		Bot.utils.log(code);
	} catch(e) {
		console.log(e);
		Bot.e=e;
		Bot.utils.showError(e);
	}

};

var runCode = function runCode() {
	// Generate JavaScript code and run it.
	try {
		window.LoopTrap = 1000;
		Blockly.JavaScript.INFINITE_LOOP_TRAP =
			'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
		var code = Blockly.JavaScript.workspaceToCode(workspace);
		Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
		eval(code);
	} catch (e) {
		Bot.utils.showError(e);
	}
};

var stopCode = function stopCode() {
	Bot.server.stop();
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
				Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
				Bot.utils.addPurchaseOptions();
				var tokenList = Bot.utils.getStorageManager().getTokenList();
				if ( tokenList.length !== 0 ) {
					Blockly.mainWorkspace.getBlockById('trade').getField('ACCOUNT_LIST').setValue(tokenList[0].token);
					Blockly.mainWorkspace.getBlockById('trade').getField('ACCOUNT_LIST').setText(tokenList[0].account_name);
				}
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
