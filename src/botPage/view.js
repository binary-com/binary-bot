var globals = require('./globals/globals');
var config = require('const');
var account = require('binary-common-utils/account');
var activeTutorial = null;
var botUtils = require('./utils/utils');
var fileSaver = require('filesaverjs');
var Blockly = require('./blockly');
require('./utils/draggable');

var View = function View(){
	this.tours = {};
	this.translator = new Translator();
	this.addTranslationToUi();
	this.blockly = new Blockly();
	var that = this;
	this.initPromise = new Promise(function(resolve, reject){
		that.then(function(){
			that.initTours();
			resolve();
		});
	});
};

View.prototype = Object.create(null, {
	addTranslationToUi: {
		value: function addTranslationToUi(){
			this.blockly.addBlocklyTranslation();
			$('[data-i18n-text]')
				.each(function() {
						var contents = $(this).contents();
						if (contents.length > 0) {
								if (contents.get(0).nodeType == Node.TEXT_NODE) {
										$(this).text(translator.translateText($(this)
								.attr('data-i18n-text')))
								.append(contents.slice(1));
								}
						} else {
						$(this)
							.text(translator.translateText($(this)
								.attr('data-i18n-text')));
					}
				});
		}
	},
	initTours: {
		value: function initTours() {
			this.tours.introduction = require('./tours/introduction').init();
			this.tours.welcome = require('./tours/welcome').init();
			if ( tours.welcome.welcome() ){
				this.activeTutorial = this.tours.welcome;
			}
		}
	},
	getUiComponent: {
		value: function getUiComponent(component) {
			return $(config.uiComponents[component]);
		}
	},
	startTutorial: {
		value: function startTutorial(e) {
			if (e) {
				e.preventDefault();
			}
			if (activeTutorial) {
				activeTutorial.stop();
			}
			$('#tours').on('change', function(e) {
					var value = $(this).val();
					if (value === '') return;
					activeTutorial = tours[value];
					activeTutorial.start();
			});
		}
	},
	stopTutorial: {
		value: function stopTutorial(e) {
			if (e) {
				e.preventDefault();
			}
			if (activeTutorial) {
					activeTutorial.stop();
					activeTutorial = null;
			}
		}
	},
	setOpacityForAll: {
		value: function setOpacityForAll(enabled, opacity) {
			if (enabled) {
				for (var key in config.uiComponents) {
					if (config.doNotHide.indexOf(key) < 0) {
						this.getUiComponent(key)
							.css('opacity', opacity);
						var disabled = +opacity < 1;
						this.getUiComponent(key)
							.find('button')
							.prop('disabled', disabled);
						this.getUiComponent(key)
							.find('input')
							.prop('disabled', disabled);
						this.getUiComponent(key)
							.find('select')
							.prop('disabled', disabled);
					}
				}
			}
		}
	},
	setOpacity: {
		value: function setOpacity(enabled, componentName, opacity) {
			if (enabled) {
				this.getUiComponent(componentName)
					.css('opacity', opacity);
				var disabled = +opacity < 1;
				this.getUiComponent(componentName)
					.find('button')
					.prop('disabled', disabled);
				this.getUiComponent(componentName)
					.find('input')
					.prop('disabled', disabled);
				this.getUiComponent(componentName)
					.find('select')
					.prop('disabled', disabled);
			}
		}
	}
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
			botUtils.log(translator.translateText('File is not supported:' + ' ') + file.name, 'info');
		}
	}
};

var readFile = function readFile(f) {
	reader = new FileReader();
	var that = this;
	reader.onload = (function (theFile) {
    $('#fileBrowser').hide();
		return function (e) {
			try {
				that.blockly.loadBlocksFile(e.target.result);
				botUtils.log(translator.translateText('Blocks are loaded successfully'), 'success');
			} catch (err) {
				botUtils.showError(err);
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

var dropZone = document.getElementById('dropZone');

var stop = function stop(e) {
	if (e) {
		e.preventDefault();
	}
	Bot.stop();
	globals.disableRun(false);
};

var logout = function logout() {
	account.logoutAllTokens(function(){
		botUtils.updateTokenList();
		botUtils.log(translator.translateText('Logged you out!'), 'info');
	});
};

var show = function show(done) {
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  if (document.getElementById('files')) {
      document.getElementById('files')
        .addEventListener('change', handleFileSelect, false);
  }
  $('#open_btn')
        .on('click', function() {
            $.FileDialog({
                  accept: ".xml",
                  cancelButton: "Close",
                  dragMessage: "Drop files here",
                  dropheight: 400,
                  errorMessage: "An error occured while loading file",
                  multiple: false,
                  okButton: "OK",
                  readAs: "DataURL",
                  removeMessage: "Remove&nbsp;file",
                  title: "Load file"
            });
        })
        .on('files.bs.filedialog', function(ev) {
            var files_list = ev.files;
            handleFileSelect(files_list);
        })
        .on('cancel.bs.filedialog', function(ev) {
            handleFileSelect(ev);
        });

  startTutorial();

  $('.panelExitButton')
    .click(function () {
      $(this)
        .parent()
        .hide();
    });

  $('.panel')
    .hide();

  $('.panel')
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
  $('#saveXml')
    .click(function (e) {
      saveXml();
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

 $('#loadXml')
    .click(function (e) {
      $('#fileBrowser')
        .show();
    });

  $('#run')
    .click(function (e) {
      run();
    });

  $('#logout')
    .click(function (e) {
      logout();
      $('.logout').hide();
    });

  $('#runButton')
    .click(function (e) {
      run();
    });

};
