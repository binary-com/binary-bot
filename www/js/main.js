(function() {
	var LiveApi = window['binary-live-api'].LiveApi;
	var api = new LiveApi();
	binary_visual.login = function login(token, callback){
		api.authorize(token).then(function(value){;
			callback(value);
		}, function (reason){
			alert('Error: ' + reason.message);
		});
	};
})();
