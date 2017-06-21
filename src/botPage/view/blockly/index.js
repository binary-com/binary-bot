import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { translate, xml as translateXml } from '../../../common/i18n';
import createError from '../../common/error';
import {
    isMainBlock,
    save,
    disable,
    deleteBlocksLoadedBy,
    addLoadersFirst,
    cleanUpOnLoad,
    addDomAsBlock,
    backwardCompatibility,
    fixCollapsedBlocks,
} from './utils';
import blocks from './blocks';
import Interpreter from '../../bot/Interpreter';
import { getLanguage } from '../../../common/lang';

const setBeforeUnload = off => {
    if (off) {
        window.onbeforeunload = null;
    } else {
        window.onbeforeunload = () => 'You have some unsaved blocks, do you want to save them before you exit?';
    }
};

const disableStrayBlocks = () => {
    const topBlocks = Blockly.mainWorkspace.getTopBlocks();
    topBlocks.forEach(block => {
        if (
            !isMainBlock(block.type) &&
            ['block_holder', 'tick_analysis', 'loader', 'procedures_defreturn', 'procedures_defnoreturn'].indexOf(
                block.type
            ) < 0 &&
            !block.disabled
        ) {
            disable(block, translate('Blocks must be inside block holders, main blocks or functions'));
        }
    });
};
const disposeBlocksWithLoaders = () => {
    Blockly.mainWorkspace.addChangeListener(ev => {
        setBeforeUnload();
        if (ev.type === 'delete' && ev.oldXml.getAttribute('type') === 'loader' && ev.group !== 'undo') {
            deleteBlocksLoadedBy(ev.blockId, ev.group);
        }
    });
};
const loadWorkspace = xml => {
    Blockly.Events.setGroup('load');
    Blockly.mainWorkspace.clear();
    addLoadersFirst(xml).then(
        () => {
            Array.from(xml.children).forEach(block => backwardCompatibility(block));
            Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
            fixCollapsedBlocks();
            globalObserver.emit('ui.log.success', translate('Blocks are loaded successfully'));
            Blockly.Events.setGroup(false);
        },
        e => {
            Blockly.Events.setGroup(false);
            throw e;
        }
    );
};
const loadBlocks = (xml, dropEvent = {}) => {
    Blockly.Events.setGroup('load');
    addLoadersFirst(xml).then(
        loaders => {
            const addedBlocks = [
                ...loaders,
                ...Array.from(xml.children).map(block => addDomAsBlock(block)).filter(b => b),
            ];
            cleanUpOnLoad(addedBlocks, dropEvent);
            fixCollapsedBlocks();
            globalObserver.emit('ui.log.success', translate('Blocks are loaded successfully'));
        },
        e => {
            throw e;
        }
    );
};
const xmlToStr = xml => {
    const serializer = new XMLSerializer();
    return serializer.serializeToString(xml);
};
const addBlocklyTranslation = () => {
    $.ajaxPrefilter(options => {
        options.async = true; // eslint-disable-line no-param-reassign
    });
    const script = document.createElement('script');
    script.type = 'text/javascript';
    let lang = getLanguage();
    if (lang === 'ach') {
        lang = 'en';
    } else if (lang === 'zh_cn') {
        lang = 'zh-hans';
    } else if (lang === 'zh_tw') {
        lang = 'zh-hant';
    }
    script.src = `https://blockly-demo.appspot.com/static/msg/js/${lang}.js`;
    $('body').append(script);
};
export default class _Blockly {
    constructor() {
        this.blocksXmlStr = '';
        this.generatedJs = '';
        addBlocklyTranslation();
        // eslint-disable-next-line no-underscore-dangle
        Blockly.WorkspaceSvg.prototype.preloadAudio_ = () => {}; // https://github.com/google/blockly/issues/299
        this.initPromise = new Promise(resolve => {
            $.get('xml/toolbox.xml', toolboxXml => {
                blocks();
                const workspace = Blockly.inject('blocklyDiv', {
                    toolbox: xmlToStr(translateXml(toolboxXml.getElementsByTagName('xml')[0])),
                    zoom   : {
                        wheel: false,
                    },
                    trashcan: false,
                });
                $.get('xml/main.xml', main => {
                    this.overrideBlocklyDefaultShape();
                    this.blocksXmlStr = Blockly.Xml.domToPrettyText(main);
                    Blockly.Xml.domToWorkspace(main.getElementsByTagName('xml')[0], workspace);
                    this.zoomOnPlusMinus();
                    Blockly.mainWorkspace.clearUndo();
                    disposeBlocksWithLoaders();
                    setTimeout(() => setBeforeUnload(true), 0);
                    resolve();
                });
            });
        });
    }
    resetWorkspace() {
        Blockly.Events.setGroup(true);
        Blockly.mainWorkspace.clear();
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(this.blocksXmlStr), Blockly.mainWorkspace);
        Blockly.Events.setGroup(false);
    }
    overrideBlocklyDefaultShape() {
        // eslint-disable-next-line no-underscore-dangle
        Blockly.Blocks.text.newQuote_ = open => {
            // eslint-disable-line no-underscore-dangle
            let file;
            if (open === this.RTL) {
                file =
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAYAAAAGuM1UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFpJREFUeNpiZGBg+M+ACRyh9H50CSYGEsEg1AACDlB8HxoAIKwAxAJIcu+h4u+RNcEUz0czMAFJroEBKfiQTUcG95FMF2BBUnAAiA8C8QM05z6A4o1A/AEgwACTSBqO/l02SwAAAABJRU5ErkJggg==';
            } else {
                file =
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAYAAAAGuM1UAAAAAXNSR0IArs4c6QAAActpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgSW1hZ2VSZWFkeTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KKS7NPQAAAHFJREFUGBljYICAAiC1H4odIEJwsgHIgskpgEQFgPg9EP8H4vtAjAwUgByQOAjvB2IwaACSMMEEsAiCmI8k5wASZgRikOkgWz4AcSAQg8AFIAaJ3QdxgOABECeCGCANINPRgSNUYD+6BBO6ACH+INQAAKsvFws0VtvEAAAAAElFTkSuQmCC';
            }
            return new Blockly.FieldImage(file, 12, 12, '"');
        };
        Blockly.Blocks.texts.HUE = '#dedede';
        Blockly.Blocks.math.HUE = '#dedede';
        Blockly.Blocks.logic.HUE = '#dedede';
        Blockly.Blocks.loops.HUE = '#dedede';
        Blockly.Blocks.lists.HUE = '#dedede';
        Blockly.Blocks.variables.HUE = '#dedede';
        Blockly.Blocks.procedures.HUE = '#dedede';
        const addDownloadToMenu = block => {
            if (block instanceof Object) {
                // eslint-disable-next-line no-param-reassign, max-len
                block.customContextMenu = function customContextMenu(options) {
                    options.push({
                        text    : translate('Download'),
                        enabled : true,
                        callback: () => {
                            const xml = Blockly.Xml.textToDom(
                                '<xml xmlns="http://www.w3.org/1999/xhtml" collection="false"></xml>'
                            );
                            xml.appendChild(Blockly.Xml.blockToDom(this));
                            save('binary-bot-block', true, xml);
                        },
                    });
                };
            }
        };
        Object.keys(Blockly.Blocks).forEach(blockName => addDownloadToMenu(Blockly.Blocks[blockName]));
    }
    /* eslint-disable class-methods-use-this */
    zoomOnPlusMinus(zoomIn) {
        const metrics = Blockly.mainWorkspace.getMetrics();
        if (zoomIn) {
            Blockly.mainWorkspace.zoom(metrics.viewWidth / 2, metrics.viewHeight / 2, 1);
        } else {
            Blockly.mainWorkspace.zoom(metrics.viewWidth / 2, metrics.viewHeight / 2, -1);
        }
    }
    cleanUp() {
        Blockly.Events.setGroup(true);
        const topBlocks = Blockly.mainWorkspace.getTopBlocks(true);
        let cursorY = 0;
        topBlocks.forEach(block => {
            if (block.getSvgRoot().style.display !== 'none') {
                const xy = block.getRelativeToSurfaceXY();
                block.moveBy(-xy.x, cursorY - xy.y);
                block.snapToGrid();
                cursorY =
                    block.getRelativeToSurfaceXY().y + block.getHeightWidth().height + Blockly.BlockSvg.MIN_BLOCK_Y;
            }
        });
        Blockly.Events.setGroup(false);
        // Fire an event to allow scrollbars to resize.
        Blockly.mainWorkspace.resizeContents();
    }
    load(blockStr = '', dropEvent = {}) {
        let xml;

        try {
            xml = Blockly.Xml.textToDom(blockStr);
        } catch (e) {
            throw createError('FileLoad', translate('Unrecognized file format.'));
        }

        try {
            if (xml.hasAttribute('collection') && xml.getAttribute('collection') === 'true') {
                loadBlocks(xml, dropEvent);
            } else {
                loadWorkspace(xml);
            }
        } catch (e) {
            throw createError('FileLoad', translate('Unable to load the block file.'));
        }
    }
    save(arg) {
        const { filename, collection } = arg;

        setBeforeUnload(true);
        const xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        Array.from(xml.children).forEach(blockDom => {
            const block = Blockly.mainWorkspace.getBlockById(blockDom.getAttribute('id'));
            if ('loaderId' in block) {
                blockDom.remove();
            }
        });
        save(filename, collection, xml);
    }
    run(limitations = {}) {
        disableStrayBlocks();
        const code = `
      (function(){
        var init, start, before_purchase, during_purchase, after_purchase;

        var tick_analysis_list = [];

        function run(f, arg) {
          if (f) return f(arg);
          return false;
        }

        function tick_analysis() {
          for (var i = 0; i < tick_analysis_list.length; i++) {
            run(tick_analysis_list[i]);
          }
        }

        var limitations = ${JSON.stringify(limitations)};

        ${Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace)}

        run(init)
        while(true) {
          run(start)
          while(watch('before')) {
            tick_analysis();
            run(before_purchase);
          }
          while(watch('during')) {
            tick_analysis();
            run(during_purchase);
          }
          tick_analysis();
          if(!run(after_purchase)) {
            break;
          }
        }
      })();
      `;
        this.generatedJs = code;
        if (code) {
            this.stop();
            this.interpreter = new Interpreter();
            this.interpreter.run(code).catch(e => {
                globalObserver.emit('Error', e);
                this.stop();
            });
        }
    }
    stop() {
        if (this.interpreter) {
            this.interpreter.stop();
            $('#runButton').show();
            $('#stopButton').hide();
            this.interpreter = null;
        }
    }
    undo() {
        Blockly.Events.setGroup('undo');
        Blockly.mainWorkspace.undo();
        Blockly.Events.setGroup(false);
    }
    redo() {
        Blockly.mainWorkspace.undo(true);
    }
    /* eslint-enable */
}
