var database = require('./database');

var WebSocket = function WebSocket(url) {
	this.url = url;
	var that = this;
	setTimeout(function(){
		that.onopen();
	},200);
};

WebSocket.prototype = Object.create(null, {
	send: {
		value: function send(data) {
			console.log(Object.keys(database), data);
			//this.onmessage(database[data]);
		},
	},
});

module.exports = WebSocket;
