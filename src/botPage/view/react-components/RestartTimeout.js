import React, { PureComponent, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { translator } from '../../../common/translator'
import { Panel } from './Panel'

export class RestartTimeout extends PureComponent {
  props: {
  timeout: PropTypes.number,
  }
  constructor(props) {
    super(props)
    this.state = {
      timeout: 0,
    }
  }
  setInterval() {
    const {
      timeout,
    } = this.props
    this.setState({
      timeout,
    })
    this.restartInterval = setInterval(() => {
      if (this.state.timeout === 0) {
        this.close()
        window.Bot.restartOnError()
      } else {
        this.setState({
          timeout: this.state.timeout - 1,
        })
      }
    }, 1000)
  }
  close() {
    ReactDOM.unmountComponentAtNode(document.getElementById('restartTimeout'))
  }
  componentDidMount() {
    this.setInterval()
  }
  componentWillUnmount() {
    clearInterval(this.restartInterval)
    this.setState({
      timeout: 0,
    })
  }
  render() {
    return (
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
    )
  }
}
