import React, { PureComponent, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { translate } from '../../../common/i18n'
import { Panel } from './Panel'

const contentStyle = {
  marginTop: '0.5em',
  width: '18em',
}

const errorStyle = {
  color: 'red',
  fontSize: '0.8em',
}

const saveButtonStyle = {
  width: '4em',
  display: 'block',
  float: 'left',
  marginLeft: '7em',
  marginBottom: '0.5em',
}

const limitsStyle = {
  display: 'block',
  width: '18em',
  float: 'left',
}

const inputStyle = {
  marginLeft: '0.5em',
  width: '4em',
  float: 'right',
}

const fieldStyle = {
  width: '18em',
}

export class LimitsPanel extends PureComponent {
  constructor() {
    super()
    this.state = {
      error: null,
    }
  }
  close() {
    ReactDOM.unmountComponentAtNode(document.getElementById('limits-panel'))
  }
  submit() {
    const maxLoss = +this.maxLossDiv.value
    const maxTrades = +this.maxTradesDiv.value
    if (maxLoss && maxTrades) {
      if (maxTrades <= 100) {
        this.close()
        this.props.onSave({
          maxLoss,
          maxTrades,
        })
      } else {
        this.setState({ error: translate('Maximum allowed number of trades for each session is 100.') })
      }
    } else {
      this.setState({ error: translate('Both number of trades and loss amount are required.') })
    }
  }
  render() {
    return (
      <Panel
      id="saveAs"
      onClose={() => this.close()}
      description={translate('Trade Limitations')}
      content={
        <div style={contentStyle}>
          <div style={limitsStyle}>
          <label style={fieldStyle} htmlFor="limitation-max-trades">
            <input style={inputStyle} ref={(el) => (this.maxTradesDiv = el)} type="number" id="limitation-max-trades" />
            {translate('Maximum number of trades')}
          </label>
          <label style={fieldStyle} htmlFor="limitation-max-loss">
            <input style={inputStyle} ref={(el) => (this.maxLossDiv = el)} type="number" id="limitation-max-loss" />
            {translate('Maximum loss amount')}
          </label>
            {this.state.error ? <p style={errorStyle}>{this.state.error}</p> : null}
          </div>
          <div style={saveButtonStyle}>
            <button onClick={() => this.submit()}>
              {translate('Start')}
            </button>
          </div>
        </div>
      }
      />
    )
  }
  props: {
    onSave: PropTypes.func,
  }
}
