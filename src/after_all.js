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
		Bot.config = Bot.Config();
		Bot.utils = Bot.Utils();
		Bot.globals = Bot.Globals();

		Bot.conditions = Bot.Conditions();
		Bot.Markets();
		Bot.Trade();

		Bot.Definitions();
		Bot.CodeGenerators();

		Bot.View();
		Bot.tours.introduction = Bot.Introduction();
		Bot.tours.welcome = Bot.Welcome();
		Bot.tours.welcome.welcome();
	});
