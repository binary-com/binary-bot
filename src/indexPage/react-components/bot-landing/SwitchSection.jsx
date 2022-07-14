import React from 'react';
import { translate } from '../../../common/i18n';
import { getOAuthURLDeriv } from '../../../common/appId';
import { generateURL } from '../../../common/utils/tools'


const SwitchSection = () => (
    <section className="switch">
        <div className="switch-inner section-container">
            <div className="switch-inner__placeholder">
                <img src="image/sectionTwoLandingImages.png" />
            </div>
            <div className="switch-inner__content">
                <h1>{translate('It’s so easy to switch to Deriv')}</h1>
                <h2>
                    {translate('Just log in using your Binary.com credentials. No sign-up needed.')}
                </h2>
                <div className="btn-group">
                    <a href={getOAuthURLDeriv()} target="_blank">
                        <button className="l-btn danger">{translate('Try it now')}</button>
                    </a>
                    <a href={generateURL(window.location.href)} target="_blank">
                        <button className="l-btn transparent">{translate('Maybe later')}</button>
                    </a>
                </div>
            </div>
        </div>
    </section>
);

export default SwitchSection