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
	this.delay = 0;
	this.calls = calls;
	var originalOnMessage = this.api.socket._events.message;
	var that = this;
	this.api.socket._events.message = function onMessage(rawData, flags){
		var data = JSON.parse(rawData);
		that.replaceSensitiveData(data);
		observer.emit('data.'+data.msg_type, data);
		originalOnMessage(rawData, flags);
	};
	this.global = {};
	this.bufferedResponse = null;
	this.responseDatabase = this.deepCloneDatabase(this.calls);
};

Mock.prototype = Object.create(null, {
	findData: {
		value: function findData(data, onmessage) {
			var that = this;
			var database = require('./database'); 
			for(var requestName in database) {
				if ( ( requestName === 'history' && data.hasOwnProperty('ticks_history') ) || data.hasOwnProperty(requestName) ) {
						var responseConditions = database[requestName];
						for (var responseConditionName in responseConditions) {
							var responseData = this.findKeyInObj(responseConditions[responseConditionName], data);
							if ( responseData ) {
								if ( data.subscribe ) {
									tools.asyncForEach(responseData.data, function(_responseData, index, done){
										setTimeout(function(){
											_responseData.echo_req.req_id = _responseData.req_id = data.req_id;
											onmessage(JSON.stringify(_responseData));
											done();
										}, that.delay);
									});
								} else {
									(function(responseData){
										setTimeout(function(){
											responseData.echo_req.req_id = responseData.req_id = data.req_id;
											onmessage(JSON.stringify(responseData)); 
										}, that.delay);
									})(responseData.data);
								}
							}
						}
					}
			}
		}
	},
	generate: {
		value: function generate() {
			var that = this;
			this.iterateCalls(this.calls, this.responseDatabase, function(){
				fs.writeFile("./database.js", "module.exports = " + JSON.stringify(that.responseDatabase).replace("'", "\\'"), function(err) {
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
				if (_.isMatch(this.removeReqId(JSON.parse(key)), this.removeReqId(obj2))) {
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
				callback = this.wrapCallback(option, responseData, 
				callback);
				callback();
			}
		}
	},
	wrapCallback: {
		value: function wrapCallback(option, responseData, callback) {
			var that = this;
			if ( option.next ) {
				var old_callback = callback;
				callback = function callback(){
					responseData.next = {};
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
