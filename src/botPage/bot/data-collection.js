import crc32 from 'crc-32/crc32';
import pako from 'pako';
import { observer } from '../../common/utils/observer';
import { getTokenList } from '../../common/utils/storageManager';
import { isProduction } from '../../common/utils/tools';

export default class DataCollection {
    constructor(workspace) {
        this.workspace = workspace;
        this.loginid = this.getLoginId();

        if (isProduction()) {
            observer.register('bot.contract', contract => this.trackTransaction(contract));
            observer.register('bot.running', () => this.trackRun());
        }
    }

    IS_PENDING = false;
    IS_PROCESSED = true;
    endpoint = 'https://dbot-conf-dot-business-intelligence-240201.df.r.appspot.com/dbotconf';
    loginid;
    runId = '';
    runStart = 0;
    shouldPostXml = true;
    strategyContent = '';
    transactionIds = {};
    workspace;

    async trackRun() {
        const xmlDom = this.cleanXmlDom(Blockly.Xml.workspaceToDom(this.workspace, /* opt_noId */ true));
        const xmlString = Blockly.Xml.domToText(xmlDom);
        const xmlHash = this.getHash(xmlString);

        if (this.getHash(this.strategyContent) !== xmlHash) {
            this.shouldPostXml = true;
            this.setStrategyContent(xmlString);
        }

        this.setRunId(this.getHash(xmlHash + this.loginid + Math.random()));
        this.setRunStart(this.getUTCDate());
    }

    async trackTransaction(contract) {
        if (!contract) return;

        const { buy: transactionId } = contract.transaction_ids;
        const isKnownTransaction = Object.keys(this.transactionIds).includes(transactionId.toString());

        if (isKnownTransaction) {
            return;
        }

        this.transactionIds[transactionId] = this.IS_PENDING;

        const getPayload = () => {
            const content = pako.gzip(this.strategyContent);

            return {
                body   : content,
                headers: {
                    'Content-Encoding': 'gzip',
                    'Content-Type'    : 'application/xml',
                    Referer           : window.location.hostname,
                },
            };
        };

        fetch(
            `${this.endpoint}/${this.runId}/${transactionId}/${this.runStart}/${this.getHash(this.strategyContent)}`,
            {
                ...(this.shouldPostXml ? getPayload() : {}),
                method: 'POST',
                mode  : 'cors',
            }
        )
            .then(() => {
                this.shouldPostXml = false;
                this.transactionIds[transactionId] = this.IS_PROCESSED;
            })
            .catch(() => {
                delete this.transactionIds[transactionId];
            });
    }

    setRunId(runId) {
        this.runId = runId;
    }

    setRunStart(timestamp) {
        this.runStart = timestamp;
    }

    setStrategyContent(strategyContent) {
        this.strategyContent = strategyContent;
    }

    cleanXmlDom = xmlDom => {
        const uselessAttributes = ['x', 'y'];
        const updatedDom = xmlDom;

        const removeAttributesRecursively = element => {
            uselessAttributes.forEach(uselessAttribute => element.removeAttribute(uselessAttribute));
            Array.from(element.children).forEach(child => removeAttributesRecursively(child));
        };

        removeAttributesRecursively(updatedDom);
        return updatedDom;
    };

    getHash = string => btoa(crc32.str(string));

    getLoginId = () => {
        const tokenList = getTokenList();

        if (tokenList.length) {
            return tokenList[0].loginInfo.loginid;
        }

        return null;
    };

    getUTCDate = () => {
        const date = new Date();
        const utcDate = Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCMinutes()
        );

        return Math.floor(utcDate / 1000);
    };
}

export const createDataStore = workspace => new DataCollection(workspace);
