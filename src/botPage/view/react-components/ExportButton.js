import React from 'react';
import { exportButton as exportButtonStyle } from '../style';

const ExportButton = ({ onClick, customStyle }) => (
    <button onClick={onClick} style={{ ...exportButtonStyle, ...customStyle }} className="icon-save" />
);

export default ExportButton;
