import React from "react";
import PropTypes from "prop-types";

const Stage = ({ title, inner_classes: { circle, tooltip }, tooltip_text }) => (
  <div className="trade-animator__stage">
    <p className="title">{title}</p>
    <span className={circle} />
    <div className={tooltip}>
      <p>{tooltip_text}</p>
    </div>
  </div>
);

Stage.propTypes = {
  title: PropTypes.string,
  inner_classes: PropTypes.shape({
    circle: PropTypes.string,
    tooltip: PropTypes.string,
  }),
  tooltip_text: PropTypes.string,
};

export default Stage;
