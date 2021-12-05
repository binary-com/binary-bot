const euCountries = [
    'it',
    'de',
    'fr',
    'lu',
    'gr',
    'es',
    'sk',
    'lt',
    'nl',
    'at',
    'bg',
    'si',
    'cy',
    'be',
    'ro',
    'hr',
    'pt',
    'pl',
    'lv',
    'ee',
    'cz',
    'fi',
    'hu',
    'dk',
    'se',
    'ie',
    'gb',
    'mt',
];

export const isEuCountry = country => euCountries.includes(country);

export const isUKCountry = country => country === 'gb';
