import React, { PureComponent, PropTypes } from 'react'
import { translate } from '../../../common/i18n'
import { Panel } from './Panel'

export class SaveAs extends PureComponent {
  props: {
    onSave: PropTypes.func,
    onClose: PropTypes.func,
  }
  render() {
    const {
      onSave,
      onClose,
    } = this.props
    return (
      <Panel
      id="saveAs"
      onClose={onClose}
      description={translate('Save blocks as')}
      content={
        <form
        action="javascript:;" // eslint-disable-line
        id="saveAsForm"
        onSubmit={() => onSave($('#saveAsFilename').val(), $('#saveAsCollection').prop('checked'))}
        >
        <span>{translate('Filename')}</span>: <input title="Choose filename for your blocks" type="text" id="saveAsFilename" defaultValue="binary-bot" />
        <div>
        <label
        title="Save your blocks individually in a collection. They will be added to your existing workspace (main blocks will be replaced) when loaded."
        htmlFor="Collection"
        style={{
          fontWeight: 'normal',
        }}
        >{translate('Save As Collection')}</label>
        <input
        title="Save your blocks individually in a collection. They will be added to your existing workspace (main blocks will be replaced) when loaded."
        name="Collection"
        type="checkbox"
        id="saveAsCollection"
        style={{
          marginLeft: '4px',
        }}
        />
        <button
        type="submit" id="saveAsButton" style={{
          float: 'right',
          padding: '6px',
          textTransform: 'uppercase',
        }}
        >{translate('Save')}</button>
        </div>
        </form>
      }
      />
    )
  }
}
