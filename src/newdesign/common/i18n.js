var sha1 = require('sha1');

module.exports = {
	translation: null,
	init: function init(options, callback) {
		this.translation = options.resources[options.lng][options.defaultNS];
	},
	t: function t(key) {
		return this.translation[key];
	},
	_: function _(str, opt) {
		var key = sha1(str);
		var result = this.t(key);
		return (result === '') ? str : result;
	},
	xml: function xml(dom) {
		var categories = dom.getElementsByTagName('category');
		for ( var i = 0 ; i < categories.length ; i++ ) {
			var child = categories[i];
			var str = child.getAttribute('i18n-text');
			var key;
			var hasTranslation = false;
			if (str === null) {
				key = child.getAttribute('i18n');
				if (key !== null) {
					hasTranslation = true;
				}
			} else {
				key = sha1(str);
				hasTranslation = true;
			}
			var result = this.t(key);
			if (hasTranslation) {
				child.setAttribute('name', (result === '') ? str : result);
			}
			if (child.childNodes.length > 0) {
				this.xml(child);
			}
		}
		return dom;
	}
};