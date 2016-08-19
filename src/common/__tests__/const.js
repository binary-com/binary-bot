'use strict';
import _const from '../const';
import {expect} from 'chai';

describe('Const', function(){
	it('Const should contain lists, opposites, hasSecondBarrierOffset, hasBarrierOffset, hasPrediction, conditionsCategory, conditionsCategoryName, conditions', function(){
		expect(_const).to.have.all.keys([
			'lists',
			'opposites',
			'hasSecondBarrierOffset',
			'hasBarrierOffset',
			'hasPrediction',
			'conditionsCategory',
			'conditionsCategoryName',
			'conditions',
			'barrierTypes',
			'durationTypes'
		]);
	});
});
