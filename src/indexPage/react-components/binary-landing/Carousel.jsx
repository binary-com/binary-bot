import React from 'react';
import Slider from 'react-slick';
import { translate } from '../../../common/i18n';

const carouselContentArray = [
    {
        url: 'https://smarttrader.deriv.com/',
        action_text: translate('Check it out'),
        img: 'image/landing-carousel/smart-trader.png',
    },
    {
        url: 'https://bot.deriv.com/',
        action_text: translate('Check it out'),
        img: 'image/landing-carousel/binary-bot.png',
    },
    {
        url: 'https://deriv.com/dmt5/',
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/mt5.png',
    },
    {
        url: 'https://deriv.com/dtrader/',
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/dtrader.png',
    },
    {
        url: 'https://deriv.com/dbot/',
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/dbot.png',
    },
    {
        url: 'https://deriv.com/landing/deriv-go/',
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/deriv-go.png',
    },
    {
        url: 'https://deriv.com/derivx/',
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/derivX.png',
    },
]


const Carousel = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        variableWidth: true,
        // initialSlide: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
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
        <div className="carousel_section">
            <div className="carousel_section__desktop">
                <Slider {...settings}>
                    {carouselContentArray.map((slide, index) => {
                        const { url, action_text, img } = slide;
                        return (
                            <div className="carousel_section__slide_card">
                                <img className="carousel_section__slide_img" src={img} />
                                <a href={url} target="_blank">
                                    <button className="carousel_section__arrow-btn">
                                        <div className="carousel_section__btn_inner">
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
            <div className="carousel_section__mobile">
                    {carouselContentArray.map((slide, index) => {
                        const { url, action_text, img } = slide;
                        return (
                            <div className="carousel_section__slide_card">
                                <img className="carousel_section__slide_img" src={img} />
                                <a href={url} target="_blank">
                                    <button className="carousel_section__arrow-btn">
                                        <div className="carousel_section__btn_inner">
                                            {action_text}
                                            <img src={`image/landing-carousel/arrow.svg`} />
                                        </div>
                                    </button>
                                </a>
                            </div>
                        )
                    }
                    )}
            </div>
        </div>
    );
}
export default Carousel;
