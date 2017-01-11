import React from 'react'
import ReactDOM from 'react-dom'
import { BinaryChart } from 'binary-charts'
import { logoutAllTokens } from 'binary-common-utils/lib/account'
import { LiveApi } from 'binary-live-api'
import { observer } from 'binary-common-utils/lib/observer'
import { getTokenList, removeAllTokens, get as getStorage, set as setStorage, getToken,
} from 'binary-common-utils/lib/storageManager'
import TradeInfo from './tradeInfo'
import _Blockly from './blockly'
import { translate } from '../../common/i18n'
import { logHandler } from './logger'
import { SaveXml } from './react-components/SaveXml'
import { RestartTimeout } from './react-components/RestartTimeout'
import { LimitsPanel } from './react-components/LimitsPanel'
import { getLanguage } from '../../common/lang'
import { Tour } from './tour'

let realityCheckTimeout
let editMode = false
let mode = 'execute'
let mobileMenuVisible = false
let ticks = []
let currentSymbol = 'R_100'
let currentStyle = 'ticks'
let currentGranularity
let api

const mapHistoryTicks = history => {
  const { times, prices } = history
  return times.map((t, idx) => ({
    epoch: +t,
    quote: +prices[idx],
  }))
}

const showRealityCheck = () => {
  $('.blocker').show()
  $('.reality-check').show()
}

const hideRealityCheck = () => {
  $('#rc-err').hide()
  $('.blocker').hide()
  $('.reality-check').hide()
}

const stopRealityCheck = () => {
  clearInterval(realityCheckTimeout)
  realityCheckTimeout = null
}

const realityCheckInterval = () => {
  realityCheckTimeout = setInterval(() => {
    const now = parseInt((new Date().getTime()) / 1000, 10)
    const checkTime = +getStorage('realityCheckTime')
    if (checkTime && now >= checkTime) {
      showRealityCheck()
      stopRealityCheck()
    }
  }, 1000)
}

const startRealityCheck = (time, token) => {
  stopRealityCheck()
  if (time) {
    const start = parseInt((new Date().getTime()) / 1000, 10) + (time * 60)
    setStorage('realityCheckTime', start)
    realityCheckInterval()
  } else {
    const tokenObj = getToken(token)
    if (tokenObj.hasRealityCheck) {
      const checkTime = +getStorage('realityCheckTime')
      if (!checkTime) {
        showRealityCheck()
      } else {
        realityCheckInterval()
      }
    }
  }
}

const clearRealityCheck = () => {
  setStorage('realityCheckTime', null)
  stopRealityCheck()
}

const resetRealityCheck = (token) => {
  clearRealityCheck()
  startRealityCheck(null, token)
}

const addResizeListener = (element, fn) => {
  const resizeListener = (e) => {
    const requestFrame = (...args) =>
    (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame
      || (a => setTimeout(a, 20)))(...args)

    const cancelFrame = (...args) =>
      (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
             window.clearTimeout)(...args)

    const win = e.target || e.srcElement
    if (win.__resizeRAF__) cancelFrame(win.__resizeRAF__)
    win.__resizeRAF__ = requestFrame(() => {
      const trigger = win.__resizeTrigger__
      trigger.__resizeListeners__.forEach((a) => {
        a.call(trigger, e)
      })
    })
  }
  function objectLoad() {
    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
    this.contentDocument.defaultView.addEventListener('resize', resizeListener)
  }
  const isIE = navigator.userAgent.match(/Trident/)
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [] // eslint-disable-line no-param-reassign
    if (document.attachEvent) {
      element.__resizeTrigger__ = element // eslint-disable-line no-param-reassign
      element.attachEvent('onresize', resizeListener)
    } else {
      if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative' // eslint-disable-line no-param-reassign
      }
      const obj = element.__resizeTrigger__ = document.createElement('object') // eslint-disable-line no-param-reassign
      obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;')
      obj.__resizeElement__ = element
      obj.onload = objectLoad
      obj.type = 'text/html'
      if (isIE) element.appendChild(obj)
      obj.data = 'about:blank'
      if (!isIE) element.appendChild(obj)
    }
  }
  element.__resizeListeners__.push(fn)
}

