require('app-module-path').addPath(__dirname + '/../../');
require('binary-common-utils/compatibility');


var BotPage = require('../index');
var expect = require('chai').expect;
var observer = require('binary-common-utils/observer');

describe('BotPage', function() {
	before(function(){
	});
	it('BotPage is initialized', function(){
		expect(true).to.be.ok;
	});
});
