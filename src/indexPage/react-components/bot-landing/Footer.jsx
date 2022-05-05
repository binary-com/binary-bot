import React from 'react'
import { translate } from '../../../common/i18n';

const Footer = () => (
    <section className='about-trade-wrapper'>
        <div className='about-trade-wrapper-inner section-container'>
            <div className='about-trade-wrapper-inner-social-icons-wrapper'>
                <div className='about-trade-wrapper-deriv-icons'>
                    <img src='image/derivLogo.png' />
                </div>
                <div className='about-trade-wrapper-social-icons'>
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
            <div>
                <div className='about-trade-wrapper-location-info'>
                    <p>{translate('In the EU, financial products are offered by Deriv Investments (Europe) Limited, W Business Centre, Level 3, Triq Dun Karm, Birkirkara BKR 9033, Malta, licensed in Malta (')}<b>{translate('licence no.IS / 70156')}</b>
                        {translate(') and regulated by the Malta Financial Services Authority under the Investments Services Act to provide investment services in the European Union.Authorised by the Financial Conduct Authority and with deemed variation of permission.Subject to regulation by the Financial Conduct Authority.The nature and extent of consumer protections may differ from those for firms based in the UK.Details of the Financial Services Contracts Regime, which allows EEA-based firms to operate in the UK for a limited period to carry on activities that are necessary for the performance of pre-existing contracts, are available on the Financial Conduct Authority’s website.')}</p>
                    <p>{translate('Outside the EU, financial products are offered by the following companies: Deriv (FX) Ltd, F16, Level 1, Paragon Labuan, Jalan Tun Mustapha, 87000 Labuan, Malaysia, licensed by Labuan Financial Services Authority (')}<b>{translate('licence no. MB/18/0024')}</b> {translate(') Deriv (BVI) Ltd, Kingston Chambers, P.O. Box 173, Road Town, Tortola, British Virgin Islands, licensed by the British Virgin Islands Financial Services Commission(')}<b>{translate('licence no. SIBA/L/18/1114')}</b> {translate(')  Deriv(V) Ltd(')}<b>{translate('view licence')}</b> {translate('), 1276, Kumul Highway, Port Vila, Vanuatu, licensed and regulated by the Vanuatu Financial Services Commission; and Deriv (SVG) LLC, Hinds Buildings, Kingstown, St.Vincent and the Grenadines.')}</p>
                    <p>{translate('Deriv Limited — 13 Castle Street, St. Helier, JE2 3BT, Jersey — is the holding company for the above subsidiaries.')}</p>
                    <p>{translate('This website\'s services are not available in certain countries, including the USA, Canada, and Hong Kong, or to persons below 18.')}</p>
                </div>
                <div className='about-trade-wrapper-trade-info'>
                    <p>{translate('CFDs are considered complex derivatives and may not be suitable for retail clients. CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money. The products mentioned here may be affected by changes in currency exchange rates. If you invest in these products, you may lose some or all of your investment, and the value of your investment may fluctuate. You should never invest money that you cannot afford to lose and never trade with borrowed money.')}</p>
                    <p>{translate('Before trading in the complex financial products offered, please be sure to understand the risks involved and learn about ')}<b>{translate('Secure and responsible trading.')}</b></p>
                </div>
            </div>
               
        </div>
    </section >
)

export default Footer