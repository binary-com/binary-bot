import { LiveApi } from 'binary-live-api';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dialog from './Dialog';
import { restrictInputCharacter } from '../shared';
import * as style from '../style';
import { getToken } from '../../../common/utils/storageManager';
import { showSpinnerInButton, removeSpinnerInButton, createUrl, translate } from '../../../common/utils/tools';

class LimitsContent extends PureComponent {
    constructor() {
        super();
        this.state = {
            error    : '',
            maxTrades: 0,
            maxLosses: null,
        };
    }

    submit() {
        this.setState({ error: '' });

        const onSave = () => {
            this.props.onSave({
                maxTrades: this.state.maxTrades,
                maxLoss  : this.state.maxLosses,
            });
        };

        if (!this.state.maxLosses) {
            this.updateMaxLosses()
                .then(() => {
                    onSave();
                })
                .catch(() => {
                    this.setState({
                        error: translate(
                            'Please set your daily loss limit in the Self-Exclusion Facilities page to allow trading.'
                        ),
                    });
                });
            return;
        }

        if (this.state.maxTrades <= 0 || this.state.maxTrades > 100) {
            this.setState({ error: translate('Maximum consecutive trades should be between 1 and 100') });
            return;
        }

        onSave();
    }

    updateMaxLosses() {
        return new Promise((resolve, reject) => {
            const { api } = this.props;
            const $startButton = $('#submit-trade-limits');
            const initialText = $startButton.text();

            showSpinnerInButton($startButton);

            api.getSelfExclusion()
                .then(response => {
                    const { max_losses: maxLosses } = response.get_self_exclusion;
                    let callback;

                    if (maxLosses) {
                        this.setState({ maxLosses });
                        callback = resolve;
                    } else {
                        callback = reject;
                    }

                    removeSpinnerInButton($startButton, initialText);
                    callback();
                })
                .catch(() => {
                    removeSpinnerInButton($startButton, initialText);
                    reject();
                });
        });
    }

    componentDidMount() {
        const cleanupLayout = () => {
            this.setState({
                maxTrades: 0,
                error    : '',
            });
        };

        const onDialogOpen = () => {
            this.updateMaxLosses().catch(() => {});
        };

        $('#limits-dialog-component').dialog({
            open    : onDialogOpen,
            close   : cleanupLayout,
            autoOpen: false,
        });
    }

    onMaxTradeChange(e) {
        if (restrictInputCharacter({ input: e.target.value, whitelistRegEx: '^[\\d]*$' })) {
            this.setState({ maxTrades: e.target.value });
        }
    }

    getDailyLossesLimit() {
        if (this.state.maxLosses) {
            const token = $('.account-id')
                .first()
                .attr('value');
            const tokenObj = getToken(token);
            const currency = tokenObj && tokenObj.loginInfo.currency;
            return currency ? `${this.state.maxLosses} ${currency}` : `${this.state.maxLosses}`;
        }
        return translate('Not set');
    }

    render() {
        return (
            <form
                action="javascript:;" // eslint-disable-line no-script-url
                onSubmit={() => this.submit()}
                className="dialog-content"
                style={style.content}
            >
                <p>
                    {translate(
                        'We require you to set trade limitations in compliance with business regulations. Please note that your bot will only stop trading if any or both of the conditions below are met.'
                    )}
                </p>
                <div className="input-row">
                    <label>
                        {translate('Daily limit on losses:')} <strong>{this.getDailyLossesLimit()}</strong>
                    </label>
                    <div className="description">
                        {translate(
                            'This is the threshold that limits your potential losses for the day in all Binary.com platforms. Once your total loss reaches or exceeds this amount, your bot will stop trading. Please set a value in the {$0}Self-Exclusion Facilities page{$1}.',
                            [
                                `<a href="${createUrl({
                                    addLanguage     : true,
                                    path            : 'user/security/self_exclusionws',
                                    addHtmlExtension: true,
                                    isNonBotPage    : true,
                                })}" target="_blank">`,
                                '</a>',
                            ]
                        )}
                    </div>
                </div>
                <div className="input-row">
                    <label htmlFor="limitation-max-trades">{translate('Maximum consecutive trades')}</label>
                    <div className="description">
                        {translate(
                            'This is the maximum number of trades that you allow your bot to execute for this run.'
                        )}
                    </div>
                </div>
                <div className="input-row">
                    <input
                        ref={el => {
                            this.maxTradesDiv = el;
                        }}
                        type="text"
                        id="limitation-max-trades"
                        step="1"
                        maxLength="3"
                        value={this.state.maxTrades}
                        onChange={(...args) => this.onMaxTradeChange(...args)}
                        data-lpignore={true}
                    />
                </div>
                {this.state.error && <p style={style.error}>{this.state.error}</p>}
                <div className="input-row last" style={style.submitButton}>
                    <button id="submit-trade-limits" type="submit">
                        {translate('Start')}
                    </button>
                </div>
            </form>
        );
    }
    static props = {
        onSave: PropTypes.func,
        api   : PropTypes.instanceOf(LiveApi),
    };
}

export default class Limits extends Dialog {
    constructor(api) {
        const onSave = limits => {
            this.limitsPromise(limits);
            this.close();
        };
        super(
            'limits-dialog',
            translate('Trade Limitations'),
            <LimitsContent onSave={onSave} api={api} />,
            style.dialogLayout
        );
        this.registerCloseOnOtherDialog();
    }
    getLimits() {
        this.open();
        return new Promise(resolve => {
            this.limitsPromise = resolve;
        });
    }
}
