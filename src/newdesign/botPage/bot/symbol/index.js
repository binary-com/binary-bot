var tools = require('tools');
var LiveApi = require('binary-live-api').LiveApi;
var asyncChain = require('common').asyncChain;
var config = tools.const;

var activeSymbols = require('./activeSymbols');
var conditions = require('./conditions');
var markets = require('./markets');

module.exports = {
	assetIndex: null;
	activeSymbols: activeSymbols,
	conditions: conditions,
	markets: markets,
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
		return tools.getFirstObjectValue(opposites[0]) + '/' + tools.getFirstObjectValue(opposites[1]);
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
		var activeSymbols = tools.activeSymbols.getSymbolNames();
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
	init: function init() {
		var api = new LiveApi();
		asyncChain()
			.pipe(function getActiveSymbols(done){
				api.getActiveSymbolsBrief().then(function(response){
					this.activeSymbols.init(response.active_symbols);
					done();
				});
			})
			.pipe(function getAssetIndex(){
				api.getAssetIndex().then(function(response){
					this.assetIndex = response.asset_index;
				});
			})
			.exec();
	},
	addMarketsToXml: function addMarketsToXml(xml){
		var xmlStr = tools.xmlToStr(xml);
		var marketXml = tools.createXmlFromMarket(tools.activeSymbols.getMarkets());
		return tools.strToXml(xmlStr.replace('<!--Markets-->', marketXml));
	}
};
