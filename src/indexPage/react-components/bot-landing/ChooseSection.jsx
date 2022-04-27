import React from 'react';
import { translate } from '../../../common/i18n';

const ChooseSection = () => (
    <section className='choose-wrapper'>
        <div className='choose-wrapper-inner section-container'>
            <h1 className='choose-wrapper-inner-title'>{translate('6 reasons you’ll love Deriv')}</h1>
            <div className='choose-wrapper-inner-section-content'>
                <div className='choose-wrapper-inner-left'>
                    <div className='choose-wrapper-inner-left-content'>
                        <div className='choose-wrapper-inner-placeholder'>
                            <img src="image/trading-platforms.svg" />
                        </div>
                        <div className='choose-wrapper-inner-description'>
                            <h1>{translate('7 trading platforms — old favourites and new ones, too')}</h1>
                            <h2>{translate('You’ll find Binary Bot and SmartTrader alongside new platforms like DBot and DTrader. Whatever your trading style, we’ve got the platform for you.')}</h2>
                        </div>
                    </div>
                    <div className='choose-wrapper-inner-left-content'>
                        <div className='choose-wrapper-inner-placeholder'>
                            <img src="image/trade-types.svg" />
                        </div>
                        <div className='choose-wrapper-inner-description'>
                            <h1>{translate('3 trade types')}</h1>
                            <h2>{translate('Trade CFDs, digital options, and multipliers, a new, exciting trade type that boosts your potential profits with limited risk.')}</h2>
                        </div>
                    </div>
                    <div className='choose-wrapper-inner-left-content'>
                        <div className='choose-wrapper-inner-placeholder'>
                            <img src="image/market_types.svg" />
                        </div>
                        <div className='choose-wrapper-inner-description'>
                            <h1>{translate('6 market types')}</h1>
                            <h2>{translate('Expand your portfolio with a wide range of markets such as forex, stocks, cryptocurrencies, synthetics, and more.')}</h2>
                        </div>
                    </div>
                </div>
                <div className='choose-wrapper-inner-right'>
                    <div className='choose-wrapper-inner-right-content'>
                        <div className='choose-wrapper-inner-placeholder'>
                            <img src="image/fiat-on-ramp.svg" />
                        </div>
                        <div className='choose-wrapper-inner-description'>
                            <h1 className='mb0'>{translate('Cryptocurrency deposits via')}</h1>
                            <h1>{translate('fiat on-ramp')}</h1>
                            <h2>{translate('Make crypto deposits easily via exchange services such as Changelly, Banxa, and XanPool.')}</h2>
                        </div>
                    </div>
                    <div className='choose-wrapper-inner-right-content'>
                        <div className='choose-wrapper-inner-placeholder'>
                            <img src="image/peer-to-peer.svg" />
                        </div>
                        <div className='choose-wrapper-inner-description'>
                            <h1>{translate('Peer-to-peer deposits and withdrawals')}</h1>
                            <h2>{translate('Exchange your local currency with fellow traders to get funds in and out of your account with Deriv P2P.')}</h2>
                        </div>
                    </div>
                    <div className='choose-wrapper-inner-right-content'>
                        <div className='choose-wrapper-inner-placeholder'>
                            <img src="image/deriv_academy.svg" />
                        </div>
                        <div className='choose-wrapper-inner-description'>
                            <h1>{translate('Learn with Deriv Academy')}</h1>
                            <h2>{translate('Enjoy complimentary articles and videos to help you learn the ropes of online trading.')}</h2>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
);

export default ChooseSection;