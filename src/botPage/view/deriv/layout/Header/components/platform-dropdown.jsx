import React from 'react';
import classNames from 'classnames';
import { translate } from '../../../../../../common/utils/tools';
import { useLocation } from "react-router-dom";
import { platforms } from '../../../config';

const PlatformDropdown = React.forwardRef(({ hideDropdown, setIsPlatformSwitcherOpen }, platformDropdownRef) => {
    const location = useLocation();

    React.useEffect(() => {
        window.addEventListener("click", hideDropdown);
        return () => window.removeEventListener("click", hideDropdown);
    })

    const handleClick = (e, is_binary_bot) => {
        if(e && is_binary_bot) {
            setIsPlatformSwitcherOpen(false);
            e.preventDefault();
        }
    }

    return (
        <div id="platform__dropdown" className="platform__dropdown show">
            <div id="platform__list" className="platform__dropdown-list" ref={platformDropdownRef}>
                {platforms.map(platform => {
                    const is_binary_bot = platform.title === 'Binary Bot' && location.pathname === '/';
                    return (
                        <a
                            href={is_binary_bot ? '#' : platform.link}
                            className={
                                classNames('platform__list-item', {
                                    'platform__list-item--active': platform.title === "Binary Bot"
                                })
                            }
                            key={`link-to-${platform.title.replace(/ /g, '').toLowerCase()}`}
                            onClick={e => handleClick(e, is_binary_bot)}
                        >
                            <img src={platform.logo} className="platform__list-item-icon" />
                            <div className="platform__list-item-text">
                                <div className="platform__list-item-name">{platform.title}</div>
                                <div className="platform__list-item-desc">{translate(platform.description)}</div>
                            </div>
                        </a>
                    )
                })}
            </div>
        </div>
    )
})

export default PlatformDropdown;
