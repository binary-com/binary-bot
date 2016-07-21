'use strict';
require('app-module-path').addPath(__dirname + '/../../../../common/');
require('binary-common-utils/compatibility');

var conditions = require('../conditions');
var _Symbol = require('../index');
var tools = require('binary-common-utils/tools');
var expect = require('chai').expect;
var ws = require('mock/websocket');
var CustomApi = require('binary-common-utils/customApi');

describe('symbol', function() {
	describe('Error Handling', function(){
		it('initializing is needed for symbol functions', function(){
			expect(function(){_Symbol.getAllowedConditions();}).to.throw(Error);
			expect(function(){_Symbol.isConditionAllowedInSymbol();}).to.throw(Error);
			expect(function(){_Symbol.getConditionName();}).to.throw(Error);
			expect(function(){_Symbol.getCategoryForCondition();}).to.throw(Error);
			expect(function(){_Symbol.getCategoryNameForCondition();}).to.throw(Error);
			expect(function(){_Symbol.getAllowedCategoryNames();}).to.throw(Error);
			expect(function(){_Symbol.findSymbol();}).to.throw(Error);
			expect(function(){_Symbol.addMarketsToXml();}).to.throw(Error);
			expect(function(){_Symbol.makeProposalsFromOptions();}).to.throw(Error);
		});
	});
	describe('Checking functions', function(){
		this.timeout('10000');
		var symbol;
		before(function(done){
			symbol = new _Symbol(new CustomApi(ws));
			symbol.initPromise.then(function(){
				done();
			});
		});
		it('makeProposalsFromOptions creates proposals', function(){
			var proposals = symbol.makeProposalsFromOptions(conditions.ticktrade({
				condition: 'RISEFALL',
				amount: 1,
				basis: 'Stake',
				currency: 'USD',
				duration: 5,
				duration_unit: 't'
			}));
			expect(proposals).to.have.deep.property('.R_100[1].symbol')
				.that.be.equal('R_100');
			expect(proposals).to.have.deep.property('.R_100[1].contract_type')
				.that.be.equal('PUT');
			expect(proposals).to.have.deep.property('.R_100[0].contract_type')
				.that.be.equal('CALL');
		});
		it('addMarketsToXml adds market to the toolbox', function(){
			var marketXml = tools.strToXml('<xml><!--Markets--></xml>');
			expect(symbol.addMarketsToXml(marketXml))
				.to.have.deep.property('.childNodes[0].childNodes[0].attributes[0].value')
				.that.be.equal('Markets');
		});
		it('findSymbol returns symbol if exist', function(){
			expect(symbol.findSymbol('R_100')).to.be.ok
				.and.to.have.property('R_100');
			expect(symbol.findSymbol('FAKE')).not.to.be.ok;
		});
		it('getAllowedCategoryNames returns allowed category names', function(){
			expect(symbol.getAllowedCategoryNames('R_100')).to.be.ok
				.and.to.have.all.members([ 'Up/Down', 'Digits', 'Asians' ]);
			expect(symbol.getAllowedCategoryNames('FAKE')).to.be.empty;
		});
		it('getCategoryNameForCondition returns category name of a condition', function(){
			expect(symbol.getCategoryNameForCondition('risefall'))
				.to.be.equal('Up/Down');
		});
		it('getCategoryForCondition returns category of a condition', function(){
			expect(symbol.getCategoryForCondition('risefall'))
				.to.be.equal('callput');
		});
		it('getConditionName returns name of a condition', function(){
			expect(symbol.getConditionName('risefall'))
				.to.be.equal('Rise/Fall');
		});
		it('isConditionAllowedInSymbol returns true if a condition is allowed in a symbol', function(){
			expect(symbol.isConditionAllowedInSymbol('R_100', 'risefall'))
				.to.be.ok;
			expect(symbol.isConditionAllowedInSymbol('frxEURUSD', 'asians'))
				.not.to.be.ok;
			expect(symbol.isConditionAllowedInSymbol('fake', 'asians'))
				.not.to.be.ok;
			expect(symbol.isConditionAllowedInSymbol('frxEURUSD', 'fake'))
				.not.to.be.ok;
		});
		it('getAllowedConditionsForSymbol returns allowed conditions for a symbol', function(){
			expect(symbol.getAllowedConditionsForSymbol('R_100'))
				.to.have.all.members([ 'risefall', 'matchesdiffers', 'evenodd', 'overunder', 'asians' ]);
			expect(symbol.getAllowedConditionsForSymbol('fake'))
				.to.be.empty;
		});
		it('getAllowedCategoriesForSymbol returns allowed categories for a symbol', function(){
			expect(symbol.getAllowedCategoriesForSymbol('R_100'))
				.to.have.all.members([ 'callput', 'digits', 'asian' ]);
			expect(symbol.getAllowedCategoriesForSymbol('fake'))
				.to.be.empty;
		});
	});
});
