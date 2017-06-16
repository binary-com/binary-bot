import React from 'react';
import ReactDOM from 'react-dom';
import DialogComponent from './DialogComponent';

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
    }
    close() {
        $(`#${this.componentId}`).dialog('close');
    }
}
