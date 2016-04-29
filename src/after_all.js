window.i18n = i18next;
i18n._ = function _(str, opt){
	var hash = sha1(str);
	return i18n.t(hash);
};
i18n
	.use(i18nextXHRBackend)
	.init({
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
	}, function() {
		// be careful with assignments
		if ( typeof Bot !== 'undefined' ) {
			Bot.config = Bot.Config();
			Bot.utils = Bot.Utils();
			Bot.globals = Bot.Globals();

			Bot.Version();
			Bot.conditions = Bot.Conditions();
			Bot.Markets();
			Bot.Trade(); 

			Bot.Definitions();
			Bot.CodeGenerators();

			Bot.View();
			Bot.tours.introduction = Bot.Introduction();
			Bot.tours.welcome = Bot.Welcome();
			Bot.tours.welcome.welcome();
		}
		$('[data-i18n-text]').each(function(){
			$(this).text(i18n._($(this).attr('data-i18n-text')));
		});
	});
