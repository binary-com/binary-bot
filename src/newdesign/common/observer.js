module.exports = {
	eventActionMap: {},
	register: function register(_event, action){
		if ( !_event || !action ){
			throw(Error('Both event and action are needed to register.'));
		}
		this.eventActionMap[_event] = action;
	},
	unregister: function unregister(_event) {
		delete this.eventActionMap[_event];
	},
	trigger: function trigger(_event, data) {
		if (this.eventActionMap.hasOwnProperty(_event)){
			return this.eventActionMap[_event](data);
		}
		return null;
	},
};