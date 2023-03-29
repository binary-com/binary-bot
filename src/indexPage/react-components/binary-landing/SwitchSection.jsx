import React from 'react';
import { translate } from '../../../common/i18n';
import { getLanguageBase } from '../../../common/lang';

const SwitchSection = () => (
    <section className="switch">
        <div className="switch-inner section-container">
            <div className="switch-inner__placeholder">
                <img src="image/sectionTwoLandingImages.png" />
            </div>
            <div className="switch-inner__content">
                <h1>{translate('It’s so easy to switch to Deriv')}</h1>
                <h2>
                    {translate(
                        'Just log in using your Binary.com credentials. No sign-up needed.'
                    )}
                </h2>
                <div className="btn-group-binary">
                    <button
                        className="l-btn-binary danger"
                        onClick={() => window.open(getLanguageBase('oauth'), '_self')}
                    >
                        {translate('Try it now')}
                    </button>
                </div>
            </div>
        </div>
    </section>
);

export default SwitchSection;
