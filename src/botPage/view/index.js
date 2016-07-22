'use strict';
import logger from './logger';
import TradeInfo from './tradeInfo';
import account from 'binary-common-utils/account';
import Observer from 'binary-common-utils/observer';
import _Blockly from './blockly';
import storageManager from 'binary-common-utils/storageManager';
import Translator from 'translator';
import Bot from '../bot';
import Introduction from './tours/introduction';
import Welcome from './tours/welcome';
import {PlainChart as Chart} from 'binary-charts';

var observer = new Observer();

var View = function View(){
	if ( View.instance ) {
		return View.instance;
	}
	View.instance = this;
	this.tours = {};
	this.translator = new Translator();
	this.tradeInfo = new TradeInfo();
	this.addTranslationToUi();
	this.errorAndLogHandling();
	this.setElementActions();
	var that = this;
	this.bot = new Bot();
	this.initPromise = new Promise(function(resolve, reject){
		that.updateTokenList();
		that.blockly = new _Blockly();
		that.initTours();
		resolve();
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
			var that = this;
			$('[data-i18n-text]')
				.each(function() {
						var contents = $(this).contents();
						if (contents.length > 0) {
								if (contents.get(0).nodeType == Node.TEXT_NODE) {
										$(this).text(that.translator.translateText($(this)
								.attr('data-i18n-text')))
								.append(contents.slice(1));
								}
						} else {
						$(this)
							.text(that.translator.translateText($(this)
								.attr('data-i18n-text')));
					}
				});
		}
	},
	initTours: {
		value: function initTours() {
			this.tours.introduction = new Introduction();
			this.tours.welcome = new Welcome();
		}
	},
	startTour: {
		value: function startTour() {
			var that = this;
			$('#tours').on('change', function(e) {
					var value = $(this).val();
					if (value === '') return;
					if (that.activeTour) {
						that.activeTour.stop();
					}
					that.activeTour = that.tours[value];
					that.activeTour.start(function(){
						that.activeTour = null;
					});
			});
		}
	},
	errorAndLogHandling: {
		value: function errorAndLogHandling(){

			var that = this;

			observer.register('ui.error', function showError(error) {
				if (error.stack) {
					if (logger.isDebug()) {
						console.log('%c' + error.stack, 'color: red');
					} else {
						logger.addLogToQueue('%c' + error.stack, 'color: red');
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
				if (logger.isDebug()) {
					console.log('%cError: ' + message, 'color: red');
				} else {
					logger.addLogToQueue('%cError: ' + message, 'color: red');
				}
			});

			var observeForLog = function observeForLog(type, position) {
				var subtype = ( position === 'left' )? '.left' : '';
				observer.register('ui.log.' + type + subtype , function(message){
					$.notify(message, {
						position: 'bottom ' + position,
						className: type,
					});
					if (logger.isDebug()) {
						console.log(message);
					} else {
						logger.addLogToQueue(message);
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
						observer.emit('ui.log.info', that.translator.translateText('File is not supported:' + ' ') + file.name);
					}
				}
			};

			var readFile = function readFile(f) {
				var reader = new FileReader();
				reader.onload = (function (theFile) {
					$('#fileBrowser').hide();
					return function (e) {
						try {
							that.blockly.loadBlocksFile(e.target.result);
							observer.emit('ui.log.success', that.translator.translateText('Blocks are loaded successfully'));
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
			this.startTour();
			this.addBindings();
			this.addEventHandlers();
			this.tradeInfo.show();
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
			};

			var logout = function logout() {
				account.logoutAllTokens(function(){
					that.updateTokenList();
					observer.emit('ui.log.info', that.translator.translateText('Logged you out!'));
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
					document.location = 'https://oauth.binary.com/oauth2/authorize?app_id=' + storageManager.get('appId') + '&l=' + that.translator.getLanguage().toUpperCase();
				})
				.text('Log in');

			$(document).keydown(function(e) {
				switch(e.which) {
					case 37: // left
						break;

					case 38: // up
						break;

					case 39: // right
						if (that.activeTour) {
							that.activeTour.next();
						} else {
							return;
						}
						break;

					case 40: // down
						break;

					default: return; // exit this handler for other keys
				}
				e.preventDefault(); // prevent the default action (scroll / move caret)
			});

		}
	},
	addEventHandlers: {
		value: function addEventHandlers() {
			var that = this;

			observer.register('api.error', function(error){
				if (error.code === 'InvalidToken'){
					storageManager.removeAllTokens();
					that.updateTokenList();
				}
			});
			
			observer.register('trade.finish', function(contract){
				that.tradeInfo.add(contract);
			});

			observer.register('trade.update', function(contract){
				that.latestOpenContract = contract;
			});

			observer.register('bot.tickUpdate', function(obj){
				var chartOptions = {
					type: 'area',
					theme: 'light',
					ticks: obj.ticks,
				};
				if (that.latestOpenContract) {
					chartOptions.contract = that.latestOpenContract;
					if (that.latestOpenContract.is_sold) {
						delete that.latestOpenContract;
					}
				}
				if (!that.chart) {
					chartOptions.pipSize = Number(Number(obj.pip)
						.toExponential()
						.substring(3));
					that.chart = Chart('chart', chartOptions);
				} else {
					that.chart.updateChart(chartOptions);
				}

			});
		}
	}
});

module.exports = View;
