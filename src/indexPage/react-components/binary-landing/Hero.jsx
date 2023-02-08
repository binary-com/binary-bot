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

const Hero = ({isFromBinary}) => {
    const renderFromBinaryContent = () => (
        <div className="hero-wrapper-container_box-binary hero-wrapper-container-left-binary">
            <h1>{translate('We have a new home: Deriv.')}</h1>
            <h2>
                {translate('We’ve rebranded the online trading space by offering new innovative products, intuitive platforms, and outstanding services.')}
            </h2>
            <div className="btn-group-binary">
                <button className="l-btn-binary primary" onClick={() => window.open(getLanguageBase('deriv'),'_self')}>
                    {translate('Explore Deriv')}
                </button>
                <button className="l-btn-binary" onClick={() => window.open(getLanguageBase('signup'),'_self')}>
                    {translate('Create a demo account')}

                </button>
            </div>
        </div>
    );

    const renderBinaryLandingContent = () => (
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
            <div className="btn-group-binary">
                <button className="l-btn-binary primary" onClick={() => window.open(getLanguageBase('deriv'),'_self')}>
                    {translate('Hello Deriv!')}
                </button>
                <button className="l-btn-binary" onClick={() => setBinaryCookieAndRedirect(getLanguageBase('binary'))}>
                    {translate('Maybe later')}
                </button>
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
                {isFromBinary ? renderFromBinaryContent() : renderBinaryLandingContent()}
                {renderCarousel()}
            </section>
        </div>
    );
};

export default Hero;
