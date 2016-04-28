Bot.Welcome = function Welcome(){
	var components = {
		tutorialList: $('.tutorialList'),
		logout: $('.logout'),
		workspace: $('.blocklyWorkspace'),
		toolbox: $('.blocklyToolboxDiv'),
		file_management: $('.intro-file-management'),
		token: $('.intro-token'),
		run_stop: $('.intro-run-stop'),
		trash: $('.blocklyTrash'),
		undo_redo: $('.intro-undo-redo'),
		summary: $('.intro-summary'),
	};

	var setOpacityForAll = function setOpacityForAll(opacity){
		Object.keys(components).forEach(function(key){
			components[key].css('opacity', opacity);
		});
	};

	var setOpacity = function setOpacity(componentName, opacity){
		if ( started) {
			components[componentName].css('opacity', opacity);
		}
	};

	var steps = [
		{
			content: '<p>' + i18n._('Welcome to the binary bot, a blockly based automation tool for binary.com trades') + '</p>',
			target: $('#center'),
			nextButton: true,
			my: 'top center',
			at: 'bottom center',
			setup: function(tour, options) {
				setOpacityForAll(0.3);
			},
		},
		{
			content: '<p>' + i18n._('The blocks you put in here will create a binary bot code which you can then execute using the run button.') + '</p>',
			target: $('#center'),
			nextButton: true,
			my: 'top center',
			at: 'bottom center',
			setup: function(tour, options) {
				setOpacity('workspace', 1);
			},
			teardown: function(tour, options) {
				setOpacity('workspace', 0.3);
			},
		},
		{
			content: '<p>' + i18n._('You can add blocks from here to the workspace') + '</p>',
			target: $('.blocklyToolboxDiv'),
			nextButton: true,
			highlightTarget: true,	
			my: 'left center',
			at: 'right center',
			setup: function(tour, options) {
				setOpacity('toolbox', 1);
			},
			teardown: function(tour, options) {
				setOpacity('toolbox', 0.3);
			},
		},
		{
			content: '<p>' + i18n._('Erase the blocks by dropping them in here.') + '</p>',
			target: $('.blocklyTrash'),
			nextButton: true,
			highlightTarget: true,	
			my: 'right bottom',
			at: 'left top',
			setup: function(tour, options) {
				setOpacity('trash', 1);
			},
			teardown: function(tour, options) {
				setOpacity('trash', 0.3);
			},
		},
		{
			content: '<p>' + i18n._('Use these buttons to load and save blocks') + '</p>',
			target: $('.intro-file-management'),
			nextButton: true,
			highlightTarget: true,	
			my: 'top center',
			at: 'bottom center',
			setup: function(tour, options) {
				setOpacity('file_management', 1);
			},
			teardown: function(tour, options) {
				setOpacity('file_management', 0.3);
			},
		},
		{
			content: '<p>' + i18n._('Click to add a token, at least one token is needed. Get your token from ') + '<a href="https://www.binary.com/user/api_tokenws" target="_blank">' + i18n._('here') + '</a></p>',
			target: $('.intro-token'),
			nextButton: true,
			highlightTarget: true,	
			my: 'top center',
			at: 'bottom center',
			setup: function(tour, options) {
				setOpacity('token', 1);
			},
			teardown: function(tour, options) {
				setOpacity('token', 0.3);
			},
		},
		{
			content: '<p>' + i18n._('Use these buttons to Undo/Redo changes to your blocks.') + '</p>',
			target: $('.intro-undo-redo'),
			nextButton: true,
			highlightTarget: true,	
			my: 'top center',
			at: 'bottom center',
			setup: function(tour, options) {
				setOpacity('undo_redo', 1);
			},
			teardown: function(tour, options) {
				setOpacity('undo_redo', 0.3);
			},
		},
		{
			content: '<p>' + i18n._('Click on this button to see the summary of your trades.') + '</p>',
			target: $('.intro-summary'),
			nextButton: true,
			highlightTarget: true,	
			my: 'top center',
			at: 'bottom center',
			setup: function(tour, options) {
				setOpacity('summary', 1);
			},
			teardown: function(tour, options) {
				setOpacity('summary', 0.3);
			},
		},
		{
			content: '<p>' + i18n._('Use these buttons to run or stop your blocks, or reset your result panels.') + '</p>',
			target: $('.intro-run-stop'),
			nextButton: true,
			highlightTarget: true,	
			my: 'top center',
			at: 'bottom center',
			setup: function(tour, options) {
				setOpacity('run_stop', 1);
			},
			teardown: function(tour, options) {
				setOpacity('run_stop', 0.3);
			},
		},
		{
			content: '<p>' + i18n._('Good Luck!') + '</p>',
			target: $('#center'),
			nextButton: true,
			highlightTarget: true,	
			my: 'top center',
			at: 'bottom center',
			teardown: function(tour, options) {
				setOpacityForAll(1);
				Bot.utils.getStorageManager().setDone('welcomeFinished');
				Bot.stopTutorial();
			},
		},
	];

	var tour = new Tourist.Tour({
		steps: steps
	});

	var started = false;

	return {
		start: function start(){
			if ( !Bot.tour ) {
				started = true;
				Bot.tour = tour;
				Bot.tour.start();
			}
		},
		welcome: function welcome(){
			if ( !Bot.utils.getStorageManager().isDone('welcomeFinished') ) {
				if ( !Bot.tour ) {
					started = true;
					Bot.tour = tour;
					Bot.tour.start();
				}
			}
		},
		stop: function stop(){
			started = false;
			setOpacityForAll(1);
			Bot.tour.stop();
			Blockly.mainWorkspace.toolbox_.tree_.children_[6].setExpanded(false);
			delete Bot.tour;
		},
	};
};
