import { isProduction } from '../../common/utils/tools';

export const trackjs_config = {
    token: '346262e7ffef497d85874322fff3bbf8',
    application: 'binary-bot',
    enabled: isProduction(),
    console: {
        display: false,
    },
};

export default trackjs_config;
