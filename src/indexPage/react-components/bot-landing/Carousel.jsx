import React from 'react';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import { translate } from '../../../common/i18n';
// import arrow from '../../../../static/image/landing-carousel/arrow.svg'

const carouselContentArray = [
    {
        action_text: translate('Check it out'),
        img: 'image/landing-carousel/smart-trader.png',
    },
    {
        action_text: translate('Check it out'),
        img: 'image/landing-carousel/binary-bot.png',
    },
    {
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/mt5.png',
    },
    {
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/dtrader.png',
    },
    {
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/dbot.png',
    },
    {
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/deriv-go.png',
    },
    {
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/derivX.png',
    },
]

const Carousel = () => {

    const settings = {
        dots: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        // centerMode: true,
        variableWidth: true,
        // rows: 1,
        // dots: false,
        infinite: true,
        // arrows: true,
        // autoplay: false,
        // autoplaySpeed: 5000,
        // nextArrow: <span className='arrow'><img src='./image/icon.svg' /></span>,
        // prevArrow: <span className='arrow right'><img src='./image/icon.svg' /></span>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="carousel-wrapper section-container">
            <Slider {...settings}>
                {carouselContentArray.map((slide, index) => {
                    const { action_text, img } = slide;
                    return (
                        <div className="slick-card">
                            <img className="slick-img" src={img} />
                            <a href="https://bot.deriv.com" target="_blank">
                                <button className="arrow-btn">
                                    <div className="btn_inner">
                                        {action_text}
                                        <img src={`image/landing-carousel/arrow.svg`} />

                                    </div>
                                </button>
                            </a>
                        </div>
                    )
                }
                )}
            </Slider>
        </div>
    );
}
export default Carousel;
