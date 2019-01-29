import React, { PureComponent } from 'react';
import Joyride from 'react-joyride';
import { set as setStorage, get as getStorage, setDone, isDone } from '../../../common/utils/storageManager';
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
                    setStorage('closedTourPopup', Date.now());
                    this.joyride.stop();
                },
            };
        }
    }
    render() {
        const callback = data => {
            // Scroll to highlighted element (req for Safari)
            if (data.step && data.step.selector) {
                let element;
                const selector = data.step.selector; // eslint-disable-line prefer-destructuring
                if (/^\./.test(selector)) {
                    element = document.getElementsByClassName(selector.substring(1))[0]; // eslint-disable-line prefer-destructuring
                } else {
                    element = document.getElementById(selector.substring(1));
                }
                if (element) {
                    element.scrollIntoView();
                }
            }
            if (data.index === 0 && data.type === 'step:after') {
                setDoneCheck();
            }
        };
        const shouldShowTourPopup = () => {
            const dayHasPassed = () =>
                Date.now() > (parseInt(getStorage('closedTourPopup')) || 0) + 24 * 60 * 60 * 1000;
            return !isDone('welcomeFinished') && dayHasPassed();
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
