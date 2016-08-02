'use strict';
import 'babel-polyfill';
import 'blockly';
import './utils/draggable';
import Observer from 'binary-common-utils/observer';
import storageManager from 'binary-common-utils/storageManager';
import Bot from './bot';
import View from './view';
import logger from './view/logger';
import appId from 'appId';

appId.setAppId();
$.ajaxSetup({
	cache: false
});

window._trackJs = { 
	token: '346262e7ffef497d85874322fff3bbf8',
	application: 'binary-bot',
	enabled: window.location.hostname !== 'localhost',
};
require('trackjs');

var bot = new Bot();
var observer = new Observer();
window.Bot = {
	start: bot.start.bind(bot),
	stop: bot.stop.bind(bot),
	toggleDebug: logger.toggleDebug.bind(logger),
	log: function (message, type) {
		observer.emit('ui.log.'+ type, message );
	},
	getTotalProfit: function getTotalProfit(){
		return bot.totalProfit;
	},
	getBalance: function getBalance(balanceType){
		return (balanceType === 'STR') ? bot.balanceStr : bot.balance ;
	}
};

bot.initPromise.then(function(){
	var view = new View();
	view.initPromise.then(function(){
		trackJs.configure({
			userId: storageManager.getToken($('#accountSelect').val()).account_name,
		});
		$('.spinning').hide();
		view.activeTour = view.tours.welcome;
		view.activeTour.welcome(function(){
			view.activeTour = null;
		});
	});
});
