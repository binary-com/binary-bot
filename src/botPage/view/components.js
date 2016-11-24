import { isMainBlock, getBlockByType } from '../view/blockly/utils'

const uiComponents = {
  tours: '#tours',
  workspace_inside: 'svg > .blocklyWorkspace > .blocklyBlockCanvas',
  workspace: '.blocklyWorkspace:first',
  toolbox: '.blocklyToolboxDiv',
  group_load: '.group-load',
  group_reset: '.group-reset',
  intro_login_logout: '.intro-login-logout',
  group_save: '.group-save',
  group_undo_redo: '.group-undo-redo',
  group_zoom: '.group-zoom',
  group_clean_up: '.group-clean-up',
  group_summary: '.group-summary',
  group_start_stop: '.group-start-stop',
  center: '#center',
  flyout: '.blocklyFlyoutBackground',
  blocker: '.blocker',
}

const doNotHide = ['center', 'flyout', 'workspace_inside', 'blocker']

export const getUiComponent = (component) => {
  if (isMainBlock(component)) {
    const mainBlock = getBlockByType(component)
    if (mainBlock) {
      return $(getBlockByType(component).getSvgRoot())
    }
    return $(uiComponents.center)
  }
  return $(uiComponents[component])
}

export const setOpacityForAll = (opacity) => {
  for (const key of Object.keys(uiComponents)) {
    if (doNotHide.indexOf(key) < 0) {
      getUiComponent(key)
        .css('opacity', opacity)
      const disabled = +opacity < 1
      getUiComponent(key)
        .find('button')
        .prop('disabled', disabled)
      getUiComponent(key)
        .find('input')
        .prop('disabled', disabled)
      getUiComponent(key)
        .find('select')
        .prop('disabled', disabled)
    }
  }
}

export const setOpacity = (componentName, opacity) => {
  getUiComponent(componentName)
    .css('opacity', opacity)
  const disabled = +opacity < 1
  getUiComponent(componentName)
    .find('button')
    .prop('disabled', disabled)
  getUiComponent(componentName)
    .find('input')
    .prop('disabled', disabled)
  getUiComponent(componentName)
    .find('select')
    .prop('disabled', disabled)
}
