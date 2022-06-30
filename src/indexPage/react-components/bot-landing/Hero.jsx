import React from 'react'
import { translate } from '../../../common/i18n';

const getnerateURL = (url) => {
    if (url.split('?').length !== null 
        && url.split('?').length !== undefined){
        const baseUrl = url.split('?')[0];
        const queryParams = url.split('?')[1];
        return `${baseUrl}bot.html?${queryParams}`
    }else{
        return `${url.replace(/\/+$/, '')}/bot.html`
    }
    
}

const Hero = () => (
    <section className="hero">
        <div className="hero-inner section-container">

            <div className="hero-inner__content">
                <h1>{translate('Binary Bot has a new home')}</h1>
                <h2>
                    {translate('We’ve been Binary.com for 2 decades and it’s time for an exciting new chapter. Your favourite bot builder, Binary Bot, is now on Deriv, our new home. Come take a peek.')}
                </h2>
                <div className="btn-group">
                    <a href="https://bot.deriv.com">
                        <button className="l-btn primary">{translate('Take me to Binary Bot on Deriv')}</button>
                    </a>
                    <a href={getnerateURL(window.location.href)}>
                        <button className="l-btn">{translate('Maybe later')}</button>
                    </a>
                </div>
            </div>
            <div className="hero-inner__placeholder">
                <a href=''>
                    <img className='hero-inner__binary_logo' src="image/binary.svg" />
                </a>
                <img src="image/laptop-1.webp" />
            </div>
        </div>
    </section>
);

export default Hero