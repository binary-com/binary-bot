import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery-ui/ui/widgets/dialog';
import _Blockly, { load } from './blockly';
import Chart from './Dialogs/Chart';
import Limits from './Dialogs/Limits';
import IntegrationsDialog from './Dialogs/IntegrationsDialog';
import LoadDialog from './Dialogs/LoadDialog';
import SaveDialog from './Dialogs/SaveDialog';
import TradingView from './Dialogs/TradingView';
import logHandler from './logger';
import LogTable from './LogTable';
import NetworkMonitor from './NetworkMonitor';
import ServerTime from './react-components/HeaderWidgets';
import OfficialVersionWarning from './react-components/OfficialVersionWarning';
import { symbolPromise } from './shared';
import Tour from './tour';
import TradeInfoPanel from './TradeInfoPanel';
import { showDialog } from '../bot/tools';
import Elevio from '../../common/elevio';
import config, { updateConfigCurrencies } from '../common/const';
import { isVirtual } from '../common/tools';
import {
    logoutAllTokens,
    getOAuthURL,
    generateLiveApiInstance,
    AppConstants,
    addTokenIfValid,
} from '../../common/appId';
import { translate } from '../../common/i18n';
import { isEuCountry, showHideEuElements, hasEuAccount } from '../../common/footer-checks';
import googleDrive from '../../common/integrations/GoogleDrive';
import { getLanguage, showBanner } from '../../common/lang';
import { observer as globalObserver } from '../../common/utils/observer';
import {
    getTokenList,
    removeAllTokens,
    get as getStorage,
    set as setStorage,
    getToken,
} from '../../common/utils/storageManager';
import { isProduction } from '../../common/utils/tools';
import GTM from '../../common/gtm';
import {
    getMissingBlocksTypes,
    getDisabledMandatoryBlocks,
    getUnattachedMandatoryPairs,
    saveBeforeUnload,
} from './blockly/utils';

let realityCheckTimeout;
let chart;

const api = generateLiveApiInstance();

new NetworkMonitor(api, $('#server-status')); // eslint-disable-line no-new

api.send({ website_status: '1', subscribe: 1 });

api.events.on('website_status', response => {
    $('.web-status').trigger('notify-hide');
    const { message } = response.website_status;
    if (message) {
        $.notify(message, {
            position : 'bottom left',
            autoHide : false,
            className: 'warn web-status',
        });
    }
});

api.events.on('balance', response => {
    const {
        balance: { balance: b, currency },
    } = response;

    const elTopMenuBalances = document.querySelectorAll('.topMenuBalance');
    const localString = getLanguage().replace('_', '-');
    const balance = (+b).toLocaleString(localString, {
        minimumFractionDigits: config.lists.CRYPTO_CURRENCIES.includes(currency) ? 8 : 2,
    });

    elTopMenuBalances.forEach(elTopMenuBalance => {
        const element = elTopMenuBalance;
        element.textContent = `${balance} ${currency === 'UST' ? 'USDT' : currency}`;
    });

    globalObserver.setState({ balance: b, currency });
});

const addBalanceForToken = token => {
    api.authorize(token).then(() => {
        api.send({ forget_all: 'balance' }).then(() => {
            api.subscribeToBalance();
        });
    });
};

const tradingView = new TradingView();

const showRealityCheck = () => {
    $('.blocker').show();
    $('.reality-check').show();
};

const hideRealityCheck = () => {
    $('#rc-err').hide();
    $('.blocker').hide();
    $('.reality-check').hide();
};

const stopRealityCheck = () => {
    clearInterval(realityCheckTimeout);
    realityCheckTimeout = null;
};

const realityCheckInterval = stopCallback => {
    realityCheckTimeout = setInterval(() => {
        const now = parseInt(new Date().getTime() / 1000);
        const checkTime = +getStorage('realityCheckTime');
        if (checkTime && now >= checkTime) {
            showRealityCheck();
            stopRealityCheck();
            stopCallback();
        }
    }, 1000);
};

