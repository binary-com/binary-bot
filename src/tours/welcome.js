var globals = require('../globals/globals');
var view = require('../utils/view');
var storageManager = require('../utils/storageManager');
var blockly = require('blockly');
var i18n = require('i18n');
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
