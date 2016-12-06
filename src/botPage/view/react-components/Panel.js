import React, { PureComponent, PropTypes } from 'react'

export class Panel extends PureComponent {
  props: {
  id: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.object,
  onClose: PropTypes.func,
  }
  render() {
    const {
      id,
      description,
      content,
      onClose,
    } = this.props
    return (
      <div
      ref={el => {
        $(el).drags()
        $(el).find('.content').mousedown(e => e.stopPropagation())
      }}
      id={id}
      className="floating-panel"
      >
        <div className="panelExitButton" onClick={onClose} ><p className="icon-close" /></div>
        <div className="description">
            <h4>{description}</h4>
        </div>
        <div className="content">{content}</div>
      </div>
    )
  }
}
