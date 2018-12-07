import React from 'react';

const RunButton = () => (
    <div className="summary-toolbox">
        <button title="Run the bot" id="summaryRunButton" className="toolbox-button icon-run" />
        <button
            title="Stop the bot"
            id="summaryStopButton"
            className="toolbox-button icon-stop"
            style={{ display: 'none' }}
        />
    </div>
);

export default RunButton;
