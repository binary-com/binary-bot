import React from 'react';
import { isMobile } from '../../../../../common/utils/tools';
import cn from 'classnames';

const SidebarToggle = () => {
    const toggleRef = React.useRef();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (isMobile()) {
            const blockly_sidebar_container = document.getElementsByClassName('injectionDiv')?.[0];
            if (blockly_sidebar_container && toggleRef.current) {
                blockly_sidebar_container.appendChild(toggleRef.current);
            }
        }
    }, []);

    React.useEffect(() => {
        const blocklyToolbox = document.getElementsByClassName('blocklyToolboxDiv')?.[0];
        if (blocklyToolbox) {
            if (!open) {
                blocklyToolbox.classList.remove('open');
            } else {
                blocklyToolbox.classList.add('open');
            }
        }
    }, [open]);

    return (
        <div id="sidebar-toggle-action" className={cn({ open })} ref={toggleRef} onClick={() => setOpen(!open)}>
            <span>
                <img src="image/deriv/ic-chevron-down-bold.svg" />
            </span>
        </div>
    );
};

export default SidebarToggle;
