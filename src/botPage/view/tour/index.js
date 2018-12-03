import React, { PureComponent } from 'react';
import Joyride from 'react-joyride';
import { set, get, setDone, isDone } from '../../../common/utils/storageManager';
import { translate } from '../../../common/i18n';
import welcome from './welcome';

const setDoneCheck = () => {
    const doNotAskCheck = document.getElementById('do-not-ask-me-again');
    if (doNotAskCheck && doNotAskCheck.checked) {
        setDone('welcomeFinished');
    }
};

class Tour extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            steps: welcome,
        };
    }
    componentWillMount() {
        if (window) {
            window.tour = {
                next: () => this.joyride.next(),
                stop: () => {
                    setDoneCheck();
                    set('closedTourPopup', Date.now());
                    this.joyride.stop();
                },
            };
        }
    }
    render() {
        const callback = data => {
            if (data.index === 0 && data.type === 'step:after') {
                setDoneCheck();
            }
        };
        const shouldShowTourPopup = () => {
            const timeDifference = Date.now() - (parseInt(get('closedTourPopup')) || 0);
            return !isDone('welcomeFinished') && timeDifference > 24 * 60 * 60 * 1000;
        };
        return (
            shouldShowTourPopup() && (
                <div className="tour-first-pop-up">
                    <Joyride
                        autoStart
                        run
                        keyboardNavigation={false}
                        showOverlay={false}
                        type="continuous"
                        locale={{
                            next: translate('Next'),
                            back: translate('Back'),
                            last: translate('Done'),
                        }}
                        ref={e => {
                            this.joyride = e;
                        }}
                        steps={this.state.steps}
                        callback={callback}
                    />
                </div>
            )
        );
    }
}

export default Tour;
