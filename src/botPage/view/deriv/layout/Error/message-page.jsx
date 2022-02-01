import React from 'react';
import PropTypes from 'prop-types';

const MessagePage = ({title, message, children}) => (
    (
        <div className='message-page__container'>
            <div className='message-page__container-format'>
                <h2 className='message-page__container__header'>{title}</h2>
                <p className='message-page__container__paragraph'>{message}</p>
                {children}
            </div>
    
        </div>
    )
);

MessagePage.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    children: PropTypes.any,
};

export default MessagePage;
