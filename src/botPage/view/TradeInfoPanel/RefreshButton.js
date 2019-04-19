import React from 'react';
import { observer as globalObserver } from '../../../common/utils/observer';

export default class RefreshButton extends React.PureComponent {
    constructor() {
        super();
        this.state = { isButtonDisabled: true };
    }
    componentDidMount() {
        globalObserver.register('summary.enable_clear', () => this.setState({ isButtonDisabled: false }));
        globalObserver.register('summary.disable_clear', () => this.setState({ isButtonDisabled: true }));
    }
    // eslint-disable-next-line class-methods-use-this
    refreshTable() {
        const b = prompt('wanna refresh');
        console.log(b);
    }
    render() {
        return (
            <button
                title="Refresh trade table"
                id="refreshButton"
                className="toolbox-button icon-refresh"
                onClick={this.refreshTable}
                disabled={this.state.isButtonDisabled}
            />
        );
    }
}
