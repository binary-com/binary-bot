import React from 'react';
import { translate } from '../../../common/i18n';
import Dialog from './Dialog';

const chartWidth = 700;
const chartHeight = 700;

function TradingViewComponent() {
    return <iframe style={{ width: '100%', height: '100%' }} src="https://tradingview.binary.com/" />;
}

export default class TradingView extends Dialog {
    constructor() {
        super('trading-view-dialog', translate('Trading View'), <TradingViewComponent />, {
            width : chartWidth,
            height: chartHeight,
        });
    }
}
