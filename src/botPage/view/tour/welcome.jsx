import React from 'react';
import { translate } from '../../../common/i18n';
import { isLoggedInDeriv } from '../../../common/utils/storageManager';
import { isMobile } from '../../../common/utils/tools';


const CustomBeaconComponent = ({closeTourPermanently, continueTour}) => (
    <div style={{
        backgroundColor: '#fff',
        borderRadius: '4px',
        color: '#555',
        cursor: 'default',
        filter: 'drop-shadow(-1px -2px 3px rgba(0,0,0,0.3)) drop-shadow(1px 2px 3px rgba(0,0,0,0.3))',
        padding: '20px',
        pointerEvents: 'auto',
        transform: 'translate3d(0,0,0)',
        width: '17em',
        zIndex: '1510',
    }}>
        <div>
            <p>
                {translate('Ready to learn how to use Binary Bot?')}
            </p>  
            <div>
                <a class="button-secondary" onClick={closeTourPermanently}><span>{translate('No Thanks')}</span></a>
                <a class="button" onClick={()=> continueTour(document.getElementById('chkAskAgain').checked)}>
                    <span>{translate('Yes')}</span></a>
            </div>
            <div className="tour-custom-buttons">
                <input type="checkbox" id="chkAskAgain" />
                <label for="do-not-ask-me-again">
                    {translate('Do not ask me again.')}
                </label>
            </div>
        </div>
    </div>
);


const SecondStep = () => (
    <p>{translate('Drag and drop block files or make your own strategies.')}</p>
);

const ThirdStep = () => (
    <p>{translate('Add more blocks from here to your bot.')}</p>
);

const ForthStep = () => (
    <p>
        {translate('Login before starting your bot. Always test your strategies with the virtual account.')}
    </p>
);

const FifthStep = () => (
    <p>
        {translate('Control your blocks. Hold the cursor on each button for more info.')}
    </p>
);

const SixthStep = () => (
    <p>
        {translate('Want to report an issue or ask for help?')}
        <a target="blank" href="https://github.com/binary-com/binary-bot/issues/new">
            {translate('Click here')}
        </a>
    </p>
)


function welcome (closeTourPermanently, continueTour) {

    const steps = [
        {
            title: 'Take a quick tour',
            content: <CustomBeaconComponent closeTourPermanently={closeTourPermanently}  continueTour={continueTour}  />,
            target: '#workspace_center',
            offset: 200,
            disableBeacon: true,
        },
        {
            title: translate('Workspace'),
            content: <SecondStep />,
            target: isMobile() ? '.injectionDiv' : '#workspace_center',
            position: isMobile() ? 'center' : 'top',
            offset: 200,
        },
        {
            title: translate('Blocks toolbox'),
            content: <ThirdStep />,
            target: '.blocklyTreeRoot',
            position: 'right',
        },
        {
            title: translate('Accounts'),
            content: <ForthStep />,
            target: isLoggedInDeriv() ? '#acc_switcher' : '.header__btn',
            position: 'left',
        },
        {
            title: translate('Bot controls'),
            content: <FifthStep />,
            target: isMobile() ? '#toolbox' : '#zoomIn',
            position: 'left',
        },
        {
            title: translate('Enjoy!'),
            content: <SixthStep />,
            target: '#center',
            position: 'center',
            style: {
                arrow: {
                    display: 'none',
                },
            },
            isFixed: true,
            offset: 0,
        },
    ];

    return steps;
}

export default welcome;
