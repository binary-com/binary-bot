var tools = require('common').tools;
var config = require('common').const;
var LiveApi = require('binary-live-api').LiveApi;
var asyncChain = require('common').asyncChain;

var activeSymbols = require('./activeSymbols');
var conditions = require('./conditions');
var _ = require('underscore');


module.exports = {
	assetIndex: null,
	activeSymbols: activeSymbols,
	conditions: conditions,
	_initialized: false,
	checkInitialized: function checkInitialized() {
        if (!this._initialized) {
            throw(Error('Should be initialized first'));
        }
    },
	getAllowedConditionsForSymbol: function getAllowedConditionsForSymbol(symbol) {
		return this.getAllowedForSymbol(symbol).conditions;
    },
    getAllowedCategoriesForSymbol: function getAllowedCategoriesForSymbol(symbol) {
    	return this.getAllowedForSymbol(symbol).categories;
    },
	getAllowedForSymbol: function getAllowedForSymbol(symbol) {
		this.checkInitialized();
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
		var allowedConditions = this.getAllowedConditionsForSymbol(symbol);
		return allowedConditions.indexOf(condition) >= 0;
	},
	getConditionName: function getConditionName(condition) {
		var opposites = config.opposites[condition.toUpperCase()];
		return tools.getObjectValue(opposites[0]) + '/' + tools.getObjectValue(opposites[1]);
	},
	getCategoryForCondition: function getCategoryForCondition(condition) {
		for( var category in config.conditionsCategory ) {
			if ( config.conditionsCategory[category].indexOf(condition.toLowerCase()) >= 0 ) {
				return category;
			}
		}
	},
	getCategoryNameForCondition: function getCategoryNameForCondition(condition) {
		return config.conditionsCategoryName[this.getCategoryForCondition(condition)];
	},
	getAllowedCategoryNames: function getAllowedCategoryNames(symbol) {
		var allowedCategories = this.getAllowedCategoriesForSymbol(symbol);
		return allowedCategories.map(function(el){
			return config.conditionsCategoryName[el];
		});
	},
	findSymbol: function findSymbol(symbol) {
		this.checkInitialized();
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
	},
	init: function init(cb) {
		var api;
		if (typeof ws === 'undefined') {
			api = new LiveApi({ websocket: require('ws') });
		} else {
			api = new LiveApi();
		}
		var that = this;
		tools.asyncChain()
			.pipe(function getActiveSymbols(done){
				api.getActiveSymbolsBrief().then(function(response){
					that.activeSymbols.init(response.active_symbols);
					done();
				});
			})
			.pipe(function getAssetIndex(done){
				api.getAssetIndex().then(function(response){
					that.assetIndex = response.asset_index;
					done();
				});
			})
			.pipe(function finish(){
				that._initialized = true;
				cb();
			})
			.exec();
	},
	addMarketsToXml: function addMarketsToXml(xml){
		this.checkInitialized();
		var xmlStr = tools.xmlToStr(xml);
		var marketXml = tools.createXmlFromMarket(this.activeSymbols.getMarkets());
		return tools.strToXml(xmlStr.replace('<!--Markets-->', marketXml));
	},
	makeProposalsFromOptions: function makeProposalsFromOptions(options){
		this.checkInitialized();
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
};
