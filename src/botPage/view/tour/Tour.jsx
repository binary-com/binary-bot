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
        <div className='tour-first-pop-up'>
            <Joyride
                beaconComponent={undefined}
                // beaconComponent={
                //     React.forwardRef((props, ref) => (
                //         <div onClick={()=> console.log('lskdlaskjd')} ref={ref} {...props} 
                //          style={{
                //             backgroundColor: '#fff',
                //             borderRadius: '4px',
                //             color: '#555',
                //             cursor: 'default',
                //             filter: 'drop-shadow(-1px -2px 3px rgba(0,0,0,0.3)) drop-shadow(1px 2px 3px rgba(0,0,0,0.3))',
                //             padding: '20px',
                //             pointerEvents: 'auto',
                //             transform: 'translate3d(0,0,0)',
                //             width: '17em',
                //             zIndex: '1510',
                //         }}>
                //             <CustomBeaconComponent />
                //         </div>
                //     ))
                // }
               
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
