import React from 'react'
import { translate } from '../../../common/i18n';

const TakeDeriv = () => (
    <div className="take-deriv">
        <div className="take-deriv_background">
            <div className="take-deriv_iphone">
                <img src="/image/phone-desctop.png" />
            </div>
            <div className="take-deriv_qr-code">
                <h1>{translate('Take Deriv with you')}</h1>
                <h2>{translate('Get the Deriv GO mobile app and trade on the go. Never miss golden opportunities again.')}</h2>
                <div>
                    <img src="/image/qr-code.png" />
                </div>
                <h3>{translate('Scan this QR code to download Deriv GO')}</h3>
            </div>

        </div>
    </div>
);

export default TakeDeriv
