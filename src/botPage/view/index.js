import { logoutAllTokens } from 'binary-common-utils/lib/account';
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
    const tokenList = getTokenList();
    if (tokenList.length === 0) {
      $('#login').css('display', 'inline-block');
      $('#accountSelect').css('display', 'none');
      $('#accountSelect').children().remove();
      $('#logout').css('display', 'none');
    } else {
      $('#login').css('display', 'none');
      $('#accountSelect').css('display', 'inline-block');
      $('#logout').css('display', 'inline-block');
      for (const tokenInfo of tokenList) {
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
      .each(function each() {
        const contents = $(this).contents();
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
    const viewScope = this;
    $('#tours').on('change', function onChange() {
      const value = $(this).val();
      if (value === '') return;
      if (viewScope.activeTour) {
        viewScope.activeTour.stop();
      }
      viewScope.activeTour = viewScope.tours[value];
      viewScope.activeTour.start(() => {
        viewScope.activeTour = null;
      });
    });
  }
  errorAndLogHandling() {
    const notifyError = (error) => {
      const message = (error.error)
        ? error.error.message
        : error.message || error;
      logger.notify(message, {
        position: 'bottom right',
        className: 'error',
      });
      if (logger.isDebug()) {
        console.log('%cError: ' + message, 'color: red'); // eslint-disable-line no-console
      } else {
        logger.addLogToQueue('%cError: ' + message, 'color: red');
      }
      return message;
    };

    for (const errorType of ['api.error', 'blockly.error', 'runtime.error']) {
      observer.register(errorType, (error) => {
        if (error.code === 'InvalidToken') {
          removeAllTokens();
          this.updateTokenList();
        }
        const message = notifyError(error);
        amplitude.getInstance().logEvent(errorType, {
          message,
          1: lzString.compressToBase64(this.blockly.generatedJs),
          2: lzString.compressToBase64(this.blockly.blocksXmlStr),
        });
        bot.stop();
      });
    }

    const observeForLog = (type, position) => {
      const subtype = (position === 'left') ? '.left' : '';
      observer.register('ui.log.' + type + subtype, (message) => {
        if (type === 'warn') {
          console.warn(message); // eslint-disable-line no-console
        }
        if (position === 'left') {
          $.notify(message, {
            position: 'bottom ' + position,
            className: type,
          });
        } else {
          logger.notify(message, {
            position: 'bottom ' + position,
            className: type,
          });
        }
        if (logger.isDebug()) {
          console.log(message); // eslint-disable-line no-console
        } else {
          logger.addLogToQueue(message);
        }
      });
    };

    for (const type of ['success', 'info', 'warn', 'error']) {
      observeForLog(type, 'right');
      observeForLog(type, 'left');
    }

    for (const event of ['log.bot.login', 'log.trade.finish']) {
      observer.register(event, (d) => amplitude.getInstance().logEvent(event, d));
    }
  }

  setFileBrowser() {
    const readFile = (f) => {
      const reader = new FileReader();
      reader.onload = (() => {
        $('#fileBrowser').hide();
        return (e) => {
          try {
            this.blockly.loadBlocks(e.target.result);
            observer.emit('ui.log.success', translator.translateText('Blocks are loaded successfully'));
          } catch (err) {
            observer.emit('blockly.error', err);
          }
        };
      })(f);
      reader.readAsText(f);
    };

    const handleFileSelect = (e) => {
      let files;
      if (e.type === 'drop') {
        e.stopPropagation();
        e.preventDefault();
        files = e.dataTransfer.files;
      } else {
        files = e.target.files;
      }
      files = Array.prototype.slice.apply(files);
      const file = files[0];
      if (file) {
        if (file.type.match('text/xml')) {
          readFile(file);
        } else {
          observer.emit('ui.log.info', translator.translateText('File is not supported:') + ' ' + file.name);
        }
      }
    };

    const handleDragOver = (e) => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    };

    const dropZone = document.getElementById('dropZone');

    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
    if (document.getElementById('files')) {
      document.getElementById('files')
        .addEventListener('change', handleFileSelect, false);
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
    const stop = (e) => {
      if (e) {
        e.preventDefault();
      }
      bot.stop();
    };

    const logout = () => {
      logoutAllTokens(() => {
        this.updateTokenList();
        observer.emit('ui.log.info', translator.translateText('Logged you out!'));
      });
    };

    $('#stopButton')
      .click(stop)
      .hide();

    $('.panelExitButton')
      .click(function onClick() {
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
    const chartOptions = {
      type: this.chartType,
      theme: 'light',
      defaultRange: 0,
      onTypeChange: (type) => {
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
      this.chart = Chart('chart', chartOptions); // eslint-disable-line new-cap
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
    observer.register('bot.stop', () => {
      $('#runButton').show();
      $('#stopButton').hide();
      this.destroyChart();
    });

    observer.register('bot.tradeInfo', (tradeInfo) => {
      for (const key of Object.keys(tradeInfo)) {
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