const startRealityCheck = (time, token, stopCallback) => {
    stopRealityCheck();
    if (time) {
        const start = parseInt(new Date().getTime() / 1000) + time * 60;
        setStorage('realityCheckTime', start);
        realityCheckInterval(stopCallback);
    } else {
        const tokenObj = getToken(token);
        if (tokenObj.hasRealityCheck) {
            const checkTime = +getStorage('realityCheckTime');
            if (!checkTime) {
                showRealityCheck();
            } else {
                realityCheckInterval(stopCallback);
            }
        }
    }
};

const clearRealityCheck = () => {
    setStorage('realityCheckTime', null);
    stopRealityCheck();
};

const integrationsDialog = new IntegrationsDialog();
const loadDialog = new LoadDialog();
const saveDialog = new SaveDialog();

const getLandingCompanyForToken = id => {
    let landingCompany;
    let activeToken;
    const tokenList = getTokenList();
    if (tokenList.length) {
        activeToken = tokenList.filter(token => token.token === id);
        if (activeToken && activeToken.length === 1) {
            landingCompany = activeToken[0].loginInfo.landing_company_name;
        }
    }
    return landingCompany;
};

const updateLogo = token => {
    $('.binary-logo-text > img').attr('src', '');
    const currentLandingCompany = getLandingCompanyForToken(token);
    if (currentLandingCompany === 'maltainvest') {
        $('.binary-logo-text > img').attr('src', './image/binary-type-logo.svg');
    } else {
        $('.binary-logo-text > img').attr('src', './image/binary-style/logo/type.svg');
    }
    setTimeout(() => window.dispatchEvent(new Event('resize')));
};

const getActiveToken = (tokenList, activeToken) => {
    const activeTokenObject = tokenList.filter(tokenObject => tokenObject.token === activeToken);
    return activeTokenObject.length ? activeTokenObject[0] : tokenList[0];
};

const updateTokenList = () => {
    const tokenList = getTokenList();
    const loginButton = $('#login, #toolbox-login');
    const accountList = $('#account-list, #toolbox-account-list');
    if (tokenList.length === 0) {
        loginButton.show();
        accountList.hide();

        // If logged out, determine EU based on IP.
        isEuCountry(api).then(isEu => showHideEuElements(isEu));
        showBanner();

        $('.account-id')
            .removeAttr('value')
            .text('');
        $('.account-type').text('');
        $('.login-id-list')
            .children()
            .remove();
    } else {
        loginButton.hide();
        accountList.show();

        const activeToken = getActiveToken(tokenList, getStorage(AppConstants.STORAGE_ACTIVE_TOKEN));
        showHideEuElements(hasEuAccount(tokenList));
        showBanner();
        updateLogo(activeToken.token);
        addBalanceForToken(activeToken.token);

        if (!('loginInfo' in activeToken)) {
            removeAllTokens();
            updateTokenList();
        }

        tokenList.forEach(tokenInfo => {
            let prefix;

            if (isVirtual(tokenInfo)) {
                prefix = 'Virtual Account';
            } else if (tokenInfo.loginInfo.currency === 'UST') {
                prefix = 'USDT Account';
            } else {
                prefix = `${tokenInfo.loginInfo.currency} Account`;
            }

            if (tokenInfo === activeToken) {
                $('.account-id')
                    .attr('value', `${tokenInfo.token}`)
                    .text(`${tokenInfo.accountName}`);
                $('.account-type').text(`${prefix}`);
            } else {
                $('.login-id-list').append(
                    `<a href="#" value="${tokenInfo.token}"><li><span>${prefix}</span><div>${tokenInfo.accountName}</div></li></a><div class="separator-line-thin-gray"></div>`
                );
            }
        });
    }
};

const applyToolboxPermissions = () => {
    const fn = getTokenList().length ? 'show' : 'hide';
    $('#runButton, #showSummary, #logButton')
        [fn]()
        .prevAll('.toolbox-separator:first')
        [fn]();
};

