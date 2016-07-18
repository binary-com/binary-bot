var tools = require('binary-common-utils/tools');
var config = require('const');
var asyncChain = require('binary-common-utils/tools').asyncChain;

var ActiveSymbols = require('./activeSymbols');
var _ = require('underscore');

var Symbol = function Symbol(api) {
	if ( Symbol.instance ) {
		return Symbol.instance;
	}
	Symbol.instance = this;
	this.api = api._originalApi;
	var that = this;
	this.initPromise = new Promise(function(resolve){
		tools.asyncChain()
			.pipe(function getActiveSymbols(done){
				that.api.getActiveSymbolsBrief().then(function(response){
					that.activeSymbols = new ActiveSymbols(response.active_symbols);
					done();
				});
			})
			.pipe(function getAssetIndex(done){
				that.api.getAssetIndex().then(function(response){
					that.assetIndex = response.asset_index;
					done();
				});
			})
			.pipe(resolve)
			.exec();
	});
};

Symbol.prototype = Object.create(null, {
	getAllowedConditionsForSymbol: {
		value: function getAllowedConditionsForSymbol(symbol) {
			return this.getAllowedForSymbol(symbol).conditions;
		}
    },
    getAllowedCategoriesForSymbol: {
    	value: function getAllowedCategoriesForSymbol(symbol) {
	    	return this.getAllowedForSymbol(symbol).categories;
	    }
    },
	getAllowedForSymbol: {
		value: function getAllowedForSymbol(symbol) {
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
		}
	},
	isConditionAllowedInSymbol: {
		value: function isConditionAllowedInSymbol(symbol, condition) {
			var allowedConditions = this.getAllowedConditionsForSymbol(symbol);
			return allowedConditions.indexOf(condition) >= 0;
		}
	},
	getConditionName: {
		value: function getConditionName(condition) {
			var opposites = config.opposites[condition.toUpperCase()];
			return tools.getObjectValue(opposites[0]) + '/' + tools.getObjectValue(opposites[1]);
		}
	},
	getCategoryForCondition: {
		value: function getCategoryForCondition(condition) {
			for( var category in config.conditionsCategory ) {
				if ( config.conditionsCategory[category].indexOf(condition.toLowerCase()) >= 0 ) {
					return category;
				}
			}
		}
	},
	getCategoryNameForCondition: {
		value: function getCategoryNameForCondition(condition) {
			return config.conditionsCategoryName[this.getCategoryForCondition(condition)];
		}
	},
	getAllowedCategoryNames: {
		value: function getAllowedCategoryNames(symbol) {
			var allowedCategories = this.getAllowedCategoriesForSymbol(symbol);
			return allowedCategories.map(function(el){
				return config.conditionsCategoryName[el];
			});
		}
	},
	findSymbol: {
		value: function findSymbol(symbol) {
			var activeSymbols = this.activeSymbols.getSymbolNames();
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
		}
	},
	addMarketsToXml: {
		value: function addMarketsToXml(xml){
			var xmlStr = tools.xmlToStr(xml);
			var marketXml = tools.createXmlFromMarket(this.activeSymbols.getMarkets());
			return tools.strToXml(xmlStr.replace('<!--Markets-->', marketXml));
		}
	},
	makeProposalsFromOptions: {
		value: function makeProposalsFromOptions(options){
			var proposals = {};
			var symbols = this.activeSymbols.getSymbols();
			for(var symbol in symbols) {
				proposals[symbol] = [];
				for(var option in options) {
					var newOption = _.clone(options[option]);
					newOption.symbol = symbol;
					proposals[symbol].push(newOption);
				}
			}
			return proposals;
		}
	}
});

module.exports = Symbol;
