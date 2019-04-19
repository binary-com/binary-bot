import React from 'react';
import ReactDOM from 'react-dom';
import DialogComponent from './DialogComponent';
import { observer as globalObserver } from '../../../common/utils/observer';

export default class Dialog {
    constructor(id, title, content, options = {}) {
        this.componentId = `${id}-component`;

        ReactDOM.render(
            <DialogComponent id={this.componentId} title={title} content={content} options={options} />,
            $(`#${id}`)[0]
        );
    }
    open() {
        $(`#${this.componentId}`).dialog('open');
        globalObserver.emit('dialog.opened', this.componentId);
    }
    close() {
        $(`#${this.componentId}`).dialog('close');
    }
    registerCloseOnOtherDialog() {
        globalObserver.register('dialog.opened', dialogId => {
            if (dialogId !== this.componentId) {
                this.close();
            }
        });
    }
}
