window.Blockly = {};
if ( top !== self ) {
	top.location = self.location;
}
var translator = require('translator'); // must be on top
var i18n = require('i18n');
var appId = require('./appId');
var asyncChain= require('binary-common-utils/tools').asyncChain;
var $ = require('jquery');

asyncChain()
.pipe(function checkOauthLogin(done){
	appId.oauthLogin(done);
})
.pipe(function translate(done){
	translator.Translator(function () {
		$('[data-i18n-text]')
			.each(function () {
				$(this)
					.text(i18n._($(this)
						.attr('data-i18n-text')));
			});
			done();
	});
})
.pipe(function hideSpinner(done){
	$('.spinning').hide();
}).exec();

