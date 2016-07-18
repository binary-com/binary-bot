var _const = require('../const');
var expect = require('chai').expect;

describe('Const', function(){
	it('Const should contain lists, opposites, oppositesHaveBarrier, conditionsCategory, conditionsCategoryName, conditions, version', function(){
		expect(_const).to.have.all.keys([
			'lists',
			'opposites',
			'oppositesHaveBarrier',
			'conditionsCategory',
			'conditionsCategoryName',
			'conditions',
			'version',
			'uiComponents',
			'doNotHide'
		]);
	});
});
