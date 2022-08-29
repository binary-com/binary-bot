import React from 'react';
import { translate } from '../../../common/i18n';
import {getLanguageBase} from '../../../common/lang'

const WaitSection = () => (
    <section className='binary-wait-wrapper'>
        <div className='binary-wait-wrapper-inner binary-section-container'>
            <div className='binary-wait-wrapper-inner-content'>
                <h1>{translate('Don’t wait')}</h1>
                <h2>{translate('Future-proof your trading. Come over to Deriv now.')}</h2>
                <div className="btn-group">
                    <a href={getLanguageBase('oauth')}>
                        <button className="l-btn danger">{translate('Enter the Deriv experience')}</button>
                    </a>
                </div>
            </div>
            <img src="image/dont-wait-image.png" className='binary-wait-wrapper-inner-placeholder-binary-desktop' />
            <div className='binary-wait-wrapper-inner-placeholder-binary'>
                <img src="image/dtrader-mobile.png" className='binary-wait-wrapper-inner-placeholder-binary-mobile' />
                <h1>{translate('Come over to Deriv and future-proof your trading now.')}</h1>
            </div>
        </div>

    </section>
)

export default WaitSection