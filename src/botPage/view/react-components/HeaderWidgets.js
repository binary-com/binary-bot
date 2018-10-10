import React, { Component } from 'react';

export default class ServerTime extends Component {
    constructor() {
        super();
        this.state = {};
    }
    updateTime() {
        this.date.setSeconds(this.date.getSeconds() + 1);
        const year = this.date.getUTCFullYear();
        const month = `0${this.date.getMonth() + 1}`.slice(-2);
        const date = `0${this.date.getUTCDate()}`.slice(-2);
        const hours = `0${this.date.getUTCHours()}`.slice(-2);
        const minutes = `0${this.date.getMinutes()}`.slice(-2);
        const seconds = `0${this.date.getSeconds()}`.slice(-2);
        this.setState({ date: `${year}-${month}-${date} ${hours}:${minutes}:${seconds} GMT` });
    }
    componentWillMount() {
        this.date = new Date(this.props.startTime * 1000);
        setInterval(() => this.updateTime(), 1000);
    }
    render() {
        return <b>{this.state.date}</b>;
    }
}
