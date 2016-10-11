import React from 'react';
import ReactDOM from 'react-dom';
import { BinaryChart } from 'binary-charts';
import { logoutAllTokens } from 'binary-common-utils/lib/account';
import { observer } from 'binary-common-utils/lib/observer';
import { getTokenList, removeAllTokens,
  get as getStorage } from 'binary-common-utils/lib/storageManager';
import TradeInfo from './tradeInfo';
import _Blockly from './blockly';
import { translator } from '../../common/translator';
import { bot } from '../bot';
import Introduction from './tours/introduction';
import Welcome from './tours/welcome';
import { logHandler } from './logger';

export default class View {
  constructor() {
    this.chartType = 'area';
    this.tours = {};
    logHandler();
    this.tradeInfo = new TradeInfo();
    this.addTranslationToUi();
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
  setFileBrowser() {
    const readFile = (f) => {
      const reader = new FileReader();
      reader.onload = (() => {
        $('#fileBrowser').hide();
        return (e) => this.blockly.load(e.target.result);
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
          observer.emit('ui.log.info', `${
          translator.translateText('File is not supported:')} ${file.name}`);
        }
      }
    };

    const handleDragOver = (e) => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy'; // eslint-disable-line no-param-reassign
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

    $('.panel .content')
      .mousedown((e) => { // prevent content to trigger draggable
        e.stopPropagation();
      });

    $('#saveXml')
      .click(() => {
        $('#saveAs')
          .show();
      });

    $('#saveAsForm')
      .submit((e) => {
        e.preventDefault();
        this.blockly.save($('#saveAsFilename').val(), $('#saveAsCollection').prop('checked'));
        $('#saveAs')
          .hide();
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
        this.blockly.resetWorkspace();
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
    const chartToDataType = {
      area: 'ticks',
      line: 'ticks',
      candlestick: 'candles',
      ohlc: 'candles',
    };

    const isLine = () => ['area', 'line'].indexOf(this.chartType) >= 0;

    const zoomInMax = (ev, chart) => {
      const { dataMax } = chart.xAxis[0].getExtremes();
      const { minRange } = chart.xAxis[0].options;
      chart.xAxis[0].setExtremes(dataMax - minRange, dataMax);
    };

    const events = [
      {
        type: 'zoom-in-max',
        handler: zoomInMax,
      },
    ];

    if (isLine() && this.contractForChart) {
      const chartDiv = document.getElementById('trade-chart0');
      if (chartDiv) {
        chartDiv.dispatchEvent(new Event('zoom-in-max'));
      }
    }
    ReactDOM.render(
            <BinaryChart
                className="trade-chart"
                id="trade-chart0"
                contract={isLine() ? this.contractForChart : false}
                hideZoomControls={isLine() && this.contractForChart}
                pipSize={Number(Number(info.pip).toExponential().substring(3))}
                shiftMode={this.contractForChart ? 'dynamic' : 'fixed'}
                ticks={info[chartToDataType[this.chartType]]}
                type={this.chartType}
                events={events}
                compactToolbar
                onTypeChange={(type) => (this.chartType = type)}
            />, $('#chart')[0]);
  }
  addEventHandlers() {
    for (const errorType of ['api.error', 'BlocklyError', 'RuntimeError']) {
      observer.register(errorType, (error) => { // eslint-disable-line no-loop-func
        if (error.code === 'InvalidToken') {
          removeAllTokens();
          this.updateTokenList();
        }
        bot.stop();
      });
    }

    observer.register('bot.stop', () => {
      $('#runButton').show();
      $('#stopButton').hide();
    });

    observer.register('bot.tradeInfo', (tradeInfo) => {
      for (const key of Object.keys(tradeInfo)) {
        this.tradeInfo.tradeInfo[key] = tradeInfo[key];
      }
      this.tradeInfo.update();
    });

    observer.register('bot.tradeUpdate', (contract) => {
      this.contractForChart = {
        ...contract,
      };
      this.contractForChart.date_expiry = Number(this.contractForChart.date_expiry);
      this.contractForChart.date_settlement = Number(this.contractForChart.date_settlement);
      this.contractForChart.date_start = Number(this.contractForChart.date_start);
    });

    observer.register('bot.finish', (contract) => {
      this.tradeInfo.add(contract);
      this.contractForChart = false;
    });

    observer.register('bot.tickUpdate', (info) => {
      this.updateChart(info);
    });
  }
}
