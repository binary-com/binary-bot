import React from 'react'
import { translate } from '../../../common/i18n';
import {getLanguageBase} from '../../../common/lang'



const MoveToDerivNav = ({isFromBinary}) => (
    <div className='navigation'>
        <div className='navigation-container'>
            <div className="navigation-logo">
                <a href="#">
                    <img src="image/binary.png" />
                </a>
            </div>
            {!isFromBinary && <a href={getLanguageBase('oauth')} className="navigation-to-deriv" rel="noopener noreferrer">
                <button className='btn-group right-btn'>
                    {translate('Take me to Deriv')}
                </button>
            </a>}
        </div>
    </div>

)
export default MoveToDerivNav;