var WebSocket = function WebSocket(url){
	this.connect = function(){};
};

WebSocket.prototype = Object.create(null, {
	loadMessages: {
		value: function loadMessages(messages) {
			this.messages = messages;
		}
	}
});