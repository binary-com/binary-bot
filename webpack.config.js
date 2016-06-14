module.exports = {
  devtool: 'source-map',
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
    bot: __dirname + '/src/bot/bot',
    index: __dirname + '/src/index/index',
  },
  externals: {
    blockly: 'Blockly',
  },
  output: {
    filename: "[name]-[chunkhash].js",
    sourceMapFilename: "[name]-[chunkhash].map"
  },
};

