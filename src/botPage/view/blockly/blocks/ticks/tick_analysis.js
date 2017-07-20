// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i7qkfj
import { translate } from '../../../../../common/i18n';

Blockly.Blocks.tick_analysis = {
    init: function init() {
        this.appendDummyInput().appendField(translate('This block is called on every tick'));
        this.appendStatementInput('TICKANALYSIS_STACK').setCheck(null);
        this.setColour('#fef1cf');
        this.setTooltip(translate('You can use this block to analyze the ticks, regardless of your trades'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
};

Blockly.JavaScript.tick_analysis = block => {
    const stack = Blockly.JavaScript.statementToCode(block, 'TICKANALYSIS_STACK');
    return `
    BinaryBotPrivateTickAnalysisList.push(function BinaryBotPrivateTickAnalysis() {
      ${stack}
    });
  `;
};
