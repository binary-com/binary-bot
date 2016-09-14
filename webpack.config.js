'use strict';
module.exports = {
  devtool: 'source-map',
	module: {
		noParse: ['ws'],
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel', // 'babel-loader' is also a legal name to reference
				query: {
					presets: ['es2015']
				}
			}
		]
	},
  resolveLoader: {
    root: __dirname + "/node_modules",
	},
  entry: {
    bot: ['babel-polyfill', __dirname + '/src/botPage'],
    index: __dirname + '/src/indexPage'
  },
	externals: [
		{
			blockly: 'Blockly',
			tourist: 'Tourist',
			$: 'jquery',
		},
		'ws'
	],
  output: {
    filename: "[name]-[chunkhash].js",
    sourceMapFilename: "[name]-[chunkhash].map"
  },
};

