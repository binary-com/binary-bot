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
let ticks = []
let currentSymbol = 'R_100'
let currentStyle = 'ticks'
let currentGranularity
let api
let chartComp

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

    ReactDOM.render(
      <SaveXml
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
      .click(() => $('#summaryPanel').show())

    $('#loadXml')
      .click(() => {
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
      $('#stopButton').show()
      $('#runButton').hide()
      this.blockly.run(limitations)
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
      .click(e => stop(e))
      .hide()

    $('#resetButton')
      .click(() => {
        this.blockly.resetWorkspace()
      })

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
  }
  updateChart(info) {
    const isLine = () => ['area', 'line'].indexOf(this.chartType) >= 0

    if (chartComp && isLine() && this.contractForChart) {
      const { chart } = chartComp
      const { dataMax } = chart.xAxis[0].getExtremes()
      const { minRange } = chart.xAxis[0].options

      chart.xAxis[0].setExtremes(dataMax - minRange, dataMax)
    }
    const isMinHeight = $(window).height() <= 360

    const getData = (start, end, style, granularity) => {
      currentStyle = style
      currentGranularity = granularity
      return new Promise((r, e) => {
        api.unsubscribeFromAllTicks().then(() => 0, () => 0)
        api.unsubscribeFromAllCandles().then(() => 0, () => 0)
        api.getTickHistory(currentSymbol, { subscribe: 1, end: 'latest', count: 1000, granularity, style })
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

    if (info.symbol && currentSymbol !== info.symbol) {
      currentSymbol = info.symbol
      getData(undefined, undefined, currentStyle, currentGranularity)
    }

    chartComp = ReactDOM.render(
      <BinaryChart
      className="trade-chart"
      id="trade-chart0"
      contract={isLine() ? this.contractForChart : false}
      pipSize={info.pipSize}
      shiftMode="dynamic"
      ticks={ticks}
      getData={getData}
      type={this.chartType}
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
