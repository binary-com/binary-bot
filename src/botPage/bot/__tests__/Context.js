import { expect } from 'chai'
import Context from '../Context'

describe('Context', () => {
  const ticksObj = {
    ohlc: [],
    ticks: [{
      epoch: 'some time',
      quote: 1,
    }, {
      epoch: 'some time',
      quote: 2,
    }],
  }

  const openContract = {
    contractId: 1,
  }

  const finishedContract = {
    sell_price: '1',
    buy_price: '2',
    transaction_ids: {
      buy: 'id1',
    },
    contract_type: 't',
    entry_tick_time: '1',
    entry_tick: '1',
    exit_tick_time: '1',
    exit_tick: '1',
    barrier: '1',
  }

  const result = {}

  function beforePurchase() {
    result.beforePurchase = this
  }

  function duringPurchase() {
    result.duringPurchase = this
  }

  function afterPurchase() {
    result.afterPurchase = this
  }

  function tickAnalysis() {
    result.tickAnalysis = this
  }

  const context = new Context(beforePurchase, duringPurchase, afterPurchase, [tickAnalysis])

  function testFunc() {
    return this
  }

  context.addFunc({
    testFunc,
  })

  const wrappedFunc = context.wrap(function wrappedFunc() {
    return this === this.testFunc()
  })

  describe('wrapped func gets context', () => {
    let wrappedAndNormalFuncThisDiffers

    beforeAll(() => {
      wrappedAndNormalFuncThisDiffers = wrappedFunc()
    })

    it('Before Purchase Context should have ticks', () => {
      expect(wrappedAndNormalFuncThisDiffers).to.be.equal(true)
    })
  })

  describe('tickAnalysis tick received', () => {
    const expected = {
      tickAnalysis: {
        testFunc,
        ticksObj,
      },
    }

    beforeAll(() => {
      context.createTicks(ticksObj)
      context.tickAnalysis()
    })

    it('Before Purchase Context should have ticks', () => {
      expect(result.tickAnalysis).to.be.deep.equal(expected.tickAnalysis)
    })
  })

  describe('beforePurchase tick received', () => {
    ticksObj.ticks = ticksObj.ticks.concat([{
      epoch: 'some time',
      quote: '3',
    }])

    const expected = {
      beforePurchase: {
        testFunc,
        ticksObj,
      },
    }

    beforeAll(() => {
      context.createTicks(ticksObj)
      context.beforePurchase()
    })

    it('Before Purchase Context should have ticks', () => {
      expect(result.beforePurchase).to.be.deep.equal(expected.beforePurchase)
    })
  })
  describe('duringPurchase contract was purchased', () => {
    ticksObj.ticks = ticksObj.ticks.concat([{
      epoch: 'some time',
      quote: '3',
    }])

    const expected = {
      duringPurchase: {
        testFunc,
        ticksObj,
        openContract,
      },
    }

    beforeAll(() => {
      context.createTicks(ticksObj)
      context.duringPurchase(openContract)
    })

    it('Before Purchase Context should have ticks', () => {
      expect(result.duringPurchase).to.be.deep.equal(expected.duringPurchase)
    })
  })
  describe('afterPurchase contract was finished', () => {
    ticksObj.ticks = ticksObj.ticks.concat([{
      epoch: 'some time',
      quote: '4',
    }])

    const expected = {
      afterPurchase: {
        testFunc,
        ticksObj,
        openContract,
        contractDetails: [
          'id1', 2,
          1, -1, 't',
          '00:00:01',
          1,
          '00:00:01',
          1,
          1,
          'loss',
        ],
        finishedContract,
      },
    }

    beforeAll(() => {
      context.createTicks(ticksObj)
      context.afterPurchase(finishedContract)
    })

    it('Before Purchase Context should have ticks', () => {
      expect(result.afterPurchase).to.be.deep.equal(expected.afterPurchase)
    })
  })
})
