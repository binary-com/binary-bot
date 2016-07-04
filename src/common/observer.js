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
		var i;
		if ( actionList ) {
			for ( i in actionList ) {
				if ( actionList[i] === _function ) {
					toDeleteIndexes.push(i);
				}
			}
			for ( i in toDeleteIndexes) {
				delete actionList[toDeleteIndexes[i]];
			}
		}
	},
	unregisterAll: function unregister(_event) {
		delete this._eventActionMap[_event];
	},
	emit: function emit(_event, data) {
		var that = this;
		return new Promise(function(resolve, reject) {
			if (that._eventActionMap.hasOwnProperty(_event)){
				var actionList = that._eventActionMap[_event];
				for ( var index in actionList ) {
					actionList[index](data);
				}
				resolve();
			} else {
				reject(Error('Event not found'));
			}
		});
	},
};