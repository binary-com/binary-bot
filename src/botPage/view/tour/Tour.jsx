import React, { useState } from 'react';
import Joyride, { STATUS, ACTIONS, EVENTS } from 'react-joyride';

import {
    set as setStorage,
    get as getStorage,
} from '../../../common/utils/storageManager';
import { translate } from '../../../common/i18n';
import welcome from './welcome.jsx';
import { isMobile } from '../../../common/utils/tools';

const Tour = () => {
    const[run, setRun] = useState(!getStorage('closedTourPopup'));
    const[stepIndex, setStepIndex] = useState(0);

    const closeTourPermanently = () => {
        setStorage('closedTourPopup', Date.now());
        setRun(false);
    };
    const continueTour = (is_checked) => {
        if(is_checked){
            setStorage('closedTourPopup', Date.now());
        }
        setStepIndex(stepIndex + 1);
    };
    const steps = welcome(closeTourPermanently, continueTour);

    const callback = (data) => {
        const { action, index, status , type} = data;
        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
        }
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRun(false);
            setStorage('closedTourPopup', Date.now());
        }
        if ([ACTIONS.CLOSE].includes(action)) {
            setRun(false);
        }
    };

    return (
        <div>
            <Joyride     
                run={run}
                disableCloseOnEsc={true}
                disableOverlay={!isMobile()}
                disableOverlayClicks={true}
                continuous={true}
                locale={{
                    open: '',
                    last: translate('Done'),
                }}
                stepIndex={stepIndex}
                steps={steps}
                callback={callback}
                styles={{
                    tooltip: {                        
                        borderRadius: '4px',
                        color: '#555',
                        cursor: 'default',
                        padding: '20px',
                        pointerEvents: 'auto',
                        transform: 'translate3d(0, 0, 0)',
                        width: '20em',
                        zIndex: '10000',
                        position: 'fixed !important',
                        filter: 'drop-shadow(-1px -2px 3px rgba(0,0,0,0.3)) drop-shadow(1px 2px 3px rgba(0,0,0,0.1))',
                    },
                    buttonNext: {
                        backgroundColor: '#2e8836',
                        borderRadius: '4px',
                        color: '#fff',
                        padding: '10px 25px',
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
                        padding: '10px 25px',
                        marginRight: '8px',
                    },
                    tooltipTitle: {
                        fontSize: '20px',
                        fontWeight: '400',
                        margin: '0',
                        color: '#555',
                        textAlign: 'left',
                        paddingBottom: '5px',
                        borderBottom: '1px solid #e98024',
                    },
                    tooltipContent:{
                        textAlign: 'left',
                        padding: '0',
                    },
                    
                }}
            />
        </div>
    );
};

export default Tour;
