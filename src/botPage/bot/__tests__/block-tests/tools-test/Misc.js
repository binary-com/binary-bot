import { expect } from 'chai'
import { createJsi, header, trade, footer } from '../shared'
import { observer as viewObserver } from '../../../../common/shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Misc. tools', () => {
  let value
  const jsi = createJsi()
  const observed = {}

  viewObserver.register('Notify', notify => (observed.notify = notify))
  viewObserver.register('NotifyError', notifyError => (observed.notifyError = notifyError))

  beforeAll(done => {
    jsi.run(`
      ${header}
      ${trade}
        Bot.notify('Test', 'info')
        Bot.notifyError('Test2')
        result.totalRuns = Bot.getTotalRuns();
        result.totalProfit = Bot.getTotalProfit();
        watch('before')
        result.balance = Bot.getBalance('NUM')
        result.balanceStr = Bot.getBalance('STR')
      ${footer}
    `).then(v => {
      value = v
      done()
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
    const { notify, notifyError } = observed

    expect(notify).deep.equal(['Test', 'info'])
    expect(notifyError).deep.equal(['Test2'])
  })
})
