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
};