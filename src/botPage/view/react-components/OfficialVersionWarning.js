import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '../../../common/i18n';
import * as style from '../style';

const OfficialVersionWarning = ({ show }) =>
    show ? (
        <div style={style.bottomWarning}>
            <div id="end-note">
                {`${translate('This is not an official version of Binary Bot, use at your own risk.')} `}
                <a style={style.bottomWarningLink} href="https://bot.binary.com/bot.html">
                    {translate('Official Version')}
                </a>
            </div>
        </div>
    ) : null;

OfficialVersionWarning.propTypes = {
    show: PropTypes.bool.isRequired,
};

export default OfficialVersionWarning;
