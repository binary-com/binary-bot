import React from 'react';
import classNames from 'classnames';
import { isMobile } from '../../../../../common/utils/tools';

const SidebarToggle = () => {
  const toggle_ref = React.useRef();
  const [is_open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (isMobile()) {
      const blockly_sidebar_container = document.getElementsByClassName('injectionDiv')?.[0];
      if (blockly_sidebar_container && toggle_ref.current) {
        blockly_sidebar_container.appendChild(toggle_ref.current);
      }
    }
  }, []);

  React.useEffect(() => {
    const blockly_toolbox = document.getElementsByClassName('blocklyToolboxDiv')?.[0];
    if (blockly_toolbox) {
      if (is_open) {
        blockly_toolbox.classList.add('blocklyToolboxDiv__toolbox-open');
      } else {
        blockly_toolbox.classList.remove('blocklyToolboxDiv__toolbox-open');
      }
    }
  }, [is_open]);

  return (
    <div
      id="sidebar-toggle-action"
      className={classNames('collapse-toolbox', { 'collapse-toolbox__collapse-open': is_open })}
      ref={toggle_ref}
      onClick={() => setOpen(!is_open)}
    >
      <span>
        <img src="image/deriv/ic-chevron-down-bold.svg" />
      </span>
    </div>
  );
};

export default SidebarToggle;
