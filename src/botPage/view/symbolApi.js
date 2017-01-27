import { LiveApi } from 'binary-live-api'
import _Symbol from '../symbolApi'

let api = new LiveApi()

const symbol = new _Symbol(api)

export const initPromise = new Promise(resolve => {
  symbol.initPromise.then(() => {
    api.disconnect()
    api = null
    resolve()
  })
})

export default symbol
