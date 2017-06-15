import React from 'react';
import ReactDOM from 'react-dom';
import LogTable from './LogTable';

// for the first props
ReactDOM.render(<LogTable log={{}} />, $('#logTable')[0]);

export default function updateLogTable(log) {
    ReactDOM.render(<LogTable log={log} />, $('#logTable')[0]);
}
