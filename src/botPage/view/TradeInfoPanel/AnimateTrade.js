import React from 'react';
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
    if (index > 0) {
        $(`.circle-wrapper:eq(${index - 1})`).removeClass('active');
        $(`.circle-wrapper:eq(${index - 1})`).addClass('complete');
    }
    $(`.circle-wrapper:eq(${index})`).addClass('active');
    $(`.stage-tooltip.bottom:eq(${index})`).addClass('active');
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

    const animateStage = contract_status => {
        if (contract_status.id === 'contract.purchase_sent') {
            resetAnimation();
            activateStage(0);
            setBuyPrice(
                roundBalance({
                    balance: contract_status.proposal.ask_price,
                    currency: contract_status.currency,
                })
            );
        } else if (contract_status.id === 'contract.purchase_recieved') {
            $('.line').addClass('active');
            activateStage(1);
            setBuyId(contract_status.data);
        } else if (contract_status.id === 'contract.sold') {
            $('.line').addClass('complete');
            activateStage(2);
            setSellId(contract_status.data);
        }

        activateStage(contract_status.id);
    };

    React.useEffect(() => {
        globalObserver.register('reset_animation', resetSummary);
        globalObserver.register('summary.clear', resetSummary);
        globalObserver.register('bot.running', () => {
            $('.stage-tooltip.top:eq(0)').addClass('running');
            if (isMounted()) setIndicatorMessage(INDICATOR_MESSAGES.running);
        });
        globalObserver.register('bot.stop', () => {
            $('.stage-tooltip.top:eq(0)').removeClass('running');
            if (isMounted()) setIndicatorMessage(INDICATOR_MESSAGES.stopped);
        });

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
            globalObserver.register('contract.status', contract_status => animateStage(contract_status));
        });

        return () => {
            $('#stopButton').off('click');
            $('#runButton').off('click');
        };
    }, []);

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
