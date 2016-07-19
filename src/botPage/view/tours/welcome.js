var globals = require('../globals');
var view = require('../');
var storageManager = require('binary-common-utils/storageManager');
var blockly = require('blockly');
var init = function init(){
	var steps = [{
		content: '<p>' + translator.translateText('Welcome to the binary bot, a blockly based automation tool for binary.com trades. If you want to skip this tutorial click on the <b>X</b> button.') + '</p>',
		target: view.getUiComponent('center'),
		closeButton: true,
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			$('#blocker').show();
			view.setOpacityForAll(started, 0.3);
		},
	}, {
		content: '<p>' + translator.translateText('The blocks you put in here will create a binary bot code which you can then execute using the run button.') + '</p>',
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
		content: '<p>' + translator.translateText('You can pick blocks from here to add to the workspace') + '</p>',
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
		content: '<p>' + translator.translateText('You need to login before running the bot.') + '</p>',
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
		content: '<p>' + translator.translateText('Use these buttons to save/load your blocks') + '</p>',
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
		content: '<p>' + translator.translateText('Use these buttons to Undo/Redo changes to your blocks.') + '</p>',
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
		content: '<p>' + translator.translateText('Open the summary panel.') + '</p>',
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
		content: '<p>' + translator.translateText('Use the run/stop buttons in this menu to run or stop your blocks.') + '</p>',
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
		content: '<p>' + translator.translateText('Good Luck!') + '</p>',
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
			$('#blocker').hide();
			view.setOpacityForAll(started, 1);
			view.stopTutorial();
		},
		successStep: function successStep(){
			$('#blocker').hide();
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
