var config = require('common').const;
var tools = require('common').tools;

module.exports = {
	ticktrade: function ticktrade(parameters) {
		var options = [];
		var opposites = config.opposites[parameters.condition];
		opposites.forEach(function (option) {
			var option_data = {
				'amount': parameters.amount,
				'basis': parameters.payouttype,
				'contract_type': tools.getObjectKey(option),
				'currency': parameters.currency,
				'duration': parameters.duration,
				'duration_unit': 't',
			};
			tools.copyAttributeIfExists(option_data, parameters, 'barrier');
			options.push(option_data);
		});

		return options;
	}
};
