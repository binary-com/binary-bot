import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.tick_analysis = {
    init() {
        this.jsonInit({
            message0: translate('This block is called on every tick %1 %2'),
            args0   : [
                {
                    type: 'input_dummy',
                },
                {
                    type : 'input_statement',
                    name : 'TICKANALYSIS_STACK',
                    check: null,
                },
            ],
            colour         : '#fef1cf',
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate('You can use this block to analyze the ticks, regardless of your trades'),
        });
    },
};

Blockly.JavaScript.tick_analysis = block => {
    const stack = Blockly.JavaScript.statementToCode(block, 'TICKANALYSIS_STACK') || '';

    const code = `
    BinaryBotPrivateTickAnalysisList.push(function BinaryBotPrivateTickAnalysis() {
        ${stack}
    });\n`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
