var observer = require('./observer');
var _ = require('underscore');

module.exports = {
	asyncChain: function asyncChain(){
		return {
			asyncCallChain: [],
			pipe: function pipe(fun){
				this.asyncCallChain.push(fun);
				return this;
			},
			exec: function exec() {
				var wrap = function (call, callback) {
					return function () {
						call(callback);
					};
				};
				for (var i = this.asyncCallChain.length-1; i > -1; i--) {
					this.asyncCallChain[i] = wrap(this.asyncCallChain[i], i < this.asyncCallChain.length - 1 ? this.asyncCallChain[i + 1] : function(){});
				}
				this.asyncCallChain[0]();
			},
		};
	},
	asyncForEach: function asyncForEach(list, func, callback, index) {
		var callbackCalled = false;
		if ( typeof index === 'undefined' ) {
			index = 0;
		} else if ( index === list.length ) {
			if (callback) {
				callback();
			}
			return;
		}
		var toolScope = this;
		func(list[index], index, function(){
			if ( !callbackCalled ) {
				callbackCalled = true;
				toolScope.asyncForEach(list, func, callback, index+1);
			}
		});
	},
	parseQueryString: function parseQueryString() {
		var str = window.location.search;
		var objURL = {};
		str.replace(
			new RegExp("([^?=&]+)(=([^&]*))?", "g"),
			function (_0, _1, _2, _3) {
				objURL[_1] = _3;
			}
		);
		return objURL;
	},
	getObjectValue: function getObjectValue(obj) {
		return obj[Object.keys(obj)[0]];
	},
	getObjectKey: function getObjectKey(obj) {
		return Object.keys(obj)[0];
	},
	getUTCTime: function getUTCTime(date) {
		var dateObject = new Date(date);
		return ('0' + dateObject.getUTCHours())
		.slice(-2) + ':' + ('0' + dateObject.getUTCMinutes())
		.slice(-2) + ':' + ('0' + dateObject.getUTCSeconds())
		.slice(-2);
	},
	copyAttributeIfExists: function copyAttributeIfExists(obj1, obj2, name) {
		if (obj2.hasOwnProperty(name)) {
			obj1[name] = obj2[name];
		}
	},
	createXmlFromMarket: function createXmlFromMarket(obj) {
		var xmlStr = '<category name="Markets" colour="345" i18n-text="Markets">\n';
		Object.keys(obj).forEach(function(market){
			xmlStr += '\t<category name="'+ obj[market].name +'" colour="345">\n';
			Object.keys(obj[market].submarkets).forEach(function(submarket){
				xmlStr += '\t\t<category name="'+ obj[market].submarkets[submarket].name +'" colour="345">\n';
				Object.keys(obj[market].submarkets[submarket].symbols).forEach(function(symbol){
					xmlStr += '\t\t\t<block type="'+ symbol.toLowerCase() +'"/>\n';
				});
				xmlStr += '\t\t</category>\n';
			});
			xmlStr += '\t</category>\n';
		});
		xmlStr += '</category>';
		return xmlStr;
	},
	xmlToStr: function xmlToStr(xml){
		var serializer;
		if (!window.DOMParser) {
			var _XMLSerializer = require('xmldom').XMLSerializer;
			serializer = new _XMLSerializer(); 
			return serializer.serializeToString(xml);
		} else {
			serializer = new XMLSerializer(); 
			return serializer.serializeToString(xml);
		}
	},
	strToXml: function strToXml(str) {
		var xmlDoc;
		var parser;
		if (window.DOMParser) {
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(str, "text/xml");
		} else if (window.ActiveXObject){
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			xmlDoc.loadXML(str);
		} else {
			var _DOMParser = require('xmldom').DOMParser;
			parser = new _DOMParser();
			xmlDoc = parser.parseFromString(str, "text/xml");
		}
		return xmlDoc;
	},
	apiFailed: function apiFailed(response) {
		if (response.error) {
			observer.emit('ui.error', response.error);
			return true;
		}
		return false;
	}
};