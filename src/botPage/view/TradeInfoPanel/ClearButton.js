import React from 'react';
import { observer as globalObserver } from '../../../common/utils/observer';
import { showDialog } from '../../bot/tools';
import { translate } from '../../../common/utils/tools';

const ClearButton = () => {
    function confirmClearLog() {
        showDialog({
            title: translate('Are you sure?'),
            text : [
                translate(
                    'This will clear all transactions in the summary panel, and all counters will be reset to zero.'
                ),
            ],
        })
            .then(() => globalObserver.emit('summary.clear'))
            .catch(() => {});
    }
    return (
        <button
            title="Clear summary log"
            id="summaryClearButton"
            className="toolbox-button icon-clear"
            onClick={confirmClearLog}
        />
    );
};

export default ClearButton;
