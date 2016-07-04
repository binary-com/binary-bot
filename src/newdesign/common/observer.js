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
	registerOnce: function registerOnce(_event, _action){
		if ( !_event || !_action ){
			throw(Error('Both event and action are needed to register.'));
		}
		var that = this;
		var action = function action() {
			that.unregister(_event, action);
			_action.apply(null, Array.prototype.slice.call(arguments));
		};
		var actionList = this._eventActionMap[_event];
		if ( actionList ) {
			actionList.push(action);
		} else {
			this._eventActionMap[_event] = [action];
		}
	},
	unregister: function unregister(_event, _function) {
		var actionList = this._eventActionMap[_event];
		var toDeleteIndexes = [];
		if ( actionList ) {
			for ( var i in actionList ) {
				if ( actionList[i] === _function ) {
					toDeleteIndexes.push(i);
				}
			}
			for (var i in toDeleteIndexes) {
				delete actionList[toDeleteIndexes[i]];
			}
		}
	},
	unregisterAll: function unregister(_event) {
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