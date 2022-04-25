import React from 'react';
import Carousel from './Carousel.jsx';
import { translate } from '../../common/i18n';
import { getOAuthURLDeriv } from '../../common/appId';
// eslint-disable-next-line arrow-body-style
const BotLanding = () => {
    return (
        <div>
            <Hero />
            <SectionOne />
            <Carousel />
            <SectionTwo />
            <SectionThree />
            <Footer />
        </div>
    );
};

export default BotLanding;




const Hero = () => (
    <section className="hero">
        <div className="hero-1 l-container">

            <div className="hero-1__content">
                <h1>{translate('Binary Bot has a new home')}</h1>
                <h2>
                    {translate('We’ve been Binary.com for 2 decades and it’s time for an exciting new chapter.Your favourite bot builder, Binary Bot, is now on Deriv, our new home.Come take a peek.')}
                </h2>
                <div className="btn-group">
                    <a href="https://bot.deriv.com" target="_blank">
                        <button className="l-btn primary">{translate('Take me to deriv')}</button>
                    </a>
                    <a href="/bot.html">
                        <button className="l-btn">{translate('Maybe later')}</button>
                    </a>
                </div>
            </div>
            <div className="hero-1__placeholder">
                <a href=''>
                    <img className='hero-1__binary_logo' src="image/binary.svg" />
                </a>
                <img src="image/laptop-1.webp" />
            </div>
        </div>
    </section>
);

const SectionOne = () => (
    <section className="switch">
        <div className="switch-inner l-container">
            <div className="switch-inner__placeholder">
                <img src="image/sectionTwoLandingImages.png" />
            </div>
            <div className="switch-inner__content">
                <h1>{translate('It’s so easy to switch to Deriv')}</h1>
                <h2>
                    {translate('Just log in using your Binary.com credentials. No sign-up needed.')}
                </h2>
                <div className="btn-group">
                    <a href={getOAuthURLDeriv()}>
                        <button className="l-btn danger">{translate('Try it now')}</button>
                    </a>
                    <a href="/bot.html">
                        <button className="l-btn">{translate('Maybe later')}</button>
                    </a>
                </div>
            </div>
        </div>
    </section>
);

const SectionTwo = () => (
    <section className='choose-wrapper'>
        <div className='choose-inner l-container'>
            <h1 className='choose-inner-title'>{translate('6 reasons you’ll love Deriv')}</h1>
            <div className='choose-inner-section-content'>
                <div className='choose-inner-left'>
                    <div className='choose-inner-left-content'>
                        <div className='choose-placeholder'>
                            <img src="image/trading-platforms.svg" />
                        </div>
                        <div className='choose-description'>
                            <h1>{translate('7 trading platforms — old favourites and new ones, too')}</h1>
                            <h2>{translate('You’ll find Binary Bot and SmartTrader alongside new platforms like DBot and DTrader. Whatever your trading style, we’ve got the platform for you.')}</h2>
                        </div>
                    </div>
                    <div className='choose-inner-left-content'>
                        <div className='choose-placeholder'>
                            <img src="image/trade-types.svg" />
                        </div>
                        <div className='choose-description'>
                            <h1>{translate('3 trade types')}</h1>
                            <h2>{translate('Trade CFDs, digital options, and multipliers, a new, exciting trade type that boosts your potential profits with limited risk.')}</h2>
                        </div>
                    </div>
                    <div className='choose-inner-left-content'>
                        <div className='choose-placeholder'>
                            <img src="image/market_types.svg" />
                        </div>
                        <div className='choose-description'>
                            <h1>{translate('6 market types')}</h1>
                            <h2>{translate('Expand your portfolio with a wide range of markets such as forex, stocks, cryptocurrencies, synthetics, and more.')}</h2>
                        </div>
                    </div>
                </div>
                <div className='choose-inner-right'>
                    <div className='choose-inner-right-content'>
                        <div className='choose-placeholder'>
                            <img src="image/fiat-on-ramp.svg" />
                        </div>
                        <div className='choose-description'>
                            <h1 className='mb0'>{translate('Cryptocurrency deposits via')}</h1>
                            <h1>{translate('fiat on-ramp')}</h1>
                            <h2>{translate('Make crypto deposits easily via exchange services such as Changelly, Banxa, and XanPool.')}</h2>
                        </div>
                    </div>
                    <div className='choose-inner-right-content'>
                        <div className='choose-placeholder'>
                            <img src="image/peer-to-peer.svg" />
                        </div>
                        <div className='choose-description'>
                            <h1>{translate('Peer-to-peer deposits and withdrawals')}</h1>
                            <h2>{translate('Exchange your local currency with fellow traders to get funds in and out of your account with Deriv P2P.')}</h2>
                        </div>
                    </div>
                    <div className='choose-inner-right-content'>
                        <div className='choose-placeholder'>
                            <img src="image/deriv_academy.svg" />
                        </div>
                        <div className='choose-description'>
                            <h1>{translate('Learn with Deriv Academy')}</h1>
                            <h2>{translate('Enjoy complimentary articles and videos to help you learn the ropes of online trading.')}</h2>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
);

