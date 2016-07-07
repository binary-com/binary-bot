require('./browser');
var LiveApi = require('binary-live-api').LiveApi;
var observer = require('./observer');
var tools = require('./tools');
var _ = require('underscore');
var fs = require('fs');

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
		|| ( functionCall.stopCondition && functionCall.stopCondition() ) ) {
		observer.unregisterAll('data');
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

var Mock = function Mock(){
	this.api = new LiveApi({websocket: require('ws')});
	var originalOnMessage = this.api.socket._events.message;

	this.api.socket._events.message = function onMessage(rawData, flags){
		var data = JSON.parse(rawData);
		replaceSensitiveData(data);
		observer.emit('data', data);
		originalOnMessage(rawData, flags);
	};

	this.global = {};

	var that = this;
	this.dbCalls = {
		authorize: {
			errors: {
				InvalidToken: {
					func: function InvalidToken(){
						that.api.authorize('FakeToken');
					}
				}
			},
			responses: {
				realToken: {
					func: function realToken(){
						that.api.authorize('c9A3gPFcqQtAQDW');
					}
				}
			},
		},
		history: {
			subscriptions: {
				r_100: {
					func: function r_100(){
						that.api.getTickHistory('R_100', {
							"end": "latest",
							"count": 600,
							"subscribe": 1
						});
					},
					maxResponse: 4
				}
			},
		},
		proposal: {
			responses: {
				r_100_digitodd: {
					func: function r_100_digitodd(){
						that.api.subscribeToPriceForContractProposal({"amount":"1.00","basis":"stake","contract_type":"DIGITODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
					}
				},
				r_100_digiteven: {
					func: function r_100_digiteven(){
						that.api.subscribeToPriceForContractProposal({"amount":"1.00","basis":"stake","contract_type":"DIGITEVEN","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
					}
				}
			},
		},
		buy: {
			errors: {
				InvalidContractProposal: {
					func: function InvalidContractProposal(){
						that.api.buyContract('uw2mk7no3oktoRVVsB4Dz7TQnFfABuFDgO95dlxfMxRuPUsz', 100);
					},
				}
			},
			responses: {
				buyOdd: {
					func: function buyOdd(){
						that.api.buyContract(that.global.oddContract.id, that.global.oddContract.ask_price);
					}
				},
				buyEven: {
					func: function buyEven(){
						that.api.buyContract(that.global.evenContract.id, that.global.evenContract.ask_price);
					}
				}
			},
		},
	};

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
					tools.asyncForEach(Object.keys(conditions), function(conditionName, index, callback){
						var functionCall = conditions[conditionName];
						functionCall.func();
						that.responseDatabase[dbCallName][responseName] = {};
						console.log(conditionName);
						if (responseName === 'subscriptions') {
							observer.register('data', function(data){
								var key = getKeyFromRequest(data);
								var response = that.responseDatabase[dbCallName][responseName];
								if ( !response.hasOwnProperty(key) ) {
									response[key] = [];
								}
								handleSubscriptionLimits(
									data,
									response[key],
									functionCall,
									callback
								);
							});
						} else {
							observer.registerOnce('data', function(data){
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
