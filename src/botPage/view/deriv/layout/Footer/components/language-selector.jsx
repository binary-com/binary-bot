import React from "react";
import { supportedLanguages } from "../../../config.js";
import { translate } from "../../../../../../common/utils/tools";
import { getLanguage } from "../../../../../../common/lang";

const current_language = getLanguage();
const toggleModal = () => $("#language-menu-modal").toggleClass("invisible");

const LanguageModal = () => (
    <div id="language-menu-modal" className="invisible" onClick={toggleModal}>
        <div className="language-menu" onClick={e => e.stopPropagation()}>
            <div className="language-menu-header">
                <span>{translate("Language settings")}</span>
                <span
                    className="language-menu-close_btn"
                    onClick={toggleModal}
                />
            </div>
            <div className="language-menu-container">
                <div className="language-menu-list">
                    {Object.keys(supportedLanguages).map(lang => <LanguageItem lang={lang} key={lang} />)}
                </div>
            </div>
        </div>
    </div>
)

const LanguageItem = ({ lang }) => {
    const self = React.useRef(null); // todo: refactor self-reference, maybe use document.getElementById

    return (
        <div
            ref={self}
            className={`language-menu-item${current_language === lang ? "__active language-menu-item" : ""}`}
            onClick={() => {
                if (current_language === lang) return;
                $(".language-menu-item__active").toggleClass("language-menu-item__active");
                self.current.classList.add("language-menu-item__active");
                document.location.search = `l=${lang}`;
            }}
        >
            <img src={`image/deriv/flag/ic-flag-${lang}.svg`} />
            <span>{supportedLanguages[lang]}</span>
        </div>
    )
}

const LanguageSelector = () => (
    <React.Fragment>
        <div id="language-select" onClick={toggleModal}>
            <img
                id="language-select__logo"
                src={`image/deriv/flag/ic-flag-${getLanguage()}.svg`}
            />
        </div>
        <LanguageModal />
    </React.Fragment>
);

export default LanguageSelector;