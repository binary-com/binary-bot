import account from 'binary-common-utils/lib/account';
import { observer } from 'binary-common-utils/lib/observer';
import { getTokenList, removeAllTokens, get as getStorage } from 'binary-common-utils/lib/storageManager';
import lzString from 'lz-string';
import { PlainChart as Chart } from 'binary-charts';
import { logger } from './logger';
import TradeInfo from './tradeInfo';
import _Blockly from './blockly';
import { translator } from '../../common/translator';
import { bot } from '../bot';
import Introduction from './tours/introduction';
import Welcome from './tours/welcome';

export default class View {
  constructor() {
    this.chartType = 'area';
    this.tours = {};
    this.tradeInfo = new TradeInfo();
    this.addTranslationToUi();
    this.errorAndLogHandling();
    this.initPromise = new Promise((resolve) => {
      this.updateTokenList();
      this.blockly = new _Blockly();
      this.blockly.initPromise.then(() => {
        this.setElementActions();
        this.initTours();
        resolve();
      });
    });
  }
  updateTokenList() {
    let tokenList = getTokenList();
    if (tokenList.length === 0) {
      $('#login').css('display', 'inline-block');
      $('#accountSelect').css('display', 'none');
      $('#logout').css('display', 'none');
    } else {
      $('#login').css('display', 'none');
      $('#accountSelect').css('display', 'inline-block');
      $('#logout').css('display', 'inline-block');
      for (let tokenInfo of tokenList) {
        let prefix;
        if ('isVirtual' in tokenInfo) {
          prefix = (tokenInfo.isVirtual) ? 'Virtual Account' : 'Real Account';
        } else {
          prefix = '';
        }
        $('#accountSelect').append(`<option value='${tokenInfo.token}'>`
          + ` ${prefix} ${tokenInfo.account_name} </option>`);
      }
    }
  }
  addTranslationToUi() {
    $('[data-i18n-text]')
      .each(function() {
        let contents = $(this).contents();
        if (contents.length > 0) {
          if (contents.get(0).nodeType === Node.TEXT_NODE) {
            $(this).text(translator.translateText($(this)
              .attr('data-i18n-text')))
              .append(contents.slice(1));
          }
        } else {
          $(this)
            .text(translator.translateText($(this)
              .attr('data-i18n-text')));
        }
      });
  }
  initTours() {
    this.tours.introduction = new Introduction();
    this.tours.welcome = new Welcome();
  }
  startTour() {
    let that = this;
    $('#tours').on('change', function() {
      let value = $(this).val();
      if (value === '') return;
      if (that.activeTour) {
        that.activeTour.stop();
      }
      that.activeTour = that.tours[value];
      that.activeTour.start(() => {
        that.activeTour = null;
      });
    });
  }
  errorAndLogHandling() {
    observer.register('ui.error', (error) => {
      let api = true;
      if (error.stack) {
        api = false;
        if (logger.isDebug()) {
          console.log('%c' + error.stack, 'color: red');
        } else {
          logger.addLogToQueue('%c' + error.stack, 'color: red');
        }
      }
      let message = error.message;
      $.notify(message, {
        position: 'bottom right',
        className: 'error',
      });
      if (logger.isDebug()) {
        console.log('%cError: ' + message, 'color: red');
      } else {
        logger.addLogToQueue('%cError: ' + message, 'color: red');
      }
      let customError = new Error(JSON.stringify({
        api,
        0: error.message || error,
        1: lzString.compressToBase64(this.blockly.generatedJs),
        2: lzString.compressToBase64(this.blockly.blocksXmlStr),
      }));
      customError.stack = error.stack || 'No stack data';
      trackJs.track(customError);
    });

    let observeForLog = (type, position) => {
      let subtype = (position === 'left') ? '.left' : '';
      observer.register('ui.log.' + type + subtype, (message) => {
        if (type === 'warn') {
          console.warn(message);
        }
        $.notify(message, {
          position: 'bottom ' + position,
          className: type,
        });
        if (logger.isDebug()) {
          console.log(message);
        } else {
          logger.addLogToQueue(message);
        }
      });
    };

    for (let type of ['success', 'info', 'warn', 'error']) {
      observeForLog(type, 'right');
      observeForLog(type, 'left');
    }
  }

  setFileBrowser() {
    let readFile = (f) => {
      let reader = new FileReader();
      reader.onload = (() => {
        $('#fileBrowser').hide();
        return (e) => {
          try {
            this.blockly.loadBlocks(e.target.result);
            observer.emit('ui.log.success', translator.translateText('Blocks are loaded successfully'));
          } catch (err) {
            observer.emit('ui.error', err);
          }
        };
      })(f);
      reader.readAsText(f);
    };

    let handleFileSelect = (e) => {
      let files;
      if (e.type === 'drop') {
        e.stopPropagation();
        e.preventDefault();
        files = e.dataTransfer.files;
      } else {
        files = e.target.files;
      }
      files = Array.prototype.slice.apply(files);
      let file = files[0];
      if (file) {
        if (file.type.match('text/xml')) {
          readFile(file);
        } else {
          observer.emit('ui.log.info', translator.translateText('File is not supported:') + ' ' + file.name);
        }
      }
    };

    let handleDragOver = (e) => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    };

