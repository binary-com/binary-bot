import React from 'react'
import { translate } from '../../../common/i18n';


const MoveToDerivNav = () => (
    <div className='navigation'>
        <div className='navigation-container'>
            <div class="navigation-logo">
                <a href="#">
                    <img src="image/binary.png" />
                </a>
            </div>
            <a href="https://oauth.deriv.com/oauth2/authorize?app_id=16929&l=en&brand=deriv" className="navigation-to-deriv" rel="noopener noreferrer">
                <button className='btn-group right-btn'>
                    {translate('Take me to Deriv')}
                </button>
            </a>
        </div>
    </div>

)
export default MoveToDerivNav;