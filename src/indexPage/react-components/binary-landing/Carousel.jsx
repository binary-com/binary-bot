import React from 'react';
import Slider from 'react-slick';
import { translate } from '../../../common/i18n';

const carouselContentArray = [
    {
        url: 'https://smarttrader.deriv.com/',
        action_text: translate('Check it out'),
        img: 'image/landing-carousel/smart-trader.png',
        platform_title: translate('SmartTrader'),
        platform_description: translate('Our classic options trading platform'),
    },
    {
        url: 'https://bot.deriv.com/',
        action_text: translate('Check it out'),
        img: 'image/landing-carousel/binary-bot.png',
        platform_title: translate('Binary Bot'),
        platform_description: translate('Our classic automated trading platform'),
    },
    {
        url: 'https://deriv.com/dmt5/',
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/mt5.png',
        platform_title: translate('Deriv MT5'),
        platform_description: translate('The world-famous CFD trading platform'),
    },
    {
        url: 'https://deriv.com/dtrader/',
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/dtrader.png',
        platform_title: translate('DTrader'),
        platform_description: translate('Our flagship options and multipliers trading platform'),
    },
    {
        url: 'https://deriv.com/dbot/',
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/dbot.png',
        platform_title: translate('DBot'),
        platform_description: translate('Our next generation automated trading platform'),
    },
    {
        url: 'https://deriv.com/landing/deriv-go/',
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/deriv-go.png',
        platform_title: translate('Deriv GO'),
        platform_description: translate('Trade on-the-go with our mobile trading platform'),
    },
    {
        url: 'https://deriv.com/derivx/',
        action_text: translate('Learn more'),
        img: 'image/landing-carousel/derivX.png',
        platform_title: translate('Deriv X'),
        platform_description: translate('Our customisable CFD trading platform'),
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
                                    <h1 className="platform_title" >{platform_title}</h1>
                                    <h2 className="platform_description" >{platform_description}</h2>
                                </div>
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
                    const { url, action_text, img, platform_title, platform_description } = slide;
                    return (
                        <div className="carousel_section__slide_card">
                            <div className="carousel_slide_info_wrapper">
                                <h1 className="platform_title" >{platform_title}</h1>
                                <h2 className="platform_description" >{platform_description}</h2>
                            </div>
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
