/* eslint-disable import/prefer-default-export */
import { generateLiveApiInstance } from './appId';

export const showHideEuElements = isEu => {
    document.querySelectorAll('.eu-hide').forEach(el => {
        if (!isEu && el.classList.contains('invisible')) {
            // Keep original display type if invisible was specified.
            el.classList.remove('invisible');
        } else {
            // Default to setting display to block.
            el.setAttribute('display', `${!isEu ? 'block' : 'none'} !important`);
        }
    });
    document.querySelectorAll('.eu-show', '.eu-only').forEach(el => {
        if (isEu && el.classList.contains('invisible')) {
            el.classList.remove('invisible');
        } else {
            el.setAttribute('display', `${isEu ? 'block' : 'none'} !important`);
        }
    });
};

export default async function isEuCountry() {
    const api = generateLiveApiInstance();
    const {
        website_status: { clients_country: clientsCountry },
    } = await api.send({ website_status: 1 });
    const {
        landing_company: { financial_company: financialCompany, gaming_company: gamingCompany },
    } = await api.send({
        landing_company: clientsCountry,
    });

    const euShortcodeRegex = new RegExp('^(maltainvest|malta|iom)$');
    const euExcludedRegex = new RegExp('^mt$');
    const financialShortcode = financialCompany ? financialCompany.shortcode : false;
    const gamingShortcode = gamingCompany ? gamingCompany.shortcode : false;

    api.disconnect();

    return financialShortcode || gamingShortcode
        ? euShortcodeRegex.test(financialShortcode) || euShortcodeRegex.test(gamingShortcode)
        : euExcludedRegex.test(clientsCountry);
}
