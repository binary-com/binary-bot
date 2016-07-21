'use strict';
var Components = function Components(){
	this.uiComponents = {
		accountSelect: '#accountSelect',
		tours: '#tours',
		logout: '.logout',
		workspace_inside: 'svg > .blocklyWorkspace > .blocklyBlockCanvas',
		workspace: '.blocklyWorkspace',
		toolbox: '.blocklyToolboxDiv',
		group_load: '.group-load',
		login_logout: '.intro-login-logout',
		group_save: '.group-save',
		group_undo_redo: '.group-undo-redo',
		group_summary: '.group-summary',
		group_start_stop: '.group-start-stop',
		center: '#center',
		flyout: '.blocklyFlyoutBackground',
		submarket: ".blocklyDraggable:contains('Trade'):last",
		strategy: ".blocklyDraggable:contains('Strategy'):last",
		finish: ".blocklyDraggable:contains('Result'):last",
	};
	this.doNotHide = ['center', 'flyout', 'workspace_inside', 'submarket', 'strategy', 'finish'];
};

Components.prototype = Object.create(null, {
	getUiComponent: {
		value: function getUiComponent(component) {
			return $(this.uiComponents[component]);
		}
	},
	setOpacityForAll: {
		value: function setOpacityForAll(opacity) {
			for (var key in this.uiComponents) {
				if (this.doNotHide.indexOf(key) < 0) {
					this.getUiComponent(key)
						.css('opacity', opacity);
					var disabled = +opacity < 1;
					this.getUiComponent(key)
						.find('button')
						.prop('disabled', disabled);
					this.getUiComponent(key)
						.find('input')
						.prop('disabled', disabled);
					this.getUiComponent(key)
						.find('select')
						.prop('disabled', disabled);
				}
			}
		}
	},
	setOpacity: {
		value: function setOpacity(componentName, opacity) {
			this.getUiComponent(componentName)
				.css('opacity', opacity);
			var disabled = +opacity < 1;
			this.getUiComponent(componentName)
				.find('button')
				.prop('disabled', disabled);
			this.getUiComponent(componentName)
				.find('input')
				.prop('disabled', disabled);
			this.getUiComponent(componentName)
				.find('select')
				.prop('disabled', disabled);
		}
	},
});

module.exports = Components;
