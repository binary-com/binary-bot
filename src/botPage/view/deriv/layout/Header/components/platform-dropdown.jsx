import React from 'react';

const PlatformDropdown = ({ platforms }) => {

    return (
        <div id="platform__list" className="platform__dropdown-list">
            {platforms.map(platform => {
                return (
                    <a href={platform.link} 
                        className={
                            platform.title === "DerivBot" ? "platform__list-item platform__list-item--active" : "platform__list-item"
                        }
                        key={`link-to-${platform.title.replace(/ /g,'').toLowerCase()}`}
                    >
                        <img src={platform.logo} className="platform__list-item-icon" />
                        <div className="platform__list-item-text">
                            <div className="platform__list-item-name">{platform.title}</div>
                            <div className="platform__list-item-desc">{platform.description}</div>
                        </div>
                    </a>
                )
            })}
        </div>
    )
}

export default PlatformDropdown;
