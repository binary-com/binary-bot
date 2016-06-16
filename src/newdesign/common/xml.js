module.exports = {
	createXmlFromMarket: function createXmlFromMarket(obj) {
		var xmlStr = '<category name="Markets" colour="345" i18n-text="Markets">\n';
		Object.keys(obj).forEach(function(market){
			xmlStr += '\t<category name="'+ obj[market].name +'" colour="345">\n';
			Object.keys(obj[market].submarkets).forEach(function(submarket){
				xmlStr += '\t\t<category name="'+ obj[market].submarkets[submarket].name +'" colour="345">\n';
				Object.keys(obj[market].submarkets[submarket].symbols).forEach(function(symbol){
					xmlStr += '\t\t\t<block type="'+ symbol.toLowerCase() +'"></block>\n';
				});
				xmlStr += '\t\t</category>\n';
			});
			xmlStr += '\t</category>\n';
		});
		xmlStr += '</category>\n';
		return xmlStr;
	},
	xmlToStr: function xmlToStr(xml){
		var serializer = new XMLSerializer(); 
		return serializer.serializeToString(xml);
	},
	strToXml: function strToXml(str) {
		var xmlDoc;
		if (window.DOMParser) {
			var parser = new DOMParser();
			xmlDoc = parser.parseFromString(str, "text/xml");
		} else {
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			xmlDoc.loadXML(str);
		}
		return xmlDoc;
	}
};
