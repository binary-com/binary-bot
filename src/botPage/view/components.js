import { isMainBlock, getBlockByType } from '../view/blockly/utils';

const uiComponents = {
  accountSelect: '#accountSelect',
  tours: '#tours',
  logout: '.logout',
  workspace_inside: 'svg > .blocklyWorkspace > .blocklyBlockCanvas',
  workspace: '.blocklyWorkspace:first',
  toolbox: '.blocklyToolboxDiv',
  group_load: '.group-load',
  group_reset: '.group-reset',
  intro_login_logout: '.intro-login-logout',
  login_logout: '.login-logout',
  group_save: '.group-save',
  group_undo_redo: '.group-undo-redo',
  group_summary: '.group-summary',
  group_start_stop: '.group-start-stop',
  center: '#center',
  flyout: '.blocklyFlyoutBackground',
};

const doNotHide = ['center', 'flyout', 'workspace_inside'];

export const getUiComponent = (component) => {
  if (isMainBlock(component)) {
    return $(getBlockByType(component).getSvgRoot());
  }
  return $(uiComponents[component]);
};

export const setOpacityForAll = (opacity) => {
  for (const key of Object.keys(uiComponents)) {
    if (doNotHide.indexOf(key) < 0) {
      getUiComponent(key)
        .css('opacity', opacity);
      const disabled = +opacity < 1;
      getUiComponent(key)
        .find('button')
        .prop('disabled', disabled);
      getUiComponent(key)
        .find('input')
        .prop('disabled', disabled);
      getUiComponent(key)
        .find('select')
        .prop('disabled', disabled);
    }
  }
};

export const setOpacity = (componentName, opacity) => {
  getUiComponent(componentName)
    .css('opacity', opacity);
  const disabled = +opacity < 1;
  getUiComponent(componentName)
    .find('button')
    .prop('disabled', disabled);
  getUiComponent(componentName)
    .find('input')
    .prop('disabled', disabled);
  getUiComponent(componentName)
    .find('select')
    .prop('disabled', disabled);
};
