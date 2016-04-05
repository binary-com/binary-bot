Bot.welcome = (function Welcome(){
	var components = {
		workspace: $('.blocklyWorkspace'),
		toolbox: $('.blocklyToolboxDiv'),
		file_management: $('.intro-file-management'),
		token: $('.intro-token'),
		run_stop: $('.intro-run-stop'),
		trash: $('.blocklyTrash'),
	};

	var setOpacityForAll = function setOpacityForAll(opacity){
		Object.keys(components).forEach(function(key){
			components[key].css('opacity', opacity);
		});
	};

	var steps = [
		{
			content: '<p>Welcome to the binary bot, a blockly based automation tool for binary.com trades</p>',
			target: $('#center'),
			nextButton: true,
			my: 'top center',
			at: 'bottom center',
			setup: function(tour, options) {
				setOpacityForAll(0.3);
			},
		},
		{
			content: '<p>The blocks you put in here will create a binary bot code which you can then execute using the run button.</p>',
			target: $('#center'),
			nextButton: true,
			my: 'top center',
			at: 'bottom center',
			setup: function(tour, options) {
				components.workspace.css('opacity', 1);
			},
			teardown: function(tour, options) {
				components.workspace.css('opacity', 0.3);
			},
		},
		{
			content: '<p>You can add blocks from here to the workspace</p>',
			target: $('.blocklyToolboxDiv'),
			nextButton: true,
			highlightTarget: true,	
			my: 'left center',
			at: 'right center',
			setup: function(tour, options) {
				components.toolbox.css('opacity', 1);
			},
			teardown: function(tour, options) {
				components.toolbox.css('opacity', 0.3);
			},
		},
		{
			content: '<p>Erase the blocks by dropping them in here.</p>',
			target: $('.blocklyTrash'),
			nextButton: true,
			highlightTarget: true,	
			my: 'right bottom',
			at: 'left top',
			setup: function(tour, options) {
				components.trash.css('opacity', 1);
			},
			teardown: function(tour, options) {
				components.trash.css('opacity', 0.3);
			},
		},
		{
			content: '<p>Use these buttons to load and save blocks</p>',
			target: $('.intro-file-management'),
			nextButton: true,
			highlightTarget: true,	
			my: 'top center',
			at: 'bottom center',
			setup: function(tour, options) {
				components.file_management.css('opacity', 1);
			},
			teardown: function(tour, options) {
				components.file_management.css('opacity', 0.3);
			},
		},
		{
			content: '<p>Click to add a token, at least one token is needed. Get your token from <a href="https://www.binary.com/user/api_tokenws" target="_blank">here</a></p>',
			target: $('.intro-token'),
			nextButton: true,
			highlightTarget: true,	
			my: 'top center',
			at: 'bottom center',
			setup: function(tour, options) {
				components.token.css('opacity', 1);
			},
			teardown: function(tour, options) {
				components.token.css('opacity', 0.3);
			},
		},
		{
			content: '<p>Use these buttons to run or stop your blocks. Good Luck!</p>',
			target: $('.intro-run-stop'),
			nextButton: true,
			highlightTarget: true,	
			my: 'top center',
			at: 'bottom center',
			setup: function(tour, options) {
				components.run_stop.css('opacity', 1);
			},
			teardown: function(tour, options) {
				setOpacityForAll(1);
				Bot.utils.getStorageManager().setDone('welcomeFinished');
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
		welcome: function welcome(){
			if ( !Bot.utils.getStorageManager().isDone('welcomeFinished') ) {
				if ( !Bot.tour ) {
					Bot.tour = tour;
					Bot.tour.start();
				}
			}
		},
	};
})();
