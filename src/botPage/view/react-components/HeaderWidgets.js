import React, { Component } from 'react';

export default class ServerTime extends Component {
    constructor(props) {
        super();
        this.state = {};
        const getServerTime = () => {
            props.api.send({ time: '1' }).then(response =>
                this.setState(
                    {
                        date: new Date(response.time * 1000),
                    },
                    this.updateTime()
                )
            );
        };
        getServerTime();
        setInterval(() => this.updateTime(), 1000);
        setInterval(() => getServerTime(), 30000);
    }
    updateTime() {
        if (!this.state.date) return;
        this.state.date.setSeconds(this.state.date.getSeconds() + 1);
        const year = this.state.date.getUTCFullYear();
        const month = `0${this.state.date.getMonth() + 1}`.slice(-2);
        const day = `0${this.state.date.getUTCDate()}`.slice(-2);
        const hours = `0${this.state.date.getUTCHours()}`.slice(-2);
        const minutes = `0${this.state.date.getMinutes()}`.slice(-2);
        const seconds = `0${this.state.date.getSeconds()}`.slice(-2);
        this.setState({ dateString: `${year}-${month}-${day} ${hours}:${minutes}:${seconds} GMT` });
    }
    render() {
        return <b>{this.state.dateString}</b>;
    }
}
