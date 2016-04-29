Bot.Welcome = function Welcome() {
	var steps = [{
		content: '<p>' + i18n._('Welcome to the binary bot, a blockly based automation tool for binary.com trades') + '</p>',
		target: Bot.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacityForAll(started, 0.3);
		},
	}, {
		content: '<p>' + i18n._('The blocks you put in here will create a binary bot code which you can then execute using the run button.') + '</p>',
		target: Bot.getUiComponent('center'),
		nextButton: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'workspace', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'workspace', 0.3);
		},
	}, {
		content: '<p>' + i18n._('You can add blocks from here to the workspace') + '</p>',
		target: Bot.getUiComponent('toolbox'),
		nextButton: true,
		highlightTarget: true,
		my: 'left center',
		at: 'right center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'toolbox', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'toolbox', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Erase the blocks by dropping them in here.') + '</p>',
		target: Bot.getUiComponent('trash'),
		nextButton: true,
		highlightTarget: true,
		my: 'right bottom',
		at: 'left top',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'trash', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'trash', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Use these buttons to load and save blocks') + '</p>',
		target: Bot.getUiComponent('file_management'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'file_management', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'file_management', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Click to add a token, at least one token is needed. Get your token from ') + '<a href="https://www.binary.com/user/api_tokenws" target="_blank">' + i18n._('here') + '</a></p>',
		target: Bot.getUiComponent('token'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'token', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'token', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Use these buttons to Undo/Redo changes to your blocks.') + '</p>',
		target: Bot.getUiComponent('undo_redo'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'undo_redo', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'undo_redo', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Click on this button to see the summary of your trades.') + '</p>',
		target: Bot.getUiComponent('summary'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'summary', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'summary', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Use these buttons to run or stop your blocks, or reset your result panels.') + '</p>',
		target: Bot.getUiComponent('run_stop'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		setup: function (tour, options) {
			Bot.utils.setOpacity(started, 'run_stop', 1);
		},
		teardown: function (tour, options) {
			Bot.utils.setOpacity(started, 'run_stop', 0.3);
		},
	}, {
		content: '<p>' + i18n._('Good Luck!') + '</p>',
		target: Bot.getUiComponent('center'),
		nextButton: true,
		highlightTarget: true,
		my: 'top center',
		at: 'bottom center',
		teardown: function (tour, options) {
			Bot.utils.setOpacityForAll(started, 1);
			Bot.utils.getStorageManager()
				.setDone('welcomeFinished');
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
		welcome: function welcome() {
			if (!Bot.utils.getStorageManager()
				.isDone('welcomeFinished')) {
				if (!Bot.tour) {
					started = true;
					Bot.tour = tour;
					Bot.tour.start();
				}
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
