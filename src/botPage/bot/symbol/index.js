import { getObjectValue } from 'binary-common-utils/lib/tools'
import config from '../../../common/const'
import ActiveSymbols from './activeSymbols'

let parsedAssetIndex

const parseAssetIndex = assetIndex => {
  const parsed = {}
  for (const symbol of assetIndex) {
    parsed[symbol[0].toLowerCase()] = {}
    for (const category of symbol[2]) {
      parsed[symbol[0].toLowerCase()][category[0].toLowerCase()] = category[2]
    }
  }
  return parsed
}

const getAllowedConditionsOrCategoriesForSymbol = symbol => {
  let conditions = []
  const categories = []
  const index = parsedAssetIndex[symbol.toLowerCase()]
  if (index) {
    for (const conditionName of Object.keys(config.conditionsCategory)) {
      if (conditionName in index) {
        conditions = conditions.concat(config.conditionsCategory[conditionName])
        categories.push(conditionName)
      }
    }
  }
  return {
    conditions,
    categories,
  }
}

const getCategoryForCondition = condition => {
  for (const category of Object.keys(config.conditionsCategory)) {
    if (config.conditionsCategory[category].indexOf(condition.toLowerCase()) >= 0) {
      return category
    }
  }
  return null
}

export default class _Symbol {
  constructor(api) {
    this.api = api.originalApi
    this.initPromise = new Promise((resolve) => {
      this.api.getActiveSymbolsBrief().then((r) => {
        this.activeSymbols = new ActiveSymbols(r.active_symbols)
        this.api.getAssetIndex().then((r2) => {
          parsedAssetIndex = parseAssetIndex(r2.asset_index)
          resolve()
        }, () => 0)
      }, () => 0)
    })
  }
  getLimitation(symbol, condition) {
    const category = getCategoryForCondition(condition)
    return {
      minDuration: parsedAssetIndex[symbol.toLowerCase()][category],
    }
  }
  isConditionAllowedInSymbol(symbol, condition) {
    const {
      conditions,
    } = getAllowedConditionsOrCategoriesForSymbol(symbol)
    return conditions.indexOf(condition) >= 0
  }
  getConditionName(condition) {
    const opposites = config.opposites[condition.toUpperCase()]
    return `${getObjectValue(opposites[0])}/${getObjectValue(opposites[1])}`
  }
  getCategoryNameForCondition(condition) {
    return config.conditionsCategoryName[getCategoryForCondition(condition)]
  }
  getAllowedCategories(symbol) {
    const {
      categories,
    } = getAllowedConditionsOrCategoriesForSymbol(symbol)
    return categories
  }
  getAllowedCategoryNames(symbol) {
    const {
      categories,
    } = getAllowedConditionsOrCategoriesForSymbol(symbol)
    return categories.map((el) => config.conditionsCategoryName[el])
  }
}
