require('app-module-path').addPath(__dirname + '/../../../../');
require('common/browser');

var marketCtrl = require('../index');
var tools = require('common').tools;
var expect = require('chai').expect;

describe('marketCtrl', function() {
	describe('Error Handling', function(){
		it('initializing is needed for marketCtrl functions', function(){
			expect(function(){marketCtrl.getAllowedConditions();}).to.throw(Error);
			expect(function(){marketCtrl.isConditionAllowedInSymbol();}).to.throw(Error);
			expect(function(){marketCtrl.getConditionName();}).to.throw(Error);
			expect(function(){marketCtrl.getCategory();}).to.throw(Error);
			expect(function(){marketCtrl.getCategoryName();}).to.throw(Error);
			expect(function(){marketCtrl.getAllowedCategoryNames();}).to.throw(Error);
			expect(function(){marketCtrl.findSymbol();}).to.throw(Error);
			expect(function(){marketCtrl.addMarketsToXml();}).to.throw(Error);
			expect(function(){marketCtrl.makeProposalsFromOptions();}).to.throw(Error);
		});
	});
	describe('Checking functions', function(){
		this.timeout('10000');
		before(function(done){
			marketCtrl.init(function(){
				done();
			});
		});
		it('makeProposalsFromOptions creates proposals', function(){
			var proposals = marketCtrl.makeProposalsFromOptions(marketCtrl.conditions.ticktrade({
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
			expect(marketCtrl.addMarketsToXml(marketXml))
				.to.have.deep.property('.childNodes[0].childNodes[0].attributes[0].value')
				.that.be.equal('Markets');
		});
		it('findSymbol returns symbol if exist', function(){
			expect(marketCtrl.findSymbol('R_100')).to.be.ok
				.and.to.have.property('R_100');
			expect(marketCtrl.findSymbol('FAKE')).not.to.be.ok;
		});
		it('getAllowedCategoryNames returns allowed category names', function(){
			expect(marketCtrl.getAllowedCategoryNames('R_100')).to.be.ok
				.and.to.have.all.members([ 'Up/Down', 'Digits', 'Asians' ]);
			expect(marketCtrl.getAllowedCategoryNames('FAKE')).to.be.empty;
		});
		it('getCategoryNameForCondition returns category name of a condition', function(){
			expect(marketCtrl.getCategoryNameForCondition('risefall'))
				.to.be.equal('Up/Down');
		});
		it('getCategoryForCondition returns category of a condition', function(){
			expect(marketCtrl.getCategoryForCondition('risefall'))
				.to.be.equal('callput');
		});
		it('getConditionName returns name of a condition', function(){
			expect(marketCtrl.getConditionName('risefall'))
				.to.be.equal('Rise/Fall');
		});
		it('isConditionAllowedInSymbol returns true if a condition is allowed in a symbol', function(){
			expect(marketCtrl.isConditionAllowedInSymbol('R_100', 'risefall'))
				.to.be.ok;
			expect(marketCtrl.isConditionAllowedInSymbol('frxEURUSD', 'asians'))
				.not.to.be.ok;
			expect(marketCtrl.isConditionAllowedInSymbol('fake', 'asians'))
				.not.to.be.ok;
			expect(marketCtrl.isConditionAllowedInSymbol('frxEURUSD', 'fake'))
				.not.to.be.ok;
		});
		it('getAllowedConditionsForSymbol returns allowed conditions for a symbol', function(){
			expect(marketCtrl.getAllowedConditionsForSymbol('R_100'))
				.to.have.all.members([ 'risefall', 'matchesdiffers', 'evenodd', 'overunder', 'asians' ]);
			expect(marketCtrl.getAllowedConditionsForSymbol('fake'))
				.to.be.empty;
		});
		it('getAllowedCategoriesForSymbol returns allowed categories for a symbol', function(){
			expect(marketCtrl.getAllowedCategoriesForSymbol('R_100'))
				.to.have.all.members([ 'callput', 'digits', 'asian' ]);
			expect(marketCtrl.getAllowedCategoriesForSymbol('fake'))
				.to.be.empty;
		});
	});
});