'use strict';
import {addPath} from 'app-module-path';
addPath(__dirname + '/../../../../common/');
import 'binary-common-utils/compatibility';

var conditions = require('../conditions');
import {expect} from 'chai';

describe('Conditions', function() {
	it('returns correct options for ticktrade', function() {
		var conditionOptions = conditions.ticktrade({
			condition: 'RISEFALL',
			amount: 1,
			basis: 'Stake',
			currency: 'USD',
			duration: 5,
			duration_unit: 't'
		});
		expect(conditionOptions).to.be.an('Array')
			.and.has.deep.property('[0].contract_type', 'CALL');
		expect(conditionOptions).to.have.deep.property('[1].contract_type', 'PUT');
	});
});
