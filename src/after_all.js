var lang = 'id';
window.i18n = i18next;
i18n._ = function _(str, opt){
	var key = sha1(str);
	var result = i18n.t(key);
	return (result === '') ? str : result;
};
$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
	options.async = true;
});
i18n.xml = function xml(dom){
	for ( var i in dom.children ) {
		if ( dom.children.hasOwnProperty(i) && !isNaN(+i) ) {
			var child = dom.children[i];
			var str = child.getAttribute('i18n-text');
			var key;
			var hasTranslation = false;
			if ( str === null ) {
				key = child.getAttribute('i18n');
				if ( key !== null ) {
					hasTranslation = true;
				}
			} else {
				key = sha1(str);
				hasTranslation = true;
			}
			var result = i18n.t(key);
			if ( hasTranslation ) {
				child.setAttribute('name', (result === '') ? str : result);
			}
			if ( child.children.length > 0 ) {
				i18n.xml(child);
			}
		}
	}
	return dom;
};
$.get('www/i18n/' + lang + '.json', function(translation) {
	var resources = {
		en: {
			translation: translation
		},
	};
	i18n.init({
		lng: 'en',
		fallbackLng: 'en',
		ns: [
			'translation'
		],
		defaultNS: [
			'translation'
		],
		resources: resources
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


			var script = document.createElement( 'script' );
			script.type = 'text/javascript';
			script.src = 'node_modules/blockly/msg/js/' + lang + '.js';
			$('body').append(script);

			Bot.View();
			Bot.tours.introduction = Bot.Introduction();
			Bot.tours.welcome = Bot.Welcome();
			Bot.tours.welcome.welcome();

		}
		$('[data-i18n-text]').each(function(){
			$(this).text(i18n._($(this).attr('data-i18n-text')));
		});
	});
});
