var globals = require('../globals/globals');
var view = require('../view');
var storageManager = require('storageManager');
var blockly = require('blockly');
var i18n = require('i18n');
var init = function init(){
	var steps = [{
		content: '<p>' + i18n._('Welcome to the binary bot, a blockly based automation tool for binary.com trades. If you want to skip this tutorial click on the <b>Stop!</b> button at the top right of the page.') + '</p>',
		target: view.getUiComponent('center'),
		closeButton: true,
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			view.setOpacityForAll(started, 0.3);
		},
	}, {
		content: '<p>' + i18n._('The blocks you put in here will create a binary bot code which you can then execute using the run button.') + '</p>',
		target: view.getUiComponent('center'),
		closeButton: true,
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
		closeButton: true,
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
		closeButton: true,
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
		content: '<p>' + i18n._('Use this button to save your blocks') + '</p>',
		target: view.getUiComponent('group_save'),
		closeButton: true,
		nextButton: true,
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		setup: function (tour, options) {
			view.setOpacity(started, 'group_save', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'group_save', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Use this button to load blocks') + '</p>',
		target: view.getUiComponent('group_load'),
		closeButton: true,
		nextButton: true,
		highlightTarget: true,
		my: 'bottom center',
		at: 'top center',
		setup: function (tour, options) {
			view.setOpacity(started, 'group_load', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'group_load', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Click to add a token after logging in, at least one token is needed. Get your token from') + ' <a href="https://www.binary.com/en/user/settings/api_tokenws.html" target="_blank">' + i18n._('here') + '</a></p>',
		target: view.getUiComponent('token'),
		closeButton: true,
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
		target: view.getUiComponent('group_undo_redo'),
		closeButton: true,
		nextButton: true,
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		setup: function (tour, options) {
			view.setOpacity(started, 'group_undo_redo', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'group_undo_redo', 0.3);
		},
	}, {
		content: '<p>' + i18n._('See the summary of your trades in this menu.') + '</p>',
		target: view.getUiComponent('group_summary'),
		closeButton: true,
		nextButton: true,
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		setup: function (tour, options) {
			view.setOpacity(started, 'group_summary', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'group_summary', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Use the run/stop buttons in this menu to run or stop your blocks, or reset your result panels.') + '</p>',
		target: view.getUiComponent('group_start_stop'),
		closeButton: true,
		nextButton: true,
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		setup: function (tour, options) {
			view.setOpacity(started, 'group_start_stop', 1);
		},
		teardown: function (tour, options) {
			view.setOpacity(started, 'group_start_stop', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Good Luck!') + '</p>',
		target: view.getUiComponent('center'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
	}, ];

	return new Tourist.Tour({
		steps: steps,
		cancelStep: function cancelStep(){
			globals.tour._teardownCurrentStep = function(){};
			view.setOpacityForAll(started, 1);
			view.stopTutorial();
		},
		successStep: function successStep(){
			view.setOpacityForAll(started, 1);
			storageManager.setDone('welcomeFinished');
			view.stopTutorial();
		}
	});
};

var started = false;

module.exports = {
	init: function(){
		return this;
	},
	start: function start() {
		if (!globals.tour) {
			started = true;
			globals.tour = init();
			globals.tour.start();
		}
	},
	welcome: function welcome() {
		if (!storageManager.isDone('welcomeFinished')) {
			if (!globals.tour) {
				started = true;
				globals.tour = init();
				globals.tour.start();
				return true;
			}
		}
		return false;
	},
	stop: function stop() {
		view.setOpacityForAll(true, 1);
		started = false;
		globals.tour.stop();
		blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
		delete globals.tour;
	},
};
