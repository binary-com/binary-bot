/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { observer } from 'binary-common-utils/lib/observer';
import { getToken } from 'binary-common-utils/lib/storageManager';
import './view/draggable';
import { bot } from './bot';
import View from './view';
import { logger } from './view/logger';
import { setAppId } from '../common/appId';

setAppId();
$.ajaxSetup({
  cache: false,
});

window._trackJs = { // eslint-disable-line no-underscore-dangle
  token: '346262e7ffef497d85874322fff3bbf8',
  application: 'binary-bot',
  enabled: window.location.hostname !== 'localhost',
  console: {
    display: false,
  },
};
require('trackjs');

class BotPage {
	constructor() {
		window.Bot = {
      showDuringPurchase: () => {
        const dp = Blockly.mainWorkspace.newBlock('during_purchase');
        dp.initSvg();
        dp.render();
        this.view.blockly.setBlockColors();
      },
      bot,
			start: bot.start.bind(bot),
			stop: bot.stop.bind(bot),
			showCode: () => {
				console.log(this.view.blockly.generatedJs); // eslint-disable-line no-console
				console.log(this.view.blockly.blocksXmlStr); // eslint-disable-line no-console
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
			this.view = new View();
			this.view.initPromise.then(() => {
				trackJs.configure({
					userId: getToken($('#accountSelect').val()).account_name,
				});
				$('.spinning').hide();
				this.view.activeTour = this.view.tours.welcome;
				this.view.activeTour.welcome(() => {
					this.view.activeTour = null;
				});
			});
		});
	}
}

export default new BotPage();
