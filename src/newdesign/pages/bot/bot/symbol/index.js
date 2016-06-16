var config = require('config');
var globals = require('globals');
var activeSymbols = require('activeSymbols');
var LiveApi = require('binary-live-api').LiveApi;

module.exports = {
	assetIndex: null;
	activeSymbols: activeSymbols,
	getAllowedConditions: function getAllowedConditions(symbol) {
		var allowedConditions = [];
		var allowedCategories = [];
		this.assetIndex.forEach(function(index){
			if (index[0].toLowerCase() === symbol.toLowerCase()) {
				index[2].forEach(function(conditionInfo){
					var conditionName = conditionInfo[0];
					if ( config.conditionsCategory.hasOwnProperty(conditionName) ) {
						allowedConditions = allowedConditions.concat(config.conditionsCategory[conditionName]);
						allowedCategories.push(conditionName);
					}
				});
			}
		});
		return {
			conditions: allowedConditions,
			categories: allowedCategories
		};
	},
	isConditionAllowedInSymbol: function isConditionAllowedInSymbol(symbol, condition) {
		var allowedConditions = this.getAllowedConditions(symbol).conditions;
		return allowedConditions.indexOf(condition) >= 0;
	},
	getConditionName: function getConditionName(condition) {
		var opposites = config.opposites[condition.toUpperCase()];
		return globals.getFirstObjectValue(opposites[0]) + '/' + globals.getFirstObjectValue(opposites[1]);
	},
	getCategory: function getCategory(condition) {
		for( var category in config.conditionsCategory ) {
			if ( config.conditionsCategory[category].indexOf(condition.toLowerCase()) >= 0 ) {
				return category;
			}
		}
	},
	getCategoryName: function getCategoryName(condition) {
		return config.conditionsCategoryName[getCategory(condition)];
	},
	getAllowedCategoryNames: function getAllowedCategoryNames(symbol) {
		var allowedCategories = this.getAllowedConditions(symbol).categories;
		return allowedCategories.map(function(el){
			return config.conditionsCategoryName[el];
		});
	},
	findSymbol: function findSymbol(symbol) {
		var activeSymbols = globals.activeSymbols.getSymbolNames();
		var result;
		Object.keys(activeSymbols).forEach(function(key){
			if (key.toLowerCase() === symbol.toLowerCase()) {
				if (!result) {
					result = {};
				}
				result[key] = activeSymbols[key];
			}
		});
		return result;
	},
	getAssetIndex: function getAssetIndex(api, cb) {
		api.getAssetIndex().then(function(response){
			this.assetIndex = response.asset_index;
			if ( cb ) {
				cb();
			}
		});
	},
	getActiveSymbols = function getActiveSymbols(callback) {
		var api = new LiveApi();
		api.getActiveSymbolsBrief().then(function(response){
			this.activeSymbols.getMarkets(response.active_symbols);
			getAssetIndex(api, function(){
				callback(activeSymbols);
			});
		});
	}
};
