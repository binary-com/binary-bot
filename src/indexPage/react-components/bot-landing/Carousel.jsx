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
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        initialSlide: 1,
        // autoplay: true,
        // autoplaySpeed: 5000,
        // nextArrow: <span className='arrow'><img src='./image/icon.svg' /></span>,
        // prevArrow: <span className='arrow right'><img src='./image/icon.svg' /></span>,
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
        <div className="">

            <Slider {...settings}>
                {carouselContentArray.map((slide, index) => {
                    const { url, action_text, img } = slide;
                    return (
                        <div className="slide_card">
                            <img className="slide_img" src={img} />
                            <a href={url} target="_blank">
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
            {/* <Slider {...settings}>
                {carouselContentArray.map((slide, index) => {
                    const { title, content, action_text, img } = slide;
                    return (
                        <section className='landing_carousel' key={index}>
                            <div className='landing_carousel_content'>
                                <h1>{title}</h1>
                                <h2>{content}</h2>
                                <a href="https://bot.deriv.com" target="_blank">
                                    <button className="l-btn danger">{action_text}</button>
                                </a>
                            </div>
                            <div className='landing_carousel_placeholder'>
                                <div className="bot-gif-placeholder">
                                    <div className="bot-gif-placeholder__background">
                                        <img src={img} />
                                        <div className="bot-gif-placeholder__background__overlay">
                                            <video autoPlay muted loop>
                                                <source src={img} type="video/mp4" />
                                                <source src={img} type="video/ogg" />
                                            </video>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                }
                )}
            </Slider> */}
        </div>
    );
}
export default Carousel;
