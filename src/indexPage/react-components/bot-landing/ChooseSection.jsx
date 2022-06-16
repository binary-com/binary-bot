import React from 'react';
import { translate } from '../../../common/i18n';
import Translations from './Translations';


const ChooseSection = () => (
    <section className='choose-wrapper'>
        <div className='choose-wrapper-inner section-container'>
            <h1 className='choose-wrapper-inner-title'>{translate('6 reasons you’ll love Deriv')}</h1>
            <div className='choose-wrapper-inner-section-content'>
                <div className='choose-wrapper-inner-left desktopcontent'>
                    {Translations.carouselContentLeftArray.map((slide, index) => {
                        const { title, content, img } = slide;
                        return (
                            <div className='choose-wrapper-inner-left-content' key={index}>
                                <div className='choose-wrapper-inner-left-content-placeholder'>
                                    <img src={img} />
                                </div>
                                <div className='choose-wrapper-inner-left-content-description'>
                                    <h1>{title}</h1>
                                    <h2>{content}</h2>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <div className='choose-wrapper-inner-right desktopcontent'>
                    {Translations.carouselContentRightArray.map((slide, index) => {
                        const { title, content, img } = slide;
                        return (
                            <div className='choose-wrapper-inner-right-content' key={index}>
                                <div className='choose-wrapper-inner-right-content-placeholder'>
                                    <img src={img} />
                                </div>
                                <div className='choose-wrapper-inner-right-content-description'>
                                    <h1>{title}</h1>
                                    <h2>{content}</h2>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <div className='choose-wrapper-inner-right mobilecontent'>
                    {Translations.carouselContentMobileArray.map((slide, index) => {
                        const { title, content, img } = slide;
                        return (
                            <div className='choose-wrapper-inner-right-content' key={index}>
                                <div className='choose-wrapper-inner-right-content-placeholder'>
                                    <img src={img} />
                                </div>
                                <div className='choose-wrapper-inner-right-content-description'>
                                    <h1>{title}</h1>
                                    <h2>{content}</h2>
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