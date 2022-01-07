import React from 'react';

const SidebarToggler = () => {
    const toggle = () => {
        const togglerElem = document.getElementById('sidebar-toggle-action');
        const sidebarElem = document.getElementsByClassName('blocklyToolboxDiv')[0];

        if (togglerElem.classList.contains('open')) {
            togglerElem.classList.remove('open');
            sidebarElem.classList.remove('open');
        } else {
            togglerElem.classList.add('open');
            sidebarElem.classList.add('open');
        }
    };

    return (
        <div id="sidebar-toggle-action" onClick={toggle}>
            <span>
                <img src="image/deriv/ic-chevron-down-bold.svg" />
            </span>
        </div>
    );
};

export default SidebarToggler;
