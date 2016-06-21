var observer = require('common/observer');
var tools = require('common/tools');
var storageManager = require('common/storageManager');
var LiveApi = require('binary-live-api').LiveApi;
var Translator = require('common/translator');
var translator = new Translator();

var CustomApi = function CustomApi(options) {
	if ( CustomApi.instance ) {
		return CustomApi.instance;
	}
	CustomApi.instance = this;
	this.api = new LiveApi(options);
	var events = {
		tick: function(){},
		history: function(){
			return this.api.getTickHistory.apply(this.api, Array.prototype.slice.call(arguments));
		},
		transaction: function(){
			return this.api.subscribeToTransactions.apply(this.api, Array.prototype.slice.call(arguments));
		},
		proposal_open_contract: function(contract_id){
			return this.api.send({
				proposal_open_contract: 1,
				contract_id: contract_id,
			});
		},
		proposal: function(){
			return this.api.subscribeToPriceForContractProposal.apply(this.api, Array.prototype.slice.call(arguments));
		},
		buy: function(){
			return this.api.buyContract.apply(this.api, Array.prototype.slice.call(arguments));
		},
		authorize: function(){
			return this.api.authorize.apply(this.api, Array.prototype.slice.call(arguments));
		},
	};
	var that = this;
	Object.keys(events).forEach(function(e){
		var _event = (!that.events[e])? that.events._default: that.events[e];
		that.api.events.on(e, _event);
		that[e] = function(){
			var promise = events[e].apply(that, Array.prototype.slice.call(arguments));
			if ( promise instanceof Promise ) {
				promise.then(function resolve(data){
				}, function reject(data){
					_event(data);
				});
			}
		};
	});
};

CustomApi.prototype = Object.create(LiveApi.prototype, {
	events: {
		value: {
			tick: function tick(response) {
				if ( !tools.apiFailed(response) ) {
					var tick = response.tick;
					observer.emit('ui.log', translator.translateText('tick received at:') + ' ' + tick.epoch);
					observer.emit('bot.tick', {
						epoch: +tick.epoch,
						quote: +tick.quote,
					});
					observer.emit('ui.log', tick);
				}
			},
			history: function history(response) {
				if ( !tools.apiFailed(response) ) {
					var ticks = [];
					var history = response.history;
					history.times.forEach(function (time, index) {
						ticks.push({
							epoch: +time,
							quote: +history.prices[index]
						});
					});
					observer.emit('ui.log', ticks);
					observer.emit('bot.history', ticks);
				}
			},
			authorize: function authorize(response) {
				if ( !tools.apiFailed(response) ) {
					var token = response.echo_req.authorize;
					var authorize = response.authorize;
					observer.emit('ui.log', translator.translateText('Logged in to:') + ' ' + storageManager.getToken(token).account_name, 'info');
					observer.emit('bot.authorize', authorize);
				} else {
					storageManager.removeToken(token);
				}
			},
			_default: function _default(response) {
				var msg_type = response.msg_type;
				if ( !tools.apiFailed(response) ) {
					observer.emit('ui.log', message[msg_type]);
					observer.emit('bot.' + message[msg_type], response);
				}
			},
		}
	}
});

module.exports = CustomApi;