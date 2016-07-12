var Mock = require('./mock');
var WS = require('ws');
var tools = require('../tools');

var WebSocket = function WebSocket(url) {
	WS.prototype.constructor.call(this, url);
	this.mock = new Mock();
};

WebSocket.prototype = Object.create(WS.prototype, {
	send: {
		value: function send(rawData) {
			var data = JSON.parse(rawData);
			var that = this;
			that.mock.findData(data, function(receivedData){
				that.onmessage({
					data: receivedData
				})
			});
		},
	},
	close: {
		value: function close() {}
	}
});

module.exports = WebSocket;
