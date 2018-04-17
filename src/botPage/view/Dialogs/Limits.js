import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translate } from '../../../common/i18n';
import * as style from '../style';
import Dialog from './Dialog';
import { restrictInputCharacter } from '../shared';

class LimitsContent extends PureComponent {
    constructor() {
        super();
        this.state = {
            error    : '',
            maxLoss  : '',
            maxTrades: '',
        };
    }
    submit() {
        const maxLoss = parseFloat(this.state.maxLoss || 0);
        const maxTrades = parseInt(this.state.maxTrades || 0);
        this.setState({ error: '' });
        if (maxTrades <= 0 || maxTrades > 100) {
            this.setState({ error: 'Maximum number of trades should be between 1 and 100.' });
            return;
        }
        if (!maxLoss) {
            this.setState({ error: 'Please enter a Maximum Loss amount greater than zero.' });
            return;
        }
        this.props.onSave({
            maxLoss,
            maxTrades,
        });
    }
    componentDidMount() {
        const cleanupLayout = () => {
            this.setState({
                maxTrades: '',
                maxLoss  : '',
                error    : '',
            });
        };
        $('#limits-dialog-component').dialog({
            close   : cleanupLayout,
            autoOpen: false,
        });
    }
    onMaxTradeChange(e) {
        if (restrictInputCharacter({ input: e.target.value, whitelistRegEx: '^[\\d]*$' })) {
            this.setState({ maxTrades: e.target.value });
        }
    }
    onMaxLossChange(e) {
        if (restrictInputCharacter({ input: e.target.value, whitelistRegEx: '^\\d*\\.?\\d*$' })) {
            this.setState({ maxLoss: e.target.value });
        }
    }
    render() {
        return (
            <form
                action="javascript:;" // eslint-disable-line no-script-url
                onSubmit={() => this.submit()}
                className="dialog-content"
                style={style.content}
            >
                <div>
                    <div style={style.inputRow}>
                        <label style={style.field} htmlFor="limitation-max-trades">
                            <input
                                style={style.input}
                                ref={el => {
                                    this.maxTradesDiv = el;
                                }}
                                type="text"
                                id="limitation-max-trades"
                                step="1"
                                maxLength="3"
                                value={this.state.maxTrades}
                                onChange={(...args) => this.onMaxTradeChange(...args)}
                            />
                            {translate('Maximum number of trades')}
                        </label>
                    </div>
                    <div style={style.inputRow}>
                        <label style={style.field} htmlFor="limitation-max-loss">
                            <input
                                style={style.input}
                                ref={el => {
                                    this.maxLossDiv = el;
                                }}
                                value={this.state.maxLoss}
                                type="text"
                                id="limitation-max-loss"
                                step="any"
                                onChange={(...args) => this.onMaxLossChange(...args)}
                            />
                            {translate('Maximum loss amount')}
                        </label>
                    </div>
                    {this.state.error ? <p style={style.error}>{this.state.error}</p> : null}
                </div>
                <p>
                    {translate(
                        'Trade limitations are required by our regulators. Your bot will conclude trading when one or both of the conditions are met.'
                    )}
                </p>
                <div style={style.submitButton}>
                    <button type="submit">{translate('Start')}</button>
                </div>
            </form>
        );
    }
    static props: {
        onSave: PropTypes.func,
    };
}

export default class Limits extends Dialog {
    constructor() {
        const onSave = limits => {
            this.limitsPromise(limits);
            this.close();
        };
        super('limits-dialog', translate('Trade Limitations'), <LimitsContent onSave={onSave} />, style.dialogLayout);
    }
    getLimits() {
        this.open();
        return new Promise(resolve => {
            this.limitsPromise = resolve;
        });
    }
}
