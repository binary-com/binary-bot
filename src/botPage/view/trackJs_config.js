import { isProduction } from '../../common/utils/tools';

export const trackjs_config = {
    token: process.env.TRACKJS_TOKEN,
    application: 'binary-bot',
    enabled: isProduction(),
    console: {
        display: false,
    },
};

export default trackjs_config;
