import React from 'react';

const exportButtonStyle = {
    position: 'absolute',
    right   : '1.5em',
    zIndex  : 2,
    padding : 0,
    width   : '3em',
    height  : '3em',
};
const ExportButton = ({ onClick, customStyle }) =>
    <button onClick={onClick} style={{ ...exportButtonStyle, ...customStyle }} className="icon-save" />;

export default ExportButton;
