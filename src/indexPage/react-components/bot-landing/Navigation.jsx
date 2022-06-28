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
            <div>
                <button className='btn-group r-btn'>
                    {translate('Take me to deriv')}
                </button>
            </div>
        </div>
    </div>

)
export default MoveToDerivNav;