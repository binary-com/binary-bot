// eslint-disable-next-line import/prefer-default-export
export const generateDerivLink = (path, ...queries) => {
    const isStaging = window.location.hostname.includes('staging');
    const currentDomain = window.location.hostname.split('.').splice(-1);
    const targetDomain = currentDomain === 'me' ? 'me' : 'com';
    const origin = `https://${isStaging ? 'staging-' : ''}app.deriv.${targetDomain}/`;
    const redirectQuery = `ext_platform_url=${encodeURIComponent(window.location.origin)}`;

    queries.push(redirectQuery);

    return `${origin + path}?${queries.join('&')}`;
};
