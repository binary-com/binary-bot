import { expect } from 'chai'
import { translator } from '../translator'

describe('Translation', () => {
  describe('Translate Functions', () => {
    it('translateText', () => {
      expect(translator.translateText('Logic')).to.be.a('string')
        .and.to.be.equal('Logic')
    })
  })
})
