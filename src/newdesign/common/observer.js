module.exports = {
	_eventActionMap: {},
	register: function register(_event, action){
		if ( !_event || !action ){
			throw(Error('Both event and action are needed to register.'));
		}
		var actionList = this._eventActionMap[_event];
		if ( actionList ) {
			actionList.push(action);
		} else {
			this._eventActionMap[_event] = [action];
		}
	},
	unregister: function unregister(_event) {
		delete this._eventActionMap[_event];
	},
	emit: function emit(_event, data) {
		if (this._eventActionMap.hasOwnProperty(_event)){
			var actionList = this._eventActionMap[_event];
			for ( var index in actionList ) {
				actionList[index](data);
			}
		}
	},
};