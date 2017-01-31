import { LiveApi } from 'binary-live-api'
import Observer from 'binary-common-utils/lib/observer'
import websocket from 'ws'
import _Symbol from './symbolApi'

let api = new LiveApi({ websocket })

export const symbolApi = new _Symbol(api)

export const symbolPromise = new Promise(resolve => {
  symbolApi.initPromise.then(() => {
    api.disconnect()
    api = null
    resolve()
  })
})

export const observer = new Observer()
