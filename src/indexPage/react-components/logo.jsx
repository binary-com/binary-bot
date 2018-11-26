import React from 'react';
import { createUrl } from '../../common/utils/tools';

const Logo = () => (
    <a href={createUrl('', '', false)} target="blank" id="logo">
        <div className="logo-parent">
            <div className="logo">
                <img className="responsive" src={'image/symbol.svg'} alt="Binary-logo" />
            </div>
            <div className="binary-logo-text">
                <img className="responsive" src={'image/type.svg'} alt="Binary-logo" />
            </div>
        </div>
    </a>
);
export default Logo;