Bot.Introduction = function Introduction() {
	var steps = [{
		content: '<p>' + i18n._("Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot.") + '</p>',
		target: Bot.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacityForAll(started, 0.3);
		},
	}, {
		content: '<p>' + i18n._("You will need to add the blocks to this area which is called the <b>workspace</b>.") + '</p>',
		target: Bot.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'workspace', 1);
		},
		teardown: function (tour, options) {},
	}, {
		content: '<p>' + i18n._("To start pick a <b>submarket</b> block from volatility markets. Some steps like this one don't have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a submarket from left should lead you to the next step.)") + '</p>',
		target: Bot.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_submarket_created'],
		tour_submarket_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:submarket_created', this.tour_submarket_created);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].children_[0].reveal(true);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].children_[0].select();
			Bot.utils.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:submarket_created', this.tour_submarket_created);
			Bot.utils.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._("Great! Now add it to the <b>trade</b> block.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.submarket),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		bind: ['tour_submarket_added'],
		tour_submarket_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:submarket', this.tour_submarket_added);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:submarket', this.tour_submarket_added);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].setExpanded(false);
		},
	}, {
		content: '<p>' + i18n._("Alright! Now pick a <b>condition</b> block.") + '</p>',
		target: Bot.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_condition_created'],
		tour_condition_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:condition_created', this.tour_condition_created);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[1].select();
			Bot.utils.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:condition_created', this.tour_condition_created);
			Bot.utils.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._("OK! Now add it to the submarket you added in the previous step.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_condition_added'],
		tour_condition_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:condition', this.tour_condition_added);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:condition', this.tour_condition_added);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
		},
	}, {
		content: '<p>' + i18n._("Very good! It's time to add the options needed by the condition block, pick a number") + ' (<img src="www/image/number.png"/>) ' + i18n._("from the Math menu") + '</p>',
		target: Bot.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_number_created'],
		tour_number_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:number', this.tour_number_created);
			Blockly.mainWorkspace.toolbox_.tree_.children_[1].select();
			Bot.utils.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:number', this.tour_number_created);
			Bot.utils.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._("Click on the number block to edit its value") + ' (<img src="www/image/number_editing.png"/>), ' + i18n._("change the value to 5 and add it to the <b>ticks</b> field of the condition block") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_ticks_added'],
		tour_ticks_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:ticks', this.tour_ticks_added);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:ticks', this.tour_ticks_added);
		},
	}, {
		content: '<p>' + i18n._("OK, Now add all remaining options to the condition block") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_options_added'],
		tour_options_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			Blockly.mainWorkspace.toolbox_.tree_.children_[1].select();
			window.addEventListener('tour:options', this.tour_options_added);
			Bot.getUiComponent('toolbox')
				.css('opacity', 1);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:options', this.tour_options_added);
			Bot.getUiComponent('toolbox')
				.css('opacity', 1);
		},
	}, {
		content: '<p>' + i18n._("That's it, now you have a complete trade block with its options. It's time to define a strategy") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("This is a <b>Strategy</b> block. All the blocks you put in here are run for each and every tick received.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("The received tick value is in the block <b>tick</b> and the tick direction (up or down) is in the block <b>direction</b>. You can pick them from the <b>Strategy</b> menu") + '</p>',
		target: Bot.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		nextButton: true,
		setup: function (tour, options) {
			Bot.getUiComponent('toolbox')
				.css('opacity', 1);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].reveal(true);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].select();
		},
		teardown: function (tour, options) {
			Bot.getUiComponent('toolbox')
				.css('opacity', 0.3);
		},
	}, {
		content: '<p>' + i18n._("For this tutorial we are not going to use those blocks, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block") + '</p>',
		target: Bot.getUiComponent('flyout'),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		bind: ['tour_purchase_created'],
		tour_purchase_created: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].reveal(true);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].select();
			Bot.getUiComponent('toolbox')
				.css('opacity', 1);
			window.addEventListener('tour:purchase_created', this.tour_purchase_created);
		},
		teardown: function (tour, options) {
			Bot.getUiComponent('toolbox')
				.css('opacity', 0.3);
			window.removeEventListener('tour:purchase_created', this.tour_purchase_created);
		},
	}, {
		content: '<p>' + i18n._("Now add it to the Strategy block.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		bind: ['tour_purchase_added'],
		tour_purchase_added: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:purchase', this.tour_purchase_added);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:purchase', this.tour_purchase_added);
		},
	}, {
		content: '<p>' + i18n._("Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your condition block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("A Strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.strategy),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("After a purchase was started, the bot waits till the purchase is completed, and then gives the control to the <b>On Finish</b> block") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("Same as the Strategy block, the <b>On Finish</b> block can have multiple blocks defining its functionality. The On Finish block defines what to do when the previously purchased contract is finished.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("A <b>Trade Again</b> block creates a new trade and exits from the On Finish block. Now pick a Trade Again block.") + '</p>',
		target: Bot.getUiComponent('flyout'),
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
			Bot.getUiComponent('toolbox')
				.css('opacity', 1);
			window.addEventListener('tour:trade_again_created', this.tour_trade_again_created);
		},
		teardown: function (tour, options) {
			Bot.getUiComponent('toolbox')
				.css('opacity', 0.3);
			window.removeEventListener('tour:trade_again_created', this.tour_trade_again_created);
		},
	}, {
		content: '<p>' + i18n._("Now add it to the On Finish block") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		bind: ['tour_trade_again'],
		tour_trade_again: function (tour, options, model, value) {
			tour.next();
		},
		setup: function (tour, options) {
			window.addEventListener('tour:trade_again', this.tour_trade_again);
		},
		teardown: function (tour, options) {
			window.removeEventListener('tour:trade_again', this.tour_trade_again);
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
		},
	}, {
		content: '<p>' + i18n._("Excellent! The <b>Trade Again</b> block starts a new trade immediately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn't called e.g. in a logic block which its condition is unmet.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("OK, that's it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.finish),
		highlightTarget: true,
		my: 'right center',
		at: 'left center',
		nextButton: true,
		teardown: function (tour, options) {
			Bot.utils.setOpacityForAll(started, 1);
		},
	}, {
		content: '<p>' + i18n._("If you changed a block by accident you can always undo/redo your changes using these buttons or Ctrl+Z for undo and Ctrl+Shift+Z for redo") + '</p>',
		target: Bot.getUiComponent('undo_redo'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can save/load your blocks using these tools") + '</p>',
		target: Bot.getUiComponent('file_management'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("At last! It's time to run the blocks we created. You can run/stop the blocks by clicking on these buttons. Please make sure you have chosen a Virtual Account before running the blocks.") + '</p>',
		target: Bot.getUiComponent('run_stop'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can choose the token you want by the <b>Account</b> dropdown on the trade block. If you do not have any token in the dropdown please add one using the <b>Add Token</b> button above. Please make sure to use Virtual Account tokens for testing.") + '</p>',
		target: Bot.getUiComponent('workspace')
			.find(Bot.uiComponents.submarket),
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can add a token to the bot using the <b>Add Token</b> button.") + '</p>',
		target: Bot.getUiComponent('token'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("You can see the summary of your trades by clicking on this button.") + '</p>',
		target: Bot.getUiComponent('summary'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
	}, {
		content: '<p>' + i18n._("Go ahead and run the blocks. You can stop the code anytime you want using the stop button, or reset the values in the result panels using the reset button.") + '</p>',
		target: Bot.getUiComponent('run_stop'),
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		nextButton: true,
		teardown: function (tour, options) {
			Bot.stopTutorial();
		},
	}, ];

	var tour = new Tourist.Tour({
		steps: steps
	});

	var started = false;

	return {
		start: function start() {
			if (!Bot.tour) {
				started = true;
				Bot.tour = tour;
				Bot.tour.start();
			}
		},
		stop: function stop() {
			Bot.utils.setOpacityForAll(true, 1);
			started = false;
			Bot.tour.stop();
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
			delete Bot.tour;
		},
	};
};
