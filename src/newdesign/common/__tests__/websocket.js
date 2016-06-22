var websocket = require('../websocket');
var expect = require('chai').expect;
require('../browser');

describe('WebSocket', function(){
	var ws;
	before(function(){
		ws = new WebSocket('https://example.com/');
	});
	it('authorization with real token should be successful', function(){
	});
	it('authorization with fake token should be unsuccessful', function(){
	});
});
