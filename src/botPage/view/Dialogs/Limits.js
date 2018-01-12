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
        let maxLoss = this.state.maxLoss;
        const maxTrades = +this.state.maxTrades;
        this.setState({ error: '' });
        if (maxTrades <= 0 || maxTrades > 100) {
            this.setState({ error: 'Max trade should be in range (1-100)' });
            return;
        }
        if (!maxLoss || !maxLoss.match(/^(?:\d*|\d*.\d\d?)$/) || maxLoss < 0.01) {
            this.setState({ error: 'Max Loss should be a whole number or in multiples of 0.01' });
            return;
        }
        maxLoss = +maxLoss;
        this.props.onSave({
            maxLoss,
            maxTrades,
        });
    }
    componentDidMount() {
        const cleanupLayout = () => {
            $(this.maxTradesDiv).val('');
            $(this.maxLossDiv).val('');
            this.setState({ error: undefined });
        };
        $('#limits-dialog-component').dialog({
            close   : cleanupLayout,
            autoOpen: false,
        });
        $(this.maxTradesDiv).keypress(restrictInputCharacter({ blacklistedCharacters: '.-e' }));
        $(this.maxLossDiv).keypress(restrictInputCharacter({ blacklistedCharacters: '-e' }));
    }
    onChange(e) {
        if ($(e.target).attr('id') === 'limitation-max-trades') this.setState({ maxTrades: e.target.value });
        if ($(e.target).attr('id') === 'limitation-max-loss') this.setState({ maxLoss: e.target.value });
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
                                type="number"
                                id="limitation-max-trades"
                                step="1"
                                onChange={this.onChange.bind(this)}
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
                                type="number"
                                id="limitation-max-loss"
                                step="any"
                                onChange={this.onChange.bind(this)}
                            />
                            {translate('Maximum loss amount')}
                        </label>
                    </div>
                    {this.state.error ? <p style={style.error}>{this.state.error}</p> : null}
                </div>
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
