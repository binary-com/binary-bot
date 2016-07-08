require('../browser');
var LiveApi = require('binary-live-api').LiveApi;
var observer = require('../observer');
var tools = require('../tools');
var _ = require('underscore');
var fs = require('fs');
var calls = require('./calls');

var replaceSensitiveData = function replaceSensitiveData(data){
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
};

var handleSubscriptionLimits = function handleSubscriptionLimits(data, responseData, functionCall, callback) {
	responseData.push(data);
	if ( responseData.length === functionCall.maxResponse 
		|| ( functionCall.stopCondition && functionCall.stopCondition(data) ) ) {
		observer.unregisterAll('data.' + data.msg_type);
		callback();
	}
};

var handleDataSharing = function handleDataSharing(data, global) {
	switch(data.msg_type) {
		case 'proposal':
			if ( data.echo_req.contract_type === 'DIGITEVEN' ) {
				global.evenContract = data.proposal;
			} else {
				global.oddContract = data.proposal;
			}
			break;
		case 'buy':
			if ( !data.error ) {
				if ( data.buy.shortcode.indexOf('DIGITEVEN') >= 0 ) {
					global.evenPurchasedContract = data.buy.contract_id;
				} else {
					global.oddPurchasedContract = data.buy.contract_id;
				}
			}
		default:
			break;
	}
};

var findKeyInObj = function findKeyInObj(obj1, obj2) {
	for(var key in obj1) {
		if (_.isMatch(removeReqId(JSON.parse(key)), removeReqId(obj2))) {
			return obj1[key];
		}
	}
};

var removeReqId = function removeReqId(_data) {
	var data = _.clone(_data);
	delete data.req_id;
	if ( data.echo_req ) {
		delete data.echo_req.req_id;
	}
	return data;
};

var getKeyFromRequest = function getKeyFromRequest(data) {
	return JSON.stringify(data.echo_req);
};

var observeSubscriptions = function observeSubscriptions(data, responseDatabase, global, functionCall, callback){
	var key = getKeyFromRequest(data);
	var messageType = (data.msg_type === 'tick') ? 'history': data.msg_type;
	var response = responseDatabase[messageType].subscriptions;
	if ( !response.hasOwnProperty(key) ) {
		response[key] = [];
	}
	handleDataSharing(data, global);
	handleSubscriptionLimits(
		data,
		response[key],
		functionCall,
		callback
	);
};

var iterateCalls = function iterateCalls(calls, responseDatabase, api, global, iterateCallback) {
	tools.asyncForEach(Object.keys(calls), function(callName, index, callback){
		var responseTypes = calls[callName];
		tools.asyncForEach(Object.keys(responseTypes), function(responseTypeName, index, callback){
			var options = responseTypes[responseTypeName];
			if ( !responseDatabase.hasOwnProperty(callName) ){
				responseDatabase[callName] = {};
			}
			responseDatabase[callName][responseTypeName] = {};
			tools.asyncForEach(Object.keys(options), function(optionName, index, callback){
				var option = options[optionName];
				option.func(api, global);
				if ( option.next ) {
					var old_callback = callback;
					callback = function callback(){
						iterateCalls(option.next, responseDatabase, api, global, function(){
							old_callback();
						})
					};
				}
				console.log(optionName);
				if (responseTypeName === 'subscriptions') {
					if ( callName === 'history' ) {
						observer.registerOnce('data.history', function(data){
							handleDataSharing(data, global);
							responseDatabase[callName][responseName][getKeyFromRequest(data)] = [data];
						});
						observer.register('data.tick', function(data){
							observeSubscriptions(data, responseDatabase, global, option, callback)
						});
					} else {
						observer.register('data.' + callName, function(data){
							observeSubscriptions(data, responseDatabase, global, option, callback)
						});
					}
				} else {
					observer.registerOnce('data.' + callName, function(data){
						handleDataSharing(data, global);
						responseDatabase[callName][responseTypeName][getKeyFromRequest(data)] = data;
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
};

var deepCloneDatabase = function deepCloneDatabase(database) {
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
};

var Mock = function Mock(){
	this.api = new LiveApi({websocket: require('ws')});
	this.calls = calls;
	var originalOnMessage = this.api.socket._events.message;
	this.api.socket._events.message = function onMessage(rawData, flags){
		var data = JSON.parse(rawData);
		replaceSensitiveData(data);
		observer.emit('data.'+data.msg_type, data);
		originalOnMessage(rawData, flags);
	};
	this.global = {};
	this.responseDatabase = deepCloneDatabase(this.calls);
};

Mock.prototype = Object.create(null, {
	findData: {
		value: function findData(data) {
			var database = require('./database');
			for(var requestName in database) {
				if ( ( requestName === 'history' && data.hasOwnProperty('ticks_history') ) 
					|| data.hasOwnProperty(requestName) ) {
					var responseConditions = database[requestName];
					for (var responseConditionName in responseConditions) {
						var responseData = findKeyInObj(responseConditions[responseConditionName], data);
						if ( responseData ) {
							if ( data.subscribe ) {
								responseData.forEach(function(_responseData){
									_responseData.echo_req.req_id = _responseData.req_id = data.req_id;
								});
							} else {
								responseData.echo_req.req_id = responseData.req_id = data.req_id;
							}
							return responseData;
						}
					}
				}
			}
		}
	},
	generate: {
		value: function generate() {
			var that = this;
			this.responseDatabase.amin = 1;
			iterateCalls(this.calls, this.responseDatabase, this.api, this.global, function(){
				fs.writeFile("./database.js", "module.exports = " + JSON.stringify(that.responseDatabase).replace("'", "\\'"), function(err) {
				    if(err) {
				        return console.log(err);
				    }
					process.exit(0);
				}); 
			});
		}
	}
});

module.exports = Mock;
