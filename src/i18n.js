var sha1 = require('sha1');
var translation;

var init = function init(options, callback) {
	translation = options.resources[options.lng][options.defaultNS];
	if (callback) {
		callback();
	}
};

var t = function t(key) {
	return translation[key];
};

var _ = function _(str, opt) {
	var key = sha1(str);
	var result = t(key);
	return (result === '') ? str : result;
};

var xml = function xml(dom) {
	for (var i in dom.children) {
		if (dom.children.hasOwnProperty(i) && !isNaN(+i)) {
			var child = dom.children[i];
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
			var result = t(key);
			if (hasTranslation) {
				child.setAttribute('name', (result === '') ? str : result);
			}
			if (child.children.length > 0) {
				xml(child);
			}
		}
	}
	return dom;
};

module.exports = {
	init: init,
	_: _,
	xml: xml,
};
