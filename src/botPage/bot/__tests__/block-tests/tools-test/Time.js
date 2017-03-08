import { expect } from 'chai'
import { runAndGetResult } from '../../tools'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Time in tools', () => {
  let result

  beforeAll(done => {
    runAndGetResult(`
        (function(){
          var result = {};
          result.time1 = Bot.getTime();
          sleep(2)
          result.time2 = Bot.getTime();
          return result;
        })() 
    `).then(v => {
      result = v
      done()
    })
  })

  it('time is correctly skewed', () => {
    const { time1, time2 } = result

    expect(time2 - time1).equal(2)
  })
})
