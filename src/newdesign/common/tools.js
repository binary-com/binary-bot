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
	getFirstObjectValue: function getFirstObjectValue(obj) {
		return obj[Object.keys(obj)[0]];
	},
	getUTCTime: function getUTCTime(date) {
		var dateObject = new Date(date);
		return ('0' + dateObject.getUTCHours())
		.slice(-2) + ':' + ('0' + dateObject.getUTCMinutes())
		.slice(-2) + ':' + ('0' + dateObject.getUTCSeconds())
		.slice(-2);
	},
	findTopParentBlock = function findTopParentBlock(block) {
		var pblock = block.parentBlock_;
		if (pblock === null) {
			return null;
		}
		while (pblock !== null) {
			block = pblock;
			pblock = block.parentBlock_;
		}
		return block;
	}
};