const initializeApi = () => {
  api = new LiveApi()
  api.events.on('ohlc', response => {
    const newTick = response.ohlc
    const lastCandle = ticks.slice(-1)[0]
    const getTime = candle => candle.open_time || candle.epoch
    ticks = (getTime(lastCandle) === getTime(newTick)) ?
      [...ticks.slice(0, ticks.length - 1), newTick] :
      ticks.concat([newTick])
  })

  api.events.on('tick', response => {
    const newTick = response.tick
    ticks = ticks.concat([{ epoch: +newTick.epoch, quote: +newTick.quote }])
  })

  api
    .getTickHistory('R_100', { subscribe: 1, end: 'latest', count: 1000, style: 'ticks' })
    .then(r => (ticks = mapHistoryTicks(r.history)))
}

export default class View {
  constructor() {
    this.chartType = 'line'
    logHandler()
    this.tradeInfo = new TradeInfo()
    initializeApi()
    this.initPromise = new Promise((resolve) => {
      this.updateTokenList()
      this.blockly = new _Blockly()
      this.blockly.initPromise.then(() => {
        this.setElementActions()
        $('#accountLis')
        startRealityCheck(null, $('.account-id').first().attr('value'))
        ReactDOM.render(<Tour />, document.getElementById('tour'))
        resolve()
      })
    })
  }
  updateTokenList() {
    const tokenList = getTokenList()
    const loginButton = $('#login')
    const accountList = $('#account-list')
    if (tokenList.length === 0) {
      loginButton.show()
      accountList.hide()
      $('.account-id').removeAttr('value').text('')
      $('.account-type').text('')
      $('.login-id-list').children().remove()
    } else {
      loginButton.hide()
      accountList.show()
      for (const tokenInfo of tokenList) {
        let prefix = ''
        if ('isVirtual' in tokenInfo) {
          prefix = (tokenInfo.isVirtual) ? 'Virtual Account' : 'Real Account'
        }
        if (tokenList.indexOf(tokenInfo) === 0) {
          $('.account-id').attr('value', `${tokenInfo.token}`)
            .text(`${tokenInfo.account_name}`)
          $('.account-type').text(`${prefix}`)
        } else {
          $('.login-id-list').append(`<a href="#" value="${tokenInfo.token}"><li><span>${prefix}</span><div>${tokenInfo.account_name}</div></li></a>` +
            '<div class="separator-line-thin-gray"></div>')
        }
      }
    }
  }
  setFileBrowser() {
    const readFile = (f, dropEvent = {}) => {
      const reader = new FileReader()
      reader.onload = e => this.blockly.load(e.target.result, dropEvent)
      reader.readAsText(f)
    }

    const handleFileSelect = (e) => {
      let files
      let dropEvent
      if (e.type === 'drop') {
        e.stopPropagation()
        e.preventDefault()
        files = e.dataTransfer.files
        dropEvent = e
      } else {
        files = e.target.files
      }
      files = [...files]
      for (const file of files) {
        if (file.type.match('text/xml')) {
          readFile(file, dropEvent)
        } else {
          observer.emit('ui.log.info', `${
          translate('File is not supported:')} ${file.name}`)
        }
      }
    }

    const handleDragOver = (e) => {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy' // eslint-disable-line no-param-reassign
    }

    const dropZone = document.body

    dropZone.addEventListener('dragover', handleDragOver, false)
    dropZone.addEventListener('drop', handleFileSelect, false)
    if (document.getElementById('files')) {
      document.getElementById('files')
        .addEventListener('change', handleFileSelect, false)
    }
    $('#open_btn')
      .on('click', () => {
        $.FileDialog({ // eslint-disable-line new-cap
          accept: '.xml',
          cancelButton: 'Close',
          dragMessage: 'Drop files here',
          dropheight: 400,
          errorMessage: 'An error occured while loading file',
          multiple: false,
          okButton: 'OK',
          readAs: 'DataURL',
          removeMessage: 'Remove&nbsp;file',
          title: 'Load file',
        })
      })
      .on('files.bs.filedialog', (ev) => {
        handleFileSelect(ev.files)
      })
      .on('cancel.bs.filedialog', (ev) => {
        handleFileSelect(ev)
      })
  }
  setElementActions() {
    this.setFileBrowser()
    this.addBindings()
    this.addEventHandlers()
  }
  addBindings() {
    const hideExecute = () => {
      $('#showExecute').removeClass('selected')
    }

    const hideSummary = () => {
      $('#showSummary').removeClass('selected')
      $('#summaryPanel')
        .hide()
    }

    const showBlocklyToolbox = () => {
      const toolboxDiv = $('.blocklyToolboxDiv')
      $('.blocklySvg').css('left', `${toolboxDiv.width()}px`)
      toolboxDiv.addClass('shownToolbox')
    }

    const hideBlocklyToolbox = () => {
      this.blockly.getToolbox().flyout_.hide()
      $('.blocklyToolboxDiv').removeClass('shownToolbox')
    }

    const showToolbox = () => {
      const toolbox = $('#toolbox')
      toolbox.show()
      $('.blocklySvg').css('left', `${toolbox.width()}px`)
      $('.blocklySvg').css('margin-left', '0.5em')
    }

    const hideToolbox = () => {
      $('#toolbox').hide()
      $('.blocklySvg').css('left', '0em')
      $('.blocklySvg').css('margin-left', '0em')
    }

    const toggleToolbox = (blockly) => {
      if (blockly) {
        hideToolbox()
        showBlocklyToolbox()
      } else {
        hideBlocklyToolbox()
        showToolbox()
      }
    }

    const exitEditMode = () => {
      $('#showEdit').prop('checked', false)
      hideBlocklyToolbox()
      hideToolbox()
      editMode = false
    }

    const showExecute = () => {
      mode = 'execute'
      hideSummary()
      $('#showExecute').addClass('selected')
    }

    const showSummary = () => {
      $('#showSummary').addClass('selected')
      mode = 'report'
      hideExecute()
      exitEditMode()
      $('#summaryPanel')
        .show()
    }

    const enterEditMode = () => {
      showToolbox()
      showExecute()
      hideSummary()
      editMode = true
    }

    const stop = (e) => {
      if (e) {
        e.preventDefault()
      }
      stopRealityCheck()
      window.Bot.stop()
    }

    const logout = () => {
      logoutAllTokens(() => {
        this.updateTokenList()
        observer.emit('ui.log.info', translate('Logged you out!'))
        clearRealityCheck()
      })
    }

    $('.panelExitButton')
      .click(function onClick() {
        $(this)
          .parent()
          .hide()
      })

    $('.panel')
      .hide()
      .drags()

    $('.panel .content')
      .mousedown(e => e.stopPropagation()) // prevent content to trigger draggable

    $('#openMenu')
      .click(() => {
        if (editMode) {
          toggleToolbox(true)
        }
      })

    $('#mobileMenu')
      .click(() => {
        if (mobileMenuVisible) {
          $('.collapse-menu').addClass('hiddenMenu')
          mobileMenuVisible = false
        } else {
          $('.collapse-menu').removeClass('hiddenMenu')
          mobileMenuVisible = true
        }
      })

    const hideCollapseMenu = () => {
      $('.collapse-menu').addClass('hiddenMenu')
      mobileMenuVisible = false
    }

    $('#toolbox,.blocklyWorkspace,.blocklyToolboxDiv')
      .on('click touchstart', hideCollapseMenu)

    $('.blocklyWorkspace')
      .on('click touchstart', () => {
        $('.view-menu-select')
          .hide()
        if (editMode) {
          toggleToolbox(false)
        }
      })

    $('#showEdit')
      .change(() => {
        if ($('#showEdit').is(':checked')) {
          enterEditMode()
        } else if (mode === 'execute') {
          exitEditMode()
          showExecute()
        } else if (mode === 'report') {
          exitEditMode()
          showSummary()
        }
      })

    $('#showExecute')
      .click(() => {
        hideCollapseMenu()
        showExecute()
      })

    $('.edit-mode-toggle')
      .click(() => {
        $('#showEdit').prop('checked', !$('#showEdit').is(':checked'))
        $('#showEdit').change()
      })

    $('.tours')
      .click(e => {
        e.stopPropagation()
        if ($('#select-tour').css('display') === 'none') {
          $('#select-tour')
            .fadeIn(100)
        } else {
          $('#select-tour')
            .fadeOut(100)
        }
      })

    $('body')
      .click(() => {
        if ($('#select-tour').css('display') === 'block') {
          $('#select-tour')
            .fadeOut(100)
        }
      })

    ReactDOM.render(
      <SaveXml
        onClick={hideCollapseMenu}
        onSave={(filename, collection) => this.blockly.save(filename, collection)}
      />
      , $('#saveXml')[0])

    $('#undo')
      .click(() => {
        this.blockly.undo()
      })

    $('#redo')
      .click(() => {
        this.blockly.redo()
      })

    $('#zoomIn')
      .click(() => {
        this.blockly.zoomOnPlusMinus(true)
      })

    $('#zoomOut')
      .click(() => {
        this.blockly.zoomOnPlusMinus(false)
      })

    $('#rearrange')
      .click(() => {
        this.blockly.cleanUp()
      })

    $('#showSummary')
      .click(() => {
        hideCollapseMenu()
        showSummary()
      })

    $('#loadXml')
      .click(() => {
        hideCollapseMenu()
        $('#files')
          .click()
      })

    $('#logout, #logout-reality-check')
      .click(() => {
        logout()
        hideRealityCheck()
        $('.logout').hide()
      })

    $('#continue-trading')
      .click(() => {
        const time = parseInt($('#realityDuration').val(), 10)
        if (time >= 10 && time <= 120) {
          hideRealityCheck()
          startRealityCheck(time)
        } else {
          $('#rc-err').show()
        }
      })

    const startBot = (limitations) => {
      hideCollapseMenu()
      $('#stopButton').show()
      $('#runButton').hide()
      this.blockly.run(limitations)
      showSummary()
    }

    $('#runButton')
      .click(() => {
        const token = $('.account-id').first().attr('value')
        const tokenObj = getToken(token)
        if (tokenObj && tokenObj.hasTradeLimitation) {
          ReactDOM.render(
            <LimitsPanel
            onSave={startBot}
            />
            , document.getElementById('limits-panel'))
        } else {
          startBot()
        }
      })

    $('#stopButton')
      .click(e => {
        hideCollapseMenu()
        stop(e)
      })
      .hide()

    $('#resetButton')
      .click(() => {
        this.blockly.resetWorkspace()
      })

    $('#changeView')
      .click(() => $('.view-menu-select').toggle())

    $('.login-id-list')
      .on('click', 'a', (e) => {
        resetRealityCheck($(e.currentTarget).attr('value'))
        e.preventDefault()
        const $el = $(e.currentTarget)
        const $oldType = $el.find('li span')
        const $oldTypeText = $oldType.text()
        const $oldID = $el.find('li div')
        const $oldIDText = $oldID.text()
        const $oldValue = $el.attr('value')
        const $newType = $('.account-type')
        const $newTypeText = $newType.first().text()
        const $newID = $('.account-id')
        const $newIDText = $newID.first().text()
        const $newValue = $newID.attr('value')
        $oldType.html($newTypeText)
        $oldID.html($newIDText)
        $el.attr('value', $newValue)
        $newType.html($oldTypeText)
        $newID.html($oldIDText)
        $newID.attr('value', $oldValue)
      })

    $('#login')
      .bind('click.login', () => {
        document.location = 'https://oauth.binary.com/oauth2/authorize?app_id=' +
          `${getStorage('appId')}&l=${getLanguage().toUpperCase()}`
      })
      .text('Log in')

    $('#statement-reality-check').click(() => {
      document.location =
        `https://www.binary.com/${getLanguage()}/user/statementws.html`
    })
    $(document).keydown((e) => {
      if (e.which === 189) { // -
        if (e.ctrlKey) {
          this.blockly.zoomOnPlusMinus(false)
          e.preventDefault()
        }
      } else if (e.which === 187) { // +
        if (e.ctrlKey) {
          this.blockly.zoomOnPlusMinus(true)
          e.preventDefault()
        }
      } else if (e.which === 27) { // Esc
        const exitButton = $('.panel:hover .panelExitButton')
        if (exitButton.length === 1) {
          exitButton.click()
          e.preventDefault()
        }
      }
    })
    addResizeListener($('.blocklyToolboxDiv')[0],
      () => {
        if (editMode) {
          $('.blocklySvg').css('left', `${$('.blocklyToolboxDiv').width()}px`, 'important')
        }
      })
  }
  updateChart(info) {
    const isLine = () => ['area', 'line'].indexOf(this.chartType) >= 0

    const zoomInMax = (ev, chart) => {
      const {
        dataMax,
      } = chart.xAxis[0].getExtremes()
      const {
        minRange,
      } = chart.xAxis[0].options
      chart.xAxis[0].setExtremes(dataMax - minRange, dataMax)
    }

    const events = [
      {
        type: 'zoom-in-max',
        handler: zoomInMax,
      },
    ]

    if (isLine() && this.contractForChart) {
      const chartDiv = document.getElementById('trade-chart0')
      if (chartDiv) {
        chartDiv.dispatchEvent(new Event('zoom-in-max'))
      }
    }
    const isMinHeight = $(window).height() <= 360

    const getData = (start, end, style, granularity) => {
      currentStyle = style
      currentGranularity = granularity
      return new Promise((r, e) => {
        api.unsubscribeFromAllTicks().then(() => 0, () => 0)
        api.unsubscribeFromAllCandles().then(() => 0, () => 0)
        api.getTickHistory(currentSymbol, { subscribe: 1, end: 'latest', count: 100, granularity, style })
          .then(resp => {
            let data
            if (style === 'ticks') {
              data = mapHistoryTicks(resp.history)
            } else {
              data = resp.candles
            }

            ticks = data
            r(data)
          }, e)
      })
    }

    if (currentSymbol !== info.symbol) {
      currentSymbol = info.symbol
      getData(undefined, undefined, currentStyle, currentGranularity)
    }

    ReactDOM.render(
      <BinaryChart
      className="trade-chart"
      id="trade-chart0"
      contract={isLine() ? this.contractForChart : false}
      pipSize={info.pipSize}
      shiftMode="static"
      ticks={ticks}
      getData={getData}
      type={this.chartType}
      events={events}
      hideToolbar={isMinHeight}
      hideTimeFrame={isMinHeight}
      onTypeChange={(type) => (this.chartType = type)}
      />, $('#chart')[0])
  }
  addEventHandlers() {
    for (const errorType of ['api.error', 'BlocklyError', 'RuntimeError']) {
      observer.register(errorType, (error) => { // eslint-disable-line no-loop-func
        if (error.error && error.error.code === 'InvalidToken') {
          removeAllTokens()
          this.updateTokenList()
        }
        window.Bot.stop()
        if (window.Bot.shouldRestartOnError()) {
          ReactDOM.render(
            <RestartTimeout
            timeout="3"
            />
            , document.getElementById('restartTimeout'))
        }
      })
    }

    observer.register('bot.stop', () => {
      $('#runButton').show()
      $('#stopButton').hide()
    })

    observer.register('bot.tradeInfo', (tradeInfo) => {
      for (const key of Object.keys(tradeInfo)) {
        this.tradeInfo.tradeInfo[key] = tradeInfo[key]
      }
      this.tradeInfo.update()
    })

    observer.register('bot.tradeUpdate', (contract) => {
      this.tradeInfo.add(contract)
      this.contractForChart = {
        ...contract,
      }
      this.contractForChart.date_expiry = Number(this.contractForChart.date_expiry)
      this.contractForChart.date_settlement = Number(this.contractForChart.date_settlement)
      this.contractForChart.date_start = Number(this.contractForChart.date_start)
    })

    observer.register('bot.finish', (contract) => {
      this.tradeInfo.add(contract)
      this.contractForChart = false
    })

    observer.register('bot.tickUpdate', (info) => {
      this.updateChart(info)
    })
  }
}
