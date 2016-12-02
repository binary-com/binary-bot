import React, { PureComponent, PropTypes } from 'react'
import { translator } from '../../../common/translator'
import { Panel } from './Panel'

export class RestartTimeout extends PureComponent {
  props: {
  timeout: PropTypes.number,
  startTime: PropTypes.number,
  }
  constructor(props) {
    super(props)
    this.state = {
      startTime: 0,
      timeout: 0,
    }
  }
  setInterval() {
    const {
      timeout,
      startTime,
    } = this.props
    if (startTime - this.state.startTime > timeout * 1000) {
      this.setState({
        startTime,
      })
      this.setState({
        timeout,
      })
      this.restartInterval = setInterval(() => {
        if (this.state.timeout === 0) {
          window.Bot.restartOnError()
          clearInterval(this.restartInterval)
          return
        }
        this.setState({
          timeout: this.state.timeout - 1,
        })
      }, 1000)
    }
  }
  close() {
    clearInterval(this.restartInterval)
    this.setState({
      timeout: 0,
    })
  }
  render() {
    this.setInterval()
    return (
    this.state.timeout !== 0 ?
      <Panel
      id="saveAs"
      description={translator.translateText('An error occurred, restarting...')}
      onClose={() => this.close()}
      content={
      <div>
              <p>{(`${translator.translateText('Restarting in')} ${this.state.timeout}`)}</p>
              <button
                style={{
                  float: 'right',
                  marginBottom: '0.2em',
                }}
                onClick={() => this.close()}
              >
                {translator.translateText('Cancel')}
              </button>
            </div>
      }
      />
      : null
    )
  }
}
