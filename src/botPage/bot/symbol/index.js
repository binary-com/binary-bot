import { getObjectValue } from 'binary-common-utils/lib/tools';
import { observer } from 'binary-common-utils/lib/observer';
import config from '../../../common/const';
import ActiveSymbols from './activeSymbols';

export default class _Symbol {
  constructor(api) {
    this.api = api.originalApi;
    this.assetIndex = {};
    this.initPromise = new Promise((resolve) => {
      this.api.getActiveSymbolsBrief().then((r) => {
        this.activeSymbols = new ActiveSymbols(r.active_symbols);
        this.api.getAssetIndex().then((r2) => {
          this.parseAssetIndex(r2.asset_index);
          resolve();
        }, (error) => observer.emit('api.error', error));
      }, (error) => observer.emit('api.error', error));
    });
  }
  parseAssetIndex(assetIndex) {
    for (const symbol of assetIndex) {
      this.assetIndex[symbol[0].toLowerCase()] = {};
      for (const category of symbol[2]) {
        this.assetIndex[symbol[0].toLowerCase()][category[0].toLowerCase()] = category[2];
      }
    }
  }
  getLimitation(symbol, condition) {
    const category = this.getCategoryForCondition(condition);
    return {
      minDuration: this.assetIndex[symbol][category],
    };
  }
  getAllowedConditionsForSymbol(symbol) {
    return this.getAllowedConditionsOrCategoriesForSymbol(symbol).conditions;
  }
  getAllowedCategoriesForSymbol(symbol) {
    return this.getAllowedConditionsOrCategoriesForSymbol(symbol).categories;
  }
  getAllowedConditionsOrCategoriesForSymbol(symbol) {
    let allowedConditions = [];
    const allowedCategories = [];
    const index = this.assetIndex[symbol.toLowerCase()];
    if (index) {
      for (const conditionName of Object.keys(config.conditionsCategory)) {
        if (conditionName in index) {
          allowedConditions = allowedConditions.concat(config.conditionsCategory[conditionName]);
          allowedCategories.push(conditionName);
        }
      }
    }
    return {
      conditions: allowedConditions,
      categories: allowedCategories,
    };
  }
  isConditionAllowedInSymbol(symbol, condition) {
    const allowedConditions = this.getAllowedConditionsForSymbol(symbol);
    return allowedConditions.indexOf(condition) >= 0;
  }
  getConditionName(condition) {
    const opposites = config.opposites[condition.toUpperCase()];
    return getObjectValue(opposites[0]) + '/' + getObjectValue(opposites[1]);
  }
  getCategoryForCondition(condition) {
    for (const category of Object.keys(config.conditionsCategory)) {
      if (config.conditionsCategory[category].indexOf(condition.toLowerCase()) >= 0) {
        return category;
      }
    }
    return null;
  }
  getCategoryNameForCondition(condition) {
    return config.conditionsCategoryName[this.getCategoryForCondition(condition)];
  }
  getAllowedCategoryNames(symbol) {
    const allowedCategories = this.getAllowedCategoriesForSymbol(symbol);
    return allowedCategories.map((el) => config.conditionsCategoryName[el]);
  }
  findSymbol(symbol) {
    const activeSymbols = this.activeSymbols.getSymbolNames();
    let result;
    Object.keys(activeSymbols).forEach((key) => {
      if (key.toLowerCase() === symbol.toLowerCase()) {
        if (!result) {
          result = {};
        }
        result[key] = activeSymbols[key];
      }
    });
    return result;
  }
}
