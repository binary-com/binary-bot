module.exports = {
	_eventActionMap: {},
	register: function register(_event, action){
		if ( !_event || !action ){
			throw(Error('Both event and action are needed to register.'));
		}
		this._eventActionMap[_event] = action;
	},
	unregister: function unregister(_event) {
		delete this._eventActionMap[_event];
	},
	trigger: function trigger(_event, data) {
		if (this._eventActionMap.hasOwnProperty(_event)){
			return this._eventActionMap[_event](data);
		}
		return null;
	},
};