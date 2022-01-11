import classNames from "classnames";
import React from "react";
import  Popover from '../../../components/popover';
import { translate} from "../../../../../../common/utils/tools";


const NetworkStatus = ({ api }) => {
    const [status, setStatus] = React.useState("offline");

    React.useEffect(() => {
        api.send({ website_status: '1', subscribe: 1 });
        api.events.on('website_status', response => {
            $('.web-status').trigger('notify-hide');
            const { message } = response.website_status;
            if (message) {
                $.notify(message, {
                    position: 'bottom left',
                    autoHide: false,
                    className: 'warn web-status',
                });
            }
        });
        
        if ("onLine" in navigator) {
            window.addEventListener("online", () => updateStatus());
            window.addEventListener("offline", () => updateStatus());
        } else {
            navigator.onLine = true;
        }

        const updateInterval = setInterval(() => updateStatus(), 10000);
        updateStatus();

        return () => {
            window.removeEventListener("online");
            window.removeEventListener("offline");

            clearInterval(updateInterval);
        }
    }, []);

    const updateStatus = () => {
        if (navigator.onLine) {
            api.socket.readyState !== 1 ?
                setStatus("blinker") :
                api.send({ ping: "1" }).then(() => setStatus("online"));
        } else {
            setStatus("offline")
        }
    }

    return (
        <div id="network-status" className="network-status__wrapper">
            <Popover content={<>{translate('Network status: {$0}',[status])}</>}>
                <div
                    className={classNames("network-status__circle", {
                        "network-status__circle--offline": status === "offline",
                        "network-status__circle--online": status === "online",
                        "network-status__circle--blinker": status === "blinker",
                    })}
                    />
            </Popover>
        </div>
    );
};

export default NetworkStatus;
