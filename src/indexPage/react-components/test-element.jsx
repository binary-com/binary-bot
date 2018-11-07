import React, { Component }  from 'react';
import { List } from './elements.jsx';

const FooterColumn = ({ header, items }) => (
    <div className='gr-4'>
        <h4 className='secondary-color'><strong>{header}</strong></h4>
        <List items={items} id="test" className="test-class" />
    </div>
);

export default FooterColumn;