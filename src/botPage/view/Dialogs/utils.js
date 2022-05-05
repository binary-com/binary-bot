import React from 'react';

export const SAVE_LOAD_TYPE = {
    local       : 'local',
    google_drive: 'google-drive',
};

export const useIsMounted = () => {
    const isMounted = React.useRef(false);

    React.useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    return React.useCallback(() => isMounted.current, []);
};
