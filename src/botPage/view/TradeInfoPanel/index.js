import React from 'react';
import { observer as globalObserver } from '../../../common/utils/observer';
import { translate } from '../../../common/i18n';
import Summary from './Summary';
import TradeTable from './TradeTable';
import RunButton from './RunButton';
import ClearButton from './ClearButton';
import { roundBalance } from '../../common/tools';
import useIsMounted from '../../../common/hooks/isMounted';

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

const INDICATOR_MESSAGES = {
    notRunning: translate('Bot is not running.'),
    starting: translate('Bot is starting...'),
    running: translate('Bot is running...'),
    stopping: translate('Bot is stopping...'),
    stopped: translate('Bot has stopped.'),
};

const AnimateTrade = () => {
    const [indicatorMessage, setIndicatorMessage] = React.useState(INDICATOR_MESSAGES.notRunning);
    const [buy_price, setBuyPrice] = React.useState();
    const [buy_id, setBuyId] = React.useState();
    const [sell_id, setSellId] = React.useState();

    const isMounted = useIsMounted();

    const resetSummary = () => {
        resetAnimation();
        setIndicatorMessage(INDICATOR_MESSAGES.notRunning);
    };

    const animateStage = contractStatus => {
        if (contractStatus.id === 'contract.purchase_sent') {
            resetAnimation();
            activateStage(0);
            setBuyPrice(
                roundBalance({
                    balance: contractStatus.proposal.ask_price,
                    currency: contractStatus.currency,
                })
            );
        } else if (contractStatus.id === 'contract.purchase_recieved') {
            $('.line').addClass('active');
            activateStage(1);
            setBuyId(contractStatus.data);
        } else if (contractStatus.id === 'contract.sold') {
            $('.line').addClass('complete');
            activateStage(2);
            setSellId(contractStatus.data);
        }

        activateStage(contractStatus.id);
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
            globalObserver.register('contract.status', contractStatus => animateStage(contractStatus));
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
                        <p>{indicatorMessage}</p>
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

const TradeInfoPanel = ({ api }) => {
    const [accountID, setAccountID] = React.useState('');
    const [accountIDList, setAccountIDList] = React.useState([]);

    const isMounted = useIsMounted();

    React.useEffect(() => {
        globalObserver.register('bot.info', ({ accountID: accountIDParam }) => {
            if (isMounted()) {
                if (!accountIDList.includes(accountIDParam)) {
                    setAccountIDList(prevList => [...prevList, accountIDParam]);
                }
                if (!accountID) {
                    setAccountID(accountIDParam);
                }
            }
        });
    }, []);

    return (
        <div>
            <div className="content">
                <div className="content-row">
                    <div className="summary-toolbox">
                        <RunButton />
                        <ClearButton />
                    </div>
                </div>
                <div className="content-row">
                    <AnimateTrade />
                </div>
                <div className="content-row">
                    <div>
                        <div className="content-row-table">
                            <TradeTable account_id={accountID} api={api} />
                        </div>
                    </div>
                </div>
                <div className="content-row">
                    <Summary accountID={accountID} />
                </div>
                <div>
                    <p id="sync-warning">
                        {translate(
                            'Stopping the bot will prevent further trades. Any ongoing trades will be completed by our system. Please be aware that some completed transactions may not be displayed in the table if the bot is stopped while placing trades. You may refer to the Binary.com statement page for details of all completed transactions.'
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TradeInfoPanel;
