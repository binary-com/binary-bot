(function(){
	Bot.tutor_event = new Shepherd.Evented();
	Bot.tutor = new Shepherd.Tour({
		defaults: {
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			scrollTo: false,
			showCancelLink: true,
		}
	});

	var components = {
		workspace: $('.blocklyWorkspace'),
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

	Bot.tutor.addStep('tutor_main', {
		title: 'Tutorial',
		text: 'Welcome to the binary bot tutorial, we will go through the basic steps to create a working bot.',
		attachTo: '#blocklyDiv',
		buttons: [
			{
				text: 'Skip',
				classes: 'shepherd-button-secondary',
				action: Bot.tutor.cancel
			},
			{
				text: 'Next',
				classes: 'shepherd-button-example-primary',
				action: Bot.tutor.next
			}
		],
		when: {
			show: function(){
				$('.shepherd-step').mousedown(Bot.utils.dragHandler);
				setOpacityForAll(0.3);
			}
		},
	});

	Bot.tutor.addStep('tutor_workspace', {
		title: 'Workspace',
		text: 'You will need to add the blocks to this area which is called the workspace',
		attachTo: '#blocklyDiv',
		buttons: [
			{
				text: 'Next',
				classes: 'shepherd-button-example-primary',
				action: Bot.tutor.next
			}
		],
		when: {
			show: function(){
				$('.shepherd-step').mousedown(Bot.utils.dragHandler);
				components.workspace.css('opacity', 1);
			},
		},
	});

	Bot.tutor.addStep('tutor_submarket', {
		title: 'Toolbox - Adding sub-market',
		text: 'To start pick a block from random markets and add it to the trade block.',
		attachTo: '.blocklyToolboxDiv',
		buttons: [
		],
		when: {
			show: function(){
				$('.shepherd-step').mousedown(Bot.utils.dragHandler);
				// refactor
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].children_[0].reveal(true)
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].children_[0].onMouseDown()
				components.toolbox.css('opacity', 1);
			},
			hide: function(){
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[0].setExpanded(false);
			}
		},
	});

	Bot.tutor.addStep('tutor_condition', {
		title: 'Toolbox - Adding condition',
		text: 'Go ahead and add a condition to the submarket you just added.',
		attachTo: '.blocklyToolboxDiv',
		buttons: [
		],
		when: {
			show: function(){
				$('.shepherd-step').mousedown(Bot.utils.dragHandler);
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[1].onMouseDown()
			},
			hide: function(){
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
			}
		},
	});

	Bot.tutor.addStep('tutor_condition_options', {
		title: 'Toolbox - Adding condition options',
		text: 'Very good! It\'s time to add the options needed by the condition block,<br/> you can add a number from the Math menu',
		attachTo: '#blocklyDiv',
		buttons: [
		],
		when: {
			show: function(){
				$('.shepherd-step').mousedown(Bot.utils.dragHandler);
				Blockly.mainWorkspace.toolbox_.tree_.children_[1].onMouseDown()
			},
			hide: function(){
				Blockly.mainWorkspace.toolbox_.tree_.children_[1].onMouseDown()
			}
		},
	});

	Bot.tutor.addStep('tutor_purchase', {
		title: 'Toolbox - Adding Purchase to Strategy',
		text: '<textarea>You can see a function with name "decide when to purchase with each tick". It\'s the strategy block.<br/>The blocks in it are executed each and every time a new tick has arrived (if no contract is in the purchase process).<br/>Your strategy block tells the bot when it is a good time to buy a contract and which option to buy using a purchase block.<br/>Go ahead and add a "Purchase" block to the strategy block.</textarea>',
		attachTo: ".blocklyDraggable:contains('Trade') right",
		buttons: [
		],
		when: {
			show: function(){
				$('.shepherd-step').mousedown(Bot.utils.dragHandler);
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].reveal(true)
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].children_[2].onMouseDown()
			},
		},
	});

	Bot.tutor.addStep('tutor_trade_again', {
		title: 'Toolbox - Adding Trade Again to Finish',
		text: 'Way to go! Now it\'s time to tell the finish block what to do next, add a "Trade Again" block to the function named "decide what to do after the contract is finished" (the Finish block) to make a new trade after the purchase is finished.',
		attachTo: '#blocklyDiv',
		buttons: [
		],
		when: {
			show: function(){
				$('.shepherd-step').mousedown(Bot.utils.dragHandler);
			},
			hide: function(){
				Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
			},
		},
	});

	Bot.tutor.on('cancel', function(){
		setOpacityForAll(1);
	});

	Bot.tutor.on('complete', function(){
		setOpacityForAll(1);
	});

	Bot.startTutor = function startTutor(){
		if ( !Shepherd.activeTour ) {
			Bot.tutor_event.once('tutor_trade_again_added', function(){
			});

			Bot.tutor_event.once('tutor_purchase_added', function(){
				Bot.tutor.show('tutor_trade_again');
			});

			Bot.tutor_event.once('tutor_condition_options_added', function(){
				Bot.tutor.show('tutor_purchase');
			});

			Bot.tutor_event.once('tutor_condition_added', function(){
				Bot.tutor.show('tutor_condition_options');
			});

			Bot.tutor_event.once('tutor_submarket_added', function(){
				Bot.tutor.show('tutor_condition');
			});

			Bot.tutor.start();
		}
	};
})();
