import React from 'react';
import Slider from 'react-slick';
import { translate } from '../../common/i18n';

const carouselContentArray = [
    {
        title      : 'Where to find Binary Bot on Deriv',
        content    : 'On the Deriv homepage, hit Trade at the top of the page and choose Binary Bot.',
        action_text: 'Try Binary Bot on Deriv',
        img        : 'image/1a.webm',
    },
    {
        title      : 'Bring your bots across seamlessly',
        content    : 'Your strategies from Binary.com can be used on Deriv. Just load your XML files and get trading.',
        action_text: 'Try Binary Bot on Deriv',
        img        : 'image/2a.webm',
    },
    {
        title      : 'Where to find Binary Bot on Deriv',
        content    : 'On the Deriv homepage, hit Trade at the top of the page and choose Binary Bot.',
        action_text: 'Try Binary Bot on Deriv',
        img        : 'image/3a.webm',
    },
]

const Carousel = () => {

    const settings = {
        dots          : false,
        infinite      : true,
        speed         : 500,
        slidesToShow  : 1,
        slidesToScroll: 1,
        arrows        : true,
        autoplay      : true,
        autoplaySpeed : 5000,
        nextArrow     : <span className='arrow'><img src='./image/icon.svg' /></span>,
        prevArrow     : <span className='arrow right'><img src='./image/icon.svg' /></span>,
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
        <div className="carousel-wrapper l-container">
            <Slider {...settings}>
                {carouselContentArray.map((slide, index) => {
                    const { title, content, action_text, img } = slide;
                    return (
                        <section className='landing_carousel' key={index}>
                            <div className='landing_carousel_content'>
                                <h1>
                                    {translate(title)}
                                </h1>
                                <h2>
                                    {translate(content)}
                                </h2>
                                <a href="https://bot.deriv.com" target="_blank">
                                    <button className="l-btn danger">{translate(action_text)}</button>
                                </a>
                            </div>
                            <div className='landing_carousel_placeholder'>
                                <div className="bot-gif-placeholder">
                                    <div className="bot-gif-placeholder__background">
                                        <img src="image/laptop_carousel.webp" />
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
            </Slider>
        </div>
    );
}
export default Carousel;
