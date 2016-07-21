'use strict';
import 'babel-polyfill';
import Bot from './bot';
import View from './view';
import Blockly from 'blockly';
import jQuery from 'jquery';
import Backbone from 'backbone';
window.Blockly = Blockly;
window.jQuery = window.$ = jQuery;
window.Backbone = Backbone;

window.Bot = new Bot();
window.Bot.initPromise.then(function(){
	var view = new View();
	view.initPromise.then(function(){
		$('.spinning').hide();
		view.tours.welcome.welcome();
	});
});
