var globals = require('./globals/globals');
var config = require('const');
var account = require('binary-common-utils/account');
var activeTutorial = null;
var fileSaver = require('filesaverjs');
var observer = require('binary-common-utils/observer');
var Blockly = require('./blockly');
var storageManager = require('binary-common-utils/storageManager');
var Translator = require('translator');
var Bot = require('../bot');
var $ = require('jquery');
window.Blockly = require('blockly');
window.$ = window.jQuery = $;
window.Backbone = require('backbone');
window.globals = globals;
window._ = require('underscore');
require('notifyjs-browser');
require('tourist');
require('./utils/draggable');

var View = function View(){
	this.tours = {};
	this.translator = new Translator();
	this.addTranslationToUi();
	this.errorAndLogHandling();
	this.setElementActions();
	this.bot = new Bot();
	var that = this;
	this.initPromise = new Promise(function(resolve, reject){
		that.initTours();
		that.updateTokenList();
		that.bot.initPromise.then(function(){
			that.blockly = new Blockly();
			resolve();
		});
	});
};

View.prototype = Object.create(null, {
	updateTokenList: {
		value: function updateTokenList() {
			var tokenList = storageManager.getTokenList();
			if (tokenList.length === 0) {
				$('#login').css('display', 'inline-block');
				$('#accountSelect').css('display', 'none');
				$('#logout').css('display', 'none');
			} else {
				$('#login').css('display', 'none');
				$('#accountSelect').css('display', 'inline-block');
				$('#logout').css('display', 'inline-block');
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
		}
	},
	addTranslationToUi: {
		value: function addTranslationToUi(){
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
			if ( this.tours.welcome.welcome() ){
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
		value: function startTutorial() {
			var that = this;
			if (this.activeTutorial) {
				this.activeTutorial.stop();
			}
			$('#tours').on('change', function(e) {
					var value = $(this).val();
					if (value === '') return;
					that.activeTutorial = that.tours[value];
					that.activeTutorial.start();
			});
		}
	},
	stopTutorial: {
		value: function stopTutorial(e) {
			if (this.activeTutorial) {
					this.activeTutorial.stop();
					this.activeTutorial = null;
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
	},
	errorAndLogHandling: {
		value: function errorAndLogHandling(){
			observer.register('ui.error', function showError(error) {
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
			});

			var observeForLog = function observeForLog(type, position) {
				var subtype = ( position === 'left' )? '.left' : '';
				observer.register('ui.log.' + type + subtype , function(message){
					$.notify(message, {
						position: 'bottom ' + position,
						className: type,
					});
					if (globals.isDebug()) {
						console.log(message);
					} else {
						globals.addLogToQueue(message);
					}
				});
			};

			["success", "info", "warn", "error"].forEach(function(type){
				observeForLog(type, 'right');
				observeForLog(type, 'left');
			});

		}
	},
	setFileBrowser: {
		value: function setFileBrowser(){
			var that = this;
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
						observer.emit('ui.log.info', translator.translateText('File is not supported:' + ' ') + file.name);
					}
				}
			};

			var readFile = function readFile(f) {
				reader = new FileReader();
				reader.onload = (function (theFile) {
					$('#fileBrowser').hide();
					return function (e) {
						try {
							that.blockly.loadBlocksFile(e.target.result);
							observer.emit('ui.log.success', translator.translateText('Blocks are loaded successfully'));
						} catch (err) {
							observer.emit('ui.error', err);
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
		}
	},
	setElementActions: {
		value: function setElementActions(){
			this.setFileBrowser();
			this.startTutorial();
			this.addBindings();
			globals.showTradeInfo();
		}
	},
	addBindings: {
		value: function addBindings(){
			var that = this;
			var stop = function stop(e) {
				if (e) {
					e.preventDefault();
				}
				that.bot.stop();
				globals.disableRun(false);
			};

			var logout = function logout() {
				account.logoutAllTokens(function(){
					that.updateTokenList();
					observer.emit('ui.log.info', translator.translateText('Logged you out!'));
				});
			};

			$('#stopButton')
				.click(stop);

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

			$('#saveXml')
				.click(function (e) {
					that.blockly.saveXml();
				});

			$('#undo')
				.click(function (e) {
					that.blockly.undo();
				});

			$('#redo')
				.click(function (e) {
					that.blockly.redo();
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

			$('#logout')
				.click(function (e) {
					logout();
					$('.logout').hide();
				});

			$('#runButton')
				.click(function (e) {
					that.blockly.run();
				});
			
			$('#login')
				.bind('click.login', function(e){
					document.location = 'https://oauth.binary.com/oauth2/authorize?app_id=' + storageManager.get('appId') + '&l=' + translator.getLanguage().toUpperCase();
				})
				.text('Log in');

		}
	}
});




module.exports = View;
