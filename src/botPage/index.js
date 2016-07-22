'use strict';
import 'babel-polyfill';
import 'blockly';
import './utils/draggable';
$.ajaxSetup({
	cache: false
});

import Bot from './bot';
import View from './view';

window.Bot = new Bot();
window.Bot.initPromise.then(function(){
	var view = new View();
	view.initPromise.then(function(){
		$('.spinning').hide();
		view.tours.welcome.welcome();
	});
});
