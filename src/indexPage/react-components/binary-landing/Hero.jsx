import React from 'react'
import Slider from 'react-slick';
import { translate } from '../../../common/i18n';

const carouselImageArray = [
    {
        img: 'image/hero-dmt5.png',
    },
    {
        img: 'image/hero-derivgo.png',
    },
    {
        img: 'image/hero-derivx.png',
    },
    {
        img: 'image/hero-dtrader.png',
    },
]

const Hero = () => {
    const settings = {
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
    return (
        <section className="binary-hero">
            <div className="binary-hero-inner section-container">

                <div className="binary-hero-inner__content">
                    <h1>{translate('We’re moving!')}</h1>
                    <h2>
                        {translate('We’ve been')}<b>{translate(' Binary.com')}</b>{translate(' for 2 decades and it’s time for an exciting new chapter.')}
                    </h2>
                    <div className='binary-hero-inner_content-subheader'>
                        <h2>{translate('Say hello to our new home,')}<b>{translate(' Deriv.')}</b>
                        </h2>
                    </div>
                    <div className="btn-group">
                        <a href="https://deriv.com" target="_blank">
                            <button className="l-btn primary">{translate('Hello Deriv!')}</button>
                        </a>
                        <a href={`${window.location.href.replace(/\/+$/, '')}/bot.html`}>
                            <button className="l-btn">{translate('Maybe later')}</button>
                        </a>
                    </div>
                </div>
                <div className="binary-hero-inner__placeholder">
                    <a href=''>
                        <img className='binary-hero-inner__binary_logo' src="image/binary.svg" />
                    </a>
                    <div className="binary-hero-inner__placeholder-inner">
                        <Slider {...settings}>
                            {carouselImageArray.map((slide, index) => {
                                const { img } = slide;
                                return (
                                    <div>
                                        <div className='binary-hero-inner__placeholder-image-container'>
                                            <img
                                                className="binary-hero-inner__slide_img"
                                                key={index}
                                                src={img}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Hero
