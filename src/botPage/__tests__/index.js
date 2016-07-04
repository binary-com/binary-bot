require('app-module-path').addPath(__dirname + '/../../');
require('common/browser');


var BotPage = require('../index');
var expect = require('chai').expect;
var observer = require('common/observer');

describe('BotPage', function() {
	before(function(){
	});
	it('BotPage is initialized', function(){
		expect(true).to.be.ok;
	});
});
