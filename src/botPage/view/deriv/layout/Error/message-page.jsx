import React from 'react';


const MessagePage = (props) => (
    (
        <div className='message-page__container'>
            <div className='message-page__container-format'>
                <h2 className='message-page__container__header'>{props.title}</h2>
                <p className='message-page__container__paragraph'>{props.message}</p>
                {props.children}
            </div>
    
        </div>
    )
);

export default MessagePage;
