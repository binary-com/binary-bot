import { translate } from '../../../common/i18n';

const steps = [
    {
        title: translate('Take a quick tour'),
        text : `
          <p>
            ${translate('Ready to learn how to use Binary Bot?')}
            <input type="checkbox" id="do-not-ask-me-again"></input>
            <label for="do-not-ask-me-again">
              ${translate('Do not ask me again.')}
            </label>
          </p>
          <div class="tour-custom-buttons">
            <a class="button-secondary" onclick="tour.stop()">
                <span>${translate('No Thanks')}</span>
            </a>
            <a class="button" onclick="tour.next()">
                <span>${translate('Yes')}</span>
            </a>
          </div>
          `,
        selector: '#tour',
        position: 'top',
        style   : {
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
      ${translate('or')}
        <a target="blank" href="https://github.com/binary-com/binary-bot#sample-blocks">
          ${translate('Make your own strategies')}
        </a>
    </p>`,
        selector: '#center',
        position: 'bottom',
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
        selector: '.right-header',
        position: 'left',
    },
    {
        title: translate('Bot controls'),
        text : `<p>
      ${translate('Control your blocks. Hold the cursor on each button for more info.')}
    </p>`,
        selector: '#toolbox',
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
        position: 'bottom',
    },
];

export default steps;
