import React from 'react';


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

export default MessagePage;
