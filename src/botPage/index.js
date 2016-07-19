var View = require('./view'); 

var view = new View();
view.initPromise.then(function(response){
	$('.spinning').hide();
});
