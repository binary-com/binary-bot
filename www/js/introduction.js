Bot.introduction = (function Introduction(){
	var components = {
		workspace: $('svg > .blocklyWorkspace > .blocklyBlockCanvas'),
		toolbox: $('.blocklyToolboxDiv'),
		file_management: $('.intro-file-management'),
		token: $('.intro-token'),
		run_stop: $('.intro-run-stop'),
	};

	var setOpacityForAll = function setOpacityForAll(opacity){
		Object.keys(components).forEach(function(key){
			components[key].css('opacity', opacity);
		});
	};

	var steps = [
		{
			content: '<p>Welcome to the introduction to the binary bot, we will go through the basic steps to create a working bot.</p>',
			target: $('#center'),
			nextButton: true,
			my: 'top center',
			at: 'bottom center',
			setup: function(tour, options) {
				setOpacityForAll(0.3);
			},
		},
		{
			content: '<p>You will need to add the blocks to this area which is called the <b>workspace</b></p>',
			target: $('#center'),
			nextButton: true,
			my: 'top center',
			at: 'bottom center',
			setup: function(tour, options) {
				components.workspace.css('opacity', 1);
			},
			teardown: function(tour, options) {
			},
		},
		{
			content: '<p>To start pick a <b>submarket</b> block from random markets. Some steps like this one don\'t have the <b>Next step</b> button, therefore you need to follow the instructions to go to the next step, (in this case picking a submarket from left should lead you to the next step.)</p>',
			target: $('.blocklyFlyoutBackground'),
			highlightTarget: true,
			my: 'left center',
			at: 'right center',
			bind: ['tour_submarket_created'],
			tour_submarket_created: function(tour, options, model, value) {
				tour.next();
			},
			setup: function(tour, options) {
				window.addEventListener('tour:submarket_created', this.tour_submarket_created);
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].children_[0].reveal(true);
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].children_[0].select();
				components.toolbox.css('opacity', 1);
			},
			teardown: function(tour, options) {
				window.removeEventListener('tour:submarket_created', this.tour_submarket_created);
				components.toolbox.css('opacity', 0.3);
			},
		},
		{
			content: '<p>Great! Now add it to the <b>trade</b> block.</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Submarket'):last"),
			highlightTarget: true,
			my: 'top center',
			at: 'bottom center',
			bind: ['tour_submarket_added'],
			tour_submarket_added: function(tour, options, model, value) {
				tour.next();
			},
			setup: function(tour, options) {
				window.addEventListener('tour:submarket', this.tour_submarket_added);
			},
			teardown: function(tour, options) {
				window.removeEventListener('tour:submarket', this.tour_submarket_added);
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].setExpanded(false);
			},
		},
		{
			content: '<p>Alright! Now pick a <b>condition</b> block.</p>',
			target: $('.blocklyFlyoutBackground'),
			highlightTarget: true,
			my: 'left center',
			at: 'right center',
			bind: ['tour_condition_created'],
			tour_condition_created: function(tour, options, model, value) {
				tour.next();
			},
			setup: function(tour, options) {
				window.addEventListener('tour:condition_created', this.tour_condition_created);
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[1].select();
				components.toolbox.css('opacity', 1);
			},
			teardown: function(tour, options) {
				window.removeEventListener('tour:condition_created', this.tour_condition_created);
				components.toolbox.css('opacity', 0.3);
			},
		},
		{
			content: '<p>Ok! Now add it to the submarket you added in the previous step.</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Submarket'):last"),
			highlightTarget: true,
			my: 'left center',
			at: 'right center',
			bind: ['tour_condition_added'],
			tour_condition_added: function(tour, options, model, value) {
				tour.next();
			},
			setup: function(tour, options) {
				window.addEventListener('tour:condition', this.tour_condition_added);
			},
			teardown: function(tour, options) {
				window.removeEventListener('tour:condition', this.tour_condition_added);
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
			},
		},
		{
			content: '<p>Very good! It\'s time to add the options needed by the condition block, pick a number (<img src="www/image/number.png"/>) from the Math menu</p>',
			target: $('.blocklyFlyoutBackground'),
			highlightTarget: true,
			my: 'left center',
			at: 'right center',
			bind: ['tour_number_created'],
			tour_number_created: function(tour, options, model, value) {
				tour.next();
			},
			setup: function(tour, options) {
				window.addEventListener('tour:number', this.tour_number_created);
				Blockly.mainWorkspace.toolbox_.tree_.children_[1].select();
				components.toolbox.css('opacity', 1);
			},
			teardown: function(tour, options) {
				window.removeEventListener('tour:number', this.tour_number_created);
				components.toolbox.css('opacity', 0.3);
			},
		},
		{
			content: '<p>Click on the number block to edit its value (<img src="www/image/number_editing.png"/>), change the value to 5 and add it to the <b>ticks</b> field of the condition block</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Submarket'):last"),
			highlightTarget: true,
			my: 'left center',
			at: 'right center',
			bind: ['tour_ticks_added'],
			tour_ticks_added: function(tour, options, model, value) {
				tour.next();
			},
			setup: function(tour, options) {
				window.addEventListener('tour:ticks', this.tour_ticks_added);
			},
			teardown: function(tour, options) {
				window.removeEventListener('tour:ticks', this.tour_ticks_added);
			},
		},
		{
			content: '<p>Ok, Now add all remaining options to the condition block</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Submarket'):last"),
			highlightTarget: true,
			my: 'left center',
			at: 'right center',
			bind: ['tour_options_added'],
			tour_options_added: function(tour, options, model, value) {
				tour.next();
			},
			setup: function(tour, options) {
				Blockly.mainWorkspace.toolbox_.tree_.children_[1].select();
				window.addEventListener('tour:options', this.tour_options_added);
				components.toolbox.css('opacity', 1);
			},
			teardown: function(tour, options) {
				window.removeEventListener('tour:options', this.tour_options_added);
				components.toolbox.css('opacity', 1);
			},
		},
		{
			content: '<p>That\'s it, now you have a complete trade block with its options. It\'s time to define a strategy</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Submarket'):last"),
			highlightTarget: true,
			my: 'left center',
			at: 'right center',
			nextButton: true,
		},
		{
			content: '<p>This is a <b>strategy</b> block. All the blocks you put in here are run for each and every tick received.</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Strategy'):last"),
			highlightTarget: true,
			my: 'right center',
			at: 'left center',
			nextButton: true,
		},
		{
			content: '<p>The received tick value is in the variable <b>tick</b> and the tick direction (up or down) is in the variable <b>direction</b>. You can pick them from the <b>Strategy</b> menu</p>',
			target: $('.blocklyFlyoutBackground'),
			highlightTarget: true,
			my: 'left center',
			at: 'right center',
			nextButton: true,
			setup: function(tour, options) {
				components.toolbox.css('opacity', 1);
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[3].reveal(true);
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[3].select();
			},
			teardown: function(tour, options) {
				components.toolbox.css('opacity', 0.3);
			},
		},
		{
			content: '<p>For this tourial we are not going to use those variables, so we create our strategy by adding a <b>purchase</b> block. Please pick a purchase block</p>',
			target: $('.blocklyFlyoutBackground'),
			highlightTarget: true,
			my: 'left center',
			at: 'right center',
			bind: ['tour_purchase_created'],
			tour_purchase_created: function(tour, options, model, value) {
				tour.next();
			},
			setup: function(tour, options) {
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].reveal(true);
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].select();
				components.toolbox.css('opacity', 1);
				window.addEventListener('tour:purchase_created', this.tour_purchase_created);
			},
			teardown: function(tour, options) {
				components.toolbox.css('opacity', 0.3);
				window.removeEventListener('tour:purchase_created', this.tour_purchase_created);
			},
		},
		{
			content: '<p>Now add it to the strategy block.</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Strategy'):last"),
			highlightTarget: true,
			my: 'right center',
			at: 'left center',
			bind: ['tour_purchase_added'],
			tour_purchase_added: function(tour, options, model, value) {
				tour.next();
			},
			setup: function(tour, options) {
				window.addEventListener('tour:purchase', this.tour_purchase_added);
			},
			teardown: function(tour, options) {
				window.removeEventListener('tour:purchase', this.tour_purchase_added);
			},
		},
		{
			content: '<p>Nicely Done! The purchase block initiates a purchase defined by its dropdown list, e.g. if your condition block is of <b>Up/Down</b> type you will have <b>Up</b> and <b>Down</b> options on the purchase block to select from.</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Strategy'):last"),
			highlightTarget: true,
			my: 'right center',
			at: 'left center',
			nextButton: true,
		},
		{
			content: '<p>A strategy block consisting of only a purchase block means to purchase as soon as the first tick was received.</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Strategy'):last"),
			highlightTarget: true,
			my: 'right center',
			at: 'left center',
			nextButton: true,
		},
		{
			content: '<p>After a purchase was started, the bot waits till the purchase is completed, and then gives the control to the <b>finish</b> block</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Finish'):last"),
			highlightTarget: true,
			my: 'right center',
			at: 'left center',
			nextButton: true,
		},
		{
			content: '<p>Same as the strategy block, the <b>finish</b> block can have multiple blocks defining its functionality. The finish block defines what to do when the previously purchased contract is finished.</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Finish'):last"),
			highlightTarget: true,
			my: 'right center',
			at: 'left center',
			nextButton: true,
		},
		{
			content: '<p>A <b>Trade Again</b> block creates a new trade and exits from the finish block. Now pick a Trade Again block.</p>',
			target: $('.blocklyFlyoutBackground'),
			highlightTarget: true,
			my: 'left center',
			at: 'right center',
			bind: ['tour_trade_again_created'],
			tour_trade_again_created: function(tour, options, model, value) {
				tour.next();
			},
			setup: function(tour, options) {
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].reveal(true);
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].select();
				components.toolbox.css('opacity', 1);
				window.addEventListener('tour:trade_again_created', this.tour_trade_again_created);
			},
			teardown: function(tour, options) {
				components.toolbox.css('opacity', 0.3);
				window.removeEventListener('tour:trade_again_created', this.tour_trade_again_created);
			},
		},
		{
			content: '<p>Now add it to the finish block</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Finish'):last"),
			highlightTarget: true,
			my: 'right center',
			at: 'left center',
			bind: ['tour_trade_again'],
			tour_trade_again: function(tour, options, model, value) {
				tour.next();
			},
			setup: function(tour, options) {
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].reveal(true);
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].select();
				components.toolbox.css('opacity', 1);
				window.addEventListener('tour:trade_again', this.tour_trade_again);
			},
			teardown: function(tour, options) {
				components.toolbox.css('opacity', 0.3);
				window.removeEventListener('tour:trade_again', this.tour_trade_again);
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
			},
		},
		{
			content: '<p>Excellent! The <b>Trade Again</b> block starts a new trade immidiately after the previous contract is finished, therefore creates an infinite loop which goes on and on until the Trade Again block isn\'t called e.g. in a logic block which its condition is unmet.</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Finish'):last"),
			highlightTarget: true,
			my: 'right center',
			at: 'left center',
			nextButton: true,
		},
		{
			content: '<p>Ok, that\'s it. Now we have a working bot which buys a contract after the first tick and then creates another trade which is exactly the same as before.</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Finish'):last"),
			highlightTarget: true,
			my: 'right center',
			at: 'left center',
			nextButton: true,
			teardown: function(tour, options) {
				setOpacityForAll(1);
			},
		},
		{
			content: '<p>At last! It\'s time to run the blocks we created. You can run/stop the blocks by clicking on these buttons. Please make sure you have chosen a Virtual Account before running the blocks.</p>',
			target: $('.intro-run-stop'),
			highlightTarget: true,
			my: 'top center',
			at: 'bottom center',
			nextButton: true,
		},
		{
			content: '<p>You can choose the token you want by the <b>Account</b> dropdown on the trade block. If you do not have any token in the dropdown please add one using the <b>Add Token</b> button above. Please make sure to use Virtual Account tokens for testing.</p>',
			target: components.workspace.find(".blocklyDraggable:contains('Submarket'):last"),
			highlightTarget: true,
			my: 'left center',
			at: 'right center',
			nextButton: true,
		},
		{
			content: '<p>You can save/load your blocks using these tools</p>',
			target: $('.intro-file-management'),
			highlightTarget: true,
			my: 'top center',
			at: 'bottom center',
			nextButton: true,
		},
		{
			content: '<p>You can add a token to the bot using the <b>Add Token</b> button.</p>',
			target: $('.intro-token'),
			highlightTarget: true,
			my: 'top center',
			at: 'bottom center',
			nextButton: true,
		},
		{
			content: '<p>Go ahead and run the blocks. You can stop the code anytime you want using the stop button.</p>',
			target: $('.intro-run-stop'),
			highlightTarget: true,
			my: 'top center',
			at: 'bottom center',
			nextButton: true,
			teardown: function(tour, options) {
				delete Bot.tour;
			},
		},
	];

	var tour = new Tourist.Tour({
		steps: steps
	});

	return {
		start: function start(){
			if ( !Bot.tour ) {
				Bot.tour = tour;
				Bot.tour.start();
			}
		},
	};
})();
