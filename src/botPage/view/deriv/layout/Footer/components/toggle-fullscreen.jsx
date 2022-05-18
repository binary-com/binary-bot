import classNames from "classnames";
import React from "react";

const ToggleFullScreen = () => {
    const [is_full_screen, setIsFullScreen] = React.useState(false);

    const fullscreen_map = {
        event: ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"],
        element: ["fullscreenElement", "webkitFullscreenElement", "mozFullScreenElement", "msFullscreenElement"],
        fnc_enter: ["requestFullscreen", "webkitRequestFullscreen", "mozRequestFullScreen", "msRequestFullscreen"],
        fnc_exit: ["exitFullscreen", "webkitExitFullscreen", "mozCancelFullScreen", "msExitFullscreen"],
    };

    React.useEffect(() => {
        fullscreen_map.event.forEach(event => {
            document.addEventListener(event, onFullScreen, false);
        });
    }, []);

    const onFullScreen = () => {
        setIsFullScreen(fullscreen_map.element.some(el => document[el]));
    };

    const toggleFullScreen = e => {
        e.stopPropagation();

        const to_exit = is_full_screen;
        const el = to_exit ? document : document.documentElement;
        const fncToCall = fullscreen_map[to_exit ? "fnc_exit" : "fnc_enter"].find(fnc => el[fnc]);

        if (fncToCall) {
            el[fncToCall]();
        } else {
            setIsFullScreen(false); // fullscreen API is not enabled
        }
    };

    const full_screen_icon_class = classNames("ic-fullscreen", {
        "ic-fullscreen--active": is_full_screen,
    });
    return (
        <a className={`${full_screen_icon_class} footer__link`} onClick={toggleFullScreen} id="dt_fullscreen_toggle">
            {is_full_screen ? (
                <img src="image/deriv/ic-fullscreen-restore.svg" />
            ) : (
                <img src="image/deriv/ic-fullscreen.svg" />
            )}
        </a>
    );
};

export default ToggleFullScreen;
