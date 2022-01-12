import React from 'react';
import { translate } from '../../../common/i18n';
import { isLoggedInDeriv } from '../../../common/utils/storageManager';
import { isMobile } from '../../../common/utils/tools';

const FirstStep = ({closeTourPermanently, continueTour}) => (
    <div>
        <p>
            {translate('Ready to learn how to use Binary Bot?')}
        </p>  
        <div>
            <a class="button-secondary" onClick={closeTourPermanently}><span>{translate('No Thanks')}</span></a>
            <a class="button" onClick={()=> continueTour(document.getElementById('do-not-ask-me-again').checked)}><span>{translate('Yes')}</span></a>
        </div>
        <div class="tour-custom-buttons">
            <input type="checkbox" id="do-not-ask-me-again"></input>
            <label for="do-not-ask-me-again">
                {translate('Do not ask me again.')}
            </label>
        </div>
    </div>
    
);

function welcome(closeTourPermanently, continueTour) {
    const steps = [
        {
            title: translate('Take a quick tour'),
            content: <FirstStep closeTourPermanently={closeTourPermanently} continueTour={continueTour}/>,
            target: '#center',
            position: 'center',
            isFixed: true,
            offset: 0,
            disableBeacon: false,
            style: {
                contentAlign: 'center',
                arrow: {
                    display: 'none',
                },
                button: {
                    display: 'none',
                },
                close: {
                    display: 'none',
                },
            },
        },
        {
            title: translate('Workspace'),
            content: `<p>${translate('Drag and drop block files or make your own strategies.')}</p>`,
            target: isMobile() ? '.injectionDiv' : '#workspace_center',
            position: isMobile() ? 'center' : 'top',
            offset: 200,
        },
        {
            title: translate('Blocks toolbox'),
            content: `<p>${translate('Add more blocks from here to your bot.')}</p>`,
            target: '.blocklyTreeRoot',
            position: 'right',
        },
        {
            title: translate('Accounts'),
            content: `<p>
          ${translate('Login before starting your bot. Always test your strategies with the virtual account.')}
        </p>`,
            target: isLoggedInDeriv() ? '#acc_switcher' : '.header__btn',
            position: 'left',
        },
        {
            title: translate('Bot controls'),
            content: `<p>
          ${translate('Control your blocks. Hold the cursor on each button for more info.')}
        </p>`,
            target: isMobile() ? '#toolbox' : '#zoomIn',
            position: 'left',
        },
        {
            title: translate('Enjoy!'),
            content: `<p>
          ${translate('Want to report an issue or ask for help?')}
          <a target="blank" href="https://github.com/binary-com/binary-bot/issues/new">
            ${translate('Click here')}
          </a>
        </p>`,
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
