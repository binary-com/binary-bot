import { binaryApi } from './appId';

/* eslint-disable import/prefer-default-export */
export default async function isEuCountry() {
    const {
        website_status: { clients_country: clientsCountry },
    } = await binaryApi.send({ website_status: 1 });
    const {
        landing_company: { financial_company: financialCompany, gaming_company: gamingCompany },
    } = await binaryApi.send({
        landing_company: clientsCountry,
    });

    const euShortcodeRegex = new RegExp('^(maltainvest|malta|iom)$');
    const euExcludedRegex = new RegExp('^mt$');
    const financialShortcode = financialCompany ? financialCompany.shortcode : false;
    const gamingShortcode = gamingCompany ? gamingCompany.shortcode : false;

    return financialShortcode || gamingShortcode
        ? euShortcodeRegex.test(financialShortcode) || euShortcodeRegex.test(gamingShortcode)
        : euExcludedRegex.test(clientsCountry);
}
