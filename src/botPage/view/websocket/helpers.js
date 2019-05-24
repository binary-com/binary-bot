import AppIdMap from '../../../common/appIdResolver';
import { getTokenList } from '../../../common/utils/storageManager';

// These are temp funcs
export const ClientIsLoggedIn = () => getTokenList().length > 0;
export const ClientGetToken = () => ClientIsLoggedIn() && getTokenList()[0].token;

let static_hash;
export const getStaticHash = () => {
    static_hash =
        static_hash || (document.querySelector('script[src^="js/bot-"]').getAttribute('src') || '').split('?')[1];
    return static_hash;
};

export const getCurrentBinaryDomain = () =>
    Object.keys(AppIdMap).find(domain => new RegExp(`.${domain}$`, 'i').test(window.location.hostname));

export const cloneObject = obj =>
    !isEmptyObject(obj) ? (Array.isArray(obj) ? [].concat(obj) : Object.assign({}, obj)) : obj;

export const getPropertyValue = (obj, k) => {
    let keys = k;
    if (!Array.isArray(keys)) keys = [keys];
    if (!isEmptyObject(obj) && keys[0] in obj && keys && keys.length > 1) {
        return getPropertyValue(obj[keys[0]], keys.slice(1));
    }
    // else return clone of object to avoid overwriting data
    return obj ? cloneObject(obj[keys[0]]) : undefined;
};

export const isEmptyObject = obj => {
    let is_empty = true;
    if (obj && obj instanceof Object) {
        Object.keys(obj).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(obj, key)) is_empty = false;
        });
    }
    return is_empty;
};

export class PromiseClass {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.reject = reject;
            this.resolve = resolve;
        });
    }
}
