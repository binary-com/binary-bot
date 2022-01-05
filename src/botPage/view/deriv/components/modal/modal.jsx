import React from "react";
import classNames from 'classnames';

const Modal = ({ children, title, onClose, action, class_name }) => {
  return (
    <div className={classNames('modal', class_name && `modal-${class_name}`)}>
      <div className="modal__container">
        <div className="modal__header">
          <div className="modal__header-title">{title}</div>
          <div className="modal__header-right">
            <div className="modal__header-right-action">{action}</div>
            <button className="modal__header-right-close" onClick={onClose} />
          </div>
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
