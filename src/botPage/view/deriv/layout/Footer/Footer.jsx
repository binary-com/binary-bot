import React from "react";
import NetworkStatus from "./components/network-status.jsx";
import ServerTime from "./components/server-time.jsx";
import ToggleFullScreen from "./components/toggle-fullscreen.jsx";
import LanguageSelector from "./components/language-selector.jsx";

const FooterIconSeparator = () => <div className="footer-icon-separator" />;

const HelpCenter = () => (
    <div id="help-center" className="footer__link" onClick={() => window.location.replace("https://deriv.com/help-centre")}>
        <img src="image/deriv/ic-help-centre.svg" />
    </div>
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
