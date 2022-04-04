import React from "react";
import { translate } from "../../../../../../common/utils/tools";

const NotificationsContainer = React.forwardRef(({ setIsOpen }, containerRef) => {
    const hideNotifications = e => !containerRef.current.contains(e.target) && setIsOpen(false);

    React.useEffect(() => {
        window.addEventListener("click", hideNotifications);

        return () => window.removeEventListener("click", hideNotifications);
    })

    return (
        <div id="header__notification-container" className="header__notification-container show" ref={containerRef}>
            <div className="header__notification-header">
                <span>{translate("Notifications")}</span>
                <img id="header__notification-close" className="btn__close mobile-show" src="image/deriv/ic-close.svg" onClick={() => setIsOpen(false)} />
            </div>
            <div id="header__notification-content" className="header__notification-content">
                <div id="header__notification-empty" className="header__notification-empty">
                    <img id="header__notification-empty-img" src="image/deriv/ic-box.svg" />
                    <div className="header__notification-empty-text">{translate("No notifications")}</div>
                    <div className="header__notification-empty-desc">{translate("You have yet to receive any notifications")}</div>
                </div>
            </div>
        </div>
    )
})

const Notifications = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef();

    return (
        <div id="header__notification" className="header__notification header__menu-item">
            <div
                id="header__notiifcation-icon-container" className="header__notification-icon-container"
                onClick={() => setIsOpen(!isOpen)}
            >
                <img id="header__notification-icon" className="header__notification-icon header__icon-button" src="image/deriv/ic-bell.svg" />
                <div id="header__notification-count" className="header__notification-count"></div>
            </div>
            {isOpen && <NotificationsContainer setIsOpen={setIsOpen} ref={containerRef} />}
        </div>
    )
}

export default Notifications;
