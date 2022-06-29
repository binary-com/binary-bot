import React from 'react';
import { translate } from '../../../common/i18n';
import Translations from './Translations';


const ChooseSection = () => (
    <section className='choose-wrapper'>
        <div className='choose-wrapper-inner section-container'>
            <h1 className='choose-wrapper-inner-title'>{translate('6 reasons you’ll love Deriv')}</h1>
            <div className='choose-wrapper-inner-section-content'>
                <div className='choose-wrapper-inner-section-content-row'>
                    {Translations.carouselContentArrayOne.map((slide, index) => {
                        const { title, content, img } = slide;
                        return (
                            <div className='choose-wrapper-inner-section-content-row-inner' key={index}>
                                <div className='choose-wrapper-inner-section-content-row-inner-placeholder'>
                                    <img src={img} />
                                </div>
                                <div className='choose-wrapper-inner-section-content-row-inner-description'>
                                    <h1>{translate(title)}</h1>
                                    <h2>{translate(content)}</h2>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <div className='choose-wrapper-inner-section-content-row'>
                    {Translations.carouselContentArrayTwo.map((slide, index) => {
                        const { title, content, img } = slide;
                        return (
                            <div className='choose-wrapper-inner-section-content-row-inner' key={index}>
                                <div className='choose-wrapper-inner-section-content-row-inner-placeholder'>
                                    <img src={img} />
                                </div>
                                <div className='choose-wrapper-inner-section-content-row-inner-description'>
                                    <h1>{translate(title)}</h1>
                                    <h2>{translate(content)}</h2>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <div className='choose-wrapper-inner-section-content-row'>
                    {Translations.carouselContentArrayThree.map((slide, index) => {
                        const { title, content, img } = slide;
                        return (
                            <div className='choose-wrapper-inner-section-content-row-inner' key={index}>
                                <div className='choose-wrapper-inner-section-content-row-inner-placeholder'>
                                    <img src={img} />
                                </div>
                                <div className='choose-wrapper-inner-section-content-row-inner-description'>
                                    <h1>{translate(title)}</h1>
                                    <h2>{translate(content)}</h2>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    </section>
);

export default ChooseSection;