var Mock = require('./mock');
var WS = require('ws');
var tools = require('../tools');

var WebSocket = function WebSocket(url) {
	WS.prototype.constructor.call(this, url);
	this.delay = 1000;
	this.mock = new Mock();
};

WebSocket.prototype = Object.create(WS.prototype, {
	send: {
		value: function send(rawData) {
			var data = JSON.parse(rawData);
			if ( data.subscribe ) {
				var _sendData = this.mock.findData(data);
				var that = this;
				tools.asyncForEach(_sendData, function(sendData, index, done){
					setTimeout(function(){
						that.onmessage({
							data: JSON.stringify(sendData)
						});
						done();
					}, that.delay);
				})
			} else {
				var that = this;
				setTimeout(function(){
					that.onmessage({
						data: JSON.stringify(that.mock.findData(data))
					});
				}, this.delay);
			}
		},
	},
	close: {
		value: function close() {}
    }
});

module.exports = WebSocket;
