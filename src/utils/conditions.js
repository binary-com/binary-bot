var config = require('../globals/config');
module.exports = {
	ticktrade: function ticktrade(parameters) {
		var options = [];
		var opposites = config.opposites[parameters.condition];
		opposites.forEach(function (option) {
			var option_name = Object.keys(option)[0];
			var option_data = {
				'amount': parameters.amount,
				'basis': parameters.payouttype,
				'contract_type': option_name,
				'currency': parameters.currency,
				'duration': parameters.duration,
				'duration_unit': 't',
			};
			if (parameters.hasOwnProperty('barrier')) {
				option_data.barrier = parameters.barrier;
			}
			options.push(option_data);
		});

		return options;
	}
};
