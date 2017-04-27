import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'jquery-ui/ui/widgets/dialog';

const createDialog = (el, title) => {
    $(el).dialog({
        title,
        autoOpen : false,
        closeText: '',
        classes  : { 'ui-dialog-titlebar-close': 'icon-close' },
    });
};
export default class PanelComponent extends PureComponent {
    render() {
        const { id, content, title } = this.props;

        return (
            <div id={id} ref={el => createDialog(el, title)}>
                {content}
            </div>
        );
    }
    static props: {
        id: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.object,
    };
}
