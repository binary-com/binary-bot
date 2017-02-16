import CustomApi from 'binary-common-utils/lib/customApi'
import Observer from 'binary-common-utils/lib/observer'
import WebSocket from 'ws'
import JSI from '../../JSI'

export const header = `
      var again = false;
      (function (){
        var result = {};
`

export const trade = `
        Bot.start('Xkq6oGFEHh6hJH8', {
          amount: 1, basis: 'stake', candleInterval: 60,
          contractTypes: ['CALL', 'PUT'],
          currency: 'USD', duration: 2,
          duration_unit: 'h', symbol: 'R_100',
        }, false);
`

export const footer = `
        return {
          result: result,
        };
      })();
`

export const createJsi = () => {
  const observer = new Observer()
  const api = new CustomApi(observer, null, null,
    new WebSocket(process.env.ENDPOINT ||
      'wss://ws.binaryws.com/websockets/v3?l=en&app_id=0'))

  const $scope = { observer, api }

  return new JSI($scope)
}
