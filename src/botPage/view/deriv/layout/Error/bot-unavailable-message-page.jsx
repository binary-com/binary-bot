import React, { useState, useEffect } from 'react';
import { getTokenList } from '../../../../../common/utils/storageManager';
import { getActiveToken } from '../../../shared';
import MessagePage from './message-page.jsx';
import { translate } from '../../../../../common/i18n';

const BotUnavailableMessage = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const activeToken = getActiveToken(getTokenList());
        const landing_company = activeToken?.loginInfo.landing_company_name;
        if (landing_company === 'maltainvest') setShow(true);
    }, []);

    return (
        show && (
            <MessagePage
                title={translate('Binary Bot is not available for your account')}
                message={translate(
                    'Unfortunately, you can’t access our automated trading platform with this account. How about trading CFDs on DMT5 or trading multipliers on DTrader instead?'
                )}
            >
                <div className='bot-unavailable-message-page__container'>
                    <a href='https://app.deriv.com/mt5#real' 
                        className='LinkButton bot-unavailable-message-page__container-button'>
                        {translate('Trade on DMT5')}
                    </a>
                    <a href='https://app.deriv.com' className='LinkButton'>
                        {translate('Trade on DTrader')}
                    </a>
                </div>
            </MessagePage>
        )
    );
};

export default BotUnavailableMessage;
