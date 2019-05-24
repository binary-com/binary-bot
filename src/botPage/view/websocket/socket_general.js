// import Cookies from 'js-cookie';
import { getPropertyValue, ClientIsLoggedIn } from './helpers';
import BinarySocket from './socket_base';
import { State } from './storage';

const BinarySocketGeneral = (() => {
    const onOpen = is_ready => {
        if (is_ready) {
            BinarySocket.send({ website_status: 1, subscribe: 1 });
        }
    };

    const onMessage = response => {
        handleError(response);

        let is_available = false;
        switch (response.msg_type) {
            case 'website_status':
                if (response.website_status) {
                    is_available = /^up$/i.test(response.website_status.site_status);
                    if (is_available && !BinarySocket.availability()) {
                        window.location.reload();
                        return;
                    }

                    BinarySocket.availability(is_available);

                    // for logged out clients send landing company with IP address as residence
                    if (!ClientIsLoggedIn() && !State.getResponse('landing_company')) {
                        BinarySocket.send({ landing_company: response.website_status.clients_country });
                    }
                }
                break;
            case 'authorize':
                break;
            case 'balance':
                break;
            case 'logout':
                break;
            case 'landing_company':
                break;
            case 'get_self_exclusion':
                break;
            case 'get_settings':
                break;
            case 'transaction':
                break;
            // no default
        }
    };

    const handleError = response => {
        const msg_type = response.msg_type;
        const error_code = getPropertyValue(response, ['error', 'code']);
        switch (error_code) {
            case 'WrongResponse':
            case 'InternalServerError':
            case 'OutputValidationFailed':
                break;
            case 'RateLimit':
                break;
            case 'InvalidAppID':
                break;
            case 'DisabledClient':
                break;
            // no default
        }
    };

    return {
        onOpen,
        onMessage,
    };
})();

export default BinarySocketGeneral;
