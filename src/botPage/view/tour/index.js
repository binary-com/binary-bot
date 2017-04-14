import React, { PureComponent } from 'react';
import Joyride from 'react-joyride';
import { setDone, isDone } from 'binary-common-utils/lib/storageManager';
import { translate } from '../../../common/i18n';
import { steps } from './welcome';

const setDoneCheck = () => {
  const doNotAskCheck = document.getElementById('do-not-ask-me-again');
  if (doNotAskCheck && doNotAskCheck.checked) {
    setDone('welcomeFinished');
  }
};

export class Tour extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      steps,
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
  callback(data) {
    if (data.index === 0 && data.type === 'step:after') {
      setDoneCheck();
    }
  }
  render() {
    return (
      !isDone('welcomeFinished') &&
      <div className="tour-first-pop-up">
        <Joyride
          autoStart
          run
          keyboardNavigation
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
          callback={this.callback}
        />
      </div>
    );
  }
}
