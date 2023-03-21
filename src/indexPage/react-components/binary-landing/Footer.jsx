import React from 'react'
import { translate } from '../../../common/i18n';


// TODO :- NEED TO IMPORT TEXT FROM TRANSLATONS.JS FILE

const Footer = () => (
    <section className='about-trade-wrapper'>
        <div className='about-trade-wrapper-inner section-container'>
            <div className='about-trade-wrapper-inner-social-icons-wrapper'>
                <div className='about-trade-wrapper-deriv-icons'>
                    <img src='image/derivLogo.png' />
                </div>
                <div className='about-trade-wrapper-social-icons'>
                    <a href="https://www.youtube.com/@deriv" target="_blank"><img src='image/youtube.svg' /></a>
                    <a href="https://www.reddit.com/user/Deriv_official/" target="_blank"><img src='image/reddit.svg' /></a>
                    <a href="https://t.me/derivdotcomofficial" target="_blank"><img src='image/telegram.svg' /></a>
                    <a href="https://www.facebook.com/derivdotcom" target="_blank"><img src='image/facebook.svg' /></a>
                    <a href="https://twitter.com/derivdotcom/" target="_blank"><img src='image/twitter.svg' /></a>
                    <a href="https://www.instagram.com/deriv_official/" target="_blank"><img src='image/instagram.svg' /></a>
                    <a href="https://www.linkedin.com/company/derivdotcom/" target="_blank"><img src='image/linkedin.svg' /></a>


                </div>
            </div>
            <div className='about-trade-wrapper-inner-social-icons-mobile'>
                <a href="https://www.youtube.com/@deriv" target="_blank"><img src='image/youtube.svg' /></a>
                <a href="https://www.reddit.com/user/Deriv_official/" target="_blank"><img src='image/reddit.svg' /></a>
                <a href="https://t.me/derivdotcomofficial" target="_blank"><img src='image/telegram.svg' /></a>
                <a href="https://www.facebook.com/derivdotcom" target="_blank"><img src='image/facebook.svg' /></a>
                <a href="https://twitter.com/derivdotcom/" target="_blank"><img src='image/twitter.svg' /></a>
                <a href="https://www.instagram.com/deriv_official/" target="_blank"><img src='image/instagram.svg' /></a>
                <a href="https://www.linkedin.com/company/derivdotcom/" target="_blank"><img src='image/linkedin.svg' /></a>
            </div>
            <div className='about-trade-wrapper-inner-info'>
                <div className='about-trade-wrapper-inner-info-location'>
                    <p>{translate('Deriv Investments (Europe) Limited is licensed and regulated by the Malta Financial Services Authority, Triq L-Imdina, Zone 1, Central Business District, Birkirkara CBD 1010, Malta, under the Investment Services Act ')}<b><a href='https://deriv.com/regulatory/Deriv_Investments_(Europe)_Limited.pdf' target="_blank">{translate('(licence)')}</a></b>{translate('. The registered office of Deriv Investments (Europe) Limited is at W Business Centre, Level 3, Triq Dun Karm, Birkirkara BKR9033, Malta.')}</p>
                    <p>{translate('Deriv (FX) Ltd is licensed by Labuan Financial Services Authority ')}<b><a href='https://deriv.com/regulatory/Deriv_(FX)_Ltd.pdf' target="_blank">{translate('(licence)')}</a></b>{translate('. The registered office of Deriv (FX) Ltd is at F16, Level 1, Paragon Labuan, Jalan Tun Mustapha, 87000 Labuan, Malaysia.')}</p>
                    <p>{translate('Deriv (BVI) Ltd is licensed by the British Virgin Islands Financial Services Commission ')}<b><a href='https://deriv.com/regulatory/Deriv_(BVI)_Ltd.pdf' target="_blank">{translate('(licence)')}</a></b>{translate('. The registered office of Deriv (BVI) is at Kingston Chambers, P.O. Box 173, Road Town, Tortola, British Virgin Islands.')}</p>
                    <p>{translate('Deriv (V) Ltd is licensed and regulated by the Vanuatu Financial Services Commission ')}<b><a href='https://deriv.com/regulatory/Deriv_(V)_Ltd.pdf' target="_blank">{translate('(licence)')}</a></b>{translate('. The registered office of Deriv (V) Ltd is at 1276 Kumul Highway, Port Vila, Vanuatu.')}</p>
                    <p>{translate('Deriv (SVG) LLC has a registered office at Hinds Buildings, Kingstown, St. Vincent and the Grenadines.')}</p>
                    <p>{translate('Deriv Holdings (Guernsey) Limited — 2nd Floor, 1 Cornet Street, St Peter Port, Guernsey, GY1 1BZ — is the holding company for the above subsidiaries.')}</p>

                </div>
                <div className='about-trade-wrapper-inner-info-trade'>
                    <p>{translate('Please remember that CFDs and other products offered on this website are complex derivatives and may not be suitable for all clients. Trading in these products carries a substantial risk of losing money rapidly.')}</p>
                    <p>{translate('Make sure to read our ')}<b><a href='https://deriv.com/terms-and-conditions/' target="_blank">{translate('Terms and conditions')}</a></b>{translate(', ')} <b><a href='https://deriv.com/terms-and-conditions/' target="_blank">{translate('Risk disclosure')}</a></b>{translate(', and')} <b><a href='https://deriv.com/responsible/' target="_blank">{translate('Secure and responsible trading')}</a></b>{translate(' to fully understand the risks involved before using our services. Please also note that the information on this website does not constitute investment advice.')}</p>
                </div>
            </div>

        </div>
    </section >
)

export default Footer