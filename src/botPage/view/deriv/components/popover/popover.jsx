import React from 'react';
import { Popover as TinyPopover } from 'react-tiny-popover';

const Popover = ({ children , content })=>{
    const [is_hovered, updateIsHovered] = React.useState(false);
    
    return(
        <span
            onMouseEnter={()=>{updateIsHovered(true)}}
            onMouseLeave={()=>{updateIsHovered(false)}}
        >
        <TinyPopover 
            isOpen={is_hovered}
            positions={['top', 'bottom', 'left', 'right']} // preferred positions by priority
            content={<div className="popover__container"><span>{content}</span></div>}
            >
                {children}
        </TinyPopover>
       </span>
    )
    
}
export default Popover