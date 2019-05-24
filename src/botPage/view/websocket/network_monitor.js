import NetworkMonitorBase from './network_monitor_base';
import BinarySocketGeneral from './socket_general';

const NetworkMonitor = (() => {
    let el_status, el_tooltip;

    const init = () => {
        el_status = document.getElementById('server-status') || document.createElement('div');
        NetworkMonitorBase.init(BinarySocketGeneral, updateUI);
    };

    const updateUI = status => {
        if (el_status && el_tooltip) {
            el_status.setAttribute('class', status.class);
        }
    };

    return {
        init,
    };
})();

export default NetworkMonitor;
