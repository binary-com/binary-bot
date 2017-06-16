import React, { PropTypes } from 'react';
import { translate } from '../../../common/i18n';

const OfficialVersionWarning = ({ show }) =>
    show
        ? <div
              style={{
                  bottom    : '0px',
                  position  : 'fixed',
                  zIndex    : 9999,
                  background: '#c03',
                  color     : 'white',
                  width     : '100%',
                  textAlign : 'center',
                  fontSize  : '1rem',
                  lineHeight: '25px',
              }}
          >
              <div id="end-note">
                  {translate('This is not an official version of Binary Bot, use at your own risk.')}
                  <a style={{ fontSize: '1rem', textDecoration: 'underline' }} href="https://bot.binary.com/bot.html">
                      {translate('Official Version')}
                  </a>
              </div>
          </div>
        : null;

OfficialVersionWarning.propTypes = {
    show: PropTypes.bool.isRequired,
};

export default OfficialVersionWarning;
