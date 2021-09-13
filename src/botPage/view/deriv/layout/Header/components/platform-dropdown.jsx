import React from 'react';
import { translate } from '../../../../../../common/utils/tools';

const PlatformDropdown = React.forwardRef(({ platforms, hideDropdown }, platformDropdownRef) => {
    React.useEffect(() => {
        window.addEventListener("click", hideDropdown);

        return () => window.removeEventListener("click", hideDropdown);
    })

    return (
        <div id="platform__dropdown" className="platform__dropdown show">
            <div id="platform__list" className="platform__dropdown-list" ref={platformDropdownRef}>
                {platforms.map(platform => {
                    return (
                        <a href={platform.link} 
                            className={
                                platform.title === "Binary Bot" ? "platform__list-item platform__list-item--active" : "platform__list-item"
                            }
                            key={`link-to-${platform.title.replace(/ /g,'').toLowerCase()}`}
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
