import { Map, List } from 'immutable';

export default class Observer {
    constructor() {
        this.eam = new Map(); // event action map
        this.state = {};
    }
    register(event, _action, once, unregisterIfError, unregisterAllBefore) {
        if (unregisterAllBefore) {
            this.unregisterAll(event);
        }
        const apiError = error => {
            if (error.type === unregisterIfError.type) {
                this.unregister('api.error', apiError);
                unregisterIfError.unregister.forEach(unreg => {
                    if (unreg instanceof Array) {
                        this.unregister(...unreg);
                    } else {
                        this.unregisterAll(unreg);
                    }
                });
            }
        };
        if (unregisterIfError) {
            this.register('api.error', apiError);
        }
        const action = (...args) => {
            if (once) {
                this.unregister(event, _action);
            }
            if (unregisterIfError) {
                this.unregister('api.error', apiError);
            }
            _action(...args);
        };

        const actionList = this.eam.get(event);

        this.eam = actionList
            ? this.eam.set(event, actionList.push({ action, searchBy: _action }))
            : this.eam.set(event, new List().push({ action, searchBy: _action }));
    }
    unregister(event, f) {
        this.eam = this.eam.set(event, this.eam.get(event).filter(r => r.searchBy !== f));
    }
    isRegistered(event) {
        return this.eam.has(event);
    }
    unregisterAll(event) {
        this.eam = this.eam.delete(event);
    }
    emit(event, data) {
        if (this.eam.has(event)) {
            this.eam.get(event).forEach(action => action.action(data));
        }
    }
    setState(state = {}) {
        this.state = Object.assign({}, this.state, state);
    }
    getState(key) {
        return this.state[key];
    }
}

export const observer = new Observer();
