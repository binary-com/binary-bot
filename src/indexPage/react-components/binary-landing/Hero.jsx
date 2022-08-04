import React from 'react'
import Slider from 'react-slick';
import { translate } from '../../../common/i18n';

const carouselImages = [
    'image/hero-dmt5.png',
    'image/hero-derivgo.png',
    'image/hero-derivx.png',
    'image/hero-dtrader.png',
]

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
        <div className='container-x_box-x left-x'>
            <h1>{translate('We’re moving!')}</h1>
            <h2>
                {translate('We’ve been')}<b>{translate(' Binary.com')}</b>{translate(' for 2 decades and it’s time for an exciting new chapter.')}
            </h2>
            <h2>{translate('Say hello to our new home,')}<b>{translate(' Deriv.')}</b></h2>
            <div className="btn-group">
                <a href="https://deriv.com">
                    <button className="l-btn primary">{translate('Hello Deriv!')}</button>
                </a>
                <a href="https://www.binary.com?binary-bot-lp" id="logo">
                    <button className="l-btn">{translate('Maybe later')}</button>
                </a>
            </div>
        </div>
    )

    const renderCarousel = () => (
        <div className='container-x_box-x right-x'>
            <Slider {...carouselSettings}>
                {carouselImages.map((slide, index) => <img key={index} src={slide} />)}
            </Slider>
        </div>
    )


    return (
        <div className='background-x'>
            <section className="container-x">
                {renderContent()}
                {renderCarousel()}
                <div className="logo-x">
                    <img src="image/binary.png" />
                </div>
            </section>
        </div>
    )
};

export default Hero