    let dropZone = document.getElementById('dropZone');

    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
    if (document.getElementById('files')) {
      document.getElementById('files')
        .addEventListener('change', handleFileSelect, false);
    }
    $('#open_btn')
      .on('click', () => {
        $.FileDialog({
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
        });
      })
      .on('files.bs.filedialog', (ev) => {
        handleFileSelect(ev.files);
      })
      .on('cancel.bs.filedialog', (ev) => {
        handleFileSelect(ev);
      });
  }
  setElementActions() {
    this.setFileBrowser();
    this.startTour();
    this.addBindings();
    this.addEventHandlers();
  }
  addBindings() {
    let stop = (e) => {
      if (e) {
        e.preventDefault();
      }
      bot.stop();
    };

    let logout = () => {
      account.logoutAllTokens(() => {
        this.updateTokenList();
        observer.emit('ui.log.info', translator.translateText('Logged you out!'));
      });
    };

    $('#stopButton')
      .click(stop)
      .hide();

    $('.panelExitButton')
      .click(function() {
        $(this)
          .parent()
          .hide();
      });

    $('.panel')
      .hide();

    $('.panel')
      .drags();

    $('#chart')
      .mousedown((e) => { // prevent chart to trigger draggable
        e.stopPropagation();
      });

    $('table')
      .mousedown((e) => { // prevent tables to trigger draggable
        e.stopPropagation();
      });

    $('#saveXml')
      .click(() => {
        this.blockly.saveXml();
      });

    $('#undo')
      .click(() => {
        this.blockly.undo();
      });

    $('#redo')
      .click(() => {
        this.blockly.redo();
      });

    $('#showSummary')
      .click(() => {
        $('#summaryPanel')
          .show();
      });

    $('#loadXml')
      .click(() => {
        $('#fileBrowser')
          .show();
      });

    $('#logout')
      .click(() => {
        logout();
        $('.logout').hide();
      });

    $('#runButton')
      .click(() => {
        $('#stopButton').show();
        $('#runButton').hide();
        this.blockly.run();
      });

    $('#resetButton')
      .click(() => {
        this.blockly.loadBlocks();
      });

    $('#login')
      .bind('click.login', () => {
        document.location = 'https://oauth.binary.com/oauth2/authorize?app_id=' +
          `${getStorage('appId')}&l=${translator.getLanguage().toUpperCase()}`;
      })
      .text('Log in');

    $(document).keydown((e) => {
      switch (e.which) {
        case 189: // -
          if (e.ctrlKey) {
            this.blockly.zoomOnPlusMinus(false);
          }
          break;
        case 187: // +
          if (e.ctrlKey) {
            this.blockly.zoomOnPlusMinus(true);
          }
          break;
        case 39: // right
          if (this.activeTour) {
            this.activeTour.next();
          } else {
            return;
          }
          break;
        default:
          return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    });
  }

  updateChart(info) {
    let chartOptions = {
      type: this.chartType,
      theme: 'light',
      defaultRange: 0,
      typeChange: (type) => {
        this.chartType = type;
      },
    };
    if (this.chartType === 'candlestick') {
      chartOptions.ticks = info.candles;
    } else {
      chartOptions.ticks = info.ticks;
      if (this.latestOpenContract) {
        chartOptions.contract = this.latestOpenContract;
        if (this.latestOpenContract.is_sold) {
          delete this.latestOpenContract;
        }
      }
    }
    chartOptions.pipSize = Number(Number(info.pip)
      .toExponential()
      .substring(3));
    if (!this.chart) {
      this.chart = Chart('chart', chartOptions);
    } else {
      this.chart.updateChart(chartOptions);
    }
  }
  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      delete this.latestOpenContract;
      delete this.chart;
    }
  }
  addEventHandlers() {
    observer.register('api.error', (error) => {
      if (error.code === 'InvalidToken') {
        removeAllTokens();
        this.updateTokenList();
      }
      bot.stop();
      observer.emit('ui.error', error);
    });

    observer.register('bot.stop', () => {
      $('#runButton').show();
      $('#stopButton').hide();
      this.destroyChart();
    });

    observer.register('bot.tradeInfo', (tradeInfo) => {
      for (let key of Object.keys(tradeInfo)) {
        this.tradeInfo.tradeInfo[key] = tradeInfo[key];
      }
      this.tradeInfo.update();
    });

    observer.register('bot.tradeUpdate', (contract) => {
      this.latestOpenContract = contract;
    });

    observer.register('bot.finish', (contract) => {
      this.tradeInfo.add(contract);
    });

    observer.register('bot.tickUpdate', (info) => {
      this.updateChart(info);
    });
  }
}
