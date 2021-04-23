import { fieldGeneratorMapping } from './blocks/shared';
import { saveAs } from '../shared';
import config from '../../common/const';
import { translate } from '../../../common/i18n';
import { observer as globalObserver } from '../../../common/utils/observer';
import { TrackJSError } from '../logger';

export const isMainBlock = blockType => config.mainBlocks.indexOf(blockType) >= 0;

export const oppositesToDropdown = op => op.map(k => Object.entries(k)[0].reverse());

export const backwardCompatibility = block => {
    if (block.getAttribute('type') === 'on_strategy') {
        block.setAttribute('type', 'before_purchase');
    } else if (block.getAttribute('type') === 'on_finish') {
        block.setAttribute('type', 'after_purchase');
    }
    Array.from(block.getElementsByTagName('statement')).forEach(statement => {
        if (statement.getAttribute('name') === 'STRATEGY_STACK') {
            statement.setAttribute('name', 'BEFOREPURCHASE_STACK');
        } else if (statement.getAttribute('name') === 'FINISH_STACK') {
            statement.setAttribute('name', 'AFTERPURCHASE_STACK');
        }
    });
    if (isMainBlock(block.getAttribute('type'))) {
        block.removeAttribute('deletable');
    }
};

export const removeUnavailableMarkets = block => {
    const containsUnavailableMarket = Array.from(block.getElementsByTagName('field')).some(
        field =>
            field.getAttribute('name') === 'MARKET_LIST' &&
            !fieldGeneratorMapping
                .MARKET_LIST()
                .map(markets => markets[1])
                .includes(field.innerText)
    );
    if (containsUnavailableMarket) {
        const nodesToRemove = ['MARKET_LIST', 'SUBMARKET_LIST', 'SYMBOL_LIST', 'TRADETYPECAT_LIST', 'TRADETYPE_LIST'];
        Array.from(block.getElementsByTagName('field')).forEach(field => {
            if (nodesToRemove.includes(field.getAttribute('name'))) {
                block.removeChild(field);
            }
        });
    }
    return containsUnavailableMarket;
};

