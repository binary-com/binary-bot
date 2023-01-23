import React from 'react';
import {createUrl, isBinaryDomain} from '../../common/utils/tools';

const Logo = () => {
    if(isBinaryDomain) { return ( <a href={createUrl({path: '', isNonBotPage: true})} target="blank" id="logo">
        <div className="logo-parent">
            <div className="logo">
                <img className="responsive" src={'image/binary-style/logo/symbol.svg'} alt="Binary logo"/>
            </div>
            <div className="binary-logo-text">
                <img className="responsive" src={'image/binary-style/logo/type.svg'} alt="Binary logo"/>
            </div>
        </div>
    </a>)
    } return <></>
};
export default Logo;