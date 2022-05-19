import React from 'react';
import { translate } from '../../../common/i18n';

const MovingBanner = () =>
    document
        .getElementsByClassName('dbot-banner')[0]
        .parentNode.removeChild(document.getElementsByClassName('dbot-banner')[0]) && (
        <div className="moving-banner">
            <div className="moving-banner__separator" />
            <img src={'image/moving-banner.svg'} />
            <p className="moving-banner__text">{translate('Binary.com is moving to Deriv')}</p>
            <a className="moving-banner__button" href="http://deriv.com/">
                {translate('Trade on Deriv')}
            </a>
        </div>
    );

export default MovingBanner;
