import CandleInterface from './CandleInterface';
import MiscInterface from './MiscInterface';
import IndicatorsInterface from './IndicatorsInterface';
import { translate } from '../../../common/i18n';

// prettier-ignore
export default Interface => class extends IndicatorsInterface(
    MiscInterface(CandleInterface(Interface))) {
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
                if(typeof timestamp === 'number') {
                    const dateTime = new Date(timestamp * 1000);
                    if(dateTime.getTime()) {
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
                const date = new Date(dateTimeString.substr(0,19)).getTime();
                return date ? Math.floor(date / 1000) : `${translate('Invalid date/time')}: ${dateTimeString}`;
            },
            ...this.getCandleInterface(),
            ...this.getMiscInterface(),
            ...this.getIndicatorsInterface(),
        };
    }
};
