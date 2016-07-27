var LiveApi = require('binary-live-api')
	.LiveApi;
	
var statement = function statement(_token){
	var api = new LiveApi();
	api.authorize(_token);
	api.events.on('authorize', function(response){
		console.log(response);
	});
};

module.exports = statement;