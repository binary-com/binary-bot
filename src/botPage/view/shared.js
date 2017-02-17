import { LiveApi } from 'binary-live-api'
import { get as getStorage } from 'binary-common-utils/lib/storageManager'
import _Symbol from '../common/symbolApi'

let api = new LiveApi({
  language: getStorage('lang') || 'en',
  appId: getStorage('appId') || 1,
})

export const symbolApi = new _Symbol(api)

export const symbolPromise = new Promise(resolve => {
  symbolApi.initPromise.then(() => {
    api.disconnect()
    api = null
    resolve()
  })
})
