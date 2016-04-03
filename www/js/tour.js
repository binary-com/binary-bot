(function(){
	Bot.tour = new Shepherd.Tour({
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

	Bot.tour.addStep('intro_main', {
		text: 'Welcome to the quick tour of the binary bot',
		attachTo: '#blocklyDiv',
		buttons: [
			{
				text: 'Skip',
				classes: 'shepherd-button-secondary',
				action: Bot.tour.cancel
			},
			{
				text: 'Next',
				classes: 'shepherd-button-example-primary',
				action: Bot.tour.next
			}
		],
		when: {
			show: function(){
				setOpacityForAll(0.3);
			}
		},
	});

	Bot.tour.addStep('intro_workspace', {
		title: 'workspace',
		text: 'The blocks you put in here <br/>will create a binary bot code.',
		attachTo: '#blocklyDiv',
		buttons: [
			{
				text: 'Next',
				classes: 'shepherd-button-example-primary',
				action: Bot.tour.next
			}
		],
		when: {
			show: function(){
				components.workspace.css('opacity', 1);
			},
			hide: function(){
				components.workspace.css('opacity', 0.3);
			}
		},
	});

	Bot.tour.addStep('intro_toolbox', {
		title: 'Toolbox',
		text: 'You can add blocks from here to the workspace',
		attachTo: '.blocklyToolboxDiv right',
		buttons: [
			{
				text: 'Back',
				action: Bot.tour.back
			},
			{
				text: 'Next',
				action: Bot.tour.next
			}
		],
		when: {
			show: function(){
				components.toolbox.css('opacity', 1);
			},
			hide: function(){
				components.toolbox.css('opacity', 0.3);
			}
		},
	});

	Bot.tour.addStep('intro_file_management', {
		title: 'Load/Save Xml',
		text: 'Use these buttons to load and save blocks',
		attachTo: '.intro-file-management bottom',
		buttons: [
			{
				text: 'Back',
				action: Bot.tour.back
			},
			{
				text: 'Next',
				action: Bot.tour.next
			}
		],
		when: {
			show: function(){
				components.file_management.css('opacity', 1);
			},
			hide: function(){
				components.file_management.css('opacity', 0.3);
			}
		},
	});

	Bot.tour.addStep('intro_token', {
		title: 'Token',
		text: 'Click to add a token, at least one token is needed. Get your token from <a href="https://www.binary.com/user/api_tokenws" target="_blank">here</a>',
		attachTo: '.intro-token bottom',
		buttons: [
			{
				text: 'Back',
				action: Bot.tour.back
			},
			{
				text: 'Next',
				action: Bot.tour.next
			}
		],
		when: {
			show: function(){
				components.token.css('opacity', 1);
			},
			hide: function(){
				components.token.css('opacity', 0.3);
			}
		},
	});

	Bot.tour.addStep('intro_run_stop', {
		title: 'Run/Stop Blocks',
		text: 'Use these buttons to run or stop your blocks',
		attachTo: '.intro-run-stop bottom',
		buttons: [
			{
				text: 'Back',
				action: Bot.tour.back
			},
			{
				text: 'Exit',
				classes: 'shepherd-button-secondary',
				action: Bot.tour.next
			}
		],
		when: {
			show: function(){
				components.run_stop.css('opacity', 1);
			},
			hide: function(){
				components.run_stop.css('opacity', 0.3);
			}
		},
	});

	Bot.tour.on('cancel', function(){
		setOpacityForAll(1);
	});

	Bot.tour.on('complete', function(){
		setOpacityForAll(1);
		localStorage.tourCompleted = 'true';
	});
	Bot.startTour = function startTour(){
		Bot.tour.start();
	};
	if ( !localStorage.hasOwnProperty('tourCompleted') ) {
		Bot.tour.start();
	}
})();
