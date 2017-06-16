import React from 'react';
import ReactDOM from 'react-dom';
import Summary from './Summary';

// for the first props
ReactDOM.render(<Summary tradeInfo={{}} />, $('#summaryDisplay')[0]);

export default function updateSummary(tradeInfo) {
    ReactDOM.render(<Summary tradeInfo={tradeInfo} />, $('#summaryDisplay')[0]);
}
