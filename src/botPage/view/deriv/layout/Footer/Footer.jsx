import React from "react";
import NetworkStatus from "./components/network-status.jsx";
import ServerTime from "./components/server-time.jsx";
import ToggleFullScreen from "./components/toggle-fullscreen.jsx";
import LanguageSelector from "./components/language-selector.jsx";

const FooterIconSeparator = () => <div className="footer-icon-separator" />;

const HelpCenter = () => (
    <a id="help-center" className="footer__link" href="https://deriv.com/help-centre" target="_blank">
        <img src="image/deriv/ic-help-centre.svg" />
    </a>
);

const Footer = ({ api }) => {
    return (
        <footer className="footer">
            <NetworkStatus api={api} />
            <FooterIconSeparator />
            <LanguageSelector />
            <FooterIconSeparator />
            <ServerTime api={api} />
            <FooterIconSeparator />
            <div className="footer__links">
                <HelpCenter />
                <ToggleFullScreen />
            </div>
        </footer>
    );
};

export default Footer;
