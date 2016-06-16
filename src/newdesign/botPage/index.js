var common = require('common');
var $ = require('jquery');
module.exports = {
	init: function init(){
		var translator = common.translator;
		var i18n = require('i18n');
		var appId = require('appId');
		var commonUtils = require('utils');
		window.$ = require('jquery');
		$.ajaxSetup({
			cache: false
		});
		window.jQuery = window.$;
		window.Backbone = require('backbone');
		window._ = require('underscore');
		require('notifyjs-browser');
		require('tourist');
	},
};