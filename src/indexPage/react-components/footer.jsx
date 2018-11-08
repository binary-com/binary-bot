import React from 'react';
import RenderHTML from 'react-render-html';
import { translate as i18nTranslate } from '../../common/i18n.js';
import { getLanguage } from '../../common/lang';
import { isProduction } from '../../common/appId';

const createUrl = (url, lang = getLanguage(), addLanguage = true) => {
    if (isProduction()) {
        return `${document.location.protocol}//${document.location.hostname}/${(addLanguage && lang ? lang + '/' : '')}${url}.html`;
    } else {
        return `https://binary.com/${(addLanguage && lang ? lang + '/' : '')}${url}.html`;
    }
};

const translate = (input) => {

    if (Array.isArray(input)) {

        const stringToBeTranslated = input[0].replace(/\[_([0-9])\]/g, '%$1');
        let translatedString = i18nTranslate(stringToBeTranslated);

        input.slice(1)
            .forEach((replacement, index) => {
                const regex = new RegExp('%' + (index + 1), 'g')
                translatedString = translatedString.replace(regex, replacement);
            });

        const returnValue = RenderHTML(translatedString);
        return returnValue;

    } else {
        const returnValue = i18nTranslate(input);
        return returnValue;
    }
}

const SocialIcons = ({ networks }) => (
    <div id='social-icons' className='social-icons flex-row'>
        {networks.map((net, idx) => (
            <a key={idx} href={net.href} target='_blank' rel='noopener noreferrer'>
                <img src={`image/footer/${net.media}.svg`} />
            </a>
        ))}
    </div>
);

