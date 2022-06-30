import React from 'react';
import { translate } from '../../../common/i18n';

const CardSection = () => {
    const cardContentArray = [
        {
            title  : translate('Trade multipliers'),
            content: translate('Amplify your potential profit without risking more than your stake.'),
            img    : 'image/multiplier.png',
        },
        {
            title  : translate('Peer-to-peer payments'),
            content: translate('Exchange your local currency with fellow traders to get funds in and out of your account with Deriv P2P.'),
            img    : 'image/p2p.png',
        },
        {
            title  : translate('Learn with Deriv Academy'),
            content: translate('Enjoy complimentary articles and videos to help you learn the ropes of online trading.'),
            img    : 'image/academy.png',
        },
        {
            title  : translate('Crash/Boom indices'),
            content: translate('Predict and potentially gain from exciting spikes and dips. Only available with multipliers on DTrader.'),
            img    : 'image/crashboom.png',
        },
    ]

    return (
        <div className='card-container card-wrapper'>
            <div className='section-container-holder card-wrapper-holder'>
                <div className="container-header  card-wrapper-holder-header">
                    <h1>{translate ('Exclusively on Deriv')}</h1>
                    <h2>{translate('There’s a bright future ahead.')}</h2>
                    <h2>{translate ('Find these bonus features and more on Deriv:')}</h2>
                </div>
            </div>
            <div className="card-container card-wrapper-holder-container">
                {cardContentArray.map((card, index) => {
                    const { title, content,img } = card;
                    return (
                        <div className='card-wrapper-holder-container-content' key={index}>
                            <div>
                                <img src={img} />
                            </div>
                            <h1>{title}</h1>
                            <h2>{content}</h2>
                        </div>
                    )
                })
                } 
            </div>

        </div>
    )
}

export default CardSection;