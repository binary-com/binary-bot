var tour;

tour = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows',
    scrollTo: true
  }
});

tour.addStep('workspace-toolbox', {
	text: 'This is the workspace of the application',
	attachTo: '.blocklyWorkspace',
	classes: 'shepherd-theme-arrows black',
  buttons: [
		{
			text: 'Next',
			action: tour.next
		}
	]
});

tour.addStep('intro-toolbox', {
  text: 'You can add blocks from here to the workspace',
  attachTo: '.blocklyToolboxDiv right',
	classes: 'shepherd-theme-arrows',
  buttons: [
		{
			text: 'Previous',
			action: tour.back
		},
    {
      text: 'Next',
      action: tour.next
    }
  ]
});

tour.start();

