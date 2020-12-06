import React from 'react';
import { observer as globalObserver } from '../../../common/utils/observer';
import { showDialog } from '../../bot/tools';
import { translate } from '../../../common/utils/tools';

export default class ClearButton extends React.PureComponent {
    constructor() {
        super();
        this.state = { isButtonDisabled: true };
    }
    componentDidMount() {
        globalObserver.register('summary.enable_clear', () => this.setState({ isButtonDisabled: false }));
        globalObserver.register('summary.disable_clear', () => this.setState({ isButtonDisabled: true }));
        globalObserver.register('bot.running', () => this.setState({ isButtonDisabled: true }));
    }
    // eslint-disable-next-line class-methods-use-this
    confirmClearLog() {
        showDialog({
            title: translate('Are you sure?'),
            text : [
                translate(
                    'This will clear all transactions in the summary panel, and all counters will be reset to zero.'
                ),
            ],
        })
            .then(() => globalObserver.emit('summary.clear'))
            .catch(() => {});
    }
    render() {
        return (
            <button
                title="Clear summary log"
                id="summaryClearButton"
                className="toolbox-button icon-clear"
                onClick={this.confirmClearLog}
                disabled={this.state.isButtonDisabled}
            />
        );
    }
}
