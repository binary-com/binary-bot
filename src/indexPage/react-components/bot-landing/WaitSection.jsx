import React from 'react';
import { translate } from '../../../common/i18n';

const WaitSection = () => (
    <section className='wait-wrapper'>
        <div className='wait-wrapper-inner section-container'>
            <div className='wait-wrapper-inner-content'>
                <h1>{translate('Don’t wait')}</h1>
                <h2>{translate('Future-proof your trading. Come over to Deriv now.')}</h2>
                <div className="btn-group">
                    <a href="https://bot.deriv.com" target="_blank">
                        <button className="l-btn danger">{translate('Trade Binary Bot on Deriv')}</button>
                    </a>
                </div>
            </div>
            <div className='wait-wrapper-inner-placeholder'>
                <img src="image/dont-wait-image.svg"></img>
            </div>
        </div>

    </section>
)

export default WaitSection