import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translate } from '../../../common/i18n';
import { contentStyle, errorStyle, saveButtonStyle, limitsStyle, inputStyle, fieldStyle } from './Style';
import Dialog from './Dialog';

class LimitsContent extends PureComponent {
    constructor() {
        super();
        this.state = {
            error: null,
        };
    }
    submit() {
        const maxLoss = +this.maxLossDiv.value;
        const maxTrades = +this.maxTradesDiv.value;
        if (maxLoss > 0 && maxTrades > 0) {
            if (maxTrades <= 100) {
                this.props.onSave({
                    maxLoss,
                    maxTrades,
                });
            } else {
                this.setState({
                    error: translate('Maximum allowed number of trades for each session is 100.'),
                });
            }
        } else {
            this.setState({
                error: translate('Both number of trades and loss amount have to be positive values.'),
            });
        }
    }
    render() {
        return (
            <form
                action="javascript:;" // eslint-disable-line no-script-url
                onSubmit={() => this.submit()}
                className="dialog-content"
                style={contentStyle}
            >
                <div style={limitsStyle}>
                    <label style={fieldStyle} htmlFor="limitation-max-trades">
                        <input
                            style={inputStyle}
                            ref={el => {
                                this.maxTradesDiv = el;
                            }}
                            type="number"
                            id="limitation-max-trades"
                            min="1"
                            max="100"
                            step="1"
                        />
                        {translate('Maximum number of trades')}
                    </label>
                    <label style={fieldStyle} htmlFor="limitation-max-loss">
                        <input
                            style={inputStyle}
                            ref={el => {
                                this.maxLossDiv = el;
                            }}
                            type="number"
                            id="limitation-max-loss"
                            min="0.01"
                            step="0.01"
                        />
                        {translate('Maximum loss amount')}
                    </label>
                    {this.state.error
                        ? <p style={errorStyle}>
                              {this.state.error}
                          </p>
                        : null}
                </div>
                <div style={saveButtonStyle}>
                    <button type="submit">
                        {translate('Start')}
                    </button>
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
        super('limits-dialog', translate('Trade Limitations'), <LimitsContent onSave={onSave} />);
    }
    getLimits() {
        this.open();
        return new Promise(resolve => {
            this.limitsPromise = resolve;
        });
    }
}
