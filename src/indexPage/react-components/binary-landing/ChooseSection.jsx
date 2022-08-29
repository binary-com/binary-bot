import React from 'react';
import { translate } from '../../../common/i18n';
import {getLanguageBase } from '../../../common/lang';

const ChooseSection = () => (
    <section className='binary-choose-wrapper'>
        <div className='binary-choose-wrapper-inner binary-section-container'>
            <h1 className='binary-choose-wrapper-inner-title'>{translate('Everything you love about Binary.com and more')}</h1>
            <div className='binary-choose-wrapper-inner-section-content'>
                <div className='binary-choose-wrapper-inner-left'>
                    <div className='binary-choose-wrapper-inner-left-content'>
                        <div className='binary-choose-wrapper-inner-placeholder'>
                            <img src="image/trading-platforms.svg" />
                        </div>
                        <div className='binary-choose-wrapper-inner-description'>
                            <h1>{translate('7 platforms to choose from')}</h1>
                            <h2>{translate('You’ll find SmartTrader and Binary Bot alongside new platforms like DTrader and Deriv X. Whatever your trading style, we’ve got the platform for you.')}</h2>
                        </div>
                    </div>
                    <div className='binary-choose-wrapper-inner-left-content'>
                        <div className='binary-choose-wrapper-inner-placeholder'>
                            <img src="image/trade-types.svg" />
                        </div>
                        <div className='binary-choose-wrapper-inner-description'>
                            <h1>{translate('3 trade types')}</h1>
                            <h2>{translate('Trade CFDs, digital options, and multipliers, a new exciting trade type that boosts your potential profits with limited risk.')}</h2>
                        </div>
                    </div>
                    <div className='binary-choose-wrapper-inner-right-content'>
                        <div className='binary-choose-wrapper-inner-placeholder'>
                            <img src="image/fiat-on-ramp.svg" />
                        </div>
                        <div className='binary-choose-wrapper-inner-description'>
                            <h1 className='mb0'>{translate('Crypto deposits via fiat on-ramp')}</h1>
                            <h2>{translate('Make crypto deposits easily via exchange services such as Changelly, Banxa, and XanPool.')}</h2>
                        </div>
                    </div>
                </div>
                <div className='binary-choose-wrapper-inner-right'>
                    <div className='binary-choose-wrapper-inner-right-content'>
                        <div className='binary-choose-wrapper-inner-placeholder'>
                            <img src="image/instruments.svg" />
                        </div>
                        <div className='binary-choose-wrapper-inner-description'>
                            <h1>{translate('Over 100+ instruments')}</h1>
                            <h2>{translate('Trade what you like — forex, commodities, stocks, stock indices, and synthetic indices. ')}</h2>
                        </div>
                    </div>
                    <div className='binary-choose-wrapper-inner-left-content'>
                        <div className='binary-choose-wrapper-inner-placeholder'>
                            <img src="image/market_types.svg" />
                        </div>
                        <div className='binary-choose-wrapper-inner-description'>
                            <h1>{translate('6 market types')}</h1>
                            <h2>{translate('Expand your portfolio with a wide range of markets such as forex, stocks, cryptocurrencies, synthetics, and more.')}</h2>
                        </div>
                    </div>
                    <div className='binary-choose-wrapper-inner-right-content'>
                        <div className='binary-choose-wrapper-inner-placeholder'>
                            <img src="image/support.svg" />
                        </div>
                        <div className='binary-choose-wrapper-inner-description'>
                            <h1>{translate('Support when you need it')}</h1>
                            <h2>{translate('Get round-the-clock customer support and access to the Help Centre.')}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="binary-choose-wrapper-inner_btn">
                <a href={getLanguageBase('deriv')}>
                    <button className="l-btn danger">{translate('Explore Deriv now')}</button>
                </a>
            </div>
        </div>
    </section>
);

export default ChooseSection;