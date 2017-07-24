import React from 'react';
import { translate } from '../../../common/i18n';
import { iframe as iframeStyle } from '../style';
import Dialog from './Dialog';

const chartWidth = 700;
const chartHeight = 700;

function TradingViewComponent() {
    return <iframe style={iframeStyle} src="https://tradingview.binary.com/" />;
}

export default class TradingView extends Dialog {
    constructor() {
        super('trading-view-dialog', translate('Trading View'), <TradingViewComponent />, {
            width : chartWidth,
            height: chartHeight,
        });
    }
}