// Checks for a valid tradeTypeCategory, and attempts to fix if invalid
// Some tradeTypes were moved to new tradeTypeCategories, this function allows older strategies to keep functioning
export const strategyHasValidTradeTypeCategory = xml => {
    const isTradeTypeListBlock = block =>
        block.getAttribute('type') === 'trade' &&
        Array.from(block.getElementsByTagName('field')).some(field => field.getAttribute('name') === 'TRADETYPE_LIST');
    const xmlBlocks = Array.from(xml.children);
    const containsTradeTypeBlock = xmlBlocks.some(block => isTradeTypeListBlock(block));
    if (!containsTradeTypeBlock) {
        return true;
    }
    const validTradeTypeCategory = xmlBlocks.some(block => {
        if (isTradeTypeListBlock(block)) {
            const xmlFields = Array.from(block.getElementsByTagName('field'));
            return xmlFields.some(xmlField => {
                if (xmlField.getAttribute('name') === 'TRADETYPE_LIST') {
                    // Retrieves the correct TRADETYPECAT_LIST for this TRADETYPE_LIST e.g. 'risefallequals' = 'callputequal'
                    const tradeTypeCategory = Object.keys(config.conditionsCategory).find(c =>
                        config.conditionsCategory[c].includes(xmlField.innerText)
                    );
                    // Check if the current TRADETYPECAT_LIST is equal to the tradeTypeCategory
                    const tradeTypeCategoryIsEqual = xmlFields.some(
                        f => f.getAttribute('name') === 'TRADETYPECAT_LIST' && f.textContent === tradeTypeCategory
                    );
                    // If the Trade Type Category is invalid, try to fix it
                    if (!tradeTypeCategoryIsEqual) {
                        try {
                            const tempWorkspace = new Blockly.Workspace({});
                            const blocklyBlock = Blockly.Xml.domToBlock(block, tempWorkspace);
                            const availableCategories = fieldGeneratorMapping.TRADETYPECAT_LIST(blocklyBlock)();
                            return xmlFields.some(
                                f =>
                                    f.getAttribute('name') === 'TRADETYPECAT_LIST' &&
                                    availableCategories.some(
                                        category =>
                                            category[1] === tradeTypeCategory &&
                                            Object.assign(f, { textContent: tradeTypeCategory })
                                    )
                            );
                        } catch (e) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            });
        }
        return false;
    });
    if (!validTradeTypeCategory) {
        const error = new TrackJSError('FileLoad', translate('The strategy you tried to import is invalid.'));
        globalObserver.emit('Error', error);
    }
    return validTradeTypeCategory;
};

export const updateRenamedFields = xml => {
    const elementRenames = {
        MARKET_LIST: {
            volidx: 'synthetic_index',
        },
    };

    const fields = xml.getElementsByTagName('field');

    Array.from(fields).forEach(field => {
        if (!field.hasAttribute('name')) {
            return;
        }

        Object.keys(elementRenames).forEach(elementRename => {
            if (elementRename === field.getAttribute('name')) {
                Object.keys(elementRenames[elementRename]).forEach(replacementKey => {
                    if (replacementKey === field.textContent) {
                        // eslint-disable-next-line no-param-reassign
                        field.textContent = elementRenames[elementRename][replacementKey];
                    }
                });
            }
        });
    });
};

const getCollapsedProcedures = () =>
    Blockly.mainWorkspace
        .getTopBlocks()
        // eslint-disable-next-line no-underscore-dangle
        .filter(block => !isMainBlock(block.type) && block.collapsed_ && block.type.indexOf('procedures_def') === 0);

export const fixCollapsedBlocks = () =>
    getCollapsedProcedures().forEach(block => {
        block.setCollapsed(false);
        block.setCollapsed(true);
    });

export const cleanUpOnLoad = (blocksToClean, dropEvent) => {
    const { clientX = 0, clientY = 0 } = dropEvent || {};
    const blocklyMetrics = Blockly.mainWorkspace.getMetrics();
    const scaleCancellation = 1 / Blockly.mainWorkspace.scale;
    const blocklyLeft = blocklyMetrics.absoluteLeft - blocklyMetrics.viewLeft;
    const blocklyTop = document.body.offsetHeight - blocklyMetrics.viewHeight - blocklyMetrics.viewTop;
    const cursorX = clientX ? (clientX - blocklyLeft) * scaleCancellation : 0;
    let cursorY = clientY ? (clientY - blocklyTop) * scaleCancellation : 0;
    blocksToClean.forEach(block => {
        block.moveBy(cursorX, cursorY);
        block.snapToGrid();
        cursorY += block.getHeightWidth().height + Blockly.BlockSvg.MIN_BLOCK_Y;
    });
    // Fire an event to allow scrollbars to resize.
    Blockly.mainWorkspace.resizeContents();
};

export const deleteBlockIfExists = block => {
    Blockly.Events.recordUndo = false;
    const existed = Blockly.mainWorkspace
        .getTopBlocks()
        .filter(mainBlock => !block.isInFlyout && mainBlock.id !== block.id && mainBlock.type === block.type)
        .map(b => b.dispose()).length;
    Blockly.Events.recordUndo = true;
    return existed;
};

export const setBlockTextColor = block => {
    Blockly.Events.recordUndo = false;
    if (block.inputList instanceof Array) {
        Array.from(block.inputList).forEach(inp =>
            inp.fieldRow.forEach(field => {
                if (field instanceof Blockly.FieldLabel) {
                    const svgElement = field.getSvgRoot();
                    if (svgElement) {
                        svgElement.style.setProperty('fill', 'white', 'important');
                    }
                }
            })
        );
    }
    const field = block.getField();
    if (field) {
        const svgElement = field.getSvgRoot();
        if (svgElement) {
            svgElement.style.setProperty('fill', 'white', 'important');
        }
    }
    Blockly.Events.recordUndo = true;
};

export const configMainBlock = (ev, type) => {
    if (ev.type === 'create') {
        ev.ids.forEach(blockId => {
            const block = Blockly.mainWorkspace.getBlockById(blockId);
            if (block && block.type === type) {
                deleteBlockIfExists(block);
            }
        });
    }
};

export const getBlockByType = type => Blockly.mainWorkspace.getAllBlocks().find(block => type === block.type);

export const getBlocksByType = type => Blockly.mainWorkspace.getAllBlocks().filter(block => type === block.type);

export const getTopBlocksByType = type => Blockly.mainWorkspace.getTopBlocks().filter(block => type === block.type);

export const getMainBlocks = () => config.mainBlocks.map(blockType => getBlockByType(blockType)).filter(b => b);

export const getMandatoryBlocks = () => config.mandatoryBlocks.map(type => getBlockByType(type)).filter(b => b);

export const getMandatoryMainBlocks = () => config.mandatoryMainBlocks.map(type => getBlockByType(type)).filter(b => b);

export const hasChildOfType = (block, childType) =>
    block.childBlocks_.find(child => child.type === childType || hasChildOfType(child, childType));

export const getMissingBlocksTypes = () => {
    const presentBlocks = getMandatoryBlocks();
    const missingBlocksTypes = config.mandatoryBlocks.filter(type => !presentBlocks.find(block => block.type === type));

    return missingBlocksTypes;
};

export const getDisabledMandatoryBlocks = () => {
    const presentMandatoryMainBlocks = getMandatoryMainBlocks();
    const disabledMandatoryMainBlocks = presentMandatoryMainBlocks.filter(block => block.disabled);

    return disabledMandatoryMainBlocks;
};

export const getUnattachedMandatoryPairs = () => {
    const presentMandatoryMainBlocks = getMandatoryMainBlocks();
    const unattachedPairs = config.mandatoryBlockPairs.filter(pair =>
        presentMandatoryMainBlocks.find(
            block => block.type === pair.parentBlock && !hasChildOfType(block, pair.childBlock)
        )
    );

    return unattachedPairs;
};

export const findTopParentBlock = b => {
    let block = b;
    // eslint-disable-next-line no-underscore-dangle
    let pblock = block.parentBlock_;
    if (pblock === null) {
        return null;
    }
    while (pblock !== null) {
        if (pblock.type === 'trade') {
            return pblock;
        }
        block = pblock;
        // eslint-disable-next-line no-underscore-dangle
        pblock = block.parentBlock_;
    }
    return block;
};

export const insideMainBlocks = block => {
    const parent = findTopParentBlock(block);
    if (!parent) {
        return false;
    }
    return parent.type && isMainBlock(parent.type);
};

export const save = (filename = 'binary-bot', collection = false, xmlDom) => {
    xmlDom.setAttribute('collection', collection ? 'true' : 'false');
    const data = Blockly.Xml.domToPrettyText(xmlDom);
    saveAs({ data, type: 'text/xml;charset=utf-8', filename: `${filename}.xml` });
};

export const disable = (blockObj, message) => {
    if (!blockObj.disabled) {
        if (message) {
            globalObserver.emit('ui.log.warn', message);
        }
    }
    Blockly.Events.recordUndo = false;
    blockObj.setDisabled(true);
    Blockly.Events.recordUndo = true;
};

export const enable = blockObj => {
    Blockly.Events.recordUndo = false;
    blockObj.setDisabled(false);
    Blockly.Events.recordUndo = true;
};

export const expandDuration = duration =>
    `${duration
        .replace(/t/g, ' tick')
        .replace(/s/g, ' second')
        .replace(/m/g, ' minute')
        .replace(/h/g, ' hour')
        .replace(/d/g, ' day')}(s)`;

const isProcedure = blockType => ['procedures_defreturn', 'procedures_defnoreturn'].indexOf(blockType) >= 0;

// dummy event to recover deleted blocks loaded by loader
class DeleteStray extends Blockly.Events.Abstract {
    constructor(block) {
        super(block);
        this.run(true);
    }
    run(redo) {
        const { recordUndo } = Blockly.Events;
        Blockly.Events.recordUndo = false;
        const sourceBlock = Blockly.mainWorkspace.getBlockById(this.blockId);
        if (!sourceBlock) {
            return;
        }
        if (redo) {
            sourceBlock.setFieldValue(`${sourceBlock.getFieldValue('NAME')} (deleted)`, 'NAME');
            sourceBlock.setDisabled(true);
        } else {
            sourceBlock.setFieldValue(sourceBlock.getFieldValue('NAME').replace(' (deleted)', ''), 'NAME');
            sourceBlock.setDisabled(false);
        }
        Blockly.Events.recordUndo = recordUndo;
    }
}
DeleteStray.prototype.type = 'deletestray';

// dummy event to hide the element after creation
class Hide extends Blockly.Events.Abstract {
    constructor(block, header) {
        super(block);
        this.sourceHeaderId = header.id;
        this.run(true);
    }
    run() {
        const { recordUndo } = Blockly.Events;
        Blockly.Events.recordUndo = false;
        const sourceBlock = Blockly.mainWorkspace.getBlockById(this.blockId);
        const sourceHeader = Blockly.mainWorkspace.getBlockById(this.sourceHeaderId);
        sourceBlock.loaderId = sourceHeader.id;
        sourceHeader.loadedByMe.push(sourceBlock.id);
        sourceBlock.getSvgRoot().style.display = 'none';
        Blockly.Events.recordUndo = recordUndo;
    }
}
Hide.prototype.type = 'hide';

export const deleteBlocksLoadedBy = (id, eventGroup = true) => {
    Blockly.Events.setGroup(eventGroup);
    Blockly.mainWorkspace.getTopBlocks().forEach(block => {
        if (block.loaderId === id) {
            if (isProcedure(block.type)) {
                if (block.getFieldValue('NAME').indexOf('deleted') < 0) {
                    Blockly.Events.fire(new DeleteStray(block));
                }
            } else {
                block.dispose();
            }
        }
    });
    Blockly.Events.setGroup(false);
};
export const fixArgumentAttribute = xml => {
    Array.from(xml.getElementsByTagName('arg')).forEach(o => {
        if (o.hasAttribute('varid')) o.setAttribute('varId', o.getAttribute('varid'));
    });
};
export const addDomAsBlock = blockXml => {
    if (blockXml.tagName === 'variables') {
        return Blockly.Xml.domToVariables(blockXml, Blockly.mainWorkspace);
    }
    backwardCompatibility(blockXml);
    const blockType = blockXml.getAttribute('type');
    if (isMainBlock(blockType)) {
        Blockly.mainWorkspace
            .getTopBlocks()
            .filter(b => b.type === blockType)
            .forEach(b => b.dispose());
    }
    if (isProcedure(blockType)) {
        fixArgumentAttribute(blockXml);
    }
    return Blockly.Xml.domToBlock(blockXml, Blockly.mainWorkspace);
};

/* const replaceDeletedBlock = block => {
    const procedureName = block.getFieldValue('NAME');
    const oldProcedure = Blockly.Procedures.getDefinition(`${procedureName} (deleted)`, Blockly.mainWorkspace);
    if (oldProcedure) {
        const { recordUndo } = Blockly.Events;
        Blockly.Events.recordUndo = false;
        const f = block.getField('NAME');
        // eslint-disable-next-line no-underscore-dangle
        f.text_ = `${procedureName} (deleted)`;
        oldProcedure.dispose();
        block.setFieldValue(`${procedureName}`, 'NAME');
        Blockly.Events.recordUndo = recordUndo;
    }
}; */

export const recoverDeletedBlock = block => {
    const { recordUndo } = Blockly.Events;
    Blockly.Events.recordUndo = false;
    block.setFieldValue(block.getFieldValue('NAME').replace(' (deleted)', ''), 'NAME');
    block.setDisabled(false);
    Blockly.Events.recordUndo = recordUndo;
};

const addDomAsBlockFromHeader = (blockXml /* , header = null */) => {
    // const oldVars = [...Blockly.mainWorkspace.variableList];
    const block = Blockly.Xml.domToBlock(blockXml, Blockly.mainWorkspace);
    /* Blockly.mainWorkspace.variableList = Blockly.mainWorkspace.variableList.filter(v => {
        if (oldVars.indexOf(v) >= 0) {
            return true;
        }
        header.loadedVariables.push(v);
        return false;
    });
    replaceDeletedBlock(block);
    Blockly.Events.fire(new Hide(block, header)); */
    return block;
};

const processLoaders = (xml, header = null) => {
    const promises = [];
    Array.from(xml.children).forEach(block => {
        if (block.getAttribute('type') === 'loader') {
            block.remove();

            const loader = header
                ? addDomAsBlockFromHeader(block, header)
                : Blockly.Xml.domToBlock(block, Blockly.mainWorkspace);

            promises.push(loadRemote(loader)); // eslint-disable-line no-use-before-define
        }
    });
    return promises;
};

export const addLoadersFirst = (xml, header = null) =>
    new Promise((resolve, reject) => {
        const promises = processLoaders(xml, header);
        if (promises.length) {
            Promise.all(promises).then(resolve, reject);
        } else {
            resolve([]);
        }
    });

const loadBlocksFromHeader = (blockStr = '', header) =>
    new Promise((resolve, reject) => {
        let xml;
        try {
            xml = Blockly.Xml.textToDom(blockStr);
        } catch (e) {
            reject(translate('Unrecognized file format.'));
        }
        try {
            if (xml.hasAttribute('collection') && xml.getAttribute('collection') === 'true') {
                const { recordUndo } = Blockly.Events;
                Blockly.Events.recordUndo = false;
                addLoadersFirst(xml, header).then(
                    () => {
                        Array.from(xml.children)
                            .filter(
                                block =>
                                    block.getAttribute('type') === 'tick_analysis' ||
                                    isProcedure(block.getAttribute('type'))
                            )
                            .forEach(block => addDomAsBlockFromHeader(block, header));

                        Blockly.Events.recordUndo = recordUndo;
                        resolve();
                    },
                    e => {
                        Blockly.Events.recordUndo = recordUndo;
                        reject(e);
                    }
                );
            } else {
                reject(translate('Remote blocks to load must be a collection.'));
            }
        } catch (e) {
            reject(translate('Unable to load the block file.'));
        }
    });

export const loadRemote = blockObj =>
    new Promise((resolve, reject) => {
        let url = blockObj.getFieldValue('URL');
        if (url.indexOf('http') !== 0) {
            url = `http://${url}`;
        }
        if (!url.match(/[^/]*\.[a-zA-Z]{3}$/) && url.slice(-1)[0] !== '/') {
            reject(translate('Target must be an xml file'));
        } else {
            if (url.slice(-1)[0] === '/') {
                url += 'index.xml';
            }
            let isNew = true;
            getTopBlocksByType('loader').forEach(block => {
                if (block.id !== blockObj.id && block.url === url) {
                    isNew = false;
                }
            });
            if (!isNew) {
                disable(blockObj);
                reject(translate('This url is already loaded'));
            } else {
                $.ajax({
                    type: 'GET',
                    url,
                })
                    .fail(e => {
                        if (e.status) {
                            reject(
                                Error(
                                    `${translate('An error occurred while trying to load the url')}: ${e.status} ${
                                        e.statusText
                                    }`
                                )
                            );
                        } else {
                            reject(
                                Error(
                                    translate(
                                        'Make sure \'Access-Control-Allow-Origin\' exists in the response from the server'
                                    )
                                )
                            );
                        }
                        deleteBlocksLoadedBy(blockObj.id);
                    })
                    .done(xml => {
                        loadBlocksFromHeader(xml, blockObj).then(() => {
                            enable(blockObj);
                            blockObj.url = url; // eslint-disable-line no-param-reassign
                            resolve(blockObj);
                        }, reject);
                    });
            }
        }
    });

export const hideInteractionsFromBlockly = callback => {
    Blockly.Events.recordUndo = false;
    callback();
    Blockly.Events.recordUndo = true;
};

export const cleanBeforeExport = xml => {
    Array.from(xml.children).forEach(blockDom => {
        const blockId = blockDom.getAttribute('id');
        if (!blockId) return;
        const block = Blockly.mainWorkspace.getBlockById(blockId);
        if ('loaderId' in block) {
            blockDom.remove();
        }
    });
};

export const importFile = xml =>
    new Promise((resolve, reject) => {
        $.get(xml, dom => {
            resolve(dom);
        }).catch(() => {
            const previousWorkspaceText = localStorage.getItem('previousStrat');
            reject(previousWorkspaceText);
        });
    });

export const saveBeforeUnload = () => {
    window.onbeforeunload = () => {
        const currentDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        localStorage.setItem('previousStrat', Blockly.Xml.domToPrettyText(currentDom));
        return null;
    };
};

export const removeParam = key => {
    const sourceURL = window.location.href;
    let rtn = sourceURL.split('?')[0];
    let paramsArr = [];
    const queryString = sourceURL.indexOf('?') !== -1 ? sourceURL.split('?')[1] : '';
    if (queryString !== '') {
        paramsArr = queryString.split('&');
        for (let i = paramsArr.length - 1; i >= 0; i -= 1) {
            const paramPair = paramsArr[i];
            const paramKey = paramPair.split('=');
            const param = paramKey[0];
            if (param === key) {
                paramsArr.splice(i, 1);
            }
        }
        if (paramsArr.length) {
            rtn = `${rtn}?${paramsArr.join('&')}`;
        }
    }

    window.history.pushState({}, window.title, rtn);
};

export const getPreviousStrat = () => localStorage.getItem('previousStrat');
