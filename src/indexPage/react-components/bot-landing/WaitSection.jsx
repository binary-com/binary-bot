import React from 'react';
import { translate } from '../../../common/i18n';



const WaitSection = () => (
    <section className='wait-wrapper'>
        <div className='wait-wrapper-inner section-container'>
            <div className='wait-wrapper-inner-content'>
                <h1>{translate('Don’t wait')}</h1>
                <h2>{translate('Future-proof your trading. Come over to Deriv now.')}</h2>
                <div className="btn-group">
                    <a href="https://deriv.com" target="_blank">
                        <button className="l-btn danger">{translate('Enter the Deriv experience')}</button>
                    </a>
                </div>
            </div>
           
            <img src="../image/dont-wait-image.png"  className='wait-wrapper-inner-placeholder-desktop'/>
            <div className='wait-wrapper-inner-placeholder'>
                <img src="../image/dtrader-mobile.png"  className='wait-wrapper-inner-placeholder-mobile'/>
                <h1>{translate ('Come over to Deriv and future-proof your trading now.')}</h1>
            </div>
        </div>

    </section>
)

export default WaitSection