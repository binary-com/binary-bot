module.exports = {
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
		if (!window.DOMParser) {
			var XMLSerializer = require('xmldom').XMLSerializer;
			var serializer = new XMLSerializer(); 
			return serializer.serializeToString(xml);
		} else {
			var serializer = new XMLSerializer(); 
			return serializer.serializeToString(xml);
		}
	},
	strToXml: function strToXml(str) {
		var xmlDoc;
		if (window.DOMParser) {
			var parser = new DOMParser();
			xmlDoc = parser.parseFromString(str, "text/xml");
		} else if (window.ActiveXObject){
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			xmlDoc.loadXML(str);
		} else {
			var DOMParser = require('xmldom').DOMParser;
			var parser = new DOMParser();
			xmlDoc = parser.parseFromString(str, "text/xml");
		}
		return xmlDoc;
	}
};
