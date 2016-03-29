var workspace = Blockly.inject('blocklyDiv', {
	media: 'node_modules/blockly/media/',
	toolbox: document.getElementById('toolbox')
});
Blockly.Xml.domToWorkspace(workspace,
	document.getElementById('startBlocks'));

var showXml = function showXml() {
	var xmlDom = Blockly.Xml.workspaceToDom(workspace);
	var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
	alert(xmlText);
};

var saveXml = function saveXml() {
	var xmlDom = Blockly.Xml.workspaceToDom(workspace);
	var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
	var filename = 'binary-bot' + parseInt(new Date()
		.getTime() / 1000) + '.xml';
	var blob = new Blob([xmlText], {
		type: "text/xml;charset=utf-8"
	});
	saveAs(blob, filename);
};

var showCode = function showCode() {
	// Generate JavaScript code and display it.
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	alert(code);

};

var runCode = function runCode() {
	// Generate JavaScript code and run it.
	window.LoopTrap = 1000;
	Blockly.JavaScript.INFINITE_LOOP_TRAP =
		'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	try {
		eval(code);
	} catch (e) {
		$.notify(e, 'error');
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
		$.notify('File: ' + file.name + ' is not supported.', 'info');
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
				var tokenList = Bot.utils.storageManager.getTokenList();
				if ( tokenList.length !== 0 ) {
					Bot.workspace.getBlockById('trade').getField('ACCOUNT_LIST').setValue(tokenList[0].token);
					Bot.workspace.getBlockById('trade').getField('ACCOUNT_LIST').setText(tokenList[0].account_name);
				}
				$.notify('Blocks are loaded successfully', 'success');
			} catch(e){
				$.notify(e.message, 'error');
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
