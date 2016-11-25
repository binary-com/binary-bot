import React, { PureComponent, PropTypes } from 'react'
import { SaveAs } from './SaveAs'

export class SaveXml extends PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      dialogVisible: false,
    }
  }
  props: {
    onSave: PropTypes.string,
  }
  render() {
    const { onSave } = this.props
    return (
      <div>
        <button
          title="Save the blocks as an XML file"
          id="saveXml"
          className="icon-save"
          onClick={() => {
            this.setState({ dialogVisible: true })
          }}
        />
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
