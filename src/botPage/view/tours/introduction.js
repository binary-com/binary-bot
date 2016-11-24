/* eslint-disable no-underscore-dangle, max-len */
import { setDone, isDone } from 'binary-common-utils/lib/storageManager'
import { getUiComponent, setOpacityForAll, setOpacity } from '../components'
import { translator } from '../../../common/translator'

export default class Introduction {
  constructor() {
    this.tour = null
    this.stopCallback = null
  }
  getSteps() {
    return [{
      content: `<p>
      ${translator.translateText('Welcome to the binary bot')},
      ${translator.translateText('in this tutorial we will learn about basic tools in Binary Bot')}.
      ${translator.translateText('Skip this tutorial by clicking on the <b>X</b> button')}. <br/>
      ${translator.translateText('Skip each step by <b>Right Arrow (')} &rarr;
      ${translator.translateText(')</b> on the keyboard.')}
      </p>`,
      target: getUiComponent('center'),
      closeButton: true,
      nextButton: true,
      my: 'top center',
      at: 'bottom center',
      setup: () => {
        getUiComponent('blocker').show()
        setOpacityForAll(0.3)
      },
    }, {
      content: `<p>
      ${translator.translateText('You can drag and drop blocks in here to load them in Binary Bot')}
      </p>`,
      target: getUiComponent('center'),
      closeButton: true,
      nextButton: true,
      my: 'top center',
      at: 'bottom center',
      setup: () => {
        setOpacity('workspace', 1)
      },
      teardown: () => {
        setOpacity('workspace', 0.3)
      },
    }, {
      content: `<p>
      ${translator.translateText('You can pick blocks from here to add to your Bot')}
      </p>`,
      target: getUiComponent('toolbox'),
      closeButton: true,
      nextButton: true,
      highlightTarget: true,
      my: 'left center',
      at: 'right center',
      setup: () => {
        setOpacity('toolbox', 1)
      },
      teardown: () => {
        setOpacity('toolbox', 0.3)
      },
    }, {
      content: `<p>
      ${translator.translateText('Press Ctrl + - to zoom out and Ctrl + + to zoom in the blocks')}
      </p>`,
      target: getUiComponent('center'),
      closeButton: true,
      nextButton: true,
      my: 'top center',
      at: 'bottom center',
      setup: () => {
        setOpacity('workspace', 1)
      },
      teardown: () => {
        setOpacity('workspace', 0.3)
      },
    }, {
      content: `<p>
      ${translator.translateText('You need to login before running the bot.')}
      </p>`,
      target: getUiComponent('intro_login_logout'),
      closeButton: true,
      nextButton: true,
      highlightTarget: true,
      my: 'top center',
      at: 'bottom center',
      setup: () => {
        setOpacity('intro_login_logout', 1)
      },
      teardown: () => {
        setOpacity('intro_login_logout', 0.3)
      },
    }, {
      content: `<p>
      ${translator.translateText('Use these buttons to save/load your blocks, you can also drag and drop Bot files to load them')}
      </p>`,
      target: getUiComponent('group_save'),
      closeButton: true,
      nextButton: true,
      highlightTarget: true,
      my: 'right center',
      at: 'left center',
      setup: () => {
        setOpacity('group_save', 1)
      },
      teardown: () => {
        setOpacity('group_save', 0.3)
      },
    }, {
      content: `<p>
      ${translator.translateText('Use these buttons to Undo/Redo changes to your blocks.')}
      </p>`,
      target: getUiComponent('group_undo_redo'),
      closeButton: true,
      nextButton: true,
      highlightTarget: true,
      my: 'right center',
      at: 'left center',
      setup: () => {
        setOpacity('group_undo_redo', 1)
      },
      teardown: () => {
        setOpacity('group_undo_redo', 0.3)
      },
    }, {
      content: `<p>
      ${translator.translateText('Use these buttons to zoom in/out your blocks.')}
      </p>`,
      target: getUiComponent('group_zoom'),
      closeButton: true,
      nextButton: true,
      highlightTarget: true,
      my: 'right center',
      at: 'left center',
      setup: () => {
        setOpacity('group_zoom', 1)
      },
      teardown: () => {
        setOpacity('group_zoom', 0.3)
      },
    }, {
      content: `<p>
      ${translator.translateText('Use this button to automatically arrange your blocks.')}
      </p>`,
      target: getUiComponent('group_clean_up'),
      closeButton: true,
      nextButton: true,
      highlightTarget: true,
      my: 'right center',
      at: 'left center',
      setup: () => {
        setOpacity('group_clean_up', 1)
      },
      teardown: () => {
        setOpacity('group_clean_up', 0.3)
      },
    }, {
      content: `<p>
      ${translator.translateText('Show the summary panel where you can see the chart and more information about the trades.')}
      </p>`,
      target: getUiComponent('group_summary'),
      closeButton: true,
      nextButton: true,
      highlightTarget: true,
      my: 'right center',
      at: 'left center',
      setup: () => {
        setOpacity('group_summary', 1)
      },
      teardown: () => {
        setOpacity('group_summary', 0.3)
      },
    }, {
      content: `<p>
      ${translator.translateText('Reset the blocks to their initial state.')}
      </p>`,
      target: getUiComponent('group_reset'),
      closeButton: true,
      nextButton: true,
      highlightTarget: true,
      my: 'right center',
      at: 'left center',
      setup: () => {
        setOpacity('group_reset', 1)
      },
      teardown: () => {
        setOpacity('group_reset', 0.3)
      },
    }, {
      content: `<p>
      ${translator.translateText('Use this button to run/stop your Bot')}
      </p>`,
      target: getUiComponent('group_start_stop'),
      closeButton: true,
      nextButton: true,
      highlightTarget: true,
      my: 'right center',
      at: 'left center',
      setup: () => {
        setOpacity('group_start_stop', 1)
      },
      teardown: () => {
        setOpacity('group_start_stop', 0.3)
      },
    }, {
      content: `<p>
      ${translator.translateText('Good Luck!')}
      </p>`,
      target: getUiComponent('center'),
      nextButton: true,
      highlightTarget: true,
      my: 'top center',
      at: 'bottom center',
    }]
  }
  next() {
    if (this.tour) {
      this.tour.next()
    }
  }
  start(stopCallback) {
    this.stopCallback = stopCallback
    this.tour = new Tourist.Tour({
      steps: this.getSteps(),
      cancelStep: () => {
        this.tour._teardownCurrentStep = () => {}
        getUiComponent('blocker').hide()
        setOpacityForAll(1)
        setDone('welcomeFinished')
        this.stop()
      },
      successStep: () => {
        getUiComponent('blocker').hide()
        setOpacityForAll(1)
        setDone('welcomeFinished')
        this.stop()
      },
    })
    this.tour.start()
  }
  welcome(stopCallback) {
    if (!isDone('welcomeFinished')) {
      this.start(stopCallback)
    } else if (stopCallback) {
      stopCallback()
    }
  }
  stop() {
    setOpacityForAll(true, 1)
    this.tour.stop()
    Blockly.mainWorkspace.toolbox_.tree_.children_[4].setExpanded(false)
    delete this.tour
    if (this.stopCallback) {
      this.stopCallback()
    }
  }
}
