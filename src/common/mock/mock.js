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

var Mock = function Mock(){
	this.api = new LiveApi({websocket: require('ws')});
	this.dbCalls = calls;
	var originalOnMessage = this.api.socket._events.message;
	this.api.socket._events.message = function onMessage(rawData, flags){
		var data = JSON.parse(rawData);
		replaceSensitiveData(data);

		observer.emit('data.'+data.msg_type, data);
		originalOnMessage(rawData, flags);
	};

	this.global = {};

	var that = this;

	this.responseDatabase = _.clone(this.dbCalls);

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
			tools.asyncForEach(Object.keys(this.dbCalls), function(dbCallName, index, callback){
				var responses = that.dbCalls[dbCallName];
				tools.asyncForEach(Object.keys(responses), function(responseName, index, callback){
					var conditions = responses[responseName];
					that.responseDatabase[dbCallName][responseName] = {};
					tools.asyncForEach(Object.keys(conditions), function(conditionName, index, callback){
						console.log(conditionName);
						var functionCall = conditions[conditionName];
						functionCall.func();
						if (responseName === 'subscriptions') {
							if ( dbCallName === 'history' ) {
								observer.registerOnce('data.history', function(data){
									handleDataSharing(data, that.global);
									that.responseDatabase[dbCallName][responseName][getKeyFromRequest(data)] = [data];
								});
								observer.register('data.tick', function(data){
									observeSubscriptions(data, that.responseDatabase, that.global, functionCall, callback)
								});
							} else {
								observer.register('data.' + dbCallName, function(data){
									console.log(data);
									observeSubscriptions(data, that.responseDatabase, that.global, functionCall, callback)
								});
							}
						} else {
							observer.registerOnce('data.' + dbCallName, function(data){
								handleDataSharing(data, that.global);
								that.responseDatabase[dbCallName][responseName][getKeyFromRequest(data)] = data;
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
