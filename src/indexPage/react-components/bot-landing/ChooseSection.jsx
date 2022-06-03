import React from 'react';
import { translate } from '../../../common/i18n';

const carouselContentLeftArray = [
    {
        title  : translate('7 trading platforms — old favourites and new ones, too'),
        content: translate('You’ll find Binary Bot and SmartTrader alongside new platforms like DBot and DTrader. Whatever your trading style, we’ve got the platform for you.'),
        img    : 'image/trading-platforms.svg',
    },
    {
        title  : translate('3 trade types'),
        content: translate('Trade CFDs, digital options, and multipliers, a new, exciting trade type that boosts your potential profits with limited risk.'),
        img    : 'image/trade-types.svg',
    },
    {
        title  : translate('6 market types'),
        content: translate('Expand your portfolio with a wide range of markets such as forex, stocks, cryptocurrencies, synthetics, and more.'),
        img    : 'image/market_types.svg',
    },
]

const carouselContentRightArray = [
    {
        title  : translate('Cryptocurrency deposits via fiat on-ramp'),
        content: translate('You’ll find Binary Bot and SmartTrader alongside new platforms like DBot and DTrader. Whatever your trading style, we’ve got the platform for you.'),
        img    : 'image/fiat-on-ramp.svg',
    },
    {
        title  : translate('Peer-to-peer deposits and withdrawals'),
        content: translate('Exchange your local currency with fellow traders to get funds in and out of your account with Deriv P2P.'),
        img    : 'image/peer-to-peer.svg',
    },
    {
        title  : translate('Learn with Deriv Academy'),
        content: translate('Enjoy complimentary articles and videos to help you learn the ropes of online trading.'),
        img    : 'image/deriv_academy.svg',
    },
]

const ChooseSection = () => (
    <section className='choose-wrapper'>
        <div className='choose-wrapper-inner section-container'>
            <h1 className='choose-wrapper-inner-title'>{translate('6 reasons you’ll love Deriv')}</h1>
            <div className='choose-wrapper-inner-section-content'>
                <div className='choose-wrapper-inner-left'>
                    {carouselContentLeftArray.map((slide, index) => {
                        const { title, content, img } = slide;
                        return (
                            <div className='choose-wrapper-inner-left-content' key={index}>
                                <div className='choose-wrapper-inner-placeholder'>
                                    <img src={img} />
                                </div>
                                <div className='choose-wrapper-inner-description'>
                                    <h1>{title}</h1>
                                    <h2>{content}</h2>
                                </div>
                            </div>
                        )
                    })
                    },
                </div>
                <div className='choose-wrapper-inner-right'>
                    {carouselContentRightArray.map((slide, index) => {
                        const { title, content, img } = slide;
                        return (
                            <div className='choose-wrapper-inner-right-content' key={index}>
                                <div className='choose-wrapper-inner-placeholder'>
                                    <img src={img} />
                                </div>
                                <div className='choose-wrapper-inner-description'>
                                    <h1>{title}</h1>
                                    <h2>{content}</h2>
                                </div>
                            </div>
                        )
                    })
                    },
                </div>
            </div>
        </div>
    </section>
);

export default ChooseSection;