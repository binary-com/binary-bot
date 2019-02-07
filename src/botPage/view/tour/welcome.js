import { translate } from '../../../common/i18n';

const steps = [
    {
        title: translate('Take a quick tour'),
        text : `
          <p>
            ${translate('Ready to learn how to use Binary Bot?')}
          </p>
          <div class="tour-custom-buttons">
            <a class="button-secondary" onclick="tour.stop()"><span>${translate('No Thanks')}</span></a>
            <a class="button" onclick="tour.next()"><span>${translate('Yes')}</span></a>
          </div>
          <div class="tour-custom-buttons">
            <input type="checkbox" id="do-not-ask-me-again"></input>
            <label for="do-not-ask-me-again">
                ${translate('Do not ask me again.')}
            </label>
          </div>
          `,
        selector: '#center',
        position: 'top',
        style   : {
            textAlign: 'center',
            arrow    : {
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
        text : `<p>
      ${translate('Drag and drop block files.')}
      <a target="blank" href="https://shop.binary.com/collections/strategies">
        ${translate('Download sample strategies')}
      </a>
      ${translate('or')} ${translate('make your own strategies.')}
    </p>`,
        selector: '#workspace_center',
        position: 'top',
    },
    {
        title: translate('Blocks toolbox'),
        text : `<p>
      ${translate('Add more blocks from here to your bot.')}
    </p>`,
        selector: '.blocklyToolboxDiv',
        position: 'right',
    },
    {
        title: translate('Accounts'),
        text : `<p>
      ${translate('Login before starting your bot. Always test your strategies with the virtual account.')}
    </p>`,
        selector: '.intro-login-logout',
        position: 'left',
    },
    {
        title: translate('Bot controls'),
        text : `<p>
      ${translate('Control your blocks. Hold the cursor on each button for more info.')}
    </p>`,
        selector: '#zoomIn',
        position: 'left',
    },
    {
        title: translate('Enjoy!'),
        text : `<p>
      ${translate('Want to report an issue or ask for help?')}
      <a target="blank" href="https://github.com/binary-com/binary-bot/issues/new">
        ${translate('Click here')}
      </a>
    </p>`,
        selector: '#center',
        position: 'top',
        style   : {
            arrow: {
                display: 'none',
            },
        },
    },
];

export default steps;
