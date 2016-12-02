import React, { PureComponent, PropTypes } from 'react'
import { translator } from '../../../common/translator'
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
      description={translator.translateText('Save blocks as')}
      content={
        <form
        action="javascript:;" // eslint-disable-line
        id="saveAsForm"
        onSubmit={() => onSave($('#saveAsFilename').val(), $('#saveAsCollection').prop('checked'))}
        >
        <span>{translator.translateText('Filename')}</span>: <input title="Choose filename for your blocks" type="text" id="saveAsFilename" defaultValue="binary-bot" />
        <div>
        <label
        title="Save your blocks individually in a collection. They will be added to your existing workspace (main blocks will be replaced) when loaded."
        htmlFor="Collection"
        style={{
          fontWeight: 'normal',
        }}
        >{translator.translateText('Save As Collection')}</label>
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
        >{translator.translateText('Save')}</button>
        </div>
        </form>
      }
      />
    )
  }
}
