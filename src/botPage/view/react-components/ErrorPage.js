import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '../../../common/i18n';
import * as style from '../style';

const ErrorPage = ({ title, message }) => (
    <div style={style.errorDiv}>
        <h3 style={style.Header3}> {`${translate(title)} `}</h3>
        <p>{`${translate(message)} `}</p>
    </div>
);

ErrorPage.propTypes = {
    title  : PropTypes.string,
    message: PropTypes.string,
};

export default ErrorPage;
