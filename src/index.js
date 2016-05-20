var translator = require('./translator'); // must be on top
var i18n = require('i18n');
var $ = require('jquery');
translator.Translator(function () {
	$('[data-i18n-text]')
		.each(function () {
			$(this)
				.text(i18n._($(this)
					.attr('data-i18n-text')));
		});
});
