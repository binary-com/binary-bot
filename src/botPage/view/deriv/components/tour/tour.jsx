import React, { useState } from 'react';
import Joyride, { STATUS, ACTIONS, EVENTS } from 'react-joyride';
import { useLocation } from 'react-router-dom';
import {
    set as setStorage,
    get as getStorage,
} from '../../../../../common/utils/storageManager';
import { translate } from '../../../../../common/i18n';
import welcome from './welcome';
import { isMobile } from '../../../../../common/utils/tools';

const getTourState = () => !getStorage('closedTourPopup')
const Tour = () => {
    const location = useLocation();
    const [run, setRun] = useState(() => location?.pathname?.includes('endpoint') ? false : getTourState());
    const[step_index, setStepIndex] = useState(0);

    const closeTourPermanently = () => {
        setStorage('closedTourPopup', Date.now());
        setRun(false);
    };
    const continueTour = (is_checked) => {
        if(is_checked){
            setStorage('closedTourPopup', Date.now());
        }
        setStepIndex(step_index + 1);
    };
    const steps = welcome(closeTourPermanently, continueTour);

    const joyrideCallback = (data) => {
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
                disableCloseOnEsc
                disableOverlay={!isMobile()}
                disableOverlayClicks
                continuous
                locale={{
                    open: '',
                    last: translate('Done'),
                }}
                stepIndex={step_index}
                steps={steps}
                callback={joyrideCallback}
                styles={{
                    tooltip: {      
                        
                        animation: 'joyride-animation 0.2s ease-in-out',
                        borderRadius: '4px',
                        color: '#555',
                        cursor: 'default',
                        padding: '20px',
                        pointerEvents: 'auto',
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
                        border: 'none',
                   
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
