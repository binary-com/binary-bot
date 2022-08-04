import React, { render } from 'react'
import { set as setStorage, remove } from '../../../common/utils/storageManager';
import { renderPopup, setTimeOutBanner, setTimeOutPopup, elements, timerForBanner } from '../../index';
import { translate } from '../../../common/i18n';

const setDueDateAgain = () => {
    remove('setDueDateForBanner');
    remove('setPopupToken');
    setStorage('setDueDateForBanner', new Date().getTime() + 1000 * 120);
    setStorage('setPopupToken', new Date().getTime() + 1000 * 60);
    renderPopup('close');
    clearTimeout(timerForBanner);
    setTimeOutBanner();
    setTimeOutPopup();
}

const renderBanner = () => {
    const getqueryParameter = document.location.search;
    const getDefaultPath = window.location.href.replace('/bot.html', getqueryParameter);
    window.location.replace(getDefaultPath);
    render(<ModalComponent />, document.getElementById('bot-landing-alert-popup'));
    render(<BotLanding />, document.getElementById('bot-landing'));
    elements.map(elem => document.querySelector(elem).classList.add('hidden'));
    document.getElementById('bot-landing').classList.remove('hidden');
    document.getElementById('bot-main').classList.remove('hidden');
    $('.barspinner').hide();
}

const ModalComponent = () => (
    <div className='bot-landing-alert bot-landing-alert-draggable-dialog draggable-dialog'>
        <div className='bot-landing-alert-header bot-landing-alert-draggable-dialog-header'>
            <img src="image/close_icon.svg" alt="close popup" onClick={setDueDateAgain} />
        </div>
        <h1 className='bot-landing-alert-title'>{translate('Use Binary Bot on Deriv, our new home')}</h1>
        <p className='bot-landing-alert-para'>{translate('In 5 minutes, we’ll show you the benefits of trading Binary Bot on Deriv.If you ignore this message, we’ll remind you again in 3 weeks.')}</p>
        <div className='bot-landing-alert-button bot-landing-alert-btn-group'>
            <button className='default' onClick={renderBanner}>{translate('Show me the benefits now')}</button>
            <a href="https://bot.deriv.com" target="_blank">
                <button className='primary'>{translate('Take me to Binary Bot on Deriv')}</button>
            </a>
        </div>
    </div>
)

export default ModalComponent