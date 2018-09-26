import React, { Component } from 'react';

export default class PresenceCheck extends Component {
    constructor(api) {
        super();
        this.state = {};
    }
    isOnline() {
        return navigator.onLine ? 'online' : 'offline';
    }
    setStatus() {
        this.setState({ status: this.isOnline() });
    }
    componentWillMount() {
        if ('onLine' in navigator) {
            window.addEventListener('online', () => this.setStatus());
            window.addEventListener('offline', () => this.setStatus());
        }
        this.setStatus();
    }
    render() {
        return <span className={this.state.status} />;
    }
}
