import React from 'react';
import classNames from 'classnames';
import { observer as globalObserver } from '../../../common/utils/observer';
import { translate } from '../../../common/i18n';
import { roundBalance } from '../../common/tools';
import useIsMounted from '../../../common/hooks/isMounted';

const INDICATOR_MESSAGES = {
    not_running: translate('Bot is not running.'),
    starting: translate('Bot is starting...'),
    running: translate('Bot is running...'),
    stopping: translate('Bot is stopping...'),
    stopped: translate('Bot has stopped.'),
};

const resetAnimation = () => {
    $('.circle-wrapper').removeClass('active complete');
    $('.line').removeClass('active complete');
    $('.stage-tooltip:not(.top)').removeClass('active');
};

const activateStage = index => {
    console.log(index, 'activateStage');
    if (index > 0) {
        $(`.circle-wrapper:eq(${index - 1})`).removeClass('active');
        $(`.circle-wrapper:eq(${index - 1})`).addClass('complete');
    }
    $(`.circle-wrapper:eq(${index})`).addClass('active');
    $(`.stage-tooltip.bottom:eq(${index})`).addClass('active');
};

const CONTRACT_STATUS = {
    not_running: 'not_running',
    attempting_to_buy: 'attempting_to_buy',
    buy_succeeded: 'buy_succeeded',
    contract_closed: 'contract_closed',
};

