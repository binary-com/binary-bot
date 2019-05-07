/* eslint-disable func-names, no-underscore-dangle */
Blockly.FieldDropdown.prototype.updateOptions = function(options, optDefault = null, triggerEvent = true) {
    const previousValue = this.getValue();

    Blockly.Events.disable();

    this.menuGenerator_ = options;

    if (optDefault && this.menuGenerator_.findIndex(item => item[1] === optDefault) !== -1) {
        this.setValue('');
        this.setValue(optDefault);
    } else if (this.menuGenerator_.length > 0) {
        this.setValue('');
        this.setValue(this.menuGenerator_[0][1]);
    }

    Blockly.Events.enable();

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
