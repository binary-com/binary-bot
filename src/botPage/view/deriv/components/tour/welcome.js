import React from 'react';
import { useSelector } from "react-redux";
import { translate } from '../../../../../common/i18n';
import { isMobile } from '../../../../../common/utils/tools';

// [TODO]: Refactor direct DOM calls
const CustomBeaconComponent = ({closeTourPermanently, continueTour}) => (
    <div className='tour__beacon'>
        <p>
            {translate('Ready to learn how to use Binary Bot?')}
        </p>  
        <div>
            <a className="button-secondary tour__beacon__button" onClick={closeTourPermanently}><span>{translate('No Thanks')}</span></a>
            <a className="button" onClick={()=> continueTour(document.getElementById('chkAskAgain').checked)}>
                <span>{translate('Yes')}</span></a>
        </div>
        <div className='tour__checkbox'>
            <input type="checkbox" id="chkAskAgain" />
            <label htmlFor="chkAskAgain">
                {translate('Do not ask me again.')}
            </label>
        </div>
    </div>
);


const SecondStep = () => (<p>{translate('Drag and drop block files or make your own strategies.')}</p>);

const ThirdStep = () => (<p>{translate('Add more blocks from here to your bot.')}</p>);

const ForthStep = () => (<p>{translate('Login before starting your bot. Always test your strategies with the virtual account.')}</p>);

const FifthStep = () => (<p>{translate('Control your blocks. Hold the cursor on each button for more info.')}</p>);

const SixthStep = () => (
    <p>
        {translate('Want to report an issue or ask for help?')}
        <a target="blank" href="https://github.com/binary-com/binary-bot/issues/new">
            {translate('Click here')}
        </a>
    </p>
)

function welcome (closeTourPermanently, continueTour) {
    const { is_logged } = useSelector((state) => state.client);

    const steps = [
        {
            title: 'Take a quick tour',
            content: <CustomBeaconComponent closeTourPermanently={closeTourPermanently} continueTour={continueTour}  />,
            target: '#first-step-target',
            placement: 'center',
            offset: 200,
            disableBeacon: true,
            hideCloseButton: true,
            styles: {
                buttonNext: {
                    display: 'none',
                },
                tooltipContent: {
                    textAlign: 'center',
                    
                },
                tooltipTitle: {
                    textAlign: 'center', 
                },
               
            },
        },
        {
            title: translate('Workspace'),
            content: <SecondStep />,
            target: isMobile() ? '.blocklyBlockCanvas' : '#second-step-target',
            placement: isMobile() ? 'bottom' : 'top',
            styles:{
                buttonClose:{
                    paddingTop: '27px',     
                    paddingRight: '27px',     
                },
            },
        
        },
        {
            title: translate('Blocks toolbox'),
            content: <ThirdStep />,
            target:  isMobile() ? '#sidebar-toggle-action' : '#third-step-target',
            placement: 'right-start',
        },
        {
            title: translate('Accounts'),
            content: <ForthStep />,
            // eslint-disable-next-line no-nested-ternary
            target: isMobile() ? (is_logged ? '#acc_switcher' : '.header__btn') : '#forth-step-target',
            placement: 'left-start',
            styles:{
                buttonClose:{
                    paddingRight: '29px',     
                },
            },
        },
        {
            title: translate('Bot controls'),
            content: <FifthStep />,
            target: isMobile() ? '#toolbox' : '#zoomIn',
            placement: 'bottom',
            styles:{
                buttonClose:{
                    paddingTop: '27px',     
                    paddingRight: '27px',     
                },
            },
        },
        {
            title: translate('Enjoy!'),
            content: <SixthStep />,
            target: '#first-step-target',
            placement: 'center',
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