const AnimateTrade = () => {
    const [indicator_message, setIndicatorMessage] = React.useState(INDICATOR_MESSAGES.not_running);
    const [buy_price, setBuyPrice] = React.useState();
    const [buy_id, setBuyId] = React.useState();
    const [sell_id, setSellId] = React.useState();
    const isMounted = useIsMounted();

    const resetSummary = () => {
        resetAnimation();
        setIndicatorMessage(INDICATOR_MESSAGES.not_running);
    };

    const [contract_status, setContractStatus] = React.useState(CONTRACT_STATUS.not_running);

    const animateStage = contract => {
        if (contract.id === 'contract.purchase_sent') {
            resetAnimation();

            activateStage(0);
            // circle at 0: active complete
            setContractStatus(CONTRACT_STATUS.attempting_to_buy);

            setBuyPrice(
                roundBalance({
                    balance: contract.proposal.ask_price,
                    currency: contract.currency,
                })
            );
        } else if (contract.id === 'contract.purchase_recieved') {
            $('.line').addClass('active');
            activateStage(1);
            setContractStatus(CONTRACT_STATUS.buy_succeeded);
            // circle at 1: active
            // bottom tooltip at 1: active

            setBuyId(contract.data);
        } else if (contract.id === 'contract.sold') {
            $('.line').addClass('complete');
            activateStage(2);
            setContractStatus(CONTRACT_STATUS.contract_closed);
            // circle at 2: actie
            // bottom tooltip at 2: active
            setSellId(contract.data);
        }
        activateStage(contract.id);
    };

    const onStop = () => {
        console.log('onStop is called');
        $('.stage-tooltip.top:eq(0)').removeClass('running');
        if (isMounted()) setIndicatorMessage(INDICATOR_MESSAGES.stopped);
    };

    const onRun = () => {
        $('.stage-tooltip.top:eq(0)').addClass('running');
        if (isMounted()) setIndicatorMessage(INDICATOR_MESSAGES.running);
    };

    React.useEffect(() => {
        globalObserver.register('reset_animation', resetSummary);
        globalObserver.register('summary.clear', resetSummary);
        globalObserver.register('bot.running', onRun);
        globalObserver.register('bot.stop', onStop);

        $('#stopButton').on('click', () => {
            $('.stage-tooltip.top:eq(0)').removeClass('running');
            setIndicatorMessage(
                globalObserver.getState('isRunning') ? INDICATOR_MESSAGES.stopping : INDICATOR_MESSAGES.stopped
            );
        });

        $('#runButton').on('click', () => {
            resetAnimation();
            $('.stage-tooltip.top:eq(0)').addClass('running');
            setIndicatorMessage(INDICATOR_MESSAGES.starting);
            globalObserver.emit('summary.disable_clear');
            globalObserver.register('contract.status', contract => animateStage(contract));
        });

        return () => {
            $('#stopButton').off('click');
            $('#runButton').off('click');
        };
    }, []);

    return (
        <div>
            <div className="trade-animator">
                <div className="trade-animator__indicator-message">
                    {/* running class need to be added */}
                    <div
                        className={classNames('active', { running: indicator_message === INDICATOR_MESSAGES.running })}
                    >
                        <p>{indicator_message}</p>
                    </div>
                </div>
                <div className="trade-animator__stages">
                    <div className="trade-animator__stage">
                        <p className="title">{translate('Attempting to Buy')}</p>
                        <span
                            className={classNames('circle', {
                                active:
                                    indicator_message === INDICATOR_MESSAGES.running &&
                                    contract_status === CONTRACT_STATUS.attempting_to_buy,
                                complete:
                                    indicator_message !== INDICATOR_MESSAGES.not_running &&
                                    indicator_message !== INDICATOR_MESSAGES.starting,
                            })}
                        />
                        <div
                            className={classNames('indicator', {
                                active:
                                    indicator_message !== INDICATOR_MESSAGES.starting &&
                                    contract_status !== CONTRACT_STATUS.not_running,
                            })}
                        >
                            <p>
                                {translate('Buy amount')}: {buy_price || 0}
                            </p>
                        </div>
                    </div>
                    <div className="trade-animator__stage">
                        <p className="title">{translate('Buy succeeded')}</p>
                        <span
                            className={classNames('circle', {
                                active:
                                    (indicator_message === INDICATOR_MESSAGES.running ||
                                        indicator_message === INDICATOR_MESSAGES.stopping) &&
                                    contract_status === CONTRACT_STATUS.buy_succeeded,
                                complete:
                                    (indicator_message !== INDICATOR_MESSAGES.starting ||
                                        indicator_message !== INDICATOR_MESSAGES.not_running) &&
                                    (contract_status === CONTRACT_STATUS.buy_succeeded ||
                                        contract_status === CONTRACT_STATUS.contract_closed),
                            })}
                        />
                        <div
                            className={classNames('indicator', {
                                active:
                                    indicator_message !== INDICATOR_MESSAGES.starting &&
                                    (contract_status === CONTRACT_STATUS.buy_succeeded ||
                                        contract_status === CONTRACT_STATUS.contract_closed),
                            })}
                        >
                            <p>
                                {translate('ID')}: {buy_id || ''}
                            </p>
                        </div>
                    </div>
                    <div className="trade-animator__stage">
                        <p className="title">{translate('Contract closed')}</p>
                        <span
                            className={classNames('circle', {
                                active:
                                    indicator_message === INDICATOR_MESSAGES.running &&
                                    contract_status === CONTRACT_STATUS.contract_closed,
                                complete:
                                    (indicator_message !== INDICATOR_MESSAGES.starting ||
                                        indicator_message !== INDICATOR_MESSAGES.not_running) &&
                                    contract_status === CONTRACT_STATUS.contract_closed,
                            })}
                        />
                        <div
                            className={classNames('indicator', {
                                active:
                                    indicator_message !== INDICATOR_MESSAGES.starting &&
                                    contract_status === CONTRACT_STATUS.contract_closed,
                            })}
                        >
                            <p>
                                {translate('ID')}: {sell_id || ''}
                            </p>
                        </div>
                    </div>
                    <span
                        className={classNames('trade-animator__progress-bar', {
                            active:
                                indicator_message !== INDICATOR_MESSAGES.starting &&
                                (contract_status === CONTRACT_STATUS.buy_succeeded ||
                                    contract_status === CONTRACT_STATUS.contract_closed),
                            complete:
                                contract_status === CONTRACT_STATUS.contract_closed &&
                                indicator_message !== INDICATOR_MESSAGES.starting,
                        })}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <div id="current-trade-status">
                <span className="stage">
                    <div className="stage-label">{translate('Attempting to Buy')}</div>
                    <span className="circle-wrapper">
                        <span className="static-circle" />
                        <span className="dynamic-circle" />
                        <div className="line">
                            <div className="progress-bar" />
                        </div>
                    </span>
                    <div className="stage-tooltip bottom">
                        <div className="triangle" />
                        <p>
                            {translate('Buy amount')}: {buy_price || 0}
                        </p>
                    </div>
                </span>
                <span className="stage">
                    <div className="stage-tooltip top active">
                        <p>{indicator_message}</p>
                    </div>
                    <div className="stage-label">{translate('Buy succeeded')}</div>
                    <span className="circle-wrapper">
                        <span className="static-circle" />
                        <span className="dynamic-circle" />
                    </span>
                    <div className="stage-tooltip bottom">
                        <div className="triangle" />
                        <p>
                            {translate('ID')}: {buy_id || ''}
                        </p>
                    </div>
                </span>
                <span className="stage">
                    <div className="stage-label">{translate('Contract closed')}</div>
                    <span className="circle-wrapper">
                        <span className="static-circle" />
                        <span className="dynamic-circle" />
                    </span>
                    <div className="stage-tooltip bottom">
                        <div className="triangle" />
                        <p>
                            {translate('ID')}: {sell_id || ''}
                        </p>
                    </div>
                </span>
            </div>
        </div>
    );
};

export default AnimateTrade;
