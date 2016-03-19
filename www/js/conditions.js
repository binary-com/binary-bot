Bot.conditions = {};
Bot.conditions.updown = function updown(parameters){
	var options = [];
	Bot.config.opposites.UPDOWN.forEach(function(option){
		options.push({
			'amount': parameters.amount,
			'basis': parameters.payouttype,
			'contract_type': option,
			'currency': parameters.currency,
			'duration': parameters.duration,
			'duration_unit': parameters.durationunit,
		});
	});

	return options;
}
