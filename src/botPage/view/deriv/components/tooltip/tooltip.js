/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = props => {
    let timeout;
    const [active, setActive] = React.useState(false);

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
        <div className="bot-tooltip" onMouseEnter={showTip} onMouseLeave={hideTip}>
            {props.children}
            {active && <div className={`bot-tooltip__popover ${props.direction || 'top'}`}>{props.content}</div>}
        </div>
    );
};

Tooltip.propTypes = {
    delay: PropTypes.number,
    direction: PropTypes.string,
    content: PropTypes.string.isRequired,
};

export default Tooltip;
