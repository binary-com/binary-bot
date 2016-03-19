Bot.utils = {};
Bot.utils.chooseByIndex = function chooseByIndex(caps_name, index){
	var index = parseInt(index);
	if ( isNaN(index) ){
		return null;
	}
	if ( index > 0 && index <= Bot.config.lists[caps_name].length ) {
		index--;
		return Bot.config.lists[caps_name][index][1];
	} else {
		return null;
	}
};

