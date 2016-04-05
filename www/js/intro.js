(function(){
	Bot.intro = new Shepherd.Tour({
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

	Bot.intro.addStep('intro_main', {
		title: 'Introduction',
		text: 'Welcome to the binary bot, a blockly based automation tool for binary.com trades',
		attachTo: '#blocklyDiv',
		buttons: [
			{
				text: 'Skip',
				classes: 'shepherd-button-secondary',
				action: Bot.intro.cancel
			},
			{
				text: 'Next',
				classes: 'shepherd-button-example-primary',
				action: Bot.intro.next
			}
		],
		when: {
			show: function(){
				setOpacityForAll(0.3);
			}
		},
	});

	Bot.intro.addStep('intro_workspace', {
		title: 'Workspace',
		text: 'The blocks you put in here will create a binary bot code which you can then execute using the run button.',
		attachTo: '#blocklyDiv',
		buttons: [
			{
				text: 'Next',
				classes: 'shepherd-button-example-primary',
				action: Bot.intro.next
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

	Bot.intro.addStep('intro_toolbox', {
		title: 'Toolbox',
		text: 'You can add blocks from here to the workspace',
		attachTo: '.blocklyToolboxDiv right',
		buttons: [
			{
				text: 'Back',
				classes: 'shepherd-button-example-primary',
				action: Bot.intro.back
			},
			{
				text: 'Next',
				classes: 'shepherd-button-example-primary',
				action: Bot.intro.next
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

	Bot.intro.addStep('intro_file_management', {
		title: 'Load/Save Xml',
		text: 'Use these buttons to load and save blocks',
		attachTo: '.intro-file-management bottom',
		buttons: [
			{
				text: 'Back',
				classes: 'shepherd-button-example-primary',
				action: Bot.intro.back
			},
			{
				text: 'Next',
				classes: 'shepherd-button-example-primary',
				action: Bot.intro.next
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

	Bot.intro.addStep('intro_token', {
		title: 'Token',
		text: 'Click to add a token, at least one token is needed. Get your token from <a href="https://www.binary.com/user/api_tokenws" target="_blank">here</a>',
		attachTo: '.intro-token bottom',
		buttons: [
			{
				text: 'Back',
				classes: 'shepherd-button-example-primary',
				action: Bot.intro.back
			},
			{
				text: 'Next',
				classes: 'shepherd-button-example-primary',
				action: Bot.intro.next
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

	Bot.intro.addStep('intro_run_stop', {
		title: 'Run/Stop Blocks',
		text: 'Use these buttons to run or stop your blocks',
		attachTo: '.intro-run-stop bottom',
		buttons: [
			{
				text: 'Back',
				classes: 'shepherd-button-example-primary',
				action: Bot.intro.back
			},
			{
				text: 'Exit',
				classes: 'shepherd-button-secondary',
				action: Bot.intro.next
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

	Bot.intro.on('cancel', function(){
		setOpacityForAll(1);
	});

	Bot.intro.on('complete', function(){
		setOpacityForAll(1);
		localStorage.introCompleted = 'true';
	});
	Bot.startIntro = function startIntro(){
		if ( !Shepherd.activeTour ) {
			Bot.intro.start();
		}
	};
	if ( !localStorage.hasOwnProperty('introCompleted') ) {
		if ( !Shepherd.activeTour ) {
			Bot.intro.start();
		}
	}
})();
