/*jshint loopfunc: true */
'use strict';
var tools = require('binary-common-utils/tools');
var _ = require('underscore');

var WebSocket = function WebSocket(url) {
	this.delay = 10;
	this.bufferedResponse = [];
	this.queuedRequest = [];
	// providing ws interface
	this.readyState = 0;
	this.onopen = null;
	this.onclose = null;
	this.onerror = null;
	this.onmessage = null;
	var that = this;
	setTimeout(function(){
		that.readyState = 1;
		that.onopen();
	}, 100);
};

WebSocket.prototype = Object.create(null, {
	removeReqId:{
		value: function removeReqId(_data) {
			var data = _.clone(_data);
			delete data.req_id;
			if ( data.echo_req ) {
				delete data.echo_req.req_id;
			}
			return data;
		}
	},
	findKeyInObj: {
		value: function findKeyInObj(obj1, obj2) {
			for(var key in obj1) {
				if (_.isEqual(this.removeReqId(JSON.parse(key)), this.removeReqId(obj2))) {
					return obj1[key];
				}
			}
		}
	},
	findDataInBuffer: {
		value: function findDataInBuffer(data, database) {
			for (var requestName in database) {
				if ( ( requestName === 'history' && data.hasOwnProperty('ticks_history') ) || data.hasOwnProperty(requestName) ) {
					var responseConditions = database[requestName];
					for (var responseConditionName in responseConditions) {
						var responseData = this.findKeyInObj(responseConditions[responseConditionName], data);
						if ( responseData ) {
							return database;
						}
					}
				}
			}
			return null;
		}
	},
	getResponseFromBuffer: {
		value: function getResponseFromBuffer(data) {
			var index;
			var database;
			for (var i in this.bufferedResponse) {
				database = this.findDataInBuffer(data, this.bufferedResponse[i]);
				if ( !_.isEmpty(database) ) {
					index = i;
					break;
				}
			}
			if (database) {
				return this.bufferedResponse[index];
			}
			return null;
		}
	},
	addToResponseBuffer: {
		value: function addToResponseBuffer(database) {
			this.bufferedResponse.push(database);
			if (!_.isEmpty(this.queuedRequest)) {
				var tmp = this.queuedRequest;
				this.queuedRequest = [];
				for(var i in tmp) {
					this.getResponse(tmp[i].data, tmp[i].onmessage);
				}
			}
		}
	},
	handleUnsubscribe: {
		value: function handleUnsubscribe(data) {
		}
	},
	getResponse: {
		value: function getResponse(data, onmessage) {
			var that = this;
			if ( data.hasOwnProperty('forget_all') || (data.hasOwnProperty('subscribe') && data.subscribe === 0) ) {
				this.handleUnsubscribe(data);
				setTimeout(function(){
					if ( that.readyState === 0 ) {
						return;
					}
					onmessage(JSON.stringify({ echo_req: {
						req_id: data.req_id,
						forget_all: 'ticks'
					},
					req_id: data.req_id,
					forget_all: [],
					msg_type: 'forget_all'
					}));
				}, this.delay);
				return;
			}
			var database = this.getResponseFromBuffer(data); 
			if (_.isEmpty(database)) {
				database = require('./database');
			}
			var foundResponse = false;
			for (var requestName in database) {
				if ( ( requestName === 'history' && data.hasOwnProperty('ticks_history') ) || data.hasOwnProperty(requestName) ) {
					var responseConditions = database[requestName];
					for (var responseConditionName in responseConditions) {
						var responseData = this.findKeyInObj(responseConditions[responseConditionName], data);
						if ( responseData ) {
							foundResponse = true;
							if ( data.subscribe ) {
								if ( responseData.data[0].msg_type === 'history' ) {
									setTimeout(function(){
										onmessage(JSON.stringify(responseData.data[0]));
									}, that.delay);
									that.time = 0;
									setInterval(function(){
										that.time += 2;
										var newData = {};
										for (var key in responseData.data[1]) {
											if ( key === 'tick' ) {
												newData.tick = {};
												for ( var key2 in responseData.data[1].tick ) {
													newData.tick[key] = responseData.data[1].tick[key];
												}
											} else {
												newData[key] = responseData.data[1][key];
											}
										}
										newData.tick.epoch = (+responseData.data[1].tick.epoch+that.time).toString();
										newData.tick.quote = (Number(responseData.data[1].tick.quote) + Number((0.5 - Math.random()).toFixed(2))).toString();
										newData.echo_req.req_id = newData.req_id = responseData.data[1].req_id;
										onmessage(JSON.stringify(newData));
									}, that.delay);
								} else {
									(function(responseData){
										tools.asyncForEach(responseData.data, function(_responseData, index, done){
											setTimeout(function(){
												if ( that.readyState === 0 ) {
													return;
												}
												if (index === 0 && !_.isEmpty(responseData.next)) {
													that.addToResponseBuffer(responseData.next);
												}
												_responseData.echo_req.req_id = _responseData.req_id = data.req_id;
												onmessage(JSON.stringify(_responseData));
												done();
											}, that.delay);
										});
									})(responseData);
								}
							} else {
								(function(responseData){
									setTimeout(function(){
										if ( that.readyState === 0 ) {
											return;
										}
										if (!_.isEmpty(responseData.next)) {
											that.addToResponseBuffer(responseData.next);
										}
										responseData.data.echo_req.req_id = responseData.data.req_id = data.req_id;
										onmessage(JSON.stringify(responseData.data)); 
									}, that.delay);
								})(responseData);
							}
						} 
					}
				}
			}
			if( !foundResponse ) {
				this.queuedRequest.push({
					data: data,
					onmessage: onmessage
				});
			}
		}
	},
	send: {
		value: function send(rawData) {
			if ( this.readyState === 0 ) {
				return;
			}
			var data = JSON.parse(rawData);
			var that = this;
			this.getResponse(data, function(receivedData){
				that.onmessage({
					data: receivedData
				});
			});
		},
	},
	close: {
		value: function close() {
			this.readyState = 0;
		}
	},
});

module.exports = WebSocket;
