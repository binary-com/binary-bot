import React from 'react';
import Slider from 'react-slick';
import { translate } from '../../../common/i18n';

const carouselContentArray = [
    {
        url: 'https://smarttrader.deriv.com/',
        action_text: 'Check it out',
        img: 'image/landing-carousel/smart-trader.png',
        platform_title: 'SmartTrader',
        platform_description: 'Our classic options trading platform',
    },
    {
        url: 'https://bot.deriv.com/',
        action_text: 'Check it out',
        img: 'image/landing-carousel/binary-bot.png',
        platform_title: 'Binary Bot',
        platform_description: 'Our classic automated trading platform',
    },
    {
        url: 'https://deriv.com/dmt5/',
        action_text: 'Learn more',
        img: 'image/landing-carousel/mt5.png',
        platform_title: 'Deriv MT5',
        platform_description: 'The world-famous CFD trading platform',
    },
    {
        url: 'https://deriv.com/dtrader/',
        action_text: 'Learn more',
        img: 'image/landing-carousel/dtrader.png',
        platform_title: 'DTrader',
        platform_description: 'Our flagship options and multipliers trading platform',
    },
    {
        url: 'https://deriv.com/dbot/',
        action_text: 'Learn more',
        img: 'image/landing-carousel/dbot.png',
        platform_title: 'DBot',
        platform_description: 'Our next generation automated trading platform',
    },
    {
        url: 'https://deriv.com/landing/deriv-go/',
        action_text: 'Learn more',
        img: 'image/landing-carousel/deriv-go.png',
        platform_title: 'Deriv GO',
        platform_description: 'Trade on-the-go with our mobile trading platform',
    },
    {
        url: 'https://deriv.com/derivx/',
        action_text: 'Learn more',
        img: 'image/landing-carousel/derivX.png',
        platform_title: 'Deriv X',
        platform_description: 'Our customisable CFD trading platform',
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
                        const { url, action_text, img, platform_title, platform_description } = slide;
                        return (
                            <div className="carousel_section__slide_card">
                                <div className="carousel_slide_info_wrapper">
                                    <h1 className="platform_title" >{translate(platform_title)}</h1>
                                    <h2 className="platform_description" >{translate(platform_description)}</h2>
                                </div>
                                <img className="carousel_section__slide_img" src={img} />
                                <a href={url}>
                                    <button className="carousel_section__arrow-btn">
                                        <div className="carousel_section__btn_inner">
                                            {translate(action_text)}
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
                    const { url, action_text, img, platform_title, platform_description } = slide;
                    return (
                        <div className="carousel_section__slide_card">
                            <div className="carousel_slide_info_wrapper">
                                <h1 className="platform_title" >{translate(platform_title)}</h1>
                                <h2 className="platform_description" >{translate(platform_description)}</h2>
                            </div>
                            <img className="carousel_section__slide_img" src={img} />
                            <a href={url}>
                                <button className="carousel_section__arrow-btn">
                                    <div className="carousel_section__btn_inner">
                                        {translate(action_text)}
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
