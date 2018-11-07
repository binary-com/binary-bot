import { generateLiveApiInstance } from './appId';

export async function isEuCountry() {
    const api = generateLiveApiInstance();
    const {
        website_status: { clients_country },
    } = await api.send({ website_status: 1 });
    const {
        landing_company: { financial_company, gaming_company },
    } = await api.send({ landing_company: clients_country });

    const eu_shortcode_regex = new RegExp('^(maltainvest|malta|iom)$');
    const eu_excluded_regex = new RegExp('^mt$');
    const financial_shortcode = financial_company ? financial_company.shortcode : false;
    const gaming_shortcode = gaming_company ? gaming_company.shortcode : false;

    api.disconnect();

    return financial_shortcode || gaming_shortcode
        ? eu_shortcode_regex.test(financial_shortcode) || eu_shortcode_regex.test(gaming_shortcode)
        : eu_excluded_regex.test(clients_country);
}
