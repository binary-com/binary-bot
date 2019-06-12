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
                if(typeof timestamp === 'number') {
                    const dateTime = new Date(timestamp * 1000);

                    const year = dateTime.getFullYear();
                    const month = getTwoDigitValue(dateTime.getMonth() + 1);
                    const day = getTwoDigitValue(dateTime.getDate());
                    const hours = getTwoDigitValue(dateTime.getHours());
                    const minutes = getTwoDigitValue(dateTime.getMinutes());
                    const seconds = getTwoDigitValue(dateTime.getSeconds());

                    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                } 
                return `${translate('Invalid timestamp')}: ${timestamp}`;                
            },
            toTimestamp: (dateTimeString) => {
                const p = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))$/;
                const invalidDateTime = () => `${translate('Invalid date/time')}: ${dateTimeString}`;
                if (p.test(dateTimeString)) {
                    const date = new Date(dateTimeString);
                    return date ? date.getTime() / 1000 : invalidDateTime();
                } 
                return invalidDateTime();    
            },
            ...this.getCandleInterface(),
            ...this.getMiscInterface(),
            ...this.getIndicatorsInterface(),
        };
    }
};
