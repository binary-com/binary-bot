var View = require('./view'); 
var $ = require('jquery');
window.$ = window.jQuery = $;
window.Backbone = require('backbone');
window._ = require('underscore');
require('notifyjs-browser');
require('tourist');

var view = new View();
view.initPromise.then(function(response){
	$('.spinning').hide();
});
