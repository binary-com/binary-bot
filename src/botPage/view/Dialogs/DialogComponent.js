import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'jquery-ui/ui/widgets/dialog';

export default class PanelComponent extends PureComponent {
  createDialog(el, title) {
    $(el).dialog({
      title,
      autoOpen: false,
      closeText: '',
      classes: { 'ui-dialog-titlebar-close': 'icon-close' },
    });
  }
  render() {
    const { id, content, title } = this.props;

    return (
      <div id={id} ref={el => this.createDialog(el, title)}>
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
