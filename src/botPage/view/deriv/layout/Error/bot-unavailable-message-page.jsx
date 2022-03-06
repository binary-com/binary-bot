import React from 'react';
import { useSelector } from 'react-redux';
import MessagePage from './message-page.jsx';
import { translate } from '../../../../../common/i18n';
import { getRelatedDeriveOrigin } from '../../utils/index.js';

const BotUnavailableMessage = () => {
    const { show_bot_unavailable_page } = useSelector(state => state.ui);

    return (
        show_bot_unavailable_page && (
            <MessagePage
                title={translate('Binary Bot is not available for your account')}
                message={translate(
                    'Unfortunately, you can’t access our automated trading platform with this account. How about trading CFDs on DMT5 or trading multipliers on DTrader instead?'
                )}
            >
                <div className='bot-unavailable-message-page__container'>
                    
                    <a href={`${getRelatedDeriveOrigin().origin}/mt5#real` }
                        className='link_button bot-unavailable-message-page__container-button'>
                        {translate('Trade on DMT5')}
                    </a>
                    <a href={getRelatedDeriveOrigin().origin} className='link_button'>
                        {translate('Trade on DTrader')}
                    </a>
                </div>
            </MessagePage>
        )
    );
};

export default BotUnavailableMessage;
