require('./browser');
var CustomApi = require('./customApi');
var observer = require('./observer');
var tools = require('./tools');
var _ = require('underscore');

var replaceSensitiveData = function replaceSensitiveData(data){
	switch(data.msg_condition) {
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

var api = new CustomApi();

var originalOnMessage = api._originalApi.socket._events.message;

api._originalApi.socket._events.message = function onMessage(rawData, flags){
	var data = JSON.parse(rawData);
	replaceSensitiveData(data);
	observer.emit('data', data);
	originalOnMessage(rawData, flags);
};

var global = {};

var dbCalls = {
	authorize: {
		errors: {
			InvalidToken: {
				func: function InvalidToken(){
					api.authorize('FakeToken');
				}
			}
		},
		responses: {
			realToken: {
				func: function realToken(){
					api.authorize('c9A3gPFcqQtAQDW');
				}
			}
		},
	},
	tick_history: {
		subscriptions: {
			r_100: {
				func: function r_100(){
					api.history('R_100', { 
						'end': 'latest',
						'count': 600,
						'subscribe': 1
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
					api.proposal({"amount":"1.00","basis":"stake","contract_type":"DIGITODD","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
				}
			},
			r_100_digiteven: {
				func: function r_100_digiteven(){
					api.proposal({"amount":"1.00","basis":"stake","contract_type":"DIGITEVEN","currency":"USD","duration":5,"duration_unit":"t","symbol":"R_100"});
				}
			}
		},
	},
	buy: {
		responses: {
			buyOdd: {
				func: function buyOdd(){
					api.buy(global.oddContract.id, global.oddContract.ask_price);
				}
			},
			buyEven: {
				func: function buyEven(){
					api.buy(global.evenContract.id, global.evenContract.ask_price);
				}
			}
		},
	},
};

var responseDatabase = _.clone(dbCalls);

var handleSubscriptionLimits = function handleSubscriptionLimits(data, response, functionCall, callback) {
	response.push(data);
	if ( response.length === functionCall.maxResponse 
		|| ( functionCall.stopCondition && functionCall.stopCondition() ) ) {
		observer.unregisterAll('data');
		callback();
	}
};

var handleRelationships = function handleRelationships(data) {
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

tools.asyncForEach(Object.keys(dbCalls), function(dbCallName, index, callback){
	var responses = dbCalls[dbCallName];
	tools.asyncForEach(Object.keys(responses), function(responseName, index, callback){
		var conditions = responses[responseName];
		tools.asyncForEach(Object.keys(conditions), function(conditionName, index, callback){
			var functionCall = conditions[conditionName];
			functionCall.func();
			if (responseName === 'subscriptions') {
				responseDatabase[dbCallName][responseName][conditionName] = [];
				observer.register('data', function(data){
					handleSubscriptionLimits(
						data,
						responseDatabase[dbCallName][responseName][conditionName],
						functionCall,
						callback
					);
				});
			} else {
				observer.registerOnce('data', function(data){
					handleRelationships(data);
					responseDatabase[dbCallName][responseName][conditionName] = data;
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
	console.log(JSON.stringify(responseDatabase));
	setTimeout(function(){
		process.exit(0);
	}, 1000);
});


