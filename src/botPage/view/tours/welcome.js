var Components = require('../components');
var storageManager = require('binary-common-utils/storageManager');
var globalBlockly = require('blockly');

var Welcome = function Welcome(){
	if ( Welcome.instance ) {
		return Welcome.instance;
	}
	Welcome.instance = this;
	this.started = false;
	this.components = new Components();
};

Welcome.prototype = Object.create(null, {
	getSteps: {
		value: function getSteps(){
			var that = this;
			return [{
				content: '<p>' + translator.translateText('Welcome to the binary bot, a blockly based automation tool for binary.com trades. If you want to skip this tutorial click on the <b>X</b> button.') + '</p>',
				target: that.components.getUiComponent('center'),
				closeButton: true,
				nextButton: true,
				my: 'top center',
				at: 'bottom center',
				setup: function (tour, options) {
					$('#blocker').show();
					that.components.setOpacityForAll(0.3);
				},
			}, {
				content: '<p>' + translator.translateText('The blocks you put in here will create a binary bot code which you can then execute using the run button.') + '</p>',
				target: that.components.getUiComponent('center'),
				closeButton: true,
				nextButton: true,
				my: 'top center',
				at: 'bottom center',
				setup: function (tour, options) {
					that.components.setOpacity('workspace', 1);
				},
				teardown: function (tour, options) {
					that.components.setOpacity('workspace', 0.3);
				},
			}, {
				content: '<p>' + translator.translateText('You can pick blocks from here to add to the workspace') + '</p>',
				target: that.components.getUiComponent('toolbox'),
				closeButton: true,
				nextButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				setup: function (tour, options) {
					that.components.setOpacity('toolbox', 1);
				},
				teardown: function (tour, options) {
					that.components.setOpacity('toolbox', 0.3);
				},
			}, {
				content: '<p>' + translator.translateText('You need to login before running the bot.') + '</p>',
				target: that.components.getUiComponent('login_logout'),
				closeButton: true,
				nextButton: true,
				highlightTarget: true,
				my: 'top center',
				at: 'bottom center',
				setup: function (tour, options) {
					that.components.setOpacity('login_logout', 1);
				},
				teardown: function (tour, options) {
					that.components.setOpacity('login_logout', 0.3);
				},
			}, {
				content: '<p>' + translator.translateText('Use these buttons to save/load your blocks') + '</p>',
				target: that.components.getUiComponent('group_save'),
				closeButton: true,
				nextButton: true,
				highlightTarget: true,
				my: 'right center',
				at: 'left center',
				setup: function (tour, options) {
					that.components.setOpacity('group_save', 1);
				},
				teardown: function (tour, options) {
					that.components.setOpacity('group_save', 0.3);
				},
			}, {
				content: '<p>' + translator.translateText('Use these buttons to Undo/Redo changes to your blocks.') + '</p>',
				target: that.components.getUiComponent('group_undo_redo'),
				closeButton: true,
				nextButton: true,
				highlightTarget: true,
				my: 'right center',
				at: 'left center',
				setup: function (tour, options) {
					that.components.setOpacity('group_undo_redo', 1);
				},
				teardown: function (tour, options) {
					that.components.setOpacity('group_undo_redo', 0.3);
				},
			}, {
				content: '<p>' + translator.translateText('Open the summary panel.') + '</p>',
				target: that.components.getUiComponent('group_summary'),
				closeButton: true,
				nextButton: true,
				highlightTarget: true,
				my: 'right center',
				at: 'left center',
				setup: function (tour, options) {
					that.components.setOpacity('group_summary', 1);
				},
				teardown: function (tour, options) {
					that.components.setOpacity('group_summary', 0.3);
				},
			}, {
				content: '<p>' + translator.translateText('Use the run/stop buttons in this menu to run or stop your blocks.') + '</p>',
				target: that.components.getUiComponent('group_start_stop'),
				closeButton: true,
				nextButton: true,
				highlightTarget: true,
				my: 'right center',
				at: 'left center',
				setup: function (tour, options) {
					that.components.setOpacity('group_start_stop', 1);
				},
				teardown: function (tour, options) {
					that.components.setOpacity('group_start_stop', 0.3);
				},
			}, {
				content: '<p>' + translator.translateText('Good Luck!') + '</p>',
				target: that.components.getUiComponent('center'),
				nextButton: true,
				highlightTarget: true,
				my: 'top center',
				at: 'bottom center',
			}, ];
		}
	},
	start: {
		value: function start(){
			if (!this.components.activeTour && !this.started)	{
				this.started = true;
				var that = this;
				this.tour = new Tourist.Tour({
					steps: that.getSteps(),
					cancelStep: function cancelStep(){
						that.tour._teardownCurrentStep = function(){};
						$('#blocker').hide();
						that.components.setOpacityForAll(1);
						that.stop();
					},
					successStep: function successStep(){
						$('#blocker').hide();
						that.components.setOpacityForAll(1);
						storageManager.setDone('welcomeFinished');
						that.stop();
					}
				});
				this.tour.start();
			}
		}
	},
	welcome: {
		value: function welcome(){
			if (!storageManager.isDone('welcomeFinished')) {
				this.start();
			}
		}
	},
	stop: {
		value: function stop(){
			this.components.setOpacityForAll(true, 1);
			this.started = false;
			this.tour.stop();
			globalBlockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
			delete this.tour;
			this.components.activeTour = null;
		}
	}
});

module.exports = Welcome;
