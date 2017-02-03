import { LiveApi } from 'binary-live-api'
import _Symbol from '../common/symbolApi'

let api = new LiveApi()

export const symbolApi = new _Symbol(api)

export const symbolPromise = new Promise(resolve => {
  symbolApi.initPromise.then(() => {
    api.disconnect()
    api = null
    resolve()
  })
})
