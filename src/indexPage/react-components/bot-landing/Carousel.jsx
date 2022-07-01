import React from 'react';
import Slider from 'react-slick';
import { translate } from '../../../common/i18n';
import Translations from './Translations';
import { translate } from '../../../common/i18n';

const Carousel = () => {

    const settings = {
        dots          : false,
        infinite      : true,
        speed         : 1000,
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
        <div className="carousel-wrapper section-container">
            <Slider {...settings}>
                {Translations.carouselContentArray.map((slide, index) => {
                    const { title, content, action_text, img } = slide;
                    return (
                        <section className='landing_carousel' key={index}>
                            <div className='landing_carousel_content'>
                                <h1>{translate(title)}</h1>
                                <h2>{translate(content)}</h2>
                                <a href="https://bot.deriv.com">
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
