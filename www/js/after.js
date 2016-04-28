Blockly.mainWorkspace.getBlockById('trade').setDeletable(false);
Blockly.mainWorkspace.getBlockById('strategy').setDeletable(false);
Blockly.mainWorkspace.getBlockById('finish').setDeletable(false);
Bot.utils.updateTokenList();
Bot.utils.addPurchaseOptions();
Blockly.mainWorkspace.clearUndo();
window.i18n = i18next;
var options = {
	lng: 'id',
	fallbackLng: 'en',
	ns: [
		'translation'
	],
	defaultNS: [
		'translation'
	],
	backend: {
		loadPath: '/www/i18n/{{lng}}.json',
		savePath: '/www/i18n/{{lng}}.json',
		allowMultiLoading: false
	},
};
i18n._ = function _(str, opt){
	var hash = sha1(str);
	return i18n.t(hash);
};
i18n
	.use(i18nextXHRBackend)
	.init(options, function() {
		Bot.welcome = Bot.Welcome();
		Bot.introduction = Bot.Introduction();
		Bot.welcome.welcome();
	});
