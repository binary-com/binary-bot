import { LiveApi } from 'binary-live-api'
import Observer from 'binary-common-utils/lib/observer'
import WebSocket from 'ws'
import Interpreter from './Interpreter'
import TicksService from './TicksService'

export const createScope = () => {
  const observer = new Observer()
  const api = new LiveApi({
    connection: new WebSocket(process.env.ENDPOINT ||
      'wss://ws.binaryws.com/websockets/v3?l=en&app_id=1169'),
  })

  const ticksService = new TicksService(api)

  return { observer, api, ticksService }
}

export const createInterpreter = () => new Interpreter(createScope())
