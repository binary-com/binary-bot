/*jshint loopfunc: true */
require('../browser');
var LiveApi = require('binary-live-api').LiveApi;
var observer = require('../observer');
var tools = require('../tools');
var _ = require('underscore');
var fs = require('fs');
var calls = require('./calls');


var Mock = function Mock(){
	this.api = new LiveApi({websocket: require('ws')});
	this.delay = 100;
	this.calls = calls;
	var originalOnMessage = this.api.socket._events.message;
	var that = this;
	this.api.socket._events.message = function onMessage(rawData, flags){
		var data = JSON.parse(rawData);
		that.consistentEchoReq(data);
		that.replaceSensitiveData(data);
		observer.emit('data.'+data.msg_type, data);
		originalOnMessage(rawData, flags);
	};
	this.global = {};
	this.bufferedResponse = [];
	this.queuedRequest = [];
	this.responseDatabase = this.deepCloneDatabase(this.calls);
	this.requestList = {};
};

Mock.prototype = Object.create(null, {
	consistentEchoReq: {
		value: function consistentEchoReq(data) {
			// Fix for inconsistency in the API
			if (data.echo_req.req_id in this.requestList) {
				data.echo_req = this.requestList[data.echo_req.req_id];
			} else {
				this.requestList[data.echo_req.req_id] = data.echo_req;
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
			var type = data.forget_all;
			if ( data.forget_all === 'ticks' ) {
				type = 'history';
			}
			var tmp = _.clone(this.queuedRequest);
			for(var i in tmp) {
				if ( type in tmp[i].data ) {
					this.queuedRequest.splice(i, 1);
				}
			}
		}
	},
	getResponse: {
		value: function getResponse(data, onmessage) {
			if ( data.hasOwnProperty('forget_all') ) {
				this.handleUnsubscribe(data);
				onmessage(JSON.stringify({
					"echo_req": {
					"forget_all": "ticks"
					},
					"forget_all": [],
					"msg_type": "forget_all"
				}));
				return;
			}
			var that = this;
			var database = this.getResponseFromBuffer(data); 
			if (_.isEmpty(database)) {
				database = require('./database');
			}
			for (var requestName in database) {
				if ( ( requestName === 'history' && data.hasOwnProperty('ticks_history') ) || data.hasOwnProperty(requestName) ) {
					var responseConditions = database[requestName];
					var foundResponse = false;
					for (var responseConditionName in responseConditions) {
						var responseData = this.findKeyInObj(responseConditions[responseConditionName], data);
						if ( responseData ) {
							foundResponse = true;
							if ( data.subscribe ) {
								this.queuedRequest.push({
									data: data,
									onmessage: onmessage
								});
								(function(responseData){
									tools.asyncForEach(responseData.data, function(_responseData, index, done){
										setTimeout(function(){
											if (index === 0 && !_.isEmpty(responseData.next)) {
												that.addToResponseBuffer(responseData.next);
											}
											_responseData.echo_req.req_id = _responseData.req_id = data.req_id;
											onmessage(JSON.stringify(_responseData));
											done();
										}, that.delay);
									});
								})(responseData);
							} else {
								(function(responseData){
									setTimeout(function(){
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
					if( !foundResponse ) {
						this.queuedRequest.push({
							data: data,
							onmessage: onmessage
						});
					}
				}
			}
		}
	},
	generate: {
		value: function generate() {
			var that = this;
			this.iterateCalls(this.calls, this.responseDatabase, function(){
				fs.writeFile("./database.js", "module.exports = " + JSON.stringify(that.responseDatabase).replace("'", "\\'") + ';', function(err) {
					if(err) {
						return console.log(err);
					}
					process.exit(0);
				}); 
			});
		}
	},
	replaceSensitiveData:{
		value: function replaceSensitiveData(data){
			switch(data.msg_type) {
				case 'authorize':
					if (!data.error) {
						data.authorize.loginid = 'VRTC1234567';
						data.authorize.email = 'root@localhost.localdomain';
					}
					break;
				default:
					break;
			}
		}
	},
	handleSubscriptionLimits: {
		value: function handleSubscriptionLimits(data, responseData, option) {
			responseData.push(data);
			if ( responseData.length === option.maxResponse || ( option.stopCondition && option.stopCondition(data) ) ) {
				return true;
			}
			return false;
		}
	},
	handleDataSharing: {
		value: function handleDataSharing(data) {
			switch(data.msg_type) {
				case 'proposal':
					if ( data.echo_req.contract_type === 'DIGITEVEN' ) {
						this.global.evenContract = data.proposal;
					} else {
						this.global.oddContract = data.proposal;
					}
					break;
				case 'buy':
					if ( !data.error ) {
						if ( data.buy.shortcode.indexOf('DIGITEVEN') >= 0 ) {
							this.global.evenPurchasedContract = data.buy.contract_id;
						} else {
							this.global.oddPurchasedContract = data.buy.contract_id;
						}
					}
					break;
				default:
					break;
			}
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
	removeReqId :{
		value: function removeReqId(_data) {
			var data = _.clone(_data);
			delete data.req_id;
			if ( data.echo_req ) {
				delete data.echo_req.req_id;
			}
			return data;
		}
	},
	getKeyFromRequest: {
		value: function getKeyFromRequest(data) {
			return JSON.stringify(data.echo_req);
		}
	},
	observeSubscriptions: {
		value: function observeSubscriptions(data, responseDatabase, option, callback){
			var key = this.getKeyFromRequest(data);
			var messageType = (data.msg_type === 'tick') ? 'history': data.msg_type;
			var responses = responseDatabase[messageType].subscriptions;
			if (!responses.hasOwnProperty(key)){
				responses[key] = {
					data: []
				};
			}
			var responseData = responses[key];
			this.handleDataSharing(data);
			var finished = this.handleSubscriptionLimits(
				data,
				responseData.data,
				option
			);
			if ( finished ) {
				observer.unregisterAll('data.' + data.msg_type);
				callback = this.wrapCallback(option, responseData, callback);
				callback();
			}
		}
	},
	wrapCallback: {
		value: function wrapCallback(option, responseData, callback) {
			var that = this;
			if ( !_.isEmpty(option.next) ) {
				var old_callback = callback;
				callback = function callback(){
					if ( !responseData.hasOwnProperty('next') ) {
						responseData.next = {};
					}
					that.iterateCalls(option.next, responseData.next, function(){
						old_callback();
					});
				};
			}
			return callback;
		}
	},
	iterateCalls: {
		value: function iterateCalls(calls, responseDatabase, iterateCallback) {
			var that = this;
			tools.asyncForEach(Object.keys(calls), function(callName, index, callback){
				var responseTypes = calls[callName];
				tools.asyncForEach(Object.keys(responseTypes), function(responseTypeName, index, callback){
					var options = responseTypes[responseTypeName];
					if ( !responseDatabase.hasOwnProperty(callName) ){
						responseDatabase[callName] = {};
					}
					if ( !responseDatabase[callName].hasOwnProperty(responseTypeName) ) {
						responseDatabase[callName][responseTypeName] = {};
					}
					tools.asyncForEach(Object.keys(options), function(optionName, index, callback){
						var option = options[optionName];
						option.func(that.api, that.global);
						console.log(optionName);
						if (responseTypeName === 'subscriptions') {
							if ( callName === 'history' ) {
								observer.registerOnce('data.history', function(data){
									that.handleDataSharing(data);
									responseDatabase[callName][responseTypeName][that.getKeyFromRequest(data)] = {
										data: [data]
									};
								});
								observer.register('data.tick', function(data){
									that.observeSubscriptions(data, responseDatabase, option, callback);
								});
							} else {
								observer.register('data.' + callName, function(data){
									that.observeSubscriptions(data, responseDatabase, option, callback);
								});
							}
						} else {
							observer.registerOnce('data.' + callName, function(data){
								that.handleDataSharing(data);
								var key = that.getKeyFromRequest(data);
								var responseData = responseDatabase[callName][responseTypeName][key] = {
									data: data
								};
								callback = that.wrapCallback(option, responseData, 
									callback);
								callback();
							});
						}
					}, function(){
						callback();
					});
				}, function(){
					callback();
				});
			}, function(){
				iterateCallback();
			});
		}
	},
	deepCloneDatabase: {
		value: function deepCloneDatabase(database) {
			var result = {};
			for ( var callName in database ) {
				for ( var responseTypeName in database[callName] ) {
					if ( !result.hasOwnProperty(callName) ) {
						result[callName] = {};
					}
					result[callName][responseTypeName] = {};
				}
			}
			return result;
		}
	}
});

module.exports = Mock;
