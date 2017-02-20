import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import { expect } from 'chai'
import { createJsi, header, trade, footer } from '../shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Misc. tools', () => {
  let value
  const jsi = createJsi()
  const observed = {}

  globalObserver.register('Notify', notify => (observed.notify = notify))

  beforeAll(done => {
    jsi.run(`
      ${header}
      ${trade}
        Bot.notify('Test', 'info')
        result.totalRuns = Bot.getTotalRuns();
        result.totalProfit = Bot.getTotalProfit();
        watch('before')
        result.balance = Bot.getBalance('NUM')
        result.balanceStr = Bot.getBalance('STR')
      ${footer}
    `).then(v => {
      value = v
      done()
    }, e => {
      throw e
    })
  })
  it('Balance', () => {
    const { result: { balance, balanceStr } } = value

    expect(balance).to.be.a('Number')
    expect(balanceStr).to.be.a('String')
    expect(parseFloat(balanceStr)).equal(balance)
  })

  it('Total Profit', () => {
    const { result: { totalProfit } } = value

    expect(totalProfit).to.be.a('Number')
  })

  it('Total runs', () => {
    const { result: { totalRuns } } = value

    expect(totalRuns).equal(0)
  })

  it('Notify', () => {
    const { notify } = observed

    expect(notify).deep.equal(['Test', 'info'])
  })
})
