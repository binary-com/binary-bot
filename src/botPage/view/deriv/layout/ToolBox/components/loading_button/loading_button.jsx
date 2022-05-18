import PropTypes from 'prop-types';
import React from 'react';

const LoadingButton = ({ bars = 5 }) => {
    return (
        <div className="barspinner white">
            {Array.from(new Array(bars)).map((_, i) => <div key={i} className={`rect${i + 1}`} />)}
        </div>
    );
};

LoadingButton.propTypes = {
    bars: PropTypes.number,
};

export default LoadingButton;