const checkForRequiredBlocks = () => {
    const displayError = errorMessage => {
        const error = new Error(errorMessage);
        globalObserver.emit('Error', error);
    };

    const blockLabels = { ...config.blockLabels };
    const missingBlocksTypes = getMissingBlocksTypes();
    const disabledBlocksTypes = getDisabledMandatoryBlocks().map(block => block.type);
    const unattachedPairs = getUnattachedMandatoryPairs();

    if (missingBlocksTypes.length) {
        missingBlocksTypes.forEach(blockType =>
            displayError(`"${blockLabels[blockType]}" ${translate('block should be added to the workspace')}.`)
        );
        return false;
    }

    if (disabledBlocksTypes.length) {
        disabledBlocksTypes.forEach(blockType =>
            displayError(`"${blockLabels[blockType]}" ${translate('block should be enabled')}.`)
        );
        return false;
    }

    if (unattachedPairs.length) {
        unattachedPairs.forEach(pair =>
            displayError(
                `"${blockLabels[pair.childBlock]}" ${translate('must be added inside:')} "${
                    blockLabels[pair.parentBlock]
                }"`
            )
        );
        return false;
    }

    return true;
};

export default class View {
    constructor() {
        logHandler();
        this.initPromise = new Promise(resolve => {
            updateConfigCurrencies(api).then(() => {
                symbolPromise.then(() => {
                    updateTokenList();
                    this.blockly = new _Blockly();
                    this.blockly.initPromise.then(() => {
                        document
                            .getElementById('contact-us')
                            .setAttribute('href', `https://www.binary.com/${getLanguage()}/contact.html`);
                        this.setElementActions();
                        initRealityCheck(() => $('#stopButton').triggerHandler('click'));
                        applyToolboxPermissions();
                        renderReactComponents();
                        if (!getTokenList().length) updateLogo();
                        this.showHeader(getStorage('showHeader') !== 'false');
                        resolve();
                    });
                });
            });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    setFileBrowser() {
        const readFile = (f, dropEvent = {}) => {
            const reader = new FileReader();
            reader.onload = e => load(e.target.result, dropEvent);
            reader.readAsText(f);
        };

        const handleFileSelect = e => {
            let files;
            let dropEvent;
            if (e.type === 'drop') {
                e.stopPropagation();
                e.preventDefault();
                ({ files } = e.dataTransfer);
                dropEvent = e;
            } else {
                ({ files } = e.target);
            }
            files = Array.from(files);
            files.forEach(file => {
                if (file.type.match('text/xml')) {
                    readFile(file, dropEvent);
                } else {
                    globalObserver.emit('ui.log.info', `${translate('File is not supported:')} ${file.name}`);
                }
            });
            $('#files').val('');
        };

        const handleDragOver = e => {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy'; // eslint-disable-line no-param-reassign
        };

        const dropZone = document.body;

        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileSelect, false);

        $('#files').on('change', handleFileSelect);

        $('#open_btn')
            .on('click', () => {
                $.FileDialog({
                    // eslint-disable-line new-cap
                    accept       : '.xml',
                    cancelButton : 'Close',
                    dragMessage  : 'Drop files here',
                    dropheight   : 400,
                    errorMessage : 'An error occured while loading file',
                    multiple     : false,
                    okButton     : 'OK',
                    readAs       : 'DataURL',
                    removeMessage: 'Remove&nbsp;file',
                    title        : 'Load file',
                });
            })
            .on('files.bs.filedialog', ev => {
                handleFileSelect(ev.files);
            })
            .on('cancel.bs.filedialog', ev => {
                handleFileSelect(ev);
            });
    }
    setElementActions() {
        this.setFileBrowser();
        this.addBindings();
        this.addEventHandlers();
    }
    addBindings() {
        const stop = e => {
            if (e) {
                e.preventDefault();
            }
            stopRealityCheck();
            this.stop();
        };

        const getAccountSwitchText = () => {
            if (this.blockly.hasStarted()) {
                return [
                    translate(
                        'Binary Bot will not place any new trades. Any trades already placed (but not expired) will be completed by our system. Any unsaved changes will be lost.'
                    ),
                    translate(
                        'Note: Please see the Binary.com statement page for details of all confirmed transactions.'
                    ),
                ];
            }
            return [translate('Any unsaved changes will be lost.')];
        };

        const logout = () => {
            showDialog({
                title: translate('Are you sure?'),
                text : getAccountSwitchText(),
            })
                .then(() => {
                    this.stop();
                    Elevio.logoutUser();
                    googleDrive.signOut();
                    GTM.setVisitorId();
                    removeTokens();
                })
                .catch(() => {});
        };

        const removeTokens = () => {
            logoutAllTokens().then(() => {
                updateTokenList();
                globalObserver.emit('ui.log.info', translate('Logged you out!'));
                clearRealityCheck();
                clearActiveTokens();
                window.location.reload();
            });
        };

        const clearActiveTokens = () => {
            setStorage(AppConstants.STORAGE_ACTIVE_TOKEN, '');
        };

        $('.panelExitButton').click(function onClick() {
            $(this)
                .parent()
                .hide();
        });

        $('.draggable-dialog')
            .hide()
            .dialog({
                resizable: false,
                autoOpen : false,
                width    : Math.min(document.body.offsetWidth, 770),
                height   : Math.min(document.body.offsetHeight, 600),
                closeText: '',
                classes  : { 'ui-dialog-titlebar-close': 'icon-close' },
            });

        $('#integrations').click(() => integrationsDialog.open());

        $('#load-xml').click(() => loadDialog.open());

        $('#save-xml').click(() => saveDialog.save().then(arg => this.blockly.save(arg)));

        $('#undo').click(() => {
            this.blockly.undo();
        });

        $('#redo').click(() => {
            this.blockly.redo();
        });

        $('#zoomIn').click(() => {
            this.blockly.zoomOnPlusMinus(true);
        });

        $('#zoomOut').click(() => {
            this.blockly.zoomOnPlusMinus(false);
        });

        $('#rearrange').click(() => {
            this.blockly.cleanUp();
        });

        $('#chartButton').click(() => {
            if (!chart) {
                chart = new Chart(api);
            }

            chart.open();
        });

        $('#tradingViewButton').click(() => {
            tradingView.open();
        });

        const exportContent = {};
        exportContent.summaryPanel = () => {
            globalObserver.emit('summary.export');
        };

        exportContent.logPanel = () => {
            globalObserver.emit('log.export');
        };

        const addExportButtonToPanel = panelId => {
            const buttonHtml =
                '<button class="icon-save" style="position:absolute;top:50%;margin:-10px 0 0 0;right:2em;padding:0.2em"></button>';
            const $button = $(buttonHtml);
            const panelSelector = `[aria-describedby="${panelId}"]`;
            if (!$(`${panelSelector} .icon-save`).length) {
                $button.insertBefore(`${panelSelector} .icon-close`);
                $(`${panelSelector} .icon-close`).blur();
                $($(`${panelSelector} .icon-save`)).click(() => {
                    exportContent[panelId]();
                });
            }
        };

        const showSummary = () => {
            $('#summaryPanel')
                .dialog('option', 'minWidth', 770)
                .dialog('open');
            addExportButtonToPanel('summaryPanel');
        };

        $('#logButton').click(() => {
            $('#logPanel').dialog('open');
            addExportButtonToPanel('logPanel');
        });

        $('#showSummary').click(showSummary);

        $('#toggleHeaderButton').click(() => this.showHeader($('#header').is(':hidden')));

        $('#logout, #toolbox-logout').click(() => {
            saveBeforeUnload();
            logout();
            hideRealityCheck();
        });

        $('#logout-reality-check').click(() => {
            removeTokens();
            hideRealityCheck();
        });

        const submitRealityCheck = () => {
            const time = parseInt($('#realityDuration').val());
            if (time >= 10 && time <= 60) {
                hideRealityCheck();
                startRealityCheck(time, null, () => $('#stopButton').triggerHandler('click'));
            } else {
                $('#rc-err').show();
            }
        };

        $('#continue-trading').click(() => {
            submitRealityCheck();
        });

        $('#realityDuration').keypress(e => {
            const char = String.fromCharCode(e.which);
            if (e.keyCode === 13) {
                submitRealityCheck();
            }
            /* Unicode check is for firefox because it
             * trigger this event when backspace, arrow keys are pressed
             * in chrome it is not triggered
             */
            const unicodeStrings = /[\u0008|\u0000]/; // eslint-disable-line no-control-regex
            if (unicodeStrings.test(char)) return;

            if (!/([0-9])/.test(char)) {
                e.preventDefault();
            }
        });

        const startBot = limitations => {
            const elRunButtons = document.querySelectorAll('#runButton, #summaryRunButton');
            const elStopButtons = document.querySelectorAll('#stopButton, #summaryStopButton');

            elRunButtons.forEach(el => {
                const elRunButton = el;
                elRunButton.style.display = 'none';
                elRunButton.setAttributeNode(document.createAttribute('disabled'));
            });
            elStopButtons.forEach(el => {
                const elStopButton = el;
                elStopButton.style.display = 'inline-block';
            });

            showSummary();
            this.blockly.run(limitations);
        };

        $('#runButton').click(() => {
            // setTimeout is needed to ensure correct event sequence
            if (!checkForRequiredBlocks()) {
                setTimeout(() => $('#stopButton').triggerHandler('click'));
                return;
            }

            const token = $('.account-id')
                .first()
                .attr('value');
            const tokenObj = getToken(token);
            initRealityCheck(() => $('#stopButton').triggerHandler('click'));

            if (tokenObj && tokenObj.hasTradeLimitation) {
                const limits = new Limits(api);
                limits
                    .getLimits()
                    .then(startBot)
                    .catch(() => {});
            } else {
                startBot();
            }
        });

        $('#stopButton')
            .click(e => stop(e))
            .hide();

        $('[aria-describedby="summaryPanel"]').on('click', '#summaryRunButton', () => {
            $('#runButton').trigger('click');
        });

        $('[aria-describedby="summaryPanel"]').on('click', '#summaryStopButton', () => {
            $('#stopButton').trigger('click');
        });

        $('#resetButton').click(() => {
            let dialogText;
            if (this.blockly.hasStarted()) {
                dialogText = [
                    translate(
                        'Binary Bot will not place any new trades. Any trades already placed (but not expired) will be completed by our system. Any unsaved changes will be lost.'
                    ),
                    translate(
                        'Note: Please see the Binary.com statement page for details of all confirmed transactions.'
                    ),
                ];
            } else {
                dialogText = [translate('Any unsaved changes will be lost.')];
            }
            showDialog({
                title: translate('Are you sure?'),
                text : dialogText,
            })
                .then(() => {
                    this.stop();
                    this.blockly.resetWorkspace();
                    setTimeout(() => this.blockly.cleanUp(), 0);
                })
                .catch(() => {});
        });

        $('.login-id-list').on('click', 'a', e => {
            showDialog({
                title: translate('Are you sure?'),
                text : getAccountSwitchText(),
            })
                .then(() => {
                    this.stop();
                    Elevio.logoutUser();
                    GTM.setVisitorId();
                    const activeToken = $(e.currentTarget).attr('value');
                    const tokenList = getTokenList();
                    setStorage('tokenList', '');
                    addTokenIfValid(activeToken, tokenList).then(() => {
                        setStorage(AppConstants.STORAGE_ACTIVE_TOKEN, activeToken);
                        window.location.reload();
                    });
                })
                .catch(() => {});
        });

        $('#login, #toolbox-login')
            .bind('click.login', () => {
                saveBeforeUnload();
                document.location = getOAuthURL();
            })
            .text(translate('Log in'));

        $('#statement-reality-check').click(() => {
            document.location = `https://www.binary.com/${getLanguage()}/user/statementws.html#no-reality-check`;
        });
        $(document).keydown(e => {
            if (e.which === 189) {
                // Ctrl + -
                if (e.ctrlKey) {
                    this.blockly.zoomOnPlusMinus(false);
                    e.preventDefault();
                }
            } else if (e.which === 187) {
                // Ctrl + +
                if (e.ctrlKey) {
                    this.blockly.zoomOnPlusMinus(true);
                    e.preventDefault();
                }
            }
        });
    }
    stop() {
        this.blockly.stop();
    }
    addEventHandlers() {
        const getRunButtonElements = () => document.querySelectorAll('#runButton, #summaryRunButton');
        const getStopButtonElements = () => document.querySelectorAll('#stopButton, #summaryStopButton');

        window.addEventListener('storage', e => {
            window.onbeforeunload = null;
            if (e.key === 'activeToken' && e.newValue !== e.oldValue) window.location.reload();
            if (e.key === 'realityCheckTime') hideRealityCheck();
        });

        globalObserver.register('Error', error => {
            getRunButtonElements().forEach(el => {
                const elRunButton = el;
                elRunButton.removeAttribute('disabled');
            });

            if (error.error && error.error.error.code === 'InvalidToken') {
                removeAllTokens();
                updateTokenList();
                this.stop();
            }
        });

        globalObserver.register('bot.running', () => {
            getRunButtonElements().forEach(el => {
                const elRunButton = el;
                elRunButton.style.display = 'none';
                elRunButton.setAttributeNode(document.createAttribute('disabled'));
            });
            getStopButtonElements().forEach(el => {
                const elStopButton = el;
                elStopButton.style.display = 'inline-block';
                elStopButton.removeAttribute('disabled');
            });
        });

        globalObserver.register('bot.stop', () => {
            // Enable run button, this event is emitted after the interpreter
            // killed the API connection.
            getStopButtonElements().forEach(el => {
                const elStopButton = el;
                elStopButton.style.display = null;
                elStopButton.removeAttribute('disabled');
            });
            getRunButtonElements().forEach(el => {
                const elRunButton = el;
                elRunButton.style.display = null;
                elRunButton.removeAttribute('disabled');
            });
        });

        globalObserver.register('bot.info', info => {
            if ('profit' in info) {
                const token = $('.account-id')
                    .first()
                    .attr('value');
                const user = getToken(token);
                globalObserver.emit('log.revenue', {
                    user,
                    profit  : info.profit,
                    contract: info.contract,
                });
            }
        });
    }
    showHeader = show => {
        const $header = $('#header');
        const $topbarAccount = $('#toolbox-account');
        const $toggleHeaderButton = $('.icon-hide-header');
        if (show) {
            $header.show(0);
            $topbarAccount.hide(0);
            $toggleHeaderButton.removeClass('enabled');
        } else {
            $header.hide(0);
            $topbarAccount.show(0);
            $toggleHeaderButton.addClass('enabled');
        }
        setStorage('showHeader', show);
        window.dispatchEvent(new Event('resize'));
    };
}

function initRealityCheck(stopCallback) {
    startRealityCheck(
        null,
        $('.account-id')
            .first()
            .attr('value'),
        stopCallback
    );
}
function renderReactComponents() {
    ReactDOM.render(<ServerTime api={api} />, $('#server-time')[0]);
    ReactDOM.render(<Tour />, $('#tour')[0]);
    ReactDOM.render(
        <OfficialVersionWarning
            show={
                !(typeof window.location !== 'undefined' && isProduction() && window.location.pathname === '/bot.html')
            }
        />,
        $('#footer')[0]
    );
    ReactDOM.render(<TradeInfoPanel api={api} />, $('#summaryPanel')[0]);
    ReactDOM.render(<LogTable />, $('#logTable')[0]);
}
