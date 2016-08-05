'use strict';
import Components from '../components';
import Observer from 'binary-common-utils/observer';
import Translator from 'translator';

var translator = new Translator();

var Introduction = function Introduction(){
	if ( Introduction.instance ) {
		return Introduction.instance;
	}
	Introduction.instance = this;
	this.components = new Components();
	this.observer = new Observer();
};

Introduction.prototype = Object.create(null, {
	getSteps: {
		value: function getSteps(){
			var that = this;
			return [{
				content: '<p>' + translator.translateText("Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot. Skip this tutorial by clicking on the <b>X</b> button. Skip each step by <b>Right Arrow (") + '&rarr;' + translator.translateText(")</b> on the keyboard.") + '</p>',
				closeButton: true,
				target: that.components.getUiComponent('center'),
				nextButton: true,
				my: 'top center',
				at: 'bottom center',
				setup: function (tour, options) {
					$('#blocker').show();
					that.components.setOpacityForAll(0.3);
				},
			}, {
				content: '<p>' + translator.translateText("You will need to add the blocks to this area which is called the <b>workspace</b>.") + '</p>',
				target: that.components.getUiComponent('center'),
				closeButton: true,
				nextButton: true,
				my: 'top center',
				at: 'bottom center',
				setup: function (tour, options) {
					that.components.setOpacity('workspace', 1);
				},
				teardown: function (tour, options) {
				},
			}, {
				content: '<p>' + translator.translateText("You can see the <b>main blocks</b> (Step 1, 2 and 3) already added to the workspace.") + '</p>',
				target: that.components.getUiComponent('center'),
				closeButton: true,
				nextButton: true,
				my: 'top center',
				at: 'bottom center',
			}, {
				content: '<p>' + translator.translateText("You cannot add or delete the main blocks, but you can move them to a desired place in the workspace.") + '</p>',
				target: that.components.getUiComponent('center'),
				closeButton: true,
				nextButton: true,
				my: 'top center',
				at: 'bottom center',
				setup: function (tour, options) {
					$('#blocker').hide();
				},
			}, {
				content: '<p>' + translator.translateText("To start pick a <b>symbol</b> block from markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a symbol from left should lead you to the next step.)") + '</p>',
				target: that.components.getUiComponent('flyout'),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				bind: ['tour_submarket_created'],
				tour_submarket_created: function (tour, options, model, value) {
					tour.next();
				},
				setup: function (tour, options) {
					that.observer.register('tour:submarket_created', this.tour_submarket_created, true);
					Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].children_[0].children_[0].reveal(true);
					Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].children_[0].children_[0].select();
					that.components.setOpacity('toolbox', 1);
				},
				teardown: function (tour, options) {
					that.observer.unregister('tour:submarket_created', this.tour_submarket_created);
					that.components.setOpacity('toolbox', 0.3);
				},
			}, {
				content: '<p>' + translator.translateText("Great! Now add it to the <b>Define Trade</b> block.") + '</p>',
				target: that.components.getUiComponent('workspace')
					.find(that.components.uiComponents.submarket),
				closeButton: true,
				highlightTarget: true,
				my: 'top center',
				at: 'bottom center',
				bind: ['tour_submarket_added'],
				tour_submarket_added: function (tour, options, model, value) {
					tour.next();
				},
				setup: function (tour, options) {
					that.observer.register('tour:submarket', this.tour_submarket_added, true);
				},
				teardown: function (tour, options) {
					that.observer.unregister('tour:submarket', this.tour_submarket_added);
					Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].setExpanded(false);
				},
			}, {
				content: '<p>' + translator.translateText("Alright! Now pick a <b>trade type</b> block.") + '</p>',
				target: that.components.getUiComponent('flyout'),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				bind: ['tour_condition_created'],
				tour_condition_created: function (tour, options, model, value) {
					tour.next();
				},
				setup: function (tour, options) {
					that.observer.register('tour:condition_created', this.tour_condition_created, true);
					Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[1].children_[0].reveal(true);
					Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[1].children_[0].select();
					that.components.setOpacity('toolbox', 1);
				},
				teardown: function (tour, options) {
					that.observer.unregister('tour:condition_created', this.tour_condition_created);
					that.components.setOpacity('toolbox', 0.3);
				},
			}, {
				content: '<p>' + translator.translateText("OK! Now add it to the symbol you added in the previous step.") + '</p>',
				target: that.components.getUiComponent('workspace')
					.find(that.components.uiComponents.submarket),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				bind: ['tour_condition_added'],
				tour_condition_added: function (tour, options, model, value) {
					tour.next();
				},
				setup: function (tour, options) {
					that.observer.register('tour:condition', this.tour_condition_added, true);
				},
				teardown: function (tour, options) {
					that.observer.unregister('tour:condition', this.tour_condition_added);
					Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
				},
			}, {
				content: '<p>' + translator.translateText("Very good! It's time to add the options needed by the trade type block, pick a number") + ' (<img src="image/number.png"/>) ' + translator.translateText("from the Math menu") + '</p>',
				target: that.components.getUiComponent('flyout'),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				bind: ['tour_number_created'],
				tour_number_created: function (tour, options, model, value) {
					tour.next();
				},
				setup: function (tour, options) {
					that.observer.register('tour:number', this.tour_number_created, true);
					Blockly.mainWorkspace.toolbox_.tree_.children_[1].select();
					that.components.setOpacity('toolbox', 1);
				},
				teardown: function (tour, options) {
					that.observer.unregister('tour:number', this.tour_number_created);
					that.components.setOpacity('toolbox', 0.3);
				},
			}, {
				content: '<p>' + translator.translateText("Click on the number block to edit its value") + ' (<img src="image/number_editing.png"/>), ' + translator.translateText("change the value to 5 and add it to the <b>ticks</b> field of the trade type block") + '</p>',
				target: that.components.getUiComponent('workspace')
					.find(that.components.uiComponents.submarket),
				highlightTarget: true,
				closeButton: true,
				my: 'left center',
				at: 'right center',
				bind: ['tour_ticks_added'],
				tour_ticks_added: function (tour, options, model, value) {
					tour.next();
				},
				setup: function (tour, options) {
					that.observer.register('tour:ticks', this.tour_ticks_added, true);
				},
				teardown: function (tour, options) {
					that.observer.unregister('tour:ticks', this.tour_ticks_added);
				},
			}, {
				content: '<p>' + translator.translateText("OK, Now add all remaining options to the trade type block") + '</p>',
				target: that.components.getUiComponent('workspace')
					.find(that.components.uiComponents.submarket),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				bind: ['tour_options_added'],
				tour_options_added: function (tour, options, model, value) {
					tour.next();
				},
				setup: function (tour, options) {
					Blockly.mainWorkspace.toolbox_.tree_.children_[1].select();
					that.observer.register('tour:options', this.tour_options_added, true);
					that.components.getUiComponent('toolbox')
						.css('opacity', 1);
				},
				teardown: function (tour, options) {
					that.observer.unregister('tour:options', this.tour_options_added);
					that.components.getUiComponent('toolbox')
						.css('opacity', 1);
				},
			}, {
				content: '<p>' + translator.translateText("That's it, now you have a complete trade block with its options. It's time to define a strategy") + '</p>',
				target: that.components.getUiComponent('workspace')
					.find(that.components.uiComponents.submarket),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				nextButton: true,
			}, {
				content: '<p>' + translator.translateText("This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.") + '</p>',
				target: that.components.getUiComponent('workspace')
					.find(that.components.uiComponents.strategy),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				nextButton: true,
			}, {
				content: '<p>' + translator.translateText("The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu") + '</p>',
				target: that.components.getUiComponent('flyout'),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				nextButton: true,
				setup: function (tour, options) {
					that.components.getUiComponent('toolbox')
						.css('opacity', 1);
					Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].reveal(true);
					Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].select();
				},
				teardown: function (tour, options) {
					that.components.getUiComponent('toolbox')
						.css('opacity', 0.3);
				},
			}, {
				content: '<p>' + translator.translateText("For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block") + '</p>',
				target: that.components.getUiComponent('flyout'),
				highlightTarget: true,
				closeButton: true,
				my: 'left center',
				at: 'right center',
				bind: ['tour_purchase_created'],
				tour_purchase_created: function (tour, options, model, value) {
					tour.next();
				},
				setup: function (tour, options) {
					Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].reveal(true);
					Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].select();
					that.components.getUiComponent('toolbox')
						.css('opacity', 1);
					that.observer.register('tour:purchase_created', this.tour_purchase_created, true);
				},
				teardown: function (tour, options) {
					that.observer.unregister('tour:purchase_created', this.tour_purchase_created);
					that.components.getUiComponent('toolbox')
						.css('opacity', 0.3);
				},
			}, {
				content: '<p>' + translator.translateText("Now add it to the Strategy block.") + '</p>',
				target: that.components.getUiComponent('workspace')
					.find(that.components.uiComponents.strategy),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				bind: ['tour_purchase_added'],
				tour_purchase_added: function (tour, options, model, value) {
					tour.next();
				},
				setup: function (tour, options) {
					that.observer.register('tour:purchase', this.tour_purchase_added, true);
				},
				teardown: function (tour, options) {
					that.observer.unregister('tour:purchase', this.tour_purchase_added);
				},
			}, {
				content: '<p>' + translator.translateText("Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your trade type block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.") + '</p>',
				target: that.components.getUiComponent('workspace')
					.find(that.components.uiComponents.strategy),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				nextButton: true,
			}, {
				content: '<p>' + translator.translateText("A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.") + '</p>',
				target: that.components.getUiComponent('workspace')
					.find(that.components.uiComponents.strategy),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				nextButton: true,
			}, {
				content: '<p>' + translator.translateText("After a purchase was the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block") + '</p>',
				target: that.components.getUiComponent('workspace')
					.find(that.components.uiComponents.finish),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				nextButton: true,
			}, {
				content: '<p>' + translator.translateText("Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.") + '</p>',
				target: that.components.getUiComponent('workspace')
					.find(that.components.uiComponents.finish),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				nextButton: true,
			}, {
				content: '<p>' + translator.translateText("A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.") + '</p>',
				target: that.components.getUiComponent('flyout'),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				bind: ['tour_trade_again_created'],
				tour_trade_again_created: function (tour, options, model, value) {
					tour.next();
				},
				setup: function (tour, options) {
					Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[3].reveal(true);
					Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[3].select();
					that.components.getUiComponent('toolbox')
						.css('opacity', 1);
					that.observer.register('tour:trade_again_created', this.tour_trade_again_created, true);
				},
				teardown: function (tour, options) {
					that.observer.unregister('tour:trade_again_created', this.tour_trade_again_created);
				},
			}, {
				content: '<p>' + translator.translateText("Now add it to the On Finish block") + '</p>',
				target: that.components.getUiComponent('workspace')
					.find(that.components.uiComponents.finish),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				bind: ['tour_trade_again'],
				tour_trade_again: function (tour, options, model, value) {
					tour.next();
				},
				setup: function (tour, options) {
					that.observer.register('tour:trade_again', this.tour_trade_again, true);
				},
				teardown: function (tour, options) {
					that.observer.unregister('tour:trade_again', this.tour_trade_again);
					Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
				},
			}, {
				content: '<p>' + translator.translateText("Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its trade type is unmet.") + '</p>',
				target: that.components.getUiComponent('workspace')
					.find(that.components.uiComponents.finish),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				nextButton: true,
			}, {
				content: '<p>' + translator.translateText("OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.") + '</p>',
				target: that.components.getUiComponent('workspace')
					.find(that.components.uiComponents.finish),
				closeButton: true,
				highlightTarget: true,
				my: 'left center',
				at: 'right center',
				nextButton: true,
				teardown: function (tour, options) {
					that.components.setOpacityForAll(1);
				},
			}, {
				content: '<p>' + translator.translateText('You can use Ctrl + -/+ to zoom out/in the blocks') + '</p>',
				target: that.components.getUiComponent('center'),
				closeButton: true,
				nextButton: true,
				my: 'top center',
				at: 'bottom center',
			}, {
				content: '<p>' + translator.translateText("You can choose the account you want by the <b>Account</b> dropdown. If you cannot see the dropdown please login using the <b>Login</b> button above. Please make sure to use Virtual Account tokens for testing.") + '</p>',
				target: that.components.getUiComponent('intro_login_logout'),
				closeButton: true,
				highlightTarget: true,
				my: 'top center',
				at: 'bottom center',
				nextButton: true,
			}, {
				content: '<p>' + translator.translateText("You can save/load your blocks using these buttons") + '</p>',
				target: that.components.getUiComponent('group_save'),
				closeButton: true,
				highlightTarget: true,
				my: 'right center',
				at: 'left center',
				nextButton: true,
			}, {
				content: '<p>' + translator.translateText("If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo") + '</p>',
				target: that.components.getUiComponent('group_undo_redo'),
				closeButton: true,
				highlightTarget: true,
				my: 'right center',
				at: 'left center',
				nextButton: true,
			}, {
				content: '<p>' + translator.translateText("You can see the summary of your trades in this menu.") + '</p>',
				target: that.components.getUiComponent('group_summary'),
				closeButton: true,
				highlightTarget: true,
				my: 'right center',
				at: 'left center',
				nextButton: true,
			}, {
				content: '<p>' + translator.translateText("You can reset your blocks to their initial state.") + '</p>',
				target: that.components.getUiComponent('group_reset'),
				closeButton: true,
				highlightTarget: true,
				my: 'right center',
				at: 'left center',
				nextButton: true,
			}, {
				content: '<p>' + translator.translateText("At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on the run/stop buttons. Please make sure you have chosen a Virtual Account before doing experiments.") + '</p>',
				target: that.components.getUiComponent('group_start_stop'),
				closeButton: true,
				highlightTarget: true,
				my: 'right center',
				at: 'left center',
				nextButton: true,
			}, ];
		}
	},
	next: {
		value: function next(){
			if ( this.tour ) {
				this.tour.next();
			}
		}
	},
	start: {
		value: function start(stopCallback){
			this.stopCallback = stopCallback;
			var that = this;
			this.tour = new Tourist.Tour({
				steps: that.getSteps(),
				cancelStep: function cancelStep(){
					$('#blocker').hide();
					that.components.setOpacityForAll(1);
					that.tour._teardownCurrentStep = function(){};
					that.observer.unregisterAll('tour:submarket_created');
					that.observer.unregisterAll('tour:submarket');
					that.observer.unregisterAll('tour:condition_created');
					that.observer.unregisterAll('tour:condition');
					that.observer.unregisterAll('tour:number');
					that.observer.unregisterAll('tour:ticks');
					that.observer.unregisterAll('tour:options');
					that.observer.unregisterAll('tour:purchase_created');
					that.observer.unregisterAll('tour:purchase');
					that.observer.unregisterAll('tour:trade_again_created');
					that.observer.unregisterAll('tour:trade_again');
					that.stop();
				},
				successStep: function successStep(){
					$('#blocker').hide();
					that.components.setOpacityForAll(1);
					that.stop();
				}
			});
			this.tour.start();
		}
	},
	stop: {
		value: function stop(){
			this.components.setOpacityForAll(true, 1);
			this.tour.stop();
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
			delete this.tour;
			if ( this.stopCallback ) {
				this.stopCallback();
			}
		}
	},
});

module.exports = Introduction;
