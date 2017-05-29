import React from 'react';
import ReactDOM from 'react-dom';
import LogTable from './LogTable';

const logInfoSkel = {
    type     : '',
    timestamp: '',
    message  : '',
};

export default class LogInfo {
    constructor() {
        this.log = { ...logInfoSkel };
        this.logCount = 0;
    }
    addLog(type, timestamp, message) {
        this.log.type = type;
        this.log.timestamp = timestamp;
        this.log.message = message;
        this.updateTable();
    }
    updateTable() {
        const log = this.log;
        ReactDOM.render(<LogTable log={{ log }} />, $('#logTable')[0]);
    }
}
