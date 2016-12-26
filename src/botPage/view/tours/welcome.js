/* eslint-disable no-underscore-dangle, max-len */
import { setDone, isDone } from 'binary-common-utils/lib/storageManager'
import { getUiComponent } from '../components'
import { translator } from '../../../common/translator'

export default class Welcome {
  constructor() {
    this.tour = null
    this.stopCallback = null
  }
  getSteps() {
    return [{
      content: `<p>
      ${translator.translateText('Welcome to the binary bot')},
      ${translator.translateText('a blockly based automation tool for binary.com trades')}.
      ${translator.translateText('Skip this tutorial by clicking on the <b>X</b> button')}.
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
        this.tour._teardownCurrentStep = () => {
        }
        getUiComponent('blocker').hide()
        setDone('welcomeFinished')
        this.stop()
      },
      successStep: () => {
        getUiComponent('blocker').hide()
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
    this.tour.stop()
    Blockly.mainWorkspace.toolbox_.tree_.children_[4].setExpanded(false)
    delete this.tour
    if (this.stopCallback) {
      this.stopCallback()
    }
  }
}
