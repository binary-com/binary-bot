import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery-ui/ui/widgets/dialog';
import _Blockly from './blockly';
import Chart from './Dialogs/Chart';
import Limits from './Dialogs/Limits';
import Save from './Dialogs/Save';
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
import { updateConfigCurrencies } from '../common/const';
import { roundBalance, isVirtual } from '../common/tools';
import {
    logoutAllTokens,
    getOAuthURL,
    generateLiveApiInstance,
    AppConstants,
    addTokenIfValid,
} from '../../common/appId';
import { translate } from '../../common/i18n';
import { getLanguage } from '../../common/lang';
import { observer as globalObserver } from '../../common/utils/observer';
import {
    getTokenList,
    removeAllTokens,
    get as getStorage,
    set as setStorage,
    getToken,
} from '../../common/utils/storageManager';
import { isProduction } from '../../common/utils/tools';

let realityCheckTimeout;

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

    const balance = (+roundBalance({ currency, balance: b })).toLocaleString(getLanguage().replace('_', '-'));
    $('.topMenuBalance').text(`${balance} ${currency}`);
});

const addBalanceForToken = token => {
    api.authorize(token).then(() => {
        api.send({ forget_all: 'balance' }).then(() => {
            api.subscribeToBalance();
        });
    });
};

const chart = new Chart(api);

const tradingView = new TradingView();

const setBeforeUnload = off => {
    if (off) {
        window.onbeforeunload = null;
    } else {
        window.onbeforeunload = () => 'You have some unsaved blocks, do you want to save them before you exit?';
    }
};

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

const limits = new Limits();
const saveDialog = new Save();

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
        updateLogo(activeToken.token);
        addBalanceForToken(activeToken.token);
        if (!('loginInfo' in activeToken)) {
            removeAllTokens();
            updateTokenList();
        }
        tokenList.forEach(tokenInfo => {
            const prefix = isVirtual(tokenInfo) ? 'Virtual Account' : `${tokenInfo.loginInfo.currency} Account`;
            if (tokenInfo === activeToken) {
                $('.account-id')
                    .attr('value', `${tokenInfo.token}`)
                    .text(`${tokenInfo.accountName}`);
                $('.account-type').text(`${prefix}`);
            } else {
                $('.login-id-list').append(
                    `<a href="#" value="${tokenInfo.token}"><li><span>${prefix}</span><div>${
                        tokenInfo.accountName
                    }</div></li></a><div class="separator-line-thin-gray"></div>`
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

export default class View {
    constructor() {
        logHandler();
        this.initPromise = new Promise(resolve => {
            updateConfigCurrencies().then(() => {
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

    setFileBrowser() {
        const readFile = (f, dropEvent = {}) => {
            const reader = new FileReader();
            reader.onload = e => this.blockly.load(e.target.result, dropEvent);
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
            $('#summaryPanel').dialog('open');
            addExportButtonToPanel('summaryPanel');
        };

        $('#logButton').click(() => {
            $('#logPanel').dialog('open');
            addExportButtonToPanel('logPanel');
        });

        $('#showSummary').click(showSummary);

        $('#toggleHeaderButton').click(() => this.showHeader($('#header').is(':hidden')));

        $('#loadXml').click(() => {
            $('#files').click();
        });

        $('#logout, #toolbox-logout').click(() => {
            setBeforeUnload(true);
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
            $('#stopButton, #summaryStopButton').show();
            $('#runButton, #summaryRunButton').hide();
            $('#runButton, #summaryRunButton, #summaryClearButton').prop('disabled', true);
            showSummary();
            this.blockly.run(limitations);
        };

        $('#runButton').click(() => {
            const token = $('.account-id')
                .first()
                .attr('value');
            const tokenObj = getToken(token);
            initRealityCheck(() => $('#stopButton').triggerHandler('click'));
            if (tokenObj && tokenObj.hasTradeLimitation) {
                limits.getLimits().then(startBot);
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
                    this.blockly.cleanUp();
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
                setBeforeUnload(true);
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
        window.addEventListener('storage', e => {
            window.onbeforeunload = null;
            if (e.key === 'activeToken' && !e.newValue) window.location.reload();
            if (e.key === 'realityCheckTime') hideRealityCheck();
        });

        globalObserver.register('Error', error => {
            $('#runButton, #summaryRunButton').prop('disabled', false);
            if (error.error && error.error.error.code === 'InvalidToken') {
                removeAllTokens();
                updateTokenList();
                this.stop();
            }
        });

        globalObserver.register('bot.stop', () => {
            $('#runButton, #summaryRunButton, #summaryClearButton').prop('disabled', false);
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
    ReactDOM.render(<TradeInfoPanel />, $('#summaryPanel')[0]);
    ReactDOM.render(<LogTable />, $('#logTable')[0]);
}
