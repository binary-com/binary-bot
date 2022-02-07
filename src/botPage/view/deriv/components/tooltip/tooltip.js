/* eslint-disable indent */
import React, { useState } from 'react';

const Tooltip = props => {
    let timeout;
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, props.delay || 0);
    };

    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };

    return (
        <div
            className="Tooltip-Wrapper"
            // When to show the tooltip
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {props.children}
            {active && <div className={`Tooltip-Tip ${props.direction || 'top'}`}>{props.content}</div>}
        </div>
    );
};

export default Tooltip;