const SectionThree = () => (
    <section className='wait-wrapper'>
        <div className='wait-wrapper-inner l-container'>
            <div className='wait-content'>
                <h1>{translate('Don’t wait')}</h1>
                <h2>{translate('Future-proof your trading. Come over to Deriv now.')}</h2>
                <div className="btn-group">
                    <a href="https://bot.deriv.com" target="_blank">
                        <button className="l-btn danger">{translate('Trade Binary Bot on Deriv')}</button>
                    </a>
                </div>
            </div>
            <div className='wait-placeholder'>
                <img src="image/dont-wait-image.svg"></img>
            </div>
        </div>

    </section>
)

const Footer = () => (
    <section className='about-trade-wrapper'>
        <div className='about-trade-wrapper-inner l-container'>
            <div className='about-trade-wrapper-inner-social-icons-wrapper'>
                <div className='about-trade-wrapper-inner-deriv-icons'>
                    <img src='image/derivLogo.png' />
                </div>
                <div className='about-trade-wrapper-inner-social-icons'>
                    <a href="https://www.facebook.com/derivdotcom" target="_blank"><img src='image/facebook.svg' /></a>
                    <a href="https://twitter.com/derivdotcom/" target="_blank"><img src='image/twitter.svg' /></a>
                    <a href="https://www.instagram.com/deriv_official/" target="_blank"><img src='image/instagram.svg' /></a>
                    <a href="https://www.linkedin.com/company/derivdotcom/" target="_blank"><img src='image/linkedin.svg' /></a>
                </div>
            </div>
            <div className='about-trade-wrapper-inner-social-icons-mobile'>
                <a href="https://www.facebook.com/derivdotcom" target="_blank"><img src='image/facebook.svg' /></a>
                <a href="https://twitter.com/derivdotcom/" target="_blank"><img src='image/twitter.svg' /></a>
                <a href="https://www.instagram.com/deriv_official/" target="_blank"><img src='image/instagram.svg' /></a>
                <a href="https://www.linkedin.com/company/derivdotcom/" target="_blank"><img src='image/linkedin.svg' /></a>
            </div>
            <div className='location-info'>
                <p>{translate('Deriv Investments (Europe) Limited, W Business Centre, Level 3, Triq Dun Karm, Birkirkara BKR 9033, Malta, is licensed in Malta (')}<b>{translate('licence no. IS/70156')}</b>{translate(') and regulated by the Malta Financial Services Authority under the Investments Services Act to provide investment services in the European Union. Authorised by the Financial Conduct Authority and deemed with variation of permission. Subject to regulation by the Financial Conduct Authority.The nature and extent of consumer protections may differ from those for firms based in the UK. Details of the Financial Services Contracts Regime, which allows EEA-based firms to operate in the UK for a limited period to carry on activities that are necessary for the performance of pre-existing contracts, are available on the Financial Conduct Authority’s website.')}</p>
                <p>{translate('Outside the EU, financial products are offered by the following companies: Deriv (FX) Ltd, F16, Level 1, Paragon Labuan, Jalan Tun Mustapha, 87000 Labuan, Malaysia, licensed by Labuan Financial Services Authority (')}<b>{translate('licence no. MB/18/0024')}</b>{translate(') Deriv (BVI) Ltd, Kingston Chambers, P.O. Box 173, Road Town, Tortola, British Virgin Islands, licensed by the British Virgin Islands Financial Services Commission (')}<b>{translate('licence no. SIBA/L/18/1114')}</b>{translate(') Deriv (V) Ltd (')}<b>{translate('view licence')}</b>{translate('), 1276, Kumul Highway, Port Vila, Vanuatu, licensed and regulated by the Vanuatu Financial Services Commission; and Deriv (SVG) LLC, Hinds Buildings, Kingstown, St. Vincent and the Grenadines.')}</p>
                <p>{translate('Deriv Limited — 13 Castle Street, St. Helier, JE2 3BT, Jersey — is the holding company for the above subsidiaries.')}</p>
                <p>{translate('This websites services are not available in certain countries, including the USA, Canada, and Hong Kong, or to persons below 18.')}</p>
            </div>
            <div className='trade-info'>
                <p>{translate('CFDs are considered complex derivatives and may not be suitable for retail clients. CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money. The products mentioned here may be affected by changes in currency exchange rates. If you invest in these products, you may lose some or all of your investment, and the value of your investment may fluctuate. You should never invest money that you cannot afford to lose and never trade with borrowed money.')}</p>
                <p>{translate('Before trading in the complex financial products offered, please be sure to understand the risks involved and learn about ')}<b>{translate('Secure and responsible trading.')}</b></p>
            </div>
        </div>
    </section >
)
