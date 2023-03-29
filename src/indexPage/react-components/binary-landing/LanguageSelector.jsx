import React from 'react'
import { changeLanguage, getLanguage } from '../../../common/lang';

const languages = [
    {
        code: 'en',
        name: 'English',
    },
    {
        code: 'es',
        name: 'Español',
    },
    {
        code: 'pt',
        name: 'Português',
    },
]

const LanguageSelector = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const currentLanguage = getLanguage();
    const selectedLanguage = languages.find((language) => language.code === currentLanguage) || languages[0]


    React.useEffect(() => {
        const onClickOutside = (e) => {
            if ($(e.target).closest('.language-selector').length > 0) {
                return false;
            }

            return setIsOpen(old => old ? !old : old);
        };

        document.documentElement.addEventListener('click', onClickOutside);

        return () => document.documentElement.removeEventListener('click', onClickOutside);
    }, []);

    const LanguageItem = ({ language }) => {
        const onLanguageSelect = () => {
            setIsOpen(false);
            changeLanguage(language.code)
        }

        return (
            <div
                className='language-selector-item-container'
                onClick={() => onLanguageSelect(language)}>
                <p className={`language-selector-item-name ${language.code === selectedLanguage.code ? 'selected' : ''}`}>
                    {language.name}
                </p>
            </div>
        );
    }

    return (
        <div className='language-selector' onClick={() => setIsOpen(old => !old)}>
            <div className='language-selector-button'>
                <p className='language-selector-button-name'>{selectedLanguage.code.toUpperCase()}</p>
                <div className={`language-selector-button-arrow ${isOpen ? 'up' : 'down'}`} />
            </div>
            <div className={`language-selector-container ${isOpen ? 'open' : 'close'}`}>
                {languages.map(language => <LanguageItem language={language} />)}
            </div>
        </div>
    );
}
export default LanguageSelector;