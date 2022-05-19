import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '../../../common/i18n';
import * as style from '../style';

const ErrorPage = ({ title, message, redirectButtonTitle, redirectButtonURL }) => (
    <div style={style.errorDiv}>
        <h3 style={style.errorHeader}> {`${translate(title)} `}</h3>
        <div style={style.errorMessageWrapper}>
            <p style={style.errorMessage}>{`${translate(message)} `}</p>
        </div>
        {redirectButtonTitle && (
            <div style={style.linkButtonWrapper}>
                <a style={style.linkButton} href={redirectButtonURL} target="_blank" rel="noopener noreferrer">
                    <span>{redirectButtonTitle}</span>
                </a>
            </div>
        )}
    </div>
);

ErrorPage.propTypes = {
    title  : PropTypes.string,
    message: PropTypes.string,
};

export default ErrorPage;
