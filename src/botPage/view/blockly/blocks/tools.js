import { translate } from '../../../../common/i18n'
import config from '../../../common/const'

let purchaseChoices = [[translate('Click to select'), '']]

export const getPurchaseChoices = () => purchaseChoices

export const oppositesToDropdown = op => op.map(k => Object.entries(k)[0].reverse())

export const updatePurchaseChoices = (contractType, oppositesName) => {
  purchaseChoices = oppositesToDropdown(config.opposites[oppositesName]
    .filter((k) => (contractType === 'both' ? true : contractType === Object.keys(k)[0])))
  const purchases = Blockly.mainWorkspace.getAllBlocks()
    .filter((r) => (['purchase', 'payout', 'ask_price'].indexOf(r.type) >= 0))
  Blockly.Events.recordUndo = false
  purchases.forEach(purchase => {
    const value = purchase.getField('PURCHASE_LIST')
      .getValue()
    Blockly.WidgetDiv.hideIfOwner(purchase.getField('PURCHASE_LIST'))
    if (value === purchaseChoices[0][1]) {
      purchase.getField('PURCHASE_LIST')
        .setText(purchaseChoices[0][0])
    } else if (purchaseChoices.length === 2 && value === purchaseChoices[1][1]) {
      purchase.getField('PURCHASE_LIST')
        .setText(purchaseChoices[1][0])
    } else {
      purchase.getField('PURCHASE_LIST')
        .setValue(purchaseChoices[0][1])
      purchase.getField('PURCHASE_LIST')
        .setText(purchaseChoices[0][0])
    }
  })
  Blockly.Events.recordUndo = true
}
