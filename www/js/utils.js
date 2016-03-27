Bot.ui = {};
Bot.utils = {};
Bot.utils.chooseByIndex = function chooseByIndex(caps_name, index, list){
	var list = ( typeof list === 'undefined' ) ? Bot.config.lists[caps_name] : list;
	var index = parseInt(index);
	if ( isNaN(index) ){
		return null;
	}
	if ( index > 0 && index <= list.length ) {
		index--;
		return list[index][1];
	} else {
		return null;
	}
};

