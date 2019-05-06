import { hideEventsFromBlockly } from '../utils';

Blockly.FieldDropdown.prototype.updateOptions = function(options, opt_default = null, triggerEvent = true) {
    const previousValue = this.getValue();

    this.menuGenerator_ = options;
    if (opt_default && this.menuGenerator_.findIndex(item => item[1] === opt_default) !== -1) {
        hideEventsFromBlockly(() => {
            this.setValue('');
            this.setValue(opt_default);
        });
    } else if (this.menuGenerator_.length > 0) {
        hideEventsFromBlockly(() => {
            this.setValue('');
            this.setValue(this.menuGenerator_[0][1]);
        });
    }

    if (triggerEvent) {
        const event = new Blockly.Events.BlockChange(
            this.sourceBlock_,
            'field',
            this.name,
            previousValue,
            this.getValue()
        );
        Blockly.Events.fire(event);
    }
};
