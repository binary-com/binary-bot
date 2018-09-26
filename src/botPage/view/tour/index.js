import React, { PureComponent } from 'react';
import Joyride from 'react-joyride';
import { setDone, isDone } from '../../../common/utils/storageManager';
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
        return (
            !isDone('welcomeFinished') && (
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
