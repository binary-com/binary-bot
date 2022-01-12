import React, { useState } from 'react';
import Joyride, { STATUS, ACTIONS } from 'react-joyride';
import {
    set as setStorage,
    get as getStorage,
} from '../../../common/utils/storageManager';
import { translate } from '../../../common/i18n';
import welcome from './welcome';
import { isMobile } from '../../../common/utils/tools';

// const setDoneCheck = () => {
//     const doNotAskCheck = document.getElementById('do-not-ask-me-again');
//     if (doNotAskCheck && doNotAskCheck.checked) {
//         setDone('welcomeFinished');
//         return true;
//     }
//     return false;
// };

const Tour = () => {
    const [run, setRun] = useState(!getStorage('closedTourPopup'));
    const [steps, setSteps] = useState([]);

    React.useEffect(()=>{
        setSteps(welcome);
    },[])

    const callback = (data) => {
        const { action, status } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRun(false);
            setStorage('closedTourPopup', Date.now());
        }
        if ([ACTIONS.CLOSE].includes(action)) {
            setRun(false);
        }
    };

    return (
        <div className='tour-first-pop-up'>
            <Joyride
                run={run}
                disableCloseOnEsc={true}
                disableOverlay={!isMobile()}
                disableOverlayClicks={true}
                continuous={true}
                locale={{
                    next: translate('Next'),
                    back: translate('Back'),
                    last: translate('Done'),
                }}
                ref={(e) => {
                    this.joyride = e;
                }}
                steps={steps}
                callback={callback}
                styles={{
                    tooltip: {
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        color: '#555',
                        cursor: 'default',
                        padding: '20px !default',
                        pointerEvents: 'auto',
                        transform: 'translate3d(0, 0, 0)',
                        width: 'nth((15em, 20em, 20em), 1)',
                        zIndex: '10000',
                        position: 'fixed !important',
                    },
                    buttonNext: {
                        backgroundColor: '#2e8836',
                        borderRadius: '4px',
                        color: '#fff',
                        padding: '6px 12px',
                        transition: 'background-color 0.2s ease-in-out',

                    // &:active,
                    // &:focus,
                    // &:hover {
                    //   backgroundColor: 'lighten($joyride-button-bg-color, 6)',
                    //   color: '#fff',
                    // },
                    },
                    buttonBack: {
                        backgroundColor: '#f2f2f2',
                        color: '#000',
                    },
                    tooltipTitle: {
                        fontSize: '18',
                        margin: '0',
                        borderBottom: '1px solid #e98024',
                    },
                }}
            />
        </div>
    );
};

export default Tour;
