import { expect } from 'chai'
import { createJsi } from '../shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Time in tools', () => {
  let value
  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
          (function(){
            var result = {};
            result.time1 = Bot.getTime();
            sleep(2)
            result.time2 = Bot.getTime();
            return result;
          })() 
      `).then(v => {
      value = v
      done()
    })
  })

  it('time is correctly skewed', () => {
    const { time1, time2 } = value

    expect(time2 - time1).equal(2)
  })
})
