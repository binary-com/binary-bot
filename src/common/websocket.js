var Mock = require('./mock');
var WS = require('ws');

var WebSocket = function WebSocket(url) {
	WS.prototype.constructor.call(this, url);
	this.mock = new Mock();
};

WebSocket.prototype = Object.create(WS.prototype, {
	send: {
		value: function send(rawData) {
			var data = JSON.parse(rawData);
			if ( data.subscribe ) {
				var _sendData = this.mock.findData(data);
				var that = this;
				_sendData.forEach(function(sendData){
					that.onmessage({
						data: JSON.stringify(sendData)
					});
				});
			} else {
				this.onmessage({
					data: JSON.stringify(this.mock.findData(data))
				});
			}
		},
	},
	close: {
		value: function close() {}
    }
});

module.exports = WebSocket;
