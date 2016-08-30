/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import Observer from 'binary-common-utils/observer';
import storageManager from 'binary-common-utils/storageManager';
import './utils/draggable';
import { bot } from './bot';
import View from './view';
import logger from './view/logger';
import { setAppId } from '../common/appId';

setAppId();
$.ajaxSetup({
  cache: false,
});

window._trackJs = {
  token: '346262e7ffef497d85874322fff3bbf8',
  application: 'binary-bot',
  enabled: window.location.hostname !== 'localhost',
  console: {
    display: false,
  },
};
require('trackjs');

let observer = new Observer();
let view = new View();
window.Bot = {
  start: bot.start.bind(bot),
  stop: bot.stop.bind(bot),
  showCode: () => {
    console.log(view.blockly.generatedJs);
    console.log(view.blockly.blocksXmlStr);
  },
  toggleDebug: logger.toggleDebug.bind(logger),
  log: (message, type) => {
    observer.emit('ui.log.' + type + '.left', message);
  },
  getTotalRuns: () => bot.totalRuns,
  getTotalProfit: () => bot.totalProfit,
  getBalance: (balanceType) => (balanceType === 'STR') ? bot.balanceStr : bot.balance,
};

bot.initPromise.then(() => {
  view.initPromise.then(() => {
    trackJs.configure({
      userId: storageManager.getToken($('#accountSelect').val()).account_name,
    });
    $('.spinning').hide();
    view.activeTour = view.tours.welcome;
    view.activeTour.welcome(() => {
      view.activeTour = null;
    });
  });
});
