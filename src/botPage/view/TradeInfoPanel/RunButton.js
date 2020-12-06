import React from 'react';
import { translate } from '../../../common/i18n';

const RunButton = () => (
    <React.Fragment>
        <button title="Run the bot" id="summaryRunButton" className="toolbox-button icon-run" />
        <button
            title={translate('Stop the bot')}
            id="summaryStopButton"
            className="toolbox-button icon-stop"
            style={{ display: 'none' }}
        />
    </React.Fragment>
);

export default RunButton;