const Footer = () => (
    <div id="footer-container">
        <div id='footer-regulatory' className='primary-bg-color-dark gr-padding-10"'>
            <div className='container eu-hide'>
                <div className='gr-row'>
                    <div className='gr-12'>
                        <div className='icon-row flex-row gr-child'>
                            <div className='regulation-logos flex-row'>
                                <span className='vanuatu-icon'>
                                    <img className='responsive' src={'image/footer/vanuatu-logo.png'} />
                                </span>
                                <span className='bvi-icon'>
                                    <img className='responsive' src={'image/footer/bvi.png'} />
                                </span>
                                <span className='labuan-icon'>
                                    <img className='responsive' src={'image/footer/labuan_FSA.svg'} />
                                </span>
                            </div>
                            <SocialIcons
                                networks={[
                                    { media: 'youtube', href: 'https://www.youtube.com/user/BinaryTradingVideos' },
                                    { media: 'google-plus', href: 'https://plus.google.com/+Binarydotcom' },
                                    { media: 'facebook', href: 'https://www.facebook.com/binarydotcom' },
                                    { media: 'twitter', href: 'https://twitter.com/Binarydotcom' },
                                    { media: 'telegram', href: 'https://t.me/binarydotcom' },
                                    { media: 'reddit', href: 'https://www.reddit.com/r/binarydotcom/' },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div className='gr-row'>
                    <div className='gr-12'>
                        <p>
                            {translate(['In the EU, financial products are offered by Binary Investments (Europe) Ltd., Mompalao Building, Suite 2, Tower Road, Msida MSD1825, Malta, regulated as a Category 3 Investment Services provider by the Malta Financial Services Authority ([_1]licence no. IS/70156[_2]).', `<a href="${createUrl('download/WS-Binary-Investments-Europe-Limited.pdf', '', false)}" target="_blank">`, '</a>'])}
                        </p>
                        <p>
                            {translate(['Outside the EU, financial products are offered by Binary (C.R.) S.A., 5th Floor, Building 6 Centro Ejecutivo La Sabana, Sabana Sur, San José, Costa Rica, Binary (V) Ltd, Govant Building, Port Vila, PO Box 1276, Vanuatu, regulated by the Vanuatu Financial Services Commission ([_1]view licence[_2]), Binary (BVI) Ltd, 2nd Floor, O’Neal Marketing Associates Building, Wickham’s Cay II, P.O. Box 3174, Road Town, Tortola VB1110, British Virgin Islands, regulated by the British Virgin Islands Financial Services Commission ([_3]licence no. SIBA/L/18/1114[_4]), and Binary (FX) Ltd., Lot No. F16, First Floor, Paragon Labuan, Jalan Tun Mustapha, 87000 Labuan, Malaysia, regulated by the Labuan Financial Services Authority to carry on a money-broking business ([_5]licence no. MB/18/0024[_6])',
                                '<a href="https://www.vfsc.vu/wp-content/uploads/2015/12/List-of-Licensees-under-Dealers-in-Securities-Licensing-Act-CAP-70-18.11.2016.pdf" target="_blank" rel="noopener noreferrer">', '</a>',
                                `<a href="${createUrl('download/regulation/BVI_license.pdf', '', false)}" target="_blank">`, '</a>',
                                `<a href="${createUrl('download/regulation/Labuan-license.pdf', '', false)}" target="_blank">`, '</a>'])}
                        </p>
                        <p>
                            {translate(['This website’s services are not made available in certain countries such as the USA, Canada, Costa Rica, Hong Kong, Japan, or to persons under age 18.'])}
                        </p>
                        <fieldset className='fld-risk-warning'>
                            <legend>{translate(['Risk Warning'])}</legend>
                            <p>{translate(['The financial products offered via this website include binary options, contracts for difference ("CFDs") and other complex derivatives and financial products. Trading binary options may not be suitable for everyone. Trading CFDs carries a high level of risk since leverage can work both to your advantage and disadvantage. As a result, the products offered on this website may not be suitable for all investors because of the risk of losing all of your invested capital. You should never invest money that you cannot afford to lose, and never trade with borrowed money. Before trading in the complex financial products offered, please be sure to understand the risks involved and learn about [_1]Responsible Trading[_2].', `<a href="${createUrl('responsible-trading')}">`, '</a>'])}</p>
                        </fieldset>
                    </div>
                </div>
            </div>
            <div className='container eu-show invisible'>
                <div className='gr-row'>
                    <div className='gr-12'>
                        <div className='icon-row flex-row'>
                            <div className='regulation-logos flex-row'>
                                <a className='iom-icon' href='https://www.gov.im/gambling/' target='_blank' rel='noopener noreferrer'>
                                    <img className='responsive' src={'image/footer/isle-of-man.png'} />
                                </a>
                                <div className='lga-gamstop-icon-container'>
                                    <a className='gamstop-icon' href='https://www.gamstop.co.uk' target='_blank' rel='noopener noreferrer'>
                                        <img className='responsive' src={'image/footer/gamstop.svg'} />
                                    </a>
                                    <a className='lga-icon' href='https://www.authorisation.mga.org.mt/verification.aspx?lang=EN&company=a5fd1edc-d072-4c26-b0cd-ab3fa0f0cc40&details=1' target='_blank' rel='noopener noreferrer'>
                                        <img className='responsive' src={'image/footer/mga-logo-footer.svg'} />
                                    </a>
                                </div>
                            </div>
                            <SocialIcons
                                networks={[
                                    { media: 'youtube', href: 'https://www.youtube.com/user/BinaryTradingVideos' },
                                    { media: 'google-plus', href: 'https://plus.google.com/+Binarydotcom' },
                                    { media: 'facebook', href: 'https://www.facebook.com/binarydotcom' },
                                    { media: 'twitter', href: 'https://twitter.com/Binarydotcom' },
                                    { media: 'telegram', href: 'https://t.me/binarydotcom' },
                                    { media: 'reddit', href: 'https://www.reddit.com/r/binarydotcom/' },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div className='gr-row'>
                    <div className='gr-12'>
                        <p>
                            {translate(['In the EU, financial products are offered by Binary Investments (Europe) Ltd., Mompalao Building, Suite 2, Tower Road, Msida MSD1825, Malta, licensed and regulated as a Category 3 Investment Services provider by the Malta Financial Services Authority (licence no. IS/70156).'])}
                        </p>
                        <p>
                            {translate(['In the Isle of Man and the UK, Volatility Indices are offered by Binary (IOM) Ltd., First Floor, Millennium House, Victoria Road, Douglas, IM2 4RW, Isle of Man, British Isles; licensed and regulated respectively by (1) the Gambling Supervision Commission in the Isle of Man (current licence issued on 31 August 2017) and by (2) the Gambling Commission in the UK (licence [_1]reference no: 39172[_2]).', '<a href="https://secure.gamblingcommission.gov.uk/PublicRegister/Search/Detail/39172" target="_blank" rel="noopener noreferrer">', '</a>'])}
                        </p>
                        <p>
                            {translate(['In the rest of the EU, Volatility Indices are offered by Binary (Europe) Ltd., Mompalao Building, Suite 2, Tower Road, Msida MSD1825, Malta; licensed and regulated by (1) the Malta Gaming Authority in Malta (licence no. MGA/B2C/102/2000 issued on 01 August 2018), for UK clients by (2) the UK Gambling Commission (licence [_1]reference no: 39495[_2]), and for Irish clients by (3) the Revenue Commissioners in Ireland (Remote Bookmaker\'s Licence no. 1010285 issued on 1 July 2017). View complete [_3]Regulatory Information[_2].', '<a href="https://secure.gamblingcommission.gov.uk/PublicRegister/Search/Detail/39495" target="_blank" rel="noopener noreferrer">', '</a>', `<a href="${createUrl('regulation')}">`])}
                        </p>
                    </div>
                </div>
                <div className='gr-row'>
                    <div className='gr-12'>
                        <div className='about-binary'>
                            <p>
                                {translate(['Binary.com is an award-winning online trading provider that helps its clients to trade on financial markets through binary options and CFDs. Trading binary options and CFDs on Volatility Indices is classified as a gambling activity. Remember that gambling can be addictive – please play responsibly. Learn more about [_1]Responsible Trading[_2]. Some products are not available in all countries. This website’s services are not made available in certain countries such as the USA, Canada, Costa Rica, Hong Kong, or to persons under age 18.', `<a href="${createUrl('responsible-trading')}">`, '</a>'])}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='gr-row'>
                    <div className='gr-12'>
                        <div className='risk-warning'>
                            <p>
                                {translate(['Trading binary options may not be suitable for everyone, so please ensure that you fully understand the risks involved. Your losses can exceed your initial deposit and you do not own or have any interest in the underlying asset.'])}
                            </p>
                            <p className='eu-only invisible'>
                                {translate(['CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. Between 74-89% of retail investor accounts lose money when trading CFDs. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.'])}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id='end-note' className='invisible content-inverse-color center-text' />
    </div>
);

export default Footer;
