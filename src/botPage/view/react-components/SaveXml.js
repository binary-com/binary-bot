import React, { PureComponent, PropTypes } from 'react'
import { translate } from '../../../common/i18n'
import { SaveAs } from './SaveAs'

export class SaveXml extends PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      dialogVisible: false,
    }
  }
  props: {
    onSave: PropTypes.func,
    onClick: PropTypes.func,
  }
  render() {
    const { onSave, onClick } = this.props
    return (
      <div>
      <button
      title="Save the blocks as an XML file"
      id="saveXml"
      className="icon-save top-menu"
      onClick={() => {
        onClick()
        this.setState({ dialogVisible: true })
      }}
      >
      <span>{translate('Save')}</span>
      </button>
      {this.state.dialogVisible ?
        <SaveAs
        onClose={() => this.setState({ dialogVisible: false })}
        onSave={onSave}
        />
      : null}
    </div>
    )
  }
}
