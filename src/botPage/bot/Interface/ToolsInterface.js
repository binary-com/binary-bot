import CandleInterface from './CandleInterface';
import MiscInterface from './MiscInterface';
import IndicatorsInterface from './IndicatorsInterface';
import WebhookInterface from './WebhookInterface';
import { translate } from '../../../common/i18n';

// prettier-ignore
export default Interface => class extends IndicatorsInterface(
    MiscInterface(CandleInterface(WebhookInterface(Interface)))) {
    getToolsInterface() {
        return {
            getTime   : () => parseInt(new Date().getTime() / 1000),
            toDateTime: (timestamp) => {
                const getTwoDigitValue = input => {
                    if (input < 10) {
                        return `0${input}`;
                    }
                    return `${input}`;
                }
                const invalidTimestamp = () => `${translate('Invalid timestamp')}: ${timestamp}`;
                if (typeof timestamp === 'number') {
                    const dateTime = new Date(timestamp * 1000);
                    if (dateTime.getTime()) {
                        const year = dateTime.getFullYear();
                        const month = getTwoDigitValue(dateTime.getMonth() + 1);
                        const day = getTwoDigitValue(dateTime.getDate());
                        const hours = getTwoDigitValue(dateTime.getHours());
                        const minutes = getTwoDigitValue(dateTime.getMinutes());
                        const seconds = getTwoDigitValue(dateTime.getSeconds());
                        const formatGTMoffset = () => {
                            const GMToffsetRaw = dateTime.getTimezoneOffset();
                            const sign = GMToffsetRaw > 0 ? '-' : '+';
                            const GMToffset = Math.abs(GMToffsetRaw);
                            const h = Math.floor(GMToffset / 60);
                            const m = GMToffset - h * 60;
                            return `GMT${sign}${getTwoDigitValue(h)}${getTwoDigitValue(m)}`;
                        }
                        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${formatGTMoffset()}`;
                    }
                    return invalidTimestamp();
                }
                return invalidTimestamp();
            },
            toTimestamp: (dateTimeString) => {
                const invalidDatetime = () => `${translate('Invalid date/time')}: ${dateTimeString}`;
                if (typeof dateTimeString === 'string') {
                    const dateTime = dateTimeString
                        .replace(/[^0-9.:-\s]/g, '')
                        .replace(/\s+/g,' ')
                        .trim()
                        .split(' ');        
                
                    const d = /^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
                    const t = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])(:([0-5][0-9])?)?$/;
            
                    let validatedDateTime;
                
                    if(dateTime.length >= 2) {
                        validatedDateTime = d.test(dateTime[0]) && t.test(dateTime[1]) ? `${dateTime[0]}T${dateTime[1]}` : null;
                    } else if(dateTime.length === 1) {
                        validatedDateTime = d.test(dateTime[0]) ? dateTime[0] : null;
                    } else {
                        validatedDateTime = null;
                    }

                    if(validatedDateTime) {
                        const dateObj = new Date(validatedDateTime);
                        // eslint-disable-next-line no-restricted-globals
                        if(dateObj instanceof Date && !isNaN(dateObj)) {
                            return  dateObj.getTime() / 1000;
                        }
                    }
                    return invalidDatetime();
                }
                return invalidDatetime();
            },
            ...this.getCandleInterface(),
            ...this.getMiscInterface(),
            ...this.getIndicatorsInterface(),
            ...this.getWebhookInterface(),
        };
    }
};
