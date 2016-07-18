module.exports = {
  devtool: 'source-map',
	module: {
		noParse: ['ws']
	},
  resolveLoader: {
    root: __dirname + "/node_modules",
	},
	resolve: {
		alias: {
      tourist: 'tourist/tourist.js',
		},
    root: __dirname + '/src/common'
  },
  entry: {
    bot: __dirname + '/src/botPage',
    index: __dirname + '/src/indexPage',
  },
	externals: [
		{
			blockly: 'Blockly',
		},
		'ws'
	],
  output: {
    filename: "[name]-[chunkhash].js",
    sourceMapFilename: "[name]-[chunkhash].map"
  },
};

