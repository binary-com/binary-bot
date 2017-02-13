import { expect } from 'chai'
import { createJsi, header, trade, footer } from '../shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Misc. tools', () => {
  let value
  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
      ${trade}
        result.totalRuns = Bot.getTotalRuns();
      ${footer}
    `).then(v => {
      value = v
      done()
    })
  })

  it('Total runs', () => {
    const { result: { totalRuns } } = value

    expect(totalRuns).equal(0)
  })
})
