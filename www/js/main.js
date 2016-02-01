var api = new LiveApi();
var login = function login(token, callback){
	api.authorize(token);
	console.log('hi');
};
