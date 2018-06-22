import React from 'react';
import ReactDOM from 'react-dom';
import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import {
    getTokenList,
    removeAllTokens,
    get as getStorage,
    set as setStorage,
    getToken,
} from 'binary-common-utils/lib/storageManager';
import 'jquery-ui/ui/widgets/dialog';
import _Blockly from './blockly';
import { translate } from '../../common/i18n';
import Save from './Dialogs/Save';
import Limits from './Dialogs/Limits';
import Chart from './Dialogs/Chart';
import TradingView from './Dialogs/TradingView';
import { getLanguage } from '../../common/lang';
import { roundBalance, isVirtual } from '../common/tools';
import { symbolPromise } from './shared';
import logHandler from './logger';
import Tour from './tour';
import OfficialVersionWarning from './react-components/OfficialVersionWarning';
import LogTable from './LogTable';
import TradeInfoPanel from './TradeInfoPanel';
import { logoutAllTokens, getOAuthURL, generateLiveApiInstance, AppConstants } from '../../common/appId';
import { updateConfigCurrencies } from '../common/const';

let realityCheckTimeout;

const api = generateLiveApiInstance();

api.events.on('balance', response => {
    const { balance: { balance: b, currency } } = response;

    const balance = roundBalance({ currency, balance: b });
    $('.topMenuBalance').text(`${balance} ${currency}`);
});

const addBalanceForToken = token => {
    api.authorize(token).then(() => {
        api.send({ forget_all: 'balance' }).then(() => {
            api.subscribeToBalance();
        });
    });
};

const chart = new Chart();
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

const realityCheckInterval = () => {
    realityCheckTimeout = setInterval(() => {
        const now = parseInt(new Date().getTime() / 1000);
        const checkTime = +getStorage('realityCheckTime');
        if (checkTime && now >= checkTime) {
            showRealityCheck();
            stopRealityCheck();
        }
    }, 1000);
};

const startRealityCheck = (time, token) => {
    stopRealityCheck();
    if (time) {
        const start = parseInt(new Date().getTime() / 1000) + time * 60;
        setStorage('realityCheckTime', start);
        realityCheckInterval();
    } else {
        const tokenObj = getToken(token);
        if (tokenObj.hasRealityCheck) {
            const checkTime = +getStorage('realityCheckTime');
            if (!checkTime) {
                showRealityCheck();
            } else {
                realityCheckInterval();
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
// const chart = new Chart();

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
        $('.binary-logo-text > img').attr('src', 'https://style.binary.com/images/logo/type.svg');
    }
    setTimeout(() => window.dispatchEvent(new Event('resize')));
};

const getActiveToken = (tokenList, activeToken) => {
    const activeTokenObject = tokenList.filter(tokenObject => tokenObject.token === activeToken);
    return activeTokenObject.length ? activeTokenObject[0] : tokenList[0];
};

const updateTokenList = () => {
    const tokenList = getTokenList();
    const loginButton = $('#login');
    const accountList = $('#account-list');
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
    if (getTokenList().length) {
        $('#runButton').show();
        $('#showSummary').show();
        $('#logButton').show();
    } else {
        $('#runButton').hide();
        $('#showSummary').hide();
        $('#logButton').hide();
    }
};

const showReloadPopup = () =>
    new Promise((resolve, reject) => {
        setBeforeUnload(true);
        $('#reloadPanel').dialog({
            height: 'auto',
            width : 600,
            modal : true,
            open() {
                $(this)
                    .parent()
                    .find('.ui-dialog-buttonset > button')
                    .removeClass('ui-button ui-corner-all ui-widget');
            },
            buttons: [
                {
                    text : translate('No'),
                    class: 'button-secondary',
                    click() {
                        $(this).dialog('close');
                        reject();
                    },
                },
                {
                    text : translate('Yes'),
                    class: 'button-primary',
                    click() {
                        $(this).dialog('close');
                        resolve();
                    },
                },
            ],
        });
        $('#reloadPanel').dialog('open');
    });

export default class View {
    constructor() {
        logHandler();
        this.initPromise = new Promise(resolve => {
            updateConfigCurrencies().then(() => {
                symbolPromise.then(() => {
                    updateTokenList();
                    this.blockly = new _Blockly();
                    this.blockly.initPromise.then(() => {
                        this.setElementActions();
                        initRealityCheck();
                        applyToolboxPermissions();
                        renderReactComponents();
                        if (!getTokenList().length) updateLogo();
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

        const logout = () => {
            showReloadPopup()
                .then(() => {
                    logoutAllTokens().then(() => {
                        updateTokenList();
                        globalObserver.emit('ui.log.info', translate('Logged you out!'));
                        clearRealityCheck();
                        clearActiveTokens();
                        window.location.reload();
                    });
                })
                .catch(() => {});
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
                width    : Math.min(document.body.offsetWidth, 700),
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
        const showLog = () => {
            $('#logPanel').dialog('open');
            addExportButtonToPanel('logPanel');
        };

        $('#logButton').click(showLog);

        $('#showSummary').click(showSummary);

        $('#loadXml').click(() => {
            $('#files').click();
        });

        $('#logout, #logout-reality-check').click(() => {
            logout();
            hideRealityCheck();
        });

        const submitRealityCheck = () => {
            const time = parseInt($('#realityDuration').val());
            if (time >= 10 && time <= 60) {
                hideRealityCheck();
                startRealityCheck(time);
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
            const unicodeStrings = /[\u0008|\u0000]/;
            if (unicodeStrings.test(char)) return;

            if (!/([0-9])/.test(char)) {
                e.preventDefault();
            }
        });

        const startBot = limitations => {
            $('#stopButton').show();
            $('#runButton').hide();
            showSummary();
            this.blockly.run(limitations);
        };

        $('#runButton').click(() => {
            const token = $('.account-id')
                .first()
                .attr('value');
            const tokenObj = getToken(token);
            if (tokenObj && tokenObj.hasTradeLimitation) {
                limits.getLimits().then(startBot);
            } else {
                startBot();
            }
        });

        $('#stopButton')
            .click(e => stop(e))
            .hide();

        $('#resetButton').click(() => {
            this.blockly.resetWorkspace();
            setTimeout(() => this.blockly.cleanUp(), 0);
        });

        $('.login-id-list').on('click', 'a', e => {
            showReloadPopup()
                .then(() => {
                    setStorage(AppConstants.STORAGE_ACTIVE_TOKEN, $(e.currentTarget).attr('value'));
                    window.location.reload();
                })
                .catch(() => {});
        });

        $('#login')
            .bind('click.login', () => {
                document.location = getOAuthURL();
            })
            .text('Log in');

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
        globalObserver.register('Error', error => {
            if (error.error && error.error.error.code === 'InvalidToken') {
                removeAllTokens();
                updateTokenList();
                this.stop();
            }
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
}

function initRealityCheck() {
    startRealityCheck(
        null,
        $('.account-id')
            .first()
            .attr('value')
    );
}
function renderReactComponents() {
    ReactDOM.render(<Tour />, $('#tour')[0]);
    ReactDOM.render(
        <OfficialVersionWarning
            show={
                !(
                    typeof window.location !== 'undefined' &&
                    window.location.host === 'bot.binary.com' &&
                    window.location.pathname === '/bot.html'
                )
            }
        />,
        $('#footer')[0]
    );
    ReactDOM.render(<TradeInfoPanel />, $('#summaryPanel')[0]);
    ReactDOM.render(<LogTable />, $('#logTable')[0]);
}
