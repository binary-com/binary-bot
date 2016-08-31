'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#orvwcx

import config from '../../../../../common/const';
import { relationChecker } from '../../relationChecker';
import { translator } from '../../../../../common/translator';
import {duration, payout, prediction, title, barrierOffset, secondBarrierOffset} from './components';

module.exports = function init(){
	
	Object.keys(config.opposites).forEach(function(opposites){
		Blockly.Blocks[opposites.toLowerCase()] = {
			init: function() {
				var option_names = [];
				config.opposites[opposites].forEach(function(options){
					var option_alias = Object.keys(options)[0];
					var option_name = options[option_alias];
					option_names.push(option_name);	
				});
				title(this, opposites, option_names);
				duration(this, opposites);
				payout(this, opposites);
				if ( config.hasPrediction.indexOf(opposites) > -1 ) {
					prediction(this, opposites);
				}
				if ( config.hasBarrierOffset.indexOf(opposites) > -1 ) {
					barrierOffset(this, opposites);
				}
				if ( config.hasSecondBarrierOffset.indexOf(opposites) > -1 ) {
					barrierOffset(this, opposites, translator.translateText('High Barrier Offset:'));
					window.block = this;
					secondBarrierOffset(this, opposites);
				}
				this.setInputsInline(false);
				this.setPreviousStatement(true, "Condition");
				this.setColour("#f2f2f2");
				this.setTooltip(translator.translateText('Provides the trade types:') + ' ' + option_names[0] + '/' + option_names[1]);
				this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
			},
			onchange: function(ev){
				
				relationChecker.condition(this, ev);
			},
		};
	});
};
