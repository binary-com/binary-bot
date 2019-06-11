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
                let dateTime;
                if(typeof timestamp === 'number') {
                    dateTime = new Date(timestamp * 1000);
                    return `${[
                        dateTime.getFullYear().toString(),
                        dateTime.getMonth()+1 < 10 ? `0${  dateTime.getMonth()+1}` : dateTime.getMonth()+1,
                        dateTime.getDate() < 10 ? `0${  dateTime.getDate()}` : dateTime.getDate(),
                    ].join('-')  } ${[
                        dateTime.getHours() < 10 ? `0${  dateTime.getHours()}` : dateTime.getHours(),
                        dateTime.getMinutes() < 10 ? `0${  dateTime.getMinutes()}` : dateTime.getMinutes(),
                        dateTime.getSeconds() < 10 ? `0${  dateTime.getSeconds()}` : dateTime.getSeconds(),
                    ].join(':')}`;
                } 
                return `${translate('Invalid timestamp')}: ${timestamp}`;                
            },
            toTimestamp: (dateTimeString) => {
                const p = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))/;
                if(p.test(dateTimeString)) {
                    const date = new Date(dateTimeString);
                    return date ? date.getTime() / 1000 : `${translate('Invalid date/time')}: ${dateTimeString}`;
                } 
                return `${translate('Invalid date/time')}: ${dateTimeString}`;    
            },
            ...this.getCandleInterface(),
            ...this.getMiscInterface(),
            ...this.getIndicatorsInterface(),
        };
    }
};
