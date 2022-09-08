import React from 'react';
import Slider from 'react-slick';
import { translate } from '../../../common/i18n';
import { getLanguageBase } from '../../../common/lang';
import { setBinaryCookieAndRedirect } from './utils';

const carouselImages = [
    'image/hero-dmt5.png',
    'image/hero-derivgo.png',
    'image/hero-derivx.png',
    'image/hero-dtrader.png',
];

const carouselSettings = {
    dots          : false,
    infinite      : true,
    speed         : 1000,
    slidesToShow  : 1,
    slidesToScroll: 1,
    arrows        : false,
    autoplay      : true,
    autoplaySpeed : 3000,
    responsive    : [
        {
            breakpoint: 1024,
            settings  : {
                slidesToShow  : 1,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 700,
            settings  : {
                slidesToShow  : 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const Hero = () => {
    const renderContent = () => (
        <div className="hero-wrapper-container_box-binary hero-wrapper-container-left-binary">
            <h1>{translate('We’re moving!')}</h1>
            <h2>
                {translate('We’ve been')}
                <b>{translate(' Binary.com')}</b>
                {translate(' for 2 decades and it’s time for an exciting new chapter.')}
            </h2>
            <h2>
                {translate('Say hello to our new home,')}
                <b>{translate(' Deriv.')}</b>
            </h2>
            <div className="btn-group">
                <a href={getLanguageBase('deriv')}>
                    <button className="l-btn primary">
                        {translate('Hello Deriv!')}
                    </button>
                </a>
                <a id="logo" onClick={() => setBinaryCookieAndRedirect(getLanguageBase('binary'))}>
                    <button className="l-btn">{translate('Maybe later')}</button>
                </a>
            </div>
        </div>
    );

    const renderCarousel = () => (
        <div className="hero-wrapper-container_box-binary hero-wrapper-container-right-binary">
            <Slider {...carouselSettings}>
                {carouselImages.map((slide, index) => (
                    <img key={index} src={slide} />
                ))}
            </Slider>
        </div>
    );

    return (
        <div className="hero-wrapper">
            <section className="hero-wrapper-container">
                {renderContent()}
                {renderCarousel()}
                <div className="hero-wrapper-container-logo-binary">
                    <img src="image/binary.png" />
                </div>
            </section>
        </div>
    );
};

export default Hero;
