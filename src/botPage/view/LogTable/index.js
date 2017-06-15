import React from 'react';
import ReactDOM from 'react-dom';
import LogTable from './LogTable';

export default function addToNotificationPanel(log) {
    ReactDOM.render(<LogTable log={log} />, $('#logTable')[0]);
}
