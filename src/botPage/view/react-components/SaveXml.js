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
    onSave: PropTypes.string,
  }
  render() {
    const {
      onSave,
    } = this.props
    return (
      <div>
      <button
      title={translate('Save the existing blocks (xml file)')}
      id="saveXml"
      className="toolbox-button icon-save"
      onClick={() => {
        this.setState({
          dialogVisible: true,
        })
      }}
      />
      {this.state.dialogVisible ?
        <SaveAs
          onClose={() => this.setState({
            dialogVisible: false,
          })}
          onSave={onSave}
        />
      : null}
    </div>
    )
  }
}
