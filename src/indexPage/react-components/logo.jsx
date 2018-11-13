import React from 'react';
import { createUrl } from '../../common/utils/tools';

const Logo = () => (
    <div>
        <a href={createUrl('', '', false)} target="blank" id="logo">
            <div class="logo-parent">
                <div class="logo">
                    <img class="responsive" src={'image/symbol.svg'} alt="Binary-logo" />
                </div>
                <div class="binary-logo-text">
                    <img class="responsive" src={'image/type.svg'} alt="Binary-logo" />
                </div>
            </div>
        </a>
    </div>
);
export default Logo;