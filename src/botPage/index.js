var Bot = require('./bot');
var View = require('./view'); 

window.Bot = new Bot();
window.Bot.initPromise.then(function(){
	var view = new View();
	view.initPromise.then(function(){
		$('.spinning').hide();
		view.tours.welcome.welcome();
	});
});